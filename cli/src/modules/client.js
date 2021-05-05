const inquirer = require('inquirer');
const { copyFromGit } = require('../helpers');

const client = async (projectName) => {
  const responses = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageName',
      message: 'Which frontend package would you like?',
      choices: [
        { name: 'Vanilla', value: 'vanilla' },
        { name: 'React', value: 'react-basic' },
      ],
    },
  ]);
  copyFromGit('client', responses.packageName, projectName);
};

module.exports = client;
