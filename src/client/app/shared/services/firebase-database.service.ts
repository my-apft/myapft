import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { AngularFireDatabase } from 'angularfire2/database'
import { makeStateKey, TransferState } from '@angular/platform-browser'

@Injectable()
export class FirebaseDatabaseService {
  constructor(private db: AngularFireDatabase, private ts: TransferState) { }

  get<T>(path: string) {
    const cached = this.ts.get<T | undefined>(this.cacheKey(path), undefined)
    return cached
      ? this.db.object(path).valueChanges<T>().startWith(cached).catch(a => Observable.of({}))
      : this.db.object(path).valueChanges<T>().catch(a => Observable.of({}))
  }

  getList<T>(path: string): Observable<T[]> {
    const cached = this.ts.get<T[] | undefined>(this.cacheKey(path), undefined)
    return cached
      ? this.db.list(path).valueChanges<T>().startWith(cached as any).catch(a => Observable.of([]))
      : this.db.list(path).valueChanges<T>().catch(a => Observable.of([]))
  }

  getListRef(path: string) {
    return this.db.list(path)
  }

  getObjectRef(path: string) {
    return this.db.object(path)
  }

  cacheKey(path: string) {
    return makeStateKey<string>(`FB.${path}`)
  }

  static encodeKey(val: string) {
    return encodeURIComponent(val).replace('.', '%2E')
  }

  static dencodeKey(encodedValue: string) {
    return decodeURIComponent(encodedValue).replace('%2E', '.')
  }
}
