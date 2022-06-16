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