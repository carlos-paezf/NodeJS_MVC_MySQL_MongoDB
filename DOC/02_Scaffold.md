# Scaffolding: Estructura de carpetas

Vamos a hacer uso del patrón MVC (Modelo - Vista - Controlador), por lo que vamos a estructurar nuestro proyecto de la siguiente manera:

> *Nota: No vamos a usar de manera directa la estructura de VIEWS, pero se ve reemplazada por ROUTES*

```txt
NodeJS_MVC_MySQL_MongoDB
    |___ config
    |___ controllers
    |___ models
    |___ routes
    |___ storage
    |___ utils
```

- `config`: Configuraciones de la base de datos, o herramientas de terceros.
- `controllers`: Controladores.
- `models`: Modelos o entidades que actuarán en la base de datos.
- `routes`: Rutas de nuestro servicios.
- `storage`: Directorio de almacenamiento de archivos cargados al servidor
- `utils`: Funciones de ayuda.

| Anterior |                        | Siguiente                                              |
| -------- | ---------------------- | ------------------------------------------------------ |
| [Primer encuentro con Express](01_Primer_Encuentro_Express.md) | [Readme](../README.md) | [Mongoose y MongoDB](03_Mongoose_MongoDB.md) |
