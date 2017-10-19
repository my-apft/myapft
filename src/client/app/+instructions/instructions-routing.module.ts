import { InstructionsComponent } from './instructions.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: InstructionsComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.instructions.title',
            description: 'i18n.instructions.description'
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class InstructionsRoutingModule { }
