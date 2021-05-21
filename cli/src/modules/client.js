const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora');
const { copyFromGit } = require('../integrations/github');

const client = async ({ cwd }) => {
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
  const copying = ora({ indent: 4, text: 'Copying the client from Shopkeep...'.white }).start();
  await copyFromGit('client', packageType, cwd);
  copying.stopAndPersist({
    symbol: '✔',
    text: 'Copied the client from Shopkeep.'.white,
  });
  if (packageType !== 'vanilla') {
    const installing = ora({ indent: 4, text: 'Installing your npm packages...'.white }).start();
    await exec('npm i', { cwd: `${cwd}/client` });
    installing.stopAndPersist({
      symbol: '✔',
      text: 'Installed the npm packages.'.white,
    });
  }
};

module.exports = client;
