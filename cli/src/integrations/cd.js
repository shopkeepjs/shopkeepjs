const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const writeFiles = async (cwd, { branch, service }, deploymentOption) => {
  if (!fs.access(`${cwd}/.github/workflows/${branch}-${service}.yml`)) {
    fs.writeFileSync(
      `${cwd}/.github/workflows/${branch}-${service}.yml`,
      fs.readFileSync(`${cwd}/.github/actions/base.yml`),
      (err) => err && console.log(err),
    );
  }
  fs.appendFileSync(
    `${cwd}/.github/workflows/${branch}-${service}.yml`,
    fs.readFileSync(`${cwd}/.github/actions/${deploymentOption}.yml`),
    (err) => err && console.log(err),
  );
  await exec(`sed -i 's/{BRANCH}/${branch}/g' ${branch}-${service}.yml`, { cwd: `${cwd}/.github/workflows/` });
  await exec(`sed -i 's/{FOLDER}/${service}/g' ${branch}-${service}.yml`, { cwd: `${cwd}/.github/workflows/` });
};

const questions = async ({ serverFolderName, defaultBranch }) => inquirer.prompt([
  {
    type: 'checkbox',
    name: 'arrayOfCI',
    prefix: '',
    suffix: '',
    message:
        `What continuous deployment options would you like to include for the ${serverFolderName} in the ${defaultBranch}?`
          .green.italic,
    choices: [
      {
        name: 'Docker Hub'.blue,
        value: 'docker',
      },
      {
        name: 'npm'.blue,
        value: 'npm',
      },
      {
        name: 'GitHub Docker'.blue,
        value: 'github-docker',
      },
      {
        name: 'GitHub npm'.blue,
        value: 'github-npm',
      },
    ],
  },
]);
const cd = async (responses) => {
  const { answers } = questions(responses);
  answers.forEach(async (answer) => {
    await writeFiles(answer);
  });
};

module.exports = { cd };
