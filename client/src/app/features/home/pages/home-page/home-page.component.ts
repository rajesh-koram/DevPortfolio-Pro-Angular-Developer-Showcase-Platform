import { DOCUMENT } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { ContactApiService } from '../../../../core/services/contact-api.service';
import { PortfolioContentService } from '../../../../core/services/portfolio-content.service';
import { ScrollNavigationService } from '../../../../core/services/scroll-navigation.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { ProjectCardComponent } from '../../../../shared/ui/project-card/project-card.component';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, HeroComponent, ProjectCardComponent, SectionHeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly document = inject(DOCUMENT);
  private readonly contactApiService = inject(ContactApiService);
  private readonly portfolioContentService = inject(PortfolioContentService);
  private readonly scrollNavigationService = inject(ScrollNavigationService);

  readonly about = this.portfolioContentService.getAboutContent();
  readonly projects = this.portfolioContentService.getProjects();
  readonly services = this.portfolioContentService.getServices();
  readonly skillCategories = this.portfolioContentService.getSkillCategories();
  readonly contactMethods = this.portfolioContentService.getContactMethods();
  readonly copiedContactLabel = signal('');
  readonly isSubmitting = signal(false);
  readonly formNotice = signal('');
  readonly formNoticeType = signal<'success' | 'error' | 'idle'>('idle');
  projectBrief = {
    name: '',
    email: '',
    details: '',
  };

  constructor() {
    afterNextRender(() => {
      this.scrollNavigationService.scrollToCurrentHash();
    });
  }

  async copyContactDetail(label: string, value: string): Promise<void> {
    const clipboard = this.document.defaultView?.navigator.clipboard;

    if (clipboard?.writeText) {
      await clipboard.writeText(value);
    } else {
      const textarea = this.document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      this.document.body.appendChild(textarea);
      textarea.select();
      this.document.execCommand('copy');
      this.document.body.removeChild(textarea);
    }

    this.copiedContactLabel.set(label);
    this.document.defaultView?.setTimeout(() => {
      if (this.copiedContactLabel() === label) {
        this.copiedContactLabel.set('');
      }
    }, 1800);
  }

  async submitProjectBrief(form: NgForm): Promise<void> {
    if (form.invalid) {
      this.formNoticeType.set('error');
      this.formNotice.set('Please complete your name, email, and project details first.');
      form.control.markAllAsTouched();
      return;
    }

    try {
      this.isSubmitting.set(true);
      const response = await firstValueFrom(this.contactApiService.submitProjectBrief(this.projectBrief));

      this.formNoticeType.set('success');
      this.formNotice.set(response.message);
      this.projectBrief = {
        name: '',
        email: '',
        details: '',
      };
      form.resetForm(this.projectBrief);
    } catch (error) {
      const message = error instanceof HttpErrorResponse
        ? error.error?.message || 'Unable to submit the project brief right now.'
        : 'Unable to submit the project brief right now.';

      this.formNoticeType.set('error');
      this.formNotice.set(message);
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
