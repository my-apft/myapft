import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import { ApftService } from '../apft.service'

@Component({
  selector: 'pm-apft-material',
  templateUrl: './apft.component.html',
  styleUrls: ['./apft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApftMaterialComponent {
  @Input() age: number
  @Input() date: Date
  @Input() gender: string
  @Input() pu: number
  @Input() su: number
  @Input() run: { min: number, sec: number }

  public form = new FormGroup({
    gender: new FormControl('male', [
      Validators.required
    ]),
    date: new FormControl(new Date(), [
      Validators.required
    ]),
    dob: new FormControl('', [
      Validators.required
    ]),
    pu: new FormControl('', [
      Validators.required
    ]),
    su: new FormControl('', [
      Validators.required
    ]),
    runMin: new FormControl('', [
      Validators.required
    ]),
    runSec: new FormControl('', [
      Validators.required
    ])
  })

  maxDob = this.calcDate(17)
  minDob = this.calcDate(75)

  calcDate(years: number) {
    const date = new Date()
    date.setFullYear(date.getFullYear() - years)
    return date
  }

  @Output() public score = this.form.statusChanges
    .map(a => a === 'VALID')
    .filter(Boolean)
    .map(a => this.form.value)
    .flatMap(form => this.apftService.calculate(form))
    .startWith()
    .share()

  constructor(private apftService: ApftService) { }
}
