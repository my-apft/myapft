import { HomeComponent } from './home.component'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MetaGuard } from '@ngx-meta/core'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        canActivate: [MetaGuard],
        data: {
          meta: {
            title: 'i18n.home.title',
            description: 'i18n.home.description'
          },
          response: {
            cache: {
              directive: 'public',
              maxage: '7d',
              smaxage: '7d'
            }
          }
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
