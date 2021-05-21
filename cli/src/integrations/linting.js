const inquirer = require('inquirer');
const { copyFromGit } = require('./github');

const linting = async (service, packageJSON, cwd) => {
  const { willIncludeLinter } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'willIncludeLinter',
      prefix: '',
      message: `Would you like to add linting for the ${service}`.green.italic,
      default: true,
    },
  ]);
  if (willIncludeLinter) {
    // eslint-disable-next-line no-unused-vars
    const { lintingConfigs } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'lintingConfigs',
        prefix: '',
        suffix: '',
        message: 'Which linting standard would you like to use?'.green.italic,
        choices: [{ name: 'AirBnb'.blue, value: 'airbnb', checked: true }],
      },
    ]);
    const lintingDependencies = {
      eslint: 'latest',
      'eslint-config-airbnb-base': 'latest',
      'eslint-plugin-import': 'latest',
    };
    copyFromGit('configs', '', cwd);
    return {
      ...packageJSON,
      scripts: { ...packageJSON.scripts, lint: 'eslint src/' },
      devDependencies: { ...packageJSON.devDependencies, ...lintingDependencies },
    };
  }
};

module.exports = linting;
