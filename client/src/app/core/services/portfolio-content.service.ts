import { Injectable } from '@angular/core';

import {
  ABOUT_CONTENT,
  CONTACT_METHODS,
  HERO_CONTENT,
  NAVIGATION_LINKS,
  PROJECT_ITEMS,
  SERVICE_ITEMS,
  SKILL_CATEGORIES,
} from '../data/portfolio-content.data';
import { NavigationLink } from '../../shared/models/navigation.model';
import {
  AboutContent,
  ContactMethod,
  HeroContent,
  ProjectItem,
  ServiceItem,
  SkillCategory,
} from '../../shared/models/portfolio-content.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioContentService {
  getNavigationLinks(): NavigationLink[] {
    return NAVIGATION_LINKS;
  }

  getHeroContent(): HeroContent {
    return HERO_CONTENT;
  }

  getAboutContent(): AboutContent {
    return ABOUT_CONTENT;
  }

  getProjects(): ProjectItem[] {
    return PROJECT_ITEMS;
  }

  getServices(): ServiceItem[] {
    return SERVICE_ITEMS;
  }

  getSkillCategories(): SkillCategory[] {
    return SKILL_CATEGORIES;
  }

  getContactMethods(): ContactMethod[] {
    return CONTACT_METHODS;
  }
}
