import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type AppTheme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'devportfolio-theme';

  readonly theme = signal<AppTheme>('dark');

  constructor() {
    this.initializeTheme();
  }

  toggleTheme(): void {
    this.applyTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  private initializeTheme(): void {
    if (typeof window === 'undefined') {
      this.applyTheme('dark');
      return;
    }

    const savedTheme = window.localStorage.getItem(this.storageKey) as AppTheme | null;
    const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

    this.applyTheme(savedTheme ?? preferredTheme);
  }

  private applyTheme(theme: AppTheme): void {
    this.theme.set(theme);
    this.document.documentElement.dataset['theme'] = theme;
    this.document.documentElement.style.colorScheme = theme;

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.storageKey, theme);
    }
  }
}
