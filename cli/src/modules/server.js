const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora');
const { copyFromGit } = require('../integrations/github');
const testing = require('../integrations/testing');

const questions = async (cwd) => {
  const { serverFolderName } = await inquirer.prompt([
    {
      type: 'text',
      name: 'serverFolderName',
      prefix: '',
      message: 'What would you like the server folder to be named?'.green.italic,
      default: 'server',
      transformer: (answer) => `${answer}`.blue,
    },
  ]);
  const { tooling } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tooling',
      prefix: '',
      message: 'Which tooling are you using?'.green.italic,
      choices: [{ name: 'Express'.blue, value: 'express' }],
    },
  ]);
  return { serverFolderName, tooling };
};

const genMessage = async (actionWord, fn) => {
  const message = ora({ indent: 4, text: `${actionWord[0]} the server from Shopkeep...`.white }).start();
  await fn();
  message.stopAndPersist({
    symbol: '✔',
    text: `${actionWord[1]} the server from Shopkeep...`.white,
  });
};

const makeServer = async ({ cwd }) => {
  const { serverFolderName, tooling } = await questions(cwd);
  await genMessage(['Copying', 'Copied'], () => copyFromGit('server', tooling, cwd));
  let serverPackageJSON = JSON.parse(fs.readFileSync(`${cwd}/${serverFolderName}/package.json`, 'utf-8'));
  serverPackageJSON = await testing('server', serverPackageJSON);
  console.log(serverPackageJSON);
  await genMessage(['Installing', 'Installed'], () => exec('npm i', { cwd: `${cwd}/server` }));
  return { serverFolderName, serverPackageJSON };
};

module.exports = makeServer;
