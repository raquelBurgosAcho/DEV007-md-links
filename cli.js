#!/usr/bin/env node
import chalk from 'chalk';
import process from 'node:process';
// eslint-disable-next-line import/extensions
import { mdLinks } from './mdlinks.js';

const path = process.argv[2];
const option1 = process.argv[3];
const option2 = process.argv[4];
if (path) {
  console.log(chalk.bgHex('#85C1E9').bold('Procesando...'));
  if (option1 === undefined && option2 === undefined) {
    mdLinks(path, { validate: false, stats: false }).then((result) => result);
  } else if (option1 === '--validate' && option2 === undefined) {
    mdLinks(path, { validate: true, stats: false }).then((result) => result);
  } else if (option1 === '--stats' && option2 === undefined) {
    mdLinks(path, { validate: false, stats: true }).then((result) => result);
  } else if (option1 === '--validate' && option2 === '--stats') {
    mdLinks(path, { validate: true, stats: true }).then((result) => result);
  } else {
    console.log(
      chalk.bgRed.bold(
        'Error: Asegurate de ingresar una ruta y alguna de estas opciones:--validate, --stats',
      ),
    );
  }
}

/* console.log(process.argv);
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
};

mdLinks(process.argv[2], options)
  .then((results) => {
    console.log(results);
})
.catch((error) => {
    console.log(error);
}); */

//
