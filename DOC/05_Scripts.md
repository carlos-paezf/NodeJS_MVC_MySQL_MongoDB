# Creando alías Script: "start" y "dev"

## Nodemon

Vamos a instalar el paquete `nodemon` para evitar tener que bajar y subir el proyecto ante cualquier cambio (solo lo vamos a usar al momento del desarrollo, por ello la bandera `-D`). Para su instalación usamos el comando:

```txt
npm i nodemon -D
```

## Scripts

Vamos al archivo `package.json` y en la sección de scripts añadimos los siguiente elementos:

```json
{
    ...,
    "scripts": {
        ...,
        "start": "node app",
        "start:dev": "nodemon app"
    },
    ...
}
```

Con ello, si usamos el comando `npm start`, estaremos ejecutando con Node, mientas que si empleamos el comando `npm run start:dev`, entraremos en modo desarrollo con Nodemon.

| Anterior                             |                        | Siguiente                        |
| ------------------------------------ | ---------------------- | -------------------------------- |
| [Rutas en Node Express](04_Rutas.md) | [Readme](../README.md) | [Contralores](06_Contralores.md) |
