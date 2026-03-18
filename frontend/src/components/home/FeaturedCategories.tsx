import { useLocale } from '@/hooks/useLocale';
import { featuredCategories } from '@/data/mock/featuredCategories';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const FeaturedCategories = () => {
  const { t, lang } = useLocale();

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
            {lang === 'ar' ? 'تسوق حسب الفئة' : 'Shop by Category'}
          </h2>
          <Link to="/shop" className="text-sm text-brand hover:underline flex items-center gap-1">
            {lang === 'ar' ? 'عرض الكل' : 'View All'}
            <ChevronRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {featuredCategories.map(cat => (
            <Link
              key={cat.id}
              to={cat.href}
              className="flex flex-col items-center gap-2 flex-shrink-0 snap-start group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-border group-hover:border-brand transition-colors">
                <img src={cat.image} alt={t(cat.name)} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground group-hover:text-brand transition-colors text-center">
                {t(cat.name)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
