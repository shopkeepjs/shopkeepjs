const inquirer = require('inquirer');
const path = require('path');
const generate = require('project-name-generator');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const initialization = async () => {
  const { willMakeNewDir } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'willMakeNewDir',
      prefix: '',
      message: 'Would you like to make a new project folder?'.green.italic,
      default: true,
    },
  ]);
  const { projectName } = await inquirer.prompt([
    {
      type: 'text',
      name: 'projectName',
      prefix: '',
      message: 'What is the name of the project?'.green.italic,
      default: willMakeNewDir ? generate().dashed : path.basename(process.cwd()),
      transformer: (answer) => `${answer}`.blue,
    },
  ]);
  const { services } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'services',
      prefix: '',
      suffix: '',
      message: 'What services do you need?'.green.italic,
      choices: [
        { name: 'Server'.blue, value: 'Server' },
        { name: 'Client'.blue, value: 'Client', checked: true },
        { name: 'Docker'.blue, value: 'Docker' },
      ],
    },
  ]);
  const { willMakeGit } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'willMakeGit',
      prefix: '',
      message: 'Would you like to make this a git repo?'.green.italic,
      default: true,
    },
  ]);
  if (willMakeNewDir) await exec(`mkdir ${projectName} && cd ${projectName}`);
  const cwd = willMakeNewDir ? `${process.cwd()}/${projectName}` : process.cwd();
  return {
    projectName,
    services,
    willMakeGit,
    cwd,
  };
};

module.exports = initialization;
