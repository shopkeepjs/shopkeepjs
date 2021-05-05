const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('inquirer');
const { copyFromGit } = require('../helpers');

const client = async (projectName, isNewDirectory) => {
  const responses = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageName',
      prefix: '',
      message: 'Which frontend package would you like?'.green.italic,
      choices: [
        { name: 'Vanilla'.blue, value: 'vanilla' },
        { name: 'React'.blue, value: 'react-basic' },
      ],
    },
  ]);
  console.log('   Copying the package from Github...'.white);
  await copyFromGit('client', responses.packageName, projectName, isNewDirectory);
  console.log('   Installing your npm packages...'.white);
  await exec('npm i', { cwd: isNewDirectory ? `${projectName}/client` : '/client' });
};

module.exports = client;
