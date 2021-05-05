#! /usr/bin/env node
/* eslint-disable no-console */

const inquirer = require('inquirer');
const { exec } = require('child_process');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const generate = require('project-name-generator');

const client = require('./modules/client');
const server = require('./modules/server');
const docker = require('./modules/docker');

let responses = {};

const start = async () => {
  responses = {
    ...(await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isNewDir',
        message: 'Would you like to make a new project folder?'.green.italic,
      },
    ])),
    ...(await inquirer.prompt([
      {
        type: 'text',
        name: 'name',
        message: 'What is the name of the project?'.green.italic,
        default: responses.isNewDir
          ? generate().dashed
          : path.basename(process.cwd()),
      },
    ])),
    ...(await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'services',
        message: 'What services do you need?'.green.italic,
        choices: [
          { name: 'Server'.blue, value: 'Server' },
          { name: 'Client'.blue, value: 'Client' },
          { name: 'Docker'.blue, value: 'Docker' },
        ],
      },
    ])),
  };
  if (responses.services.includes('Client')) responses.client = await client();
  if (responses.services.includes('Server')) responses.server = await server();
  if (responses.services.includes('Docker')) responses.docker = await docker();
};

exec('which svn', async (error, stderr, stdout) => {
  if (error || stdout || stderr === '') {
    // prettier-ignore
    console.log('It appears you do not have subversion, which is required for this package manager.'.yellow);
    await inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'override',
          message: 'If this is incorrect, you may continue by pressing yes',
          default: false,
        },
      ])
      .then(({ override }) => {
        if (override) start();
        if (!override) {
          console.error('Please install svn and try again!'.red);
          process.exit(1);
        }
      });
  } else {
    start();
  }
});
