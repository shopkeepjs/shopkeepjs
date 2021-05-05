/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('inquirer');

const copyFromGit = (service, folder, projectName) => {
  exec(`svn export https://github.com/shopkeepjs/shopkeepjs/trunk/store/${service}/${folder} client`);
};

const detectSubversion = async () => {
  try {
    await exec('which svn');
    return true;
  } catch (error) {
    console.error('It appears that Subversion is not installed - this package manager will not work without it.'.yellow);
    const { override } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'override',
        message: 'Would you like to override and run anyway?'.green.italic,
        default: false,
        prefix: '',
      },
    ]);
    if (override) return true;
    console.error('Please install Subversion and try again!'.red);
    process.exit(1);
  }
};

module.exports = { copyFromGit, detectSubversion };
