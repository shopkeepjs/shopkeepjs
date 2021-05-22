const inquirer = require('inquirer');
const fs = require('fs');
const { copyFromGit } = require('./github');

const addTestForDev = async (cwd, service) => {
  const { willIncludeCI } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'willIncludeCI',
      prefix: '',
      message: `Would you like to include Github Action CI to the ${service} for the dev branch?`.green.italic,
      default: true,
    },
  ]);
  if (willIncludeCI) {
    fs.writeFile(
      `${cwd}/.github/workflows/${service}-dev.yml`,
      fs.readFileSync(`${cwd}/.github/actions/base-dev.yml`),
      () => {},
    );
    fs.appendFile(
      `${cwd}/.github/workflows/${service}-dev.yml`,
      fs.readFileSync(`${cwd}/.github/actions/testing.yml`),
      () => {},
    );
  }
};

const cd = async (cwd, service) => {
  const { willIncludeCD } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'willIncludeCD',
      prefix: '',
      message: `Would you like to include Github Action CD to the ${service}?`.green.italic,
      default: true,
    },
  ]);
  if (willIncludeCD) {
    const { willIncludeNPM } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'willIncludeNPM',
        prefix: '',
        message: 'Would you like to include CD to npm?'.green.italic,
        default: true,
      },
    ]);
    const { willIncludeDocker } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'willIncludeDocker',
        prefix: '',
        message: 'Would you like to include CD to docker hub?'.green.italic,
        default: true,
      },
    ]);
    if (willIncludeNPM) {
      fs.appendFile(
        `${cwd}/.github/workflows/${service}-master.yml`,
        fs.readFileSync(`${cwd}/.github/actions/npm-package.yml`),
        () => {},
      );
    }
    if (willIncludeDocker) {
      fs.appendFile(
        `${cwd}/.github/workflows/${service}-master.yml`,
        fs.readFileSync(`${cwd}/.github/actions/docker-package.yml`),
        () => {},
      );
    }
  }
};

const addTestForMaster = async (cwd, service) => {
  const { willIncludeCI } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'willIncludeCI',
      prefix: '',
      message: `Would you like to include Github Action CI to the ${service} for the master branch?`.green.italic,
      default: true,
    },
  ]);
  if (willIncludeCI) {
    fs.writeFile(
      `${cwd}/.github/workflows/${service}-master.yml`,
      fs.readFileSync(`${cwd}/.github/actions/base-master.yml`),
      () => {},
    );
    fs.appendFile(
      `${cwd}/.github/workflows/${service}-master.yml`,
      fs.readFileSync(`${cwd}/.github/actions/testing.yml`),
      () => {},
    );
    cd(cwd, service);
  }
};

const ci = async ({ cwd }) => {
  await copyFromGit('.github', '', cwd);
  await addTestForMaster(cwd, 'client');
  await addTestForMaster(cwd, 'server');
  await addTestForDev(cwd, 'client');
  await addTestForDev(cwd, 'server');
};
module.exports = { ci, cd };
