#!/usr/bin/env node
/**
 * List prompt example
 */


'use strict';
let inquirer = require('inquirer');
let _ = require('lodash');
let fuzzy = require('fuzzy');
//let autoCompleteCommands = require('./.autocomplete.json').commands
const { exec } = require('child_process');
let fs = require('fs')
let firstTime = true;
inquirer.registerPrompt('autocomplete', require('../index'));

let autoCompleteCommands = [];
let autocompleteCommandsMap = {}
function readCommands() {
  fs.readFile('.autocomplete.json', (err, data) => {
    if (err) {
      console.log("If you want to activate autocomplete feature, you must put .autocomplete.json in your project root")
      throw err;
    }
    autoCompleteCommands = JSON.parse(data).commands;
    let id = 0;
    autoCompleteCommands.forEach(function (command) {
      //console.log(command)
      let hash = generateHashCode(command)
      console.log(hash)
      let prop = {
        name: command,
        description: "Sample desc",
        priority: 1
      }
      autocompleteCommandsMap[hash] = prop;
      //autocompleteCommandsMap["command"]["priority"] = 1;
    });
    console.log(autocompleteCommandsMap)
  });
}
function generateHashCode(command) {
  let hash = 0, i, chr;
  if (command.length === 0) return hash;
  for (i = 0; i < command.length; i++) {
    chr = command.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function searchCommands(answers, input) {
  input = input || '';

  return new Promise(function (resolve) {
    setTimeout(function () {
      let fuzzyResult = fuzzy.filter(input, autoCompleteCommands);
      resolve(
        fuzzyResult.map(function (el) {
          return el.original;
        })
      );
    }, _.random(30, 500));
  });
}

function startAutocomplete() {
  if (firstTime) {
    readCommands();
    firstTime = false;
  }
  inquirer
    .prompt([
      {
        type: 'autocomplete',
        name: 'command',
        message: 'Which command do you want to run?',
        source: searchCommands,
      }
    ])
    .then(function (answer) {
      console.log(JSON.stringify(answer, null, 2));
      //console.log(answer["command"])
      exec(answer["command"], (err, stdout, stderr) => {
        if (err)
          console.log(err);
        //console.log("fired!!")
        let cmd = answer["command"]
        let hash = generateHashCode(cmd)
        autocompleteCommandsMap[hash]["priority"] = autocompleteCommandsMap[hash]["priority"] + 1;
        console.log(autocompleteCommandsMap[hash]["priority"])
        

        console.log(stdout)
        startAutocomplete();
      })
    });

}
startAutocomplete();

