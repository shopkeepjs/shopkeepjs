/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('inquirer');

const copyFromGit = async (service, project, projectName, isNewDirectory) => {
  await exec(`svn export https://github.com/shopkeepjs/shopkeepjs/trunk/store/${service}/${project} ${service}`, { cwd: isNewDirectory ? `${projectName}` : '' });
};

const createGitRepo = async (projectName, isNewDirectory) => {
  const { githubUserName } = await inquirer.prompt([
    {
      type: 'text',
      name: 'githubUserName',
      prefix: '',
      message: 'What is your github user name?'.green.italic,
      transformer: (answer) => `${answer}`.blue,
    },
  ]);
  try {
    await exec(`hub create ${githubUserName}/${projectName}`, { cwd: isNewDirectory ? `${projectName}` : '' });
  } catch (error) {
    console.error('It appears you have encountered an error: ', error);
  }
};

const makeGitProject = async (projectName, isNewDirectory) => {
  await exec('git init', { cwd: isNewDirectory ? `${projectName}` : '' });
  await exec('git add .', { cwd: isNewDirectory ? `${projectName}` : '' });
  await exec('git commit -m \'Gooby\'', { cwd: isNewDirectory ? `${projectName}` : '' });
  const { shouldCreateNewGit } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldCreateNewGit',
      message: '\n Would you like to create a git repo and push immediately?'.green.italic,
      prefix: '   - Warning: this requires hub - '.yellow.bold,
      default: false,
    },
  ]);
  if (shouldCreateNewGit) {
    await createGitRepo(projectName, isNewDirectory);
    await exec('git push origin master', { cwd: isNewDirectory ? `${projectName}` : '' });
  }
};

async function detectSubversion() {
  try {
    await exec('which svn');
    return true;
  } catch (error) {
    console.error('It appears that Subversion is not installed - this package manager will not work without it.'.yellow);
    const { override } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'override',
        message: 'Would you like to override and run anyway?'.green.italic,
        default: false,
        prefix: '',
      },
    ]);
    if (override) return true;
    console.error('Please install Subversion and try again!'.red);
    process.exit(1);
  }
  return false;
}

module.exports = { copyFromGit, detectSubversion, makeGitProject };
