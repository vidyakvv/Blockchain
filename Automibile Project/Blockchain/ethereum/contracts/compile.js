/*const path = require('path');
const fs = require('fs-extra');
const solc= require('solc');
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const carPath = path.resolve(__dirname,'contracts','Car.sol');
const source = fs.readFileSync(carPath, 'utf8');
const output = solc.compile(source,1).contracts;

fs.ensureDirSync(buildPath);

for(let contract in output){
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':','') + '.json' ),
    output[contract]
  );
}*/

const path = require('path');
const fs = require('fs');
const solc= require('solc');

const carPath = path.resolve(__dirname,'contracts','Car.sol');
const source = fs.readFileSync(carPath, 'utf8');

const {interface, bytecode} = solc.compile(source, 1).contracts[':Car'];
console.log(interface);
//module.exports = solc.compile(source, 1).contracts[':Election'];
