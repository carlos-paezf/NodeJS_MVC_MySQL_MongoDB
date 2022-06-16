# Login

Vamos a nuestro controlador `controllers/auth.js` y creamos el método para el inicio de sesión. Lo primero que haremos será extraer la contraseña y email enviados por el usuario. Luego buscamos un usuario en la base de datos que coincida con el correo ingresado, si no existe se retorna un error. Verificamos que la contraseña ingresada, y la registrada en el documento sean iguales (luego de verificar sus hash). Retornamos el token y algunos datos del usuario.

Una aclaración importante es que debemos usar el método `select()` puesto que hemos dejado la contraseña inhabilitada para los métodos relacionados con `find()`, por lo tanto llamamos el campo de contraseña, y otros datos que puedan llegar a ser necesarios:

```js
...
const login = async (req, res) => {
    try {
        const { password, email } = matchedData(req)
        
        const user = await usersModel.findOne({ email }).select('password name role email')
        if (!user) return handleHttpError(res, 'Correo o contraseña incorrectos', 401)

        const check = await compare(password, user.password)
        if (!check) return handleHttpError(res, 'Correo o contraseña incorrectos', 401)

        user.set('password', undefined, { strict: false })

        const data = {
            token: tokenSign(user),
            user
        }

        return res.send({ data })
    } catch (error) {
        console.log(error)
        return handleHttpError(res, 'Error en auth/login', 500)
    }
}
...
```

Dentro de la ruta correspondiente, tendremos lo siguiente:

```js
...
router.post('/login', validatorLogin, login)
...
```

___
| Anterior                                      |                        | Siguiente                              |
| --------------------------------------------- | ---------------------- | -------------------------------------- |
| [Generar JWT en Node](17_Generar_JWT_Node.md) | [Readme](../README.md) | [Proteger rutas con roles](19_Proteger_rutas_con_roles.md) |
