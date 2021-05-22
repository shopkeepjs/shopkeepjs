const inquirer = require('inquirer');
const fs = require('fs');
const { copyFromGit } = require('./github');

const addTesting = async (cwd) => {
  const { arrayOfCI } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'arrayOfCI',
      prefix: '',
      suffix: '',
      message: 'Which branches and services would you like to include CI testing?'.green.italic,
      choices: [
        { name: 'Master Branch - Server'.blue, value: 'master-server' },
        { name: 'Master Branch - Client'.blue, value: 'master-client' },
        { name: 'Dev Branch - Server'.blue, value: 'dev-server' },
        { name: 'Dev Branch - Client'.blue, value: 'dev-client' },
      ],
    },
  ]);
  arrayOfCI.forEach((suite) => {
    fs.writeFile(`${cwd}/.github/workflows/${suite}.yml`, fs.readFileSync(`${cwd}/.github/actions/base.yml`), () => {});
    fs.appendFile(
      `${cwd}/.github/workflows/${suite}.yml`,
      fs.readFileSync(`${cwd}/.github/actions/testing.yml`),
      () => {},
    );
  });
};

const ci = async ({ cwd }) => {
  await copyFromGit('.github', '', cwd);
  addTesting(cwd);
};
module.exports = { ci };
