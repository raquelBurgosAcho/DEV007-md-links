/* eslint-disable no-unused-vars */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-plusplus */
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// fs.existsSync(path);todo se usa paraisThisADirectory verificar
// sincrónicamente si un archivo ya existe en la ruta dada o no.
// Devuelve un valor booleano que indica la presencia de un archivo.
// eslint-disable-next-line no-shadow
export const existingPath = (path) => fs.existsSync(path);

// El método path.isAbsolute ( ) devuelve cierto si la
// ruta especificada es un camino absoluto, de lo contrario falso.
export const absPath = (pathUsed) => path.isAbsolute(pathUsed);

// los método path.resolve ( ) se usa para resolver
// una secuencia de segmentos de ruta a una ruta absoluta.
export const transformPath = (converted) => path.resolve(converted);
// la ruta es un directorio
// fs.statSync() para obtener información sobre la
// ruta y luego llama al método isDirectory()

export const isThisADirectory = (path) => fs.statSync(path).isDirectory();

// ? Es un archivo .md
export const isThisAMDFile = (pathUsed) => path.extname(pathUsed) === '.md';

const listDirectoryFiles = (directoryPath) => {
  const files = [];

  const readDirectory = (dirPath) => {
    const items = fs.readdirSync(dirPath);

    items.forEach((item) => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        readDirectory(itemPath);
      } else {
        files.push(itemPath);
      }
    });
  };

  readDirectory(directoryPath);

  return files;
};

// hace un solo array de archivos
export const extractMDFilesFromDirectory = (directoryPath) => {
  const files = listDirectoryFiles(directoryPath);
  return files.filter(isThisAMDFile);
};
//  Función que solo busca coincidencias con regex
const findMatches = (content, filePath) => {
  const regex = /\[(.*?)\]\((https?:\/\/[^\s]+)\)/g;

  const matches = content.matchAll(regex);

  const links = [...matches].map((match) => {
    const href = match[2];
    const text = match[1];
    return {
      href,
      text,
      file: filePath,
    };
  });

  return links;
};
// Esta función lee un archivo .md y usa findMatches para extraer los links
// ? ! Esta función lee un archivo .md y usa findMatches para extraer los links
const readAndFindLinks = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`Error al leer el archivo: ${err}`);
      return;
    }

    const links = findMatches(content, filePath);
    resolve(links);
  });
});
export const gatherAllLinks = (mdFilesArray) => {
  const results = [];

  return new Promise((resolve, reject) => {
    let completedCount = 0;

    mdFilesArray.forEach((filePath) => {
      readAndFindLinks(filePath)
        .then((links) => {
          results.push(...links);

          completedCount++;
          if (completedCount === mdFilesArray.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(`Error ${filePath}`);
        });
    });
  });
};

//! A partir de aqui comienza comienzan funciones --validate, -stats, --validate y --stats
// ? Hace la petición HTTP con Axios
export const getHttpResponse = (linksFromArray) => {
  const validate = linksFromArray.map((link) => axios
    .get(link.href)
    .then((result) => {
      const responseValidate = {
        text: link.text,
        href: link.href,
        file: link.file,
        status: result.status,
        ok: 'Ok',
      };
      return responseValidate;
    })
    .catch((err) => {
      let status;
      if (err.code === 'ENOTFOUND') {
        status = 404;
      } else if (err.response && err.response.status) {
        status = err.response.status;
      } else {
        status = 500;
      }
      const responseValidate = {
        text: link.text,
        href: link.href,
        file: link.file,
        status,
        ok: 'Fail',
      };
      return responseValidate;
    }));

  return Promise.all(validate);
};

// ?Valida los links con --stats Total:# Unique:#
export const getStatsResult = (linksFromArray) => {
  const arrayLink = linksFromArray.map((element) => element.href);
  const uniqueLinkCount = {};

  arrayLink.forEach((link) => {
    if (!uniqueLinkCount[link]) {
      uniqueLinkCount[link] = true;
    }
  });

  return {
    Total: arrayLink.length,
    Unique: Object.keys(uniqueLinkCount).length,
  };
};

// //?Valida los links con --validate --stats Total:# Unique:# Broken:#
export const getResultValidateStats = (arrayObject) => {
  const arrayLink = arrayObject.map((link) => link.href);
  const uniqueLinkCount = {};
  const brokenLinkCount = arrayObject.reduce((count, link) => {
    if (link.ok === 'Fail') {
      count++;
    }
    return count;
  }, 0);

  arrayLink.forEach((link) => {
    if (!uniqueLinkCount[link]) {
      uniqueLinkCount[link] = true;
    }
  });

  return {
    Total: arrayLink.length,
    Unique: Object.keys(uniqueLinkCount).length,
    Broken: brokenLinkCount,
  };
};
