import { CalculatorComponent } from './calculator.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CalculatorComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.calculator.title',
            description: 'i18n.calculator.description'
          },
          response: {
            cache: {
              directive: 'private'
            }
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class CalculatorRoutingModule { }
