const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { detectGH } = require('./dependencyCheck');

const copyFromGit = async (service, project, cwd) => {
  await exec(`svn export https://github.com/shopkeepjs/shopkeepjs/trunk/store/${service}/${project} ${cwd}/${service}`);
};

const createGitRepo = async (projectName, cwd) => {
  const { shouldCreateNewGit } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldCreateNewGit',
      message: '\n Would you like to create a git repo and push immediately?'.green.italic,
      prefix: '   - GH is detected - '.yellow.bold,
      default: false,
    },
  ]);
  if (shouldCreateNewGit) {
    const gitUsername = await exec('gh auth status').then(({ stderr }) => {
      const test = stderr.slice(stderr.search('as ') + 3);
      return test.slice(0, test.search(' '));
    });
    const { githubAccount } = await inquirer.prompt([
      {
        type: 'text',
        name: 'githubAccount',
        prefix: '',
        message: 'Which github account or organization would you like to use?'.green.italic,
        default: gitUsername,
        transformer: (answer) => `${answer}`.blue,
      },
    ]);
    await exec(`gh repo create ${githubAccount}/${projectName} --public -y`, { cwd });
    await exec('git push origin master', { cwd });
    await exec('git checkout -b dev', { cwd });
    await exec('git push origin dev', { cwd });
  }
};

const git = async ({ projectName, cwd }) => {
  await exec('git init', { cwd });
  await exec('git add .', { cwd });
  await exec("git commit -m 'Generated by ShopkeepJS'", { cwd });
  if (await detectGH()) createGitRepo(projectName, cwd);
  const { stdout: currentBranch } = await exec('git branch --show-current', { cwd });
  if (currentBranch.trim() === 'master') await exec('git checkout -b dev', { cwd });
};

module.exports = { git, copyFromGit };
