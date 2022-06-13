# Backend con NodeJS, MVC (Modelo, Vista, Controlador), MongoDB, MySQL

[![wakatime](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/8b1a2cc0-ddf3-4452-beac-5384c501e014.svg?style=for-the-badge)](https://wakatime.com/badge/user/8ef73281-6d0a-4758-af11-fd880ca3009c/project/8b1a2cc0-ddf3-4452-beac-5384c501e014)

## ¿Que es Node.js?

Es un entorno que permite ejecutar JavaScript en el servidor de manera asíncrona, con una arquitectura orientada a eventos, basado en el motor V8 de Google.

## Entorno de trabajo

- Instalador de Node.js: [Node.js](https://nodejs.org/es/)
  > Verificar versión de Node.js: Ejecutamos el comando `node -v`. También podemos ver la versión de *npm* (Node Package Manager) con el comando `npm -v`
- Herramienta (Editor de código): [Visual Studio Code](https://code.visualstudio.com/) o [VS Code Insiders](https://code.visualstudio.com/insiders/)
- Terminal: [Git Bash](https://git-scm.com/downloads)

### Entorno Mongo

- *Cuenta en [Mongo Atlas](https://www.mongodb.com/atlas/database)*. Dentro del Dashboard de Mongo Atlas, creamos una nueva *Organización* para nuestro proyecto que se llame `NodeJS_MongoDB_06_2022`, y añadimos los colaborares de nuestro proyecto, y una vez lista la organización, creamos un nuevo proyecto que llamaremos `API_REST`. Creamos una base de datos/cluster de tipo *Shared* (para la versión gratuita), y para el momento llevará el nombre de `Cluster0`. Como configuración inicial del cluster, añadimos la manera en que queremos autenticarnos y las direcciones IP desde las que se pueden conectar a nuestra base de datos.
- *DB_URI*: Para conectarnos a nuestra base de datos, elegimos la opción de conectarnos de desde una aplicación, y se nos muestra un URI que debemos guardar en nuestro proyecto. Este es su estilo:
  
  ```txt
  mongodb+srv://<user></user>:<password>@cluster0.7ndzkvx.mongodb.net/<db_name>?retryWrites=true&w=majority
  ```

## Iniciando Proyecto

Dentro del directorio de nuestro proyecto ingresamos el siguiente comando para iniciar el proyecto de node.js:

```txt
npm init -y
```

Instalamos Express en nuestro proyecto con el comando:

```txt
npm i express --save
```

Hay otros paquetes que necesitamos inicialmente, por lo que usamos el siguiente comando (`-S` guarda las dependencias de la misma manera que `--save`):

```txt
npm i cors dotenv multer -S
```

- `cors`: Cross Origin Resources Sharing, nos permite restringir los recursos de nuestra aplicación, que pueden ser requeridas por otro dominio.
- `dotenv`: Manejo de variables de entorno
- `multer`: Ayuda el manejo de carga de archivos y almacenamiento

Creamos un archivo llamado `.gitignore` para ignorar los archivos que no necesitamos en nuestro repositorio. Por ejemplo el directorio `node_modules` y el archivo con las variables de entorno `.env` (ya sean de desarrollo o producción), no se deben publicar.

```.gitignore
node_modules/

.env
```

## Documentación

- [Primer encuentro con Express](DOC/01_Primer_Encuentro_Express.md)
- [Scaffolding: Estructura de nuestro proyecto](DOC/02_Scaffold.md)
- [Mongoose y MongoDB](DOC/03_Mongoose_MongoDB.md)
- [Rutas en Node Express](DOC/04_Rutas.md)
- [Creando alías Script](DOC/05_Scripts.md)
- [Contralores](DOC/06_Contralores.md)
- [Cargando Modelos](DOC/07_Cargando_Modelos.md)
- [Archivos - Multer](DOC/08_Archivo_Multer.md)
- [POSTMAN API Node](DOC/09_POSTMAN_API_Node.md)
- [Como validar datos en un API REST](DOC/10_Validar_Datos_API_REST.md)
- [Como subir un mp3](DOC/11_Como_Subir_mp3.md)
