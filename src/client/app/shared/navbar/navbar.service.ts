import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'

export interface INavbarService {
  menu$: Observable<any[]>
}

@Injectable()
export class NavbarService implements INavbarService {
  menu$ = Observable.of([
    { route: 'calculator', name: 'APFT Calculator', hideMobile: true },
    { route: 'instructions', name: 'Instructions', hideMobile: true }
  ])
}
