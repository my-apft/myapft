import { AuthService } from './../shared/services/auth.service'
import { PlatformService } from './../shared/services/platform.service'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'pm-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent {
  constructor(auth: AuthService, ps: PlatformService) {
    auth.logout()
  }
}
