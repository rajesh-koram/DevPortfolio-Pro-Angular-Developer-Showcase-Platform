import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProjectItem } from '../../models/portfolio-content.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<ProjectItem>();
}
