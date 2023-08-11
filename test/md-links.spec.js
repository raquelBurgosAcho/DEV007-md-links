import { mdLinks } from "../mdlinks.js";

  describe("mdLinks", () => {
  
  it("Cuando se ingresa un archivo sin --validate ni --stats", () => {
    const path = "ejemplo.md";
    const options = {};
    return mdLinks(path, options).then((result) => {
      expect(result).toEqual([
        {
          href: "https://es.wikipedia.org/wiki/Markdown",
          text: "Markdown",
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\ejemplo.md",
        },
        {
          href: "https://nodejs.org/",
          text: "Node.js",
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\ejemplo.md",
        },
        {
          href: "https://developers.google.com/v8/",
          text: "motor de JavaScript V8 de Chrome",
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\ejemplo.md",
        },
      ]);
    });
  });

  it("Cuando se ingresa la ruta de un directorio sin --validate ni --stats", () => {
    const path = "./Pruebas/Pruebasv02";
    const options = {};

    return mdLinks(path, options).then((result) => {
      const expected = [
        {
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\Pruebas\\Pruebasv02\\DosLinksSubDir.md",
          href: "http://pokemongolive.com",
          text: "Pokémon GO",
        },
        {
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\Pruebas\\Pruebasv02\\DosLinksSubDir.md",
          href: "https://es.wikipedia.org/wiki/Markdown",
          text: "Markdown",
        },
        {
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\Pruebas\\Pruebasv02\\BrokenLinksSubDir.md",
          href: "http://httpstat.us/403",
          text: "Forbidden Link",
        },
        {
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\Pruebas\\Pruebasv02\\BrokenLinksSubDir.md",
          href: "https://neoattackddd.com/",
          text: "Enlace roto",
        },
      ];

      expect(result).toEqual(expect.arrayContaining(expected));
    });
  });

  it("Cuando se ingresa la ruta de un directorio con --validate", () => {
    const path = "./PruebasMini";
    const options = { validate: true, stats: false };
    return mdLinks(path, options).then((result) => {
      expect(result).toEqual([
        {
          href: "https://www.laboratoria.la/",
          text: "Laboratoria",
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\PruebasMini\\DirectorioMini.md",
          ok: "Ok",
          status: 200,
        },
        {
          href: "http://www.wikipedia.org",
          text: "Wikipedia",
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\PruebasMini\\DirectorioMini.md",
          status: 200,
          ok: "Ok",
        },
        {
          href: "http://www.wikipedia.org",
          text: "Wikipedia",
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\PruebasMini\\DirectorioMini.md",
          status: 200,
          ok: "Ok",
        },
        {
          href: "http://httpstat.us/403",
          text: "Forbidden Link",
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\PruebasMini\\DirectorioMini.md",
          status: 403,
          ok: "Fail",
        },
        {
          href: "https://neoattackddd.com/",
          text: "Enlace roto",
          file: "C:\\Users\\Tania G Jimènez\\Documents\\Laboratoria\\Proyecto04\\DEV004-md-links\\PruebasMini\\DirectorioMini.md",
          status: 404,
          ok: "Fail",
        },
      ]);
    });
  });

  it("Cuando se ingresa la ruta de un directorio con --stats", () => {
    const path = "./PruebasMini";
    const options = { stats: true, validate: false };
    return mdLinks(path, options).then((result) => {
      expect(result).toEqual({
        Total: 5,
        Unique: 4,
      });
    });
  });

  it("Cuando se ingresa la ruta de un directorio con --validate y --stats", () => {
    const path = "./PruebasMini";
    const options = { validate: true, stats: true };
    return mdLinks(path, options).then((result) => {
      expect(result).toEqual({
        Total: 5,
        Unique: 4,
        Broken: 2,
      });
    });
  });

  it('Cuando se ingresa una ruta que no existe', () => {
    const path = './rutafalsa123';
    const options = {};
  
    return new Promise((resolve) => {
      mdLinks(path, options)
        .then(() => {
          throw new Error('La promesa debería haber sido rechazada');
        })
        .catch((error) => {
          expect(error.message).toBe("La ruta no existe");
          resolve();
        });
    });
  });

});