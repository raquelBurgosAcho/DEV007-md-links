/* eslint-disable no-shadow */
/* eslint-disable no-undef */
import chalk from 'chalk';
import {
  absPath,
  existingPath,
  transformPath,
  isThisADirectory,
  isThisAMDFile,
  extractMDFilesFromDirectory,
  gatherAllLinks,
  getStatsResult,
  getHttpResponse,
  getResultValidateStats,
// eslint-disable-next-line import/extensions
} from './index.js';

// eslint-disable-next-line import/prefer-default-export
export const mdLinks = (path, options) => new Promise((resolve) => {
  console.log('entrando a mdlinks', existingPath(path));
  if (existingPath(path)) {
    console.log('Ruta válida:', path);
    const resolvedPath = absPath(path) ? path : transformPath(path);

    let mdFilesArray = [];
    if (isThisADirectory(resolvedPath)) {
      mdFilesArray = extractMDFilesFromDirectory(resolvedPath);
      if (mdFilesArray.length === 0) {
        console.log('No se encontraron archivos .md en el directorio.');
      }
    } else if (isThisAMDFile(resolvedPath)) {
      mdFilesArray.push(resolvedPath);
      console.log('Es un archivo .md');
    } else {
      console.log('No es un archivo .md');
    }

    if (options.validate === true && options.stats === true) {
      gatherAllLinks(mdFilesArray).then((result) => {
        getHttpResponse(result).then((result) => {
          const resultValidateAndStats = getResultValidateStats(result);
          console.log(chalk.bgGreen.bold('Ingresando --validate y --stats'));
          console.log('-------------------------------');
          console.log(
            chalk.bgHex('#808080').bold(' Total: '),
            chalk.yellow(resultValidateAndStats.Total),
          );
          console.log(
            chalk.bgHex('#808080').bold(' Unique: '),
            chalk.yellow(resultValidateAndStats.Unique),
          );
          console.log(
            chalk.bgHex('#808080').bold(' Broken: '),
            chalk.yellow(resultValidateAndStats.Broken),
          );
          resolve(resultValidateAndStats);
        });
      });
    } else if (options.validate === true && options.stats === false) {
      gatherAllLinks(mdFilesArray).then((result) => {
        getHttpResponse(result)
          .then((validateLink) => {
            console.log(chalk.bgGreen.bold('Ingresando --validate'));
            console.log('----------------------');
            validateLink.forEach((link) => {
              console.log(
                chalk.bgMagenta.bold(' text '),
                chalk.magenta(link.text),
              );
              console.log(
                chalk.bgGreen.bold(' href '),
                chalk.green(chalk.underline(link.href)),
              );
              console.log(chalk.bgBlue.bold(' file '), chalk.blue(link.file));
              console.log(
                chalk.bgYellow.bold(' status '),
                chalk.yellow(link.status),
              );
              if (link.ok === 'Ok') {
                console.log(
                  chalk.bgHex('#808080').bold(' ok '),
                  chalk.greenBright(link.ok),
                );
              } else {
                console.log(
                  chalk.bgHex('#808080').bold(' ok '),
                  chalk.redBright(link.ok),
                );
              }
              console.log();
            });
            resolve(validateLink);
          })
          .catch((error) => {
            console.error(chalk.red('Error:', error));
            reject(error);
          });
      });
    } else if (options.stats === true && options.validate === false) {
      gatherAllLinks(mdFilesArray).then((result) => {
        const valueStats = getStatsResult(result);
        console.log(chalk.bgGreen.bold('Ingresando --stats'));
        console.log('------------------');
        console.log(
          chalk.bgHex('#808080').bold(' Total: '),
          chalk.yellow(valueStats.Total),
        );
        console.log(
          chalk.bgHex('#808080').bold(' Unique: '),
          chalk.yellow(valueStats.Unique),
        );
        resolve(valueStats);
      });
    } else {
      gatherAllLinks(mdFilesArray).then((result) => {
        const noOptions = result;
        console.log(chalk.bgGreen.bold('Sin --validate, sin --stats'));
        console.log('-----------------------------');
        noOptions.forEach((link) => {
          console.log(
            chalk.bgHex('#808080').bold(' text '),
            chalk.hex('#C0C0C0')(link.text),
          );
          console.log(
            chalk.bgHex('#808080').bold(' href '),
            chalk.hex('#FFFFFF')(chalk.underline(link.href)),
          );
          console.log(
            chalk.bgHex('#808080').bold(' file '),
            chalk.hex('#AAAAAA')(link.file),
          );
          console.log();
        });
        resolve(noOptions);
      });
    }
  } else {
    console.log(chalk.bgRed.bold('La ruta no existe'));
    // reject(new Error("La ruta no existe"));
  }
});
