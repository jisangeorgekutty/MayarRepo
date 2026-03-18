import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Mail } from 'lucide-react';

const NewsletterBlock = () => {
  const { lang } = useLocale();
  const [email, setEmail] = useState('');

  return (
    <section className="py-12 md:py-20 bg-header text-header-foreground">
      <div className="container text-center max-w-xl mx-auto">
        <Mail size={32} className="mx-auto mb-4 text-brand" />
        <h2 className="font-heading text-xl md:text-2xl font-bold mb-2">
          {lang === 'ar' ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to Our Newsletter'}
        </h2>
        <p className="text-header-muted text-sm mb-6">
          {lang === 'ar'
            ? 'احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك'
            : 'Get the latest offers and new arrivals delivered to your inbox'}
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={lang === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
            className="flex-1 h-11 px-4 rounded-md bg-header-foreground/10 border border-header-muted/20 text-header-foreground placeholder:text-header-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <button
            type="submit"
            className="h-11 px-6 bg-brand text-brand-foreground font-medium text-sm rounded-md hover:bg-brand/90 transition-colors flex-shrink-0"
          >
            {lang === 'ar' ? 'اشترك' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBlock;
