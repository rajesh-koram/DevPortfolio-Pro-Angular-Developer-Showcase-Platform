import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { PortfolioContentService } from '../../../../core/services/portfolio-content.service';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [SectionHeaderComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private readonly document = inject(DOCUMENT);
  private readonly portfolioContentService = inject(PortfolioContentService);

  readonly hero = this.portfolioContentService.getHeroContent();

  scrollToSection(fragment: string, event: Event): void {
    event.preventDefault();
    this.document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
