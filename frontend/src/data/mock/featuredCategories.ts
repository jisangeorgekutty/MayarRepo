import type { FeaturedCategory } from '@/types/product';
import dressImg from '@/assets/products/dress.jpg';
import blazerImg from '@/assets/products/blazer.jpg';
import handbagImg from '@/assets/products/handbag.jpg';
import skincareImg from '@/assets/products/skincare.jpg';
import watchImg from '@/assets/products/watch.jpg';
import sneakersImg from '@/assets/products/sneakers.jpg';
import jewelryImg from '@/assets/products/jewelry.jpg';
import perfumeImg from '@/assets/products/perfume.jpg';

export const featuredCategories: FeaturedCategory[] = [
  { id: 'fc-women', name: { en: 'Women', ar: 'نساء' }, image: dressImg, href: '/shop?category=women' },
  { id: 'fc-men', name: { en: 'Men', ar: 'رجال' }, image: blazerImg, href: '/shop?category=men' },
  { id: 'fc-bags', name: { en: 'Bags', ar: 'حقائب' }, image: handbagImg, href: '/shop?category=accessories&sub=bags' },
  { id: 'fc-beauty', name: { en: 'Beauty', ar: 'جمال' }, image: skincareImg, href: '/shop?category=beauty' },
  { id: 'fc-watches', name: { en: 'Watches', ar: 'ساعات' }, image: watchImg, href: '/shop?category=accessories&sub=watches' },
  { id: 'fc-shoes', name: { en: 'Footwear', ar: 'أحذية' }, image: sneakersImg, href: '/shop?category=shoes' },
  { id: 'fc-jewelry', name: { en: 'Jewellery', ar: 'مجوهرات' }, image: jewelryImg, href: '/shop?category=accessories&sub=jewelry' },
  { id: 'fc-fragrance', name: { en: 'Fragrance', ar: 'عطور' }, image: perfumeImg, href: '/shop?category=beauty&sub=fragrance' },
  { id: 'fc-accessories', name: { en: 'Accessories', ar: 'إكسسوارات' }, image: handbagImg, href: '/shop?category=accessories' },
  { id: 'fc-travel', name: { en: 'Travel', ar: 'سفر' }, image: handbagImg, href: '/shop?category=accessories&sub=travel' },
];
