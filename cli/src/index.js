#! /usr/bin/env node
/* eslint-disable no-console */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('inquirer');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const generate = require('project-name-generator');

const { detectSubversion } = require('./helpers');
const client = require('./modules/client');
const server = require('./modules/server');
const docker = require('./modules/docker');
// const { exec } = require('child_process');

let responses = {};

const start = async () => {
  await detectSubversion();
  responses = {
    ...(await inquirer.prompt([
      {
        type: 'confirm',
        name: 'makeNewDir',
        prefix: '',
        message: 'Would you like to make a new project folder?'.green.italic,
      },
    ])),
  };
  responses = { ...responses,
    ...(await inquirer.prompt([
      {
        type: 'text',
        name: 'projectName',
        prefix: '',
        message: 'What is the name of the project?'.green.italic,
        default: responses.makeNewDir ? generate().dashed : path.basename(process.cwd()),
      },
    ])),
    ...(await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'services',
        prefix: '',
        suffix: '',
        message: 'What services do you need?'.green.italic,
        choices: [
          { name: 'Server'.blue, value: 'Server' },
          { name: 'Client'.blue, value: 'Client' },
          { name: 'Docker'.blue, value: 'Docker' },
        ],
      },
    ])),
  };
  if (responses.makeNewDir) await exec(`mkdir ${responses.projectName}`, { cwd: `${responses.projectName}` });
  if (responses.services.includes('Client')) await client(responses.projectName);
  // if (responses.services.includes('Server')) await server();
  // if (responses.services.includes('Docker')) await docker();
};

start();
