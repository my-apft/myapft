import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material'
import { FirebaseDatabaseService } from '../services/firebase-database.service'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

@Component({
  selector: 'pm-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsletterComponent {
  public form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ])
  })

  constructor(private db: FirebaseDatabaseService, private dialogRef: MatDialogRef<NewsletterComponent>) { }

  subscribe() {
    this.db
      .getListRef('subscribers')
      .set(FirebaseDatabaseService.encodeKey(this.form.value.email), {
        updates: true
      })
      .then(() => this.dialogRef.close())
  }
}
