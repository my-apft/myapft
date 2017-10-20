import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ContentService } from '../shared/services/content.service';

@Component({
  selector: 'pm-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstructionsComponent {
  content$ = this.cs.content('instructions')
  constructor(private cs: ContentService) { }
}
