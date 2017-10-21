import { CalculatorRoutingModule } from './calculator-routing.module'
import { CalculatorComponent } from './calculator.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { MatTabsModule } from '@angular/material'

@NgModule({
  imports: [CalculatorRoutingModule, SharedModule, MatTabsModule],
  declarations: [CalculatorComponent],
  exports: [CalculatorComponent]
})
export class CalculatorModule { }
