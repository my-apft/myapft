import { Observable } from 'rxjs/Observable'
import { FirebaseDatabaseService } from './../shared/services/firebase-database.service'
import { AuthService } from './../shared/services/auth.service'
import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild } from '@angular/core'
import { ApftMaterialComponent } from '../shared/apft/material/apft.component'
import { MatSnackBar } from '@angular/material'
import { DataSource } from '@angular/cdk/collections'
import { of } from 'rxjs/observable/of'

@Component({
  selector: 'pm-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {
  @HostBinding('class.card-float-container') containerClass = true
  @ViewChild(ApftMaterialComponent) apft: ApftMaterialComponent

  score: any
  dataSource = new ExampleDataSource(this.auth, this.db)
  displayedColumns = ['date', 'pu', 'su', 'run', 'total', 'delete']
  loggedIn$ = this.auth.user$.map(a => a ? true : false)

  constructor(private auth: AuthService, private db: FirebaseDatabaseService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.apft.score.subscribe(score => {
      this.score = score
    })
  }

  save() {
    this.auth.user$
      .filter(Boolean)
      .map(user => ({ ...this.score, userId: user.id }))
      .take(1)
      .flatMap(record => this.db.getListRef(`users/${record.userId}/tests`).push(record))
      .take(1)
      .subscribe(ref => {
        this.snackBar.open('apft saved', 'dismiss', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })
      })
  }

  deleteRecord(record: any) {
    this.db.getObjectRef(record.dbPath).remove()
  }
}

export class ExampleDataSource extends DataSource<any> {
  tests$ = this.auth.user$
    .flatMap(user => user ? this.db.get(`users/${user.id}/tests`) : of(undefined), (user, res) => ({ user, res }))
    .map(val => val.res ? Object.keys(val.res).map(key => ({ ...(val.res as any)[key], dbPath: `users/${val.user.id}/tests/${key}` })) : [])
    .share()

  constructor(private auth: AuthService, private db: FirebaseDatabaseService) {
    super()
  }

  connect(): Observable<any[]> {
    return this.tests$
  }

  disconnect() {
    // void
  }
}
