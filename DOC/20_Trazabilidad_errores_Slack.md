# Trazabilidad de Errores de Backend con Slack

En el mundo del Backend es importante tener un sistema de monitoreo para los errores que se puedan llegar a generar. Hay muchas plataformas de pago, pero por ahora vamos a usar Slack (por lo tanto es importante tener una cuenta en dicha plataforma). Vamos a buscar `slack bot webhook` en un navegador, y vamos a ingresar al enlace llamado [Sending messages using Incoming Webhooks - Slack API](https://api.slack.com/messaging/webhooks) y seguimos las instrucciones.

Vamos a crear una nueva app de Slack desde scratch, le ponemos un nombre (en mi caso use el nombre `[BOT] Errores Backend Canciones`), seleccionamos un espacio de trabajo y creamos la app. Activamos los **Incoming Webhooks**, y dentro de esa misma pestaña ubicamos el botón `Add New Webhook to Workspace` pero aún no lo presionamos, puesto que necesitamos crear un canal privado dentro de nuestro workspace (El nombre que le dí fue `bot-errores-backend-canciones`). Volvemos al botón que mencionamos antes y añadimos el canal que acabos de crear.

Vamos a tener un Webhook URL que debemos guardar dentro de nuestras variables de entorno:

```js
...
SLACK_WEBHOOK = 'https://hooks.slack.com/services/...'
```

Dentro de nuestro proyecto backend vamos a instalar el paquete `morgan-body`, el cual nos va ayudar estar al pendiente de los datos que ingresan y salen de nuestro proyecto. Para su instalación usamos el siguiente comando:

```txt
pnpm i morgan-body -S
```

Dentro de nuestro archivo `app.js` hacemos la siguiente configuración (más adelante configuramos algunas opciones):

```js
const morganBody = require('morgan-body')
...
morganBody(app)
```

Necesitamos otro paquete llamado `@slack/webhook`, y lo instalamos con:

```txt
pnpm i @slack/webhook -S
```

Dentro de `app.js` vamos a hacer uso de este último paquete de la siguiente manera:

```js
const { IncomingWebhook } = require('@slack/webhook')
...
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)
...
```

Ahora para conectar los logs generados por morgan-body con nuestro canal de slack, hacemos la siguiente configuración:

```js
const loggerStream = {
    write: message => {
        webhook.send({
            text: message
        })
    }
}
morganBody(app, {
    noColors: true,
    stream: loggerStream
})
...
```

Si solo queremos recibir los errores de la familia 4xx o 5xx, añadimos una configuración más:

```js
morganBody(app, {
    ...,
    skip: function(req, res) {
        return res.statusCode < 400
    }
})
```

Ahora, para hacer más limpio nuestro código, vamos a crear un archivo llamado `utils/handleLogger.js` y tendrá esta apariencia:

```js
const { IncomingWebhook } = require('@slack/webhook')

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const loggerStream = {
    write: message => {
        webhook.send({
            text: message
        })
    }
}

module.exports = loggerStream
```

Solo queda importar la función dentro de `app.js` en la configuración de `morganBody()`

___
| Anterior                |                        | Siguiente                                                  |
| ----------------------- | ---------------------- | ---------------------------------------------------------- |
| [Proteger rutas con roles](19_Proteger_rutas_con_roles.md) | [Readme](../README.md) | [MySQL Sequelize en Node](21_MySQL_Sequelize_Node.md) |
