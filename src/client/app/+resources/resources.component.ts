import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { ContentService } from '../shared/services/content.service'

@Component({
  selector: 'pm-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourcesComponent {
  @HostBinding('class.card-float-container') containerClass = true
  content$ = this.cs.content('resources')
  constructor(private cs: ContentService) { }
}
