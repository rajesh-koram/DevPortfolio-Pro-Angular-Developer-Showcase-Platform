import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollNavigationService {
  private readonly document = inject(DOCUMENT);

  scrollToFragment(fragment: string): boolean {
    const target = this.document.getElementById(fragment);

    if (!target || typeof window === 'undefined') {
      return false;
    }

    const top = window.scrollY + target.getBoundingClientRect().top - this.getScrollOffset();

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: 'smooth',
    });

    const basePath = this.document.defaultView?.location.pathname ?? '/';
    this.document.defaultView?.history.replaceState(null, '', `${basePath}${fragment ? `#${fragment}` : ''}`);

    return true;
  }

  scrollToCurrentHash(): boolean {
    const fragment = this.document.defaultView?.location.hash.replace('#', '') ?? '';
    return fragment ? this.scrollToFragment(fragment) : false;
  }

  resolveActiveFragment(fragments: string[]): string {
    if (typeof window === 'undefined' || fragments.length === 0) {
      return fragments[0] ?? '';
    }

    const threshold = this.getScrollOffset() + 24;
    let activeFragment = fragments[0];

    for (const fragment of fragments) {
      const target = this.document.getElementById(fragment);

      if (!target) {
        continue;
      }

      const top = target.getBoundingClientRect().top;

      if (top <= threshold) {
        activeFragment = fragment;
      }
    }

    return activeFragment;
  }

  private getScrollOffset(): number {
    const navbar = this.document.querySelector('.navbar__inner') as HTMLElement | null;
    const navbarHeight = navbar?.getBoundingClientRect().height ?? 72;

    return navbarHeight + 28;
  }
}
