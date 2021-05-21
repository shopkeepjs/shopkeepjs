const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora');
const { copyFromGit } = require('../integrations/github');

const makeServer = async ({ cwd }) => {
  const { tooling } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tooling',
      prefix: '',
      message: 'Which tooling are you using?'.green.italic,
      choices: [{ name: 'Express'.blue, value: 'express' }],
    },
  ]);
  const copying = ora({ indent: 4, text: 'Copying the server from Shopkeep...'.white }).start();
  await copyFromGit('server', tooling, cwd);
  copying.stopAndPersist({
    symbol: '✔',
    text: 'Copied the server from Shopkeep.'.white,
  });
  const installing = ora({ indent: 4, text: 'Installing the server from Shopkeep...'.white }).start();
  await exec('npm i', { cwd: `${cwd}/server` });
  installing.stopAndPersist({
    symbol: '✔',
    text: 'Installed the server from Shopkeep.'.white,
  });
};

module.exports = makeServer;
