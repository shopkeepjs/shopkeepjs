#! /usr/bin/env node
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const { detectSubversion } = require('./integrations/dependencyCheck');
const initialization = require('./modules/initialization');
const makeClient = require('./modules/client');
const makeServer = require('./modules/server');
const makeDocker = require('./modules/docker');
const { git } = require('./integrations/github');

const start = async () => {
  await detectSubversion();
  const responses = { ...(await initialization()) };
  if (responses.services.includes('Client')) await makeClient(responses);
  if (responses.services.includes('Server')) await makeServer(responses);
  if (responses.services.includes('Docker')) await makeDocker(responses);
  if (responses.willMakeGit) await git(responses);
};

start();
