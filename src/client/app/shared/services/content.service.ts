import { Injectable } from '@angular/core'
import { FirebaseDatabaseService } from './firebase-database.service'

@Injectable()
export class ContentService {
  content(key: string) {
    return this.db.get(`content/${key}`)
  }

  constructor(private db: FirebaseDatabaseService) { }
}
