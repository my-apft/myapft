import { ResourcesComponent } from './resources.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ResourcesComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.resources.title',
            description: 'i18n.resources.description'
          },
          response: {
            cache: {
              directive: 'public',
              maxage: '365d',
              smaxage: '365d'
            }
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
