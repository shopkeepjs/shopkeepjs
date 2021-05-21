const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
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
  console.log('   Copying the client from Shopkeep...'.white);
  await copyFromGit('client', packageType, cwd, 'client');
  console.log('   Installing your npm packages...'.white);
  await exec('npm i', { cwd });
};

module.exports = client;
