const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { copyFromGit } = require('../integrations/github');

const makeDocker = async ({ cwd }) => {
  console.log('   Copying the dockerfiles from Shopkeep...'.white);
  await copyFromGit('docker', 'node', cwd, '');
};

module.exports = makeDocker;
