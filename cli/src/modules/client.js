const inquirer = require('inquirer');

let responses = {};

const client = async () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'clientService',
      message: 'Which frontend package would you like?',
      choices: ['Vanilla', 'React'],
    },
  ]);

// const react = async () => {
//   const test = {
//     ...(await inquirer.prompt([
//       {
//         type: 'checkbox',
//         name: 'services',
//         message: 'What react services will you need?',
//         choices: [
//           { name: 'React Router' },
//           { name: 'Apollo' },
//           { name: 'Redux' },
//           { name: 'React Forms' },
//         ],
//       },
//     ])),
//   };
//   return test;
// };

// const client = async () => {
//   responses = {
//     ...(await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'framework',
//         message: 'Which framework are you using?',
//         choices: [{ name: 'Vanilla' }, { name: 'React' }, { name: 'Vue' }],
//       },
//     ])),
//   };
//   responses = await react();
//   responses = {
//     ...(await inquirer.prompt([
//       {
//         type: 'confirm',
//         name: 'testing',
//         message: 'Would you like to use Jest for testing',
//         default: false,
//       },
//     ])),
//     ...(await inquirer.prompt([
//       {
//         type: 'confirm',
//         name: 'typescript',
//         message: 'Do you want to use Typescript?',
//         default: false,
//       },
//     ])),
//   };
//   return responses;
// };

module.exports = client;
