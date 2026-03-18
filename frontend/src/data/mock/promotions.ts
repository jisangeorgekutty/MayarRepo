import type { PromoBanner } from '@/types/product';
import promoBagsImg from '@/assets/promo/promo-bags.jpg';
import promoBeautyImg from '@/assets/promo/promo-beauty.jpg';
import promoCollectionImg from '@/assets/promo/promo-collection.jpg';

export const promoBanners: PromoBanner[] = [
  {
    id: 'promo-1',
    title: { en: 'Handbags Collection', ar: 'مجموعة الحقائب' },
    subtitle: { en: 'Up to 40% Off', ar: 'خصم حتى 40%' },
    image: promoBagsImg,
    ctaLabel: { en: 'Shop Now', ar: 'تسوقي الآن' },
    ctaHref: '/shop?category=accessories&sub=bags',
  },
  {
    id: 'promo-2',
    title: { en: 'Beauty Essentials', ar: 'أساسيات الجمال' },
    subtitle: { en: 'New Season Picks', ar: 'اختيارات الموسم الجديد' },
    image: promoBeautyImg,
    ctaLabel: { en: 'Explore', ar: 'اكتشفي' },
    ctaHref: '/shop?category=beauty',
  },
  {
    id: 'promo-3',
    title: { en: 'New Collection', ar: 'المجموعة الجديدة' },
    subtitle: { en: 'Autumn/Winter 2026', ar: 'خريف/شتاء 2026' },
    image: promoCollectionImg,
    ctaLabel: { en: 'Discover', ar: 'اكتشف' },
    ctaHref: '/shop?sale=true',
  },
  {
    id: 'promo-4',
    title: { en: 'Footwear Sale', ar: 'تخفيضات الأحذية' },
    subtitle: { en: 'Starting from KWD 15', ar: 'ابتداءً من 15 د.ك' },
    image: promoBagsImg,
    ctaLabel: { en: 'Shop Shoes', ar: 'تسوق الأحذية' },
    ctaHref: '/shop?category=shoes',
  },
];
