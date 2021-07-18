const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { copyFromGit } = require('./github');

const writeFiles = async (cwd, { branch, service }) => {
  fs.writeFileSync(
    `${cwd}/.github/workflows/${branch}-${service}.yml`,
    fs.readFileSync(`${cwd}/.github/actions/base.yml`),
    (err) => err && console.log(err),
  );
  fs.appendFileSync(
    `${cwd}/.github/workflows/${branch}-${service}.yml`,
    fs.readFileSync(`${cwd}/.github/actions/testing.yml`),
    (err) => err && console.log(err),
  );
  await exec(`sed -i 's/{BRANCH}/${branch}/g' ${branch}-${service}.yml`, { cwd: `${cwd}/.github/workflows/` });
  await exec(`sed -i 's/{FOLDER}/${service}/g' ${branch}-${service}.yml`, { cwd: `${cwd}/.github/workflows/` });
};

const defineChoices = ({ services, defaultBranch, devBranch }) => {
  const choices = [];
  if (services.includes('Client')) {
    choices.push({
      name: `${defaultBranch} Branch - Client`.blue,
      value: { branch: `${defaultBranch}`, service: 'client' },
    });
    // prettier-ignore
    if (devBranch) choices.push({ name: `${devBranch} Branch - Client`.blue, value: { branch: `${devBranch}`, service: 'client' } });
  }
  if (services.includes('Server')) {
    choices.push({
      name: `${defaultBranch} Branch - Server`.blue,
      value: { branch: `${defaultBranch}`, service: 'server' },
    });
    // prettier-ignore
    if (devBranch) choices.push({ name: `${devBranch} Branch - Server`.blue, value: { branch: `${devBranch}`, service: 'server' } });
  }
  return choices;
};
const askAboutTesting = async (responses) => {
  const choices = defineChoices(responses);
  return inquirer.prompt([
    {
      type: 'checkbox',
      name: 'arrayOfCI',
      prefix: '',
      suffix: '',
      message: 'For which branches and services would you like to include CI testing?'.green.italic,
      choices,
    },
  ]);
};

const ci = async (responses) => {
  await copyFromGit('.github', '', responses.cwd);
  const { arrayOfCI } = await askAboutTesting(responses);
  if (arrayOfCI) {
    fs.mkdir(`${responses.cwd}/.github/workflows`, { recursive: true }, (err) => err && console.log(err));
    arrayOfCI.forEach((suite) => {
      writeFiles(responses.cwd, suite);
    });
  }
};
module.exports = { ci };
