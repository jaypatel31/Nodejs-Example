// Modules - encapsulate code (only share minimum)

// Custom Modules
const {jay,john} = require('./4-names');
const sayHi = require('./5-utils');
const data = require('./6-alternative-flavour');
require('./7-mind-grenade')

//NPM module
const color = require('cli-color');

//Core modules
const path = require('path');
const http = require('http');

console.log("Dir name : " + path.basename(__filename));
console.log("File Name : " + path.dirname(__filename));

console.log(color.red('Hello World'))


sayHi('Patel');
sayHi(jay);
sayHi(john);