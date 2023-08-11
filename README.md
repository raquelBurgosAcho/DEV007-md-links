# Markdown links
## Índice

* [1. Resumen del proyecto](##1-resumen-del-proyecto)
* [2. Planeación de sprints](##2-planeación-de-sprints)
* [3. Diagramas de flujo](##3-diagramas-de-flujo)
* [4. Módulos del proyecto](##4-módulos-del-proyecto)
* [5.Modo de uso ](##5-modo-de-uso)
* [6.Pruebas unitarias ](##6-pruebas-unitarias)
* [7. Checklist](##7-checklist)

## 1. Resumen del proyecto
Creación de una herramienta de línea de comando (CLI) así como una librería (o biblioteca - library) en JavaScript, que lea y analice archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas.

## 2. Planeación de sprints
*NT. No terminado durante ese sprint.*

### Sprint 1. 

 - [x] Crear diagrama de flujo API
 - [x] Crear diagrama de flujo CLI
 - [x] Existe la ruta
 - [x] Es absoluta la ruta
 - [x] Convertir ruta relativa a absoluta
 - [x] Es directorio

### Sprint 2.
#### Validaciones API.
 
 - [x] Leer directorio
 - [x] Es archivo .md
 - [x] Leer archivo .md
 - [x] Obtener links
 
 
#### Instalaciones
 - [x] Babel 
 - [x] Jest 
 - [x] Chalk

### Sprint 3.
#### Validaciones API
 - [x] Petición HTTP para status de links *(NT)* 
 - [x] Petición HTTP para status de links
 - [x] Calculo stats
 - [x] Calculo stats con status
 #### CLI
 - [x] path
 - [x] --validate
 - [x] --stats
 - [x] --validate --stats
 - [x] --help
 - [x] !path
 - [x] Colores con librería chalk

#### Instalaciones

 - [X] ESLINT

### Sprint 4.
#### Test

 - [x] Función mdLinks
#### READ ME

 - [x] README

## 3. Diagramas de flujo
Para la planeación de este proyecto se realizaron dos diagramas de flujo, Uno de los procesos que debe realizar la API y otro de lo que debe realizar el CLI.
![Diagrama de flujo API](img\Diagrama API.jpg)

## 3. Como Realizar la Instalación
Para instalar el módulo, simplemente ejecuta el siguiente comando en la terminal:

```
$ npm install raquelburgos-md-links
```

## 4. Como Utilizarlo

### CLI (Command Line Interface - Interfaz de Línea de Comando)

Para utilizar el paquete `md-links` desde la línea de comando, sigue estos pasos:

1. Abre la terminal.
2. Escribe el siguiente comando:

```bash
md-links <ruta> [opciones]
```

- `<ruta>`: la ruta del archivo que deseas evaluar.
- `[opciones]`: selecciona una de las siguientes opciones:

Opciones:
- `--validate`: realiza una petición HTTP para verificar si los enlaces funcionan o no.
- `--stats`: muestra estadísticas básicas sobre los enlaces.
- `--validate --stats`: muestra estadísticas de los enlaces y cuántos de ellos están rotos.

Asegúrate de reemplazar `<ruta>` por la ruta real de tu archivo Markdown. Esto te permitirá ejecutar el paquete `md-links` y obtener los resultados correspondientes en la terminal.

Con esta simple línea de comando --validate, el módulo realizará una verificación de los enlaces en tu archivo Markdown y te mostrará el estado de cada uno. De esta manera, podrás identificar aquellos enlaces que no funcionan correctamente y tomar las acciones necesarias para corregirlos.

Si deseas obtener estadísticas básicas sobre los enlaces en tu archivo Markdown, puedes utilizar la opción --stats. Esto te proporcionará información como la cantidad total de enlaces y la cantidad de enlaces únicos presentes en el archivo.

Si deseas obtener estadísticas más detalladas que incluyan el estado de los enlaces, puedes combinar las opciones --stats y --validate. Esto te mostrará cuántos enlaces están rotos o inválidos, brindándote una visión completa de la calidad de los enlaces en tu archivo.


## 5. Ejemplos de Uso


### CLI (Command Line Interface - Interfaz de Línea de Comando)
```bash
md-links example.md --validate
md-links example.md --stats
md-links example.md --validate --stats 
```


¡Con esta herramienta, puedes verificar de forma sencilla y eficiente los enlaces en tus archivos Markdown y obtener valiosa información sobre ellos! Ya no tendrás que preocuparte por enlaces rotos o inválidos en tus documentos Markdown, ya que podrás identificarlos rápidamente.
