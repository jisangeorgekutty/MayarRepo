/**
 * Navigation API Service
 * 
 * Currently uses mock data. Replace with ASP.NET Core Web API endpoints:
 *   GET /api/navigation
 *   GET /api/navigation/{slug}
 */

import type { NavMenuItem } from '@/types/navigation';
import { megaMenuItems } from '@/data/mock/megaMenuData';

const delay = <T>(data: T, ms = 80): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const navigationApi = {
  getNavigationMenu: () => delay<NavMenuItem[]>(megaMenuItems),

  getMegaMenuBySlug: (slug: string) =>
    delay<NavMenuItem | undefined>(megaMenuItems.find((i) => i.slug === `/${slug}` || i.slug === slug)),
};
