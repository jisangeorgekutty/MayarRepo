import { useLocale } from '@/hooks/useLocale';
import logoImg from '@/assets/logo.png';

const Footer = () => {
  const { lang } = useLocale();
  const t = (en: string, ar: string) => lang === 'ar' ? ar : en;

  const columns = [
    {
      title: t('Quick Links', 'روابط سريعة'),
      links: [
        { label: t('Home', 'الرئيسية'), href: '/' },
        { label: t('Shop', 'تسوق'), href: '/shop' },
        { label: t('New Arrivals', 'وصل حديثاً'), href: '/shop?filter=new' },
        { label: t('Sale', 'تخفيضات'), href: '/shop?filter=sale' },
      ],
    },
    {
      title: t('Customer Service', 'خدمة العملاء'),
      links: [
        { label: t('Contact Us', 'اتصل بنا'), href: '#' },
        { label: t('Shipping Info', 'معلومات الشحن'), href: '#' },
        { label: t('Returns & Exchange', 'الإرجاع والاستبدال'), href: '#' },
        { label: t('FAQs', 'الأسئلة الشائعة'), href: '#' },
      ],
    },
    {
      title: t('About', 'عن الشركة'),
      links: [
        { label: t('About Mayar', 'عن ميار'), href: '#' },
        { label: t('Careers', 'وظائف'), href: '#' },
        { label: t('Privacy Policy', 'سياسة الخصوصية'), href: '#' },
        { label: t('Terms & Conditions', 'الشروط والأحكام'), href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-header text-header-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo / Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src={logoImg} alt="Mayar Shop" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-header-muted text-sm leading-relaxed">
              {t(
                'Your premium destination for fashion, beauty, and lifestyle in Kuwait.',
                'وجهتك الفاخرة للأزياء والجمال ونمط الحياة في الكويت.'
              )}
            </p>
          </div>
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="font-medium text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-header-muted text-sm hover:text-header-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-header-muted/20">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-header-muted">
          <p>© 2026 Mayar International. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}</p>
          <div className="flex items-center gap-3">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>KNET</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
