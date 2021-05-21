const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

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
    let devDependencies = testingModules.includes('supertest') && { supertest: 'latest' };
    devDependencies = testingModules.includes('jest') && { ...devDependencies, jest: 'latest' };
    return {
      ...packageJSON,
      scripts: { ...packageJSON.scripts, test: 'jest' },
      jest: { setupFilesAfterEnv: ['./test/setup.js'] },
      devDependencies: { ...packageJSON.devDependencies, ...devDependencies },
    };
  }
};

// {
//     name: 'server',
//     version: '1.0.0',
//     description: '',
//     main: 'index.js',
//     scripts: { start: 'node index.js', test: 'jest' },
//     jest: { setupFilesAfterEnv: [ './test/setup.js' ] },
//     keywords: [],
//     author: '',
//     license: 'GNU GPLv3',
//     dependencies: {
//       cors: '^2.8.5',
//       dotenv: '^9.0.0',
//       express: '^4.17.1',
//       helmet: '^4.6.0',
//       morgan: '^1.10.0'
//     },
//     devDependencies: { supertest: '^6.1.3', jest: '^26.6.3' }
//   }

module.exports = testing;
