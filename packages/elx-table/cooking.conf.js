const cooking = require('cooking');
const gen = require('../../build/gen-single-config');

cooking.set(gen(__dirname, 'ElTable', '_index.js'));

module.exports = cooking.resolve();
