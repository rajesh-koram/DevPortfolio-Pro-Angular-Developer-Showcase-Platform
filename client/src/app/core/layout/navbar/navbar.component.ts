import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';

import { PortfolioContentService } from '../../services/portfolio-content.service';
import { ScrollNavigationService } from '../../services/scroll-navigation.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly portfolioContentService = inject(PortfolioContentService);
  private readonly scrollNavigationService = inject(ScrollNavigationService);

  readonly themeService = inject(ThemeService);
  readonly navLinks = this.portfolioContentService.getNavigationLinks();
  readonly isMenuOpen = signal(false);
  readonly isScrolled = signal(false);
  readonly activeFragment = signal('home');

  constructor() {
    this.updateScrollState();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    const scrollTop = typeof window !== 'undefined' ? window.scrollY : 0;
    this.isScrolled.set(scrollTop > 18);
    this.activeFragment.set(this.scrollNavigationService.resolveActiveFragment(this.navLinks.map((link) => link.fragment)));
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  scrollToSection(fragment: string, event?: Event): void {
    event?.preventDefault();
    this.closeMenu();
    this.scrollNavigationService.scrollToFragment(fragment);
    this.activeFragment.set(fragment);
  }
}
