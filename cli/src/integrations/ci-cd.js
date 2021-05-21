const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { copyFromGit } = require('./github');

const addTest = async (cwd, service) => {
  const { willIncludeCI } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'willIncludeCI',
      prefix: '',
      message: 'Would you like to include Github Action testing?'.green.italic,
      default: true,
    },
  ]);
  if (willIncludeCI) {
    fs.writeFile(
      `${cwd}/.github/workflows/${service}.yml`,
      fs.readFileSync(`${cwd}/.github/workflows/base.yml`),
      () => {},
    );
    fs.appendFile(
      `${cwd}/.github/workflows/${service}.yml`,
      fs.readFileSync(`${cwd}/.github/workflows/testing.yml`),
      () => {},
    );
  }
};

const ci = async ({ cwd }) => {
  await copyFromGit('.github', '', cwd);
  await addTest(cwd, 'server');
};
const cd = async () => {};

module.exports = { ci, cd };
