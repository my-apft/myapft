import { EnvironmentService } from './environment.service'
import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { ISetting, ISettings } from '../../../../server/api/services/setting.service'
import { FirebaseDatabaseService } from './firebase-database.service'

export interface ISettingService {
  settings$: Observable<ISetting>
  pluck(key: string): Observable<string>
}

@Injectable()
export class SettingService implements ISettingService {
  public initialSettings: ISetting
  public settings$ = this.db
    .get<ISettings>('site-settings')
    .map(a => a && a[this.env.config.env || 'prod'])
    .map(settings => {
      return {
        injections: [],
        ...settings
      } as ISetting
    })
    .shareReplay()

  public pluck(key: string) {
    return this.settings$.map(dict => key.split('.')
      .reduce((o, k) => (o || {})[k], dict as any))
  }

  constructor(private db: FirebaseDatabaseService, private env: EnvironmentService) {
    this.settings$.take(1).subscribe(set => this.initialSettings = set)
  }
}
