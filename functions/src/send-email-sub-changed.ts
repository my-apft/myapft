import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as sparkpost from 'sparkpost';

export const listener = functions.database.ref('/subscribers/{uid}').onWrite(event => {
  const snapshot = event.data
  const val = snapshot.val()

  if (!snapshot.changed()) return

  const address = decodeURIComponent(snapshot.key).replace('%2E', '.')
  const client = new sparkpost(functions.config().sparkpost.apikey);

  const getTemplate = function (template: string) {
    return client.templates.get(template)
  }

  const send = function (template: any) {
    return client.transmissions.send({
      options: { transactional: true, sandbox: false },
      recipients: [{ address }],
      content: template.results.content as any,
    });
  }

  val.updates
    ? getTemplate('newsletter_subscribed').then(send)
    : getTemplate('newsletter_unsubscribed').then(send)
})
