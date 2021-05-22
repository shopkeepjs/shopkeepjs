const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { copyFromGit } = require('./github');
const { isMaster } = require('cluster');

const writeFiles = async (cwd, { branch, service }) => {
  fs.writeFileSync(
    `${cwd}/.github/workflows/${branch}-${service}.yml`,
    fs.readFileSync(`${cwd}/.github/actions/base.yml`),
    () => {},
  );
  fs.appendFileSync(
    `${cwd}/.github/workflows/${branch}-${service}.yml`,
    fs.readFileSync(`${cwd}/.github/actions/testing.yml`),
    () => {},
  );
  await exec(`sed -i 's/{BRANCH}/${branch}/g' ${branch}-${service}.yml`, { cwd: `${cwd}/.github/workflows/` });
  await exec(`sed -i 's/{FOLDER}/${service}/g' ${branch}-${service}.yml`, { cwd: `${cwd}/.github/workflows/` });
};

const addTesting = async (cwd) => {
  const { arrayOfCI } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'arrayOfCI',
      prefix: '',
      suffix: '',
      message: 'Which branches and services would you like to include CI testing?'.green.italic,
      choices: [
        { name: 'Master Branch - Server'.blue, value: { branch: 'master', service: 'server' } },
        { name: 'Master Branch - Client'.blue, value: { branch: 'master', service: 'client' } },
        { name: 'Dev Branch - Server'.blue, value: { branch: 'dev', service: 'server' } },
        { name: 'Dev Branch - Client'.blue, value: { branch: 'dev', service: 'client' } },
      ],
    },
  ]);
  if (arrayOfCI) fs.mkdir(`${cwd}/.github/workflows`, { recursive: true }, (err) => console.log(err));
  arrayOfCI.forEach((suite) => {
    writeFiles(cwd, suite);
  });
};

const ci = async ({ cwd }) => {
  await copyFromGit('.github', '', cwd);
  addTesting(cwd);
};
module.exports = { ci };
