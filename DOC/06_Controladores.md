# Controladores

El controlador de encarga de efectuar las operaciones tipo CRUD con la información que se encuentra dentro de la base de datos, es decir que contendrá la lógica central de la aplicación que puede usar el usuario.

Los controladores se ubican dentro de la definición de las rutas. Por ejemplo, tenemos un controlador para obtener todos los items registrados:

```js
const getItems = (req, res) => {
    const data = ['Hola', 'mundo', '2']
    return res.send({ data })
}
```

... Dicho controlador, lo añadimos al endpoint respectivo de la siguiente manera:

```js
router.get('/', getItems)
```

___
| Anterior                              |                        | Siguiente                                  |
| ------------------------------------- | ---------------------- | ------------------------------------------ |
| [Creando alías Script](05_Scripts.md) | [Readme](../README.md) | [Cargando Modelos](07_Cargando_Modelos.md) |
