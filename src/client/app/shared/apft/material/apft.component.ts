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
    ageRange: new FormControl('17-21', [
      Validators.required
    ]),
    pu: new FormControl(0, [
      Validators.required,
      Validators.max(200)
    ]),
    su: new FormControl(0, [
      Validators.required,
      Validators.max(200)
    ]),
    runMin: new FormControl('00', [
      Validators.required,
      Validators.max(30)
    ]),
    runSec: new FormControl('00', [
      Validators.required,
      Validators.max(60)
    ])
  })

  @Output() public score = this.form.statusChanges
    .map(a => a === 'VALID')
    .filter(Boolean)
    .map(a => this.form.value)
    .startWith(this.form.value)
    .flatMap(form => this.apftService.calculate(form))
    .share()

  constructor(private apftService: ApftService) { }
}
