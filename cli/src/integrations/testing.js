const inquirer = require('inquirer');

const testing = async (service, packageJSON) => {
  const { willIncludeTesting } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'willIncludeTesting',
      prefix: '',
      message: `Would you like to add testing for the ${service}`.green.italic,
      default: true,
    },
  ]);
  if (willIncludeTesting) {
    const { testingModules } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'testingModules',
        prefix: '',
        suffix: '',
        message: 'What services do you need?'.green.italic,
        choices: [
          { name: 'Jest'.blue, value: 'jest', checked: true },
          { name: 'Supertest'.blue, value: 'supertest' },
        ],
      },
    ]);
    const testingDependencies = {
      ...(testingModules.includes('supertest') && { supertest: 'latest' }),
      ...(testingModules.includes('jest') && { jest: 'latest' }),
    };
    return {
      ...packageJSON,
      scripts: { ...packageJSON.scripts, test: 'jest' },
      jest: { setupFilesAfterEnv: ['./test/setup.js'] },
      devDependencies: { ...packageJSON.devDependencies, ...testingDependencies },
    };
  }
};

module.exports = testing;
