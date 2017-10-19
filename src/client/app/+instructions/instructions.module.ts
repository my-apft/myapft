import { InstructionsRoutingModule } from './instructions-routing.module'
import { InstructionsComponent } from './instructions.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [InstructionsRoutingModule, SharedModule],
  declarations: [InstructionsComponent],
  exports: [InstructionsComponent]
})
export class InstructionsModule { }
