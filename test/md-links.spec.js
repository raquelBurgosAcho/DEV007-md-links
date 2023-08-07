import { existingPath } from '../index';




describe('existingPath',() =>{
it('deberia retornar true si el archivo existe',() =>{
expect(existingPath('C:\Users\DELL\Desktop\mdlink\DEV007-md-links\prueba1\archivo.md'))
.toBe(true)
})

})
/*describe('mdLinks', () => {
  it('Cuando se ingresa un archivo sin --validate ni --stats', () => {
    const path = 'ejemplo.md';
    const options = {};
    return mdLinks(path, options).then((result) => {
      expect(result).toEqual([
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C:\\Users\\DELL\\Desktop\\mdlink\\DEV007-md-links\\prueba1\\archivo.md',
        },
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: 'C:\\Users\\DELL\\Desktop\\mdlink\\DEV007-md-links\\prueba1\\archivo.md',
        },
        {
          href: 'https://developers.google.com/v8/',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'C:\\Users\\DELL\\Desktop\\mdlink\\DEV007-md-links\\prueba1\\archivo.md',
        },
      ]);
    });
  });
});*/
