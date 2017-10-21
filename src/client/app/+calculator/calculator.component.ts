import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'pm-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent {
  @HostBinding('class.card-float-container') containerClass = true

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

  // private form$ = this.form.statusChanges
  //   .map(a => a === 'VALID')
  //   .filter(Boolean)
  //   .map(a => this.form.value)
  //   .share()

  // score$ = this.form$
  //   .map(this.calculate.bind(this))
  //   .startWith()

  // age$ = this.form$
  //   .map(apft => this.calculateAge(apft.dob, apft.date))
  //   .map(age => {
  //     return age >= 17
  //       ? `age: ${age}`
  //       : 'must be older than 17 to compute results'
  //   })
}

// interface MaleFemale {
//   male: { [key: string]: number[] },
//   female: { [key: string]: number[] }
// }

// interface ScoringStandard {
//   pu: MaleFemale
//   su: MaleFemale
//   run: MaleFemale
// }

// type Gender = 'male' | 'female'

// interface ApftTest {
//   gender: Gender
//   dob: Date
//   date: Date
//   runMin: number
//   runSec: number
//   su: number
//   pu: number
// }
