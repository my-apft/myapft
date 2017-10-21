import { ResourcesRoutingModule } from './resources-routing.module'
import { ResourcesComponent } from './resources.component'
import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [ResourcesRoutingModule, SharedModule],
  declarations: [ResourcesComponent],
  exports: [ResourcesComponent]
})
export class ResourcesModule { }
