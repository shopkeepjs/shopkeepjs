const util = require('util');
const exec = util.promisify(require('child_process').exec);
const ora = require('ora');
const { copyFromGit } = require('../integrations/github');

const makeDocker = async ({ serverFolderName, projectName, cwd }) => {
  const copying = ora({ indent: 4, text: 'Copying the dockerfiles from Shopkeep...'.white }).start();
  await copyFromGit('docker', 'node', cwd);
  await exec(`mv ./docker/* ${cwd} && rm -R docker`, { cwd });
  copying.stopAndPersist({
    symbol: '✔',
    text: 'Copied the dockerfiles from Shopkeep.'.white,
  });
  await exec(`sed -i 's/{PROJECT_NAME}/${projectName}/g' docker-compose.yml`, { cwd });
  await exec(`sed -i 's/{SERVER_FOLDER}/${serverFolderName}/g' docker-compose.yml`, { cwd });
  await exec(`sed -i 's/{SERVER_FOLDER}/${serverFolderName}/g' Dockerfile`, { cwd });
};

module.exports = makeDocker;
