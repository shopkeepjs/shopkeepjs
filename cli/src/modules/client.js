const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora');
const { copyFromGit } = require('../integrations/github');
const testing = require('../integrations/testing');
const linting = require('../integrations/linting');

const questions = async () => {
  const { clientFolderName } = await inquirer.prompt([
    {
      type: 'text',
      name: 'clientFolderName',
      prefix: '',
      message: 'What would you like the client folder to be named?'.green.italic,
      default: 'client',
      transformer: (answer) => `${answer}`.blue,
    },
  ]);
  const { packageType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageType',
      prefix: '',
      message: 'Which frontend package would you like?'.green.italic,
      choices: [
        { name: 'Vanilla'.blue, value: 'vanilla' },
        { name: 'React'.blue, value: 'react-basic' },
      ],
    },
  ]);
  return { clientFolderName, packageType };
};

const genMessage = async (actionWord, fn) => {
  const message = ora({ indent: 4, text: `${actionWord[0]} the client...`.white }).start();
  await fn();
  message.stopAndPersist({
    symbol: '✔',
    text: `${actionWord[1]} the client.`.white,
  });
};

const client = async ({ cwd }) => {
  const { clientFolderName, packageType } = await questions();
  await genMessage(['Copying', 'Copied'], () => copyFromGit('client', packageType, cwd));
  if (packageType !== 'vanilla') {
    let clientPackageJSON = JSON.parse(fs.readFileSync(`${cwd}/${clientFolderName}/package.json`, 'utf-8'));
    clientPackageJSON = await testing('client', clientPackageJSON, cwd);
    clientPackageJSON = await linting('client', clientPackageJSON, cwd);
    fs.writeFileSync(`${cwd}/${clientFolderName}/package.json`, JSON.stringify(clientPackageJSON));
    await genMessage(['Installing', 'Installed'], () => exec('npm i', { cwd: `${cwd}/client` }));
  }
  return clientFolderName;
};

module.exports = client;
