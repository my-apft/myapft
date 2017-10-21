import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { ContentService } from '../shared/services/content.service'

@Component({
  selector: 'pm-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  @HostBinding('class.card-float-container') containerClass = true
  about$ = this.cs.content('about')

  constructor(private cs: ContentService) { }
}
