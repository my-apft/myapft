import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'

@Component({
  selector: 'pm-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent {
  @HostBinding('class.card-float-container') containerClass = true

  maxDob = this.calcDate(17)
  minDob = this.calcDate(75)

  calcDate(years: number) {
    const date = new Date()
    date.setFullYear(date.getFullYear() - years)
    return date
  }

  // age$ = this.form$
  //   .map(apft => this.calculateAge(apft.dob, apft.date))
  //   .map(age => {
  //     return age >= 17
  //       ? `age: ${age}`
  //       : 'must be older than 17 to compute results'
  //   })
}
