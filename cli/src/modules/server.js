const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { copyFromGit } = require('../integrations/github');

const makeServer = async ({ cwd }) => {
  const { tooling } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tooling',
      message: 'Which tooling are you using?',
      choices: [{ name: 'Basic Node' }, { name: 'Express' }, { name: 'Apollo' }],
    },
  ]);
  console.log('   Copying the server from Shopkeep...'.white);
  await copyFromGit('server', tooling, cwd, 'server');
  console.log('   Installing your npm packages...'.white);
  await exec('npm i', { cwd });
};

module.exports = makeServer;
