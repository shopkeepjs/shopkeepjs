const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora');
const { copyFromGit } = require('../integrations/github');

const makeDocker = async ({ cwd }) => {
  const copying = ora({ indent: 4, text: 'Copying the dockerfiles from Shopkeep...'.white }).start();
  await copyFromGit('docker', 'node', cwd);
  await exec(`mv ./docker/* ${cwd} && rm -R docker`, { cwd });
  copying.stopAndPersist({
    symbol: '✔',
    text: 'Copied the dockerfiles from Shopkeep.'.white,
  });
};

module.exports = makeDocker;
