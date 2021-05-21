#! /usr/bin/env node
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const { detectSubversion } = require('./integrations/dependencyCheck');
const initialization = require('./modules/initialization');
// const git = require('./integrations/github');
const makeClient = require('./modules/client');
const makeServer = require('./modules/server');
const makeDocker = require('./modules/docker');

const start = async () => {
  let responses = {};
  await detectSubversion();
  responses = { ...responses, ...(await initialization()) };
  if (responses.services.includes('Client')) await makeClient(responses);
  if (responses.services.includes('Server')) await makeServer(responses);
  if (responses.services.includes('Docker')) await makeDocker(responses);
  // if (responses.willMakeGit) responses = { ...responses, ...(await git(responses)) };
  console.log(responses);
};

start();
