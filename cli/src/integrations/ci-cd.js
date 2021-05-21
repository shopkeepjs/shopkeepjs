const inquirer = require('inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const ci = async () => {};
const cd = async () => {};

module.exports = { ci, cd };
