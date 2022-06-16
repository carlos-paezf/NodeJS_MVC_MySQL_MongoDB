# MySQL Sequelize en Node

Vamos a instalar el ORM Sequelize para hacer uso de MySQL, y para instalar dicho paquete usamos el siguiente comando:

```txt
pnpm i sequelize -S
```

Lo primero será declarar las variables de entorno para la conexión con la base de datos:

```.env
...
MYSQL_DATABASE = 'db_node'
MYSQL_USER = 'user_node'
MYSQL_PASSWORD = 'root'
MYSQL_HOST = 'localhost'
```

Para la base de datos haré uso de un archivo `docker-compose.yml` para traer una imagen de mysql y crear un contenedor con la base de datos de la misma. El archivo tendrá la siguiente configuración (Para ver un proyecto de ejemplo de NodeJS con Docker, puedes ir a [NodeJS_TS_MySQL_TypeORM_Docker](https://github.com/carlos-paezf/NodeJS_TS_MySQL_TypeORM_Docker)):

```yml
version: "3.1"

services:
    db_node:
        image: mysql:5.7
        volumes:
            - './mysql/init.sql:/docker-entrypoint-initdb.d/init.sql'
        command: --init-file=/docker-entrypoint-initdb.d/init.sql
        ports:
            - '3306:3306'
        environment:
            MYSQL_DATABASE: db_node
            MYSQL_ROOT_USER: user_node
            MYSQL_USER: user_node
            MYSQL_ROOT_PASSWORD: "root"
            MYSQL_PASSWORD: "root"
```

Como vemos, para el volumen requerimos tener un archivo llamado `mysql/init.sql`, el cual solo tendrá una línea:

```sql
CREATE DATABASE IF NOT EXISTS `db_node`;
```

Para levantar nuestro contenedor en segundo plano debemos tener Docker y docker-compose instalado, con el fin de correr el siguiente comando:

```txt
docker-compose up -d
```

Para detener el contenedor usamos el siguiente comando:

```txt
docker stop nodejs_mvc_mysql_mongodb_db_node_1
```

Vamos a configurar la conexión con la base de datos de MySQL en el archivo `config/mysql.js`:

```js
const { Sequelize } = require('sequelize')


const database = process.env.MYSQL_DATABASE
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql'
})

const dbConnectMySQL = async () => {
    try {
        await sequelize.authenticate()
        console.log('> MySQL conexión correcta')
    } catch (error) {
        console.log(`> MySQL error de conexión: ${error}`)
    }
}

module.exports = { sequelize, dbConnectMySQL }
```

Dentro de las variables de entorno, añadimos el motor de base de datos que vamos a usar, por defecto será nosql:

```.env
...
ENGINE_DB = 'nosql'
```

Dentro de `app.js` creamos una variable que se encargue de definir a que motor nos vamos a conectar, y luego hacemos un condicional para usar la conexión:

```js
const { dbConnectNoSQL } = require('./config/mongo')
const { dbConnectMySQL } = require('./config/mysql')
...
const ENGINE_DB = process.env.ENGINE_DB
...
(ENGINE_DB === 'nosql') ? dbConnectNoSQL() : dbConnectMySQL()

```

Si al momento de lanzar la aplicación nos pide instalar mysql2 manualmente, usaremos el siguiente comando:

```txt
pnpm i mysql2 -S
```

___
| Anterior                |                        | Siguiente                                                  |
| ----------------------- | ---------------------- | ---------------------------------------------------------- |
| [Trazabilidad de Errores de Backend con Slack](20_Trazabilidad_errores_Slack.md) | [Readme](../README.md) | [Creando modelos Sequelize](22_Creando_Modelos_Sequelize.md) |
