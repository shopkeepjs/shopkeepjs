const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function detectSubversion() {
  try {
    await exec('which svn');
    return true;
  } catch (error) {
    console.error(
      'It appears that Subversion is not installed - this package manager will not work without it.'.yellow,
    );
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
  return false;
}

module.exports = { detectSubversion };
