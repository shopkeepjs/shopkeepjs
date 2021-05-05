#! /usr/bin/env node
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inquirer = require('inquirer');
const path = require('path');
const generate = require('project-name-generator');

const { detectSubversion, makeGitProject } = require('./helpers');
const client = require('./modules/client');
const server = require('./modules/server');
// const docker = require('./modules/docker');

const start = async () => {
  let responses = {};
  await detectSubversion();
  responses = {
    ...(await inquirer.prompt([
      {
        type: 'confirm',
        name: 'makeNewDir',
        prefix: '',
        message: 'Would you like to make a new project folder?'.green.italic,
        default: true,
      },
    ])),
  };
  responses = {
    ...responses,
    ...(await inquirer.prompt([
      {
        type: 'text',
        name: 'projectName',
        prefix: '',
        message: 'What is the name of the project?'.green.italic,
        default: responses.makeNewDir ? generate().dashed : path.basename(process.cwd()),
        transformer: (answer) => `${answer}`.blue,
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
          { name: 'Client'.blue, value: 'Client', checked: true },
          { name: 'Docker'.blue, value: 'Docker' },
        ],
      },
    ])),
  };
  if (responses.makeNewDir) await exec(`mkdir ${responses.projectName}`);
  if (responses.services.includes('Client')) await client(responses.projectName, responses.makeNewDir);
  // if (responses.services.includes('Server')) await server(responses.projectName, responses.makeNewDir);
  // if (responses.services.includes('Docker')) await docker();
  responses = {
    ...responses,
    ...(await inquirer.prompt([
      {
        type: 'confirm',
        name: 'makeGitProject',
        prefix: '',
        message: 'Would you like to make this a git repo?'.green.italic,
        default: true,
      },
    ])),
  };
  if (responses.makeGitProject) makeGitProject(responses.projectName, responses.makeNewDir, true);
};

start();
