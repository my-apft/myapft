// tslint:disable:no-require-imports
import * as admin from 'firebase-admin'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { forkJoin } from 'rxjs/observable/forkJoin'
import { of } from 'rxjs/observable/of'
import { put } from 'request'
import { SERVER_CONFIG } from '../server.config'

const SEED_SITE_SETTINGS = require('./seed.settings.json')
const SEED_APFT_STANDARDS_SETTINGS = require('./seed.apft-standards.json')
const SEED_APFT_CONTENT = require('./seed.content.json')
const SEED_SECURITY_RULES = require('./security-rules.json')
const SEED_SUPERUSERS = require('./seed.superusers.json') as { [key: string]: { roles: { [key: string]: string } } }[]

export const dbSeed = (db: admin.database.Database) => {

  const siteSettings = fromPromise(db.ref('site-settings').once('value'))
    .map(a => a.val())
    .flatMap(settings => {
      return settings
        // tslint:disable-next-line:no-empty
        ? of(() => { })
        : fromPromise(db.ref('site-settings').set(SEED_SITE_SETTINGS))
    })

  const def = Object.keys(SEED_SUPERUSERS).map(key => {
    return fromPromise(db.ref('users').child(key).once('value'))
      .map(a => a.val())
      .map(a => a ? undefined : key)
  })

  const superusers = forkJoin(...def).map((admins: any[]) => {
    return admins.filter(a => a).map(a => {
      return fromPromise(db.ref('users').child(a).set(SEED_SUPERUSERS[a]))
    })
  })

  const apftStandards = forkJoin(...def).map((admins: any[]) => {
    return fromPromise(db.ref('apft-standards').set(SEED_APFT_STANDARDS_SETTINGS))
  })

  const content = forkJoin(...def).map((admins: any[]) => {
    return fromPromise(db.ref('content').set(SEED_APFT_CONTENT))
  })

  put(`${db.app.options.databaseURL}/.settings/rules.json?auth=${SERVER_CONFIG.FB_AUTH_KEY}`, {
    body: JSON.stringify(SEED_SECURITY_RULES, undefined, 2)
  }, (error, response, body) => {
    if (error) throw new Error(error)
    if (response.statusCode !== 200) {
      throw new Error('failed to update database rules')
    }
  })

  const sources = [
    siteSettings,
    superusers,
    apftStandards,
    content
  ]
  return forkJoin(...sources)
}
