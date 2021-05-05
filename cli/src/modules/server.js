const inquirer = require('inquirer');

let responses = {};

const server = async () => {
  responses = {
    ...(await inquirer.prompt([
      {
        type: 'list',
        name: 'tooling',
        message: 'Which tooling are you using?',
        choices: [
          { name: 'Basic Node' },
          { name: 'Express' },
          { name: 'Apollo' },
          { name: 'FeathersJS' },
        ],
      },
    ])),
  };
  return responses;
};

module.exports = server;
