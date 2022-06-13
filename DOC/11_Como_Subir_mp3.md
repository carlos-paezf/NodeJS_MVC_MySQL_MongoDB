# Como subir un archivo mp3

Cuando usamos el endpoint para subir un registro de `tracks`, enviamos un elemento llamado `mediaId`. Dentro de dicha ruta, solo subimos información de texto, si queremos subir algún archivo, usamos las rutas de `storage`, la cual cuando se envía retorna un id del elemento creado, y es aquí donde entra la propiedad `mediaId`, pues el valor que enviamos en esta propiedad es el id del archivo enviado en la ruta de `storage`.

Subir un archivo es sencillo en POSTMAN, puesto que dentro del endpoint encargado de ello, seleccionamos `Body`>`form-data`>`Key` (añadimos el nombre de la propiedad y cambiamos de `Text` a `File`)>`Value` (cargamos el archivo deseado)

___
| Anterior                                   |                        | Siguiente                                 |
| ------------------------------------------ | ---------------------- | ----------------------------------------- |
| [Como validar datos en un API REST](10_Validar_Datos_API_REST.md) | [Readme](../README.md) | [Middlewares](12_Middlewares.md) |
