import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { listener as sendNewsletterSubChanged } from './send-email-sub-changed'

admin.initializeApp(functions.config().firebase)

export { sendNewsletterSubChanged }
