import { useLocale } from '@/hooks/useLocale';
import { siteSettings, userMenuItems } from '@/data/mock/siteSettings';
import type { LanguageCode, CurrencyCode } from '@/types';

const TopBar = () => {
  const { lang, currency, setLang, setCurrency, t } = useLocale();

  return (
    <div className="bg-header text-header-foreground">
      <div className="container mx-auto max-w-7xl flex items-center justify-between h-9 text-xs px-4">
        {/* Trust message */}
        <p className="hidden md:block text-header-muted truncate">
          {t(siteSettings.trustMessage)}
        </p>

        {/* Right side links & switchers */}
        <div className="flex items-center gap-4 ms-auto">
          {/* Utility links - hidden on mobile */}
          <nav className="hidden lg:flex items-center gap-4">
            {userMenuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="text-header-muted hover:text-header-foreground transition-colors"
              >
                {t(item.label)}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <span className="hidden lg:block w-px h-3 bg-header-muted/30" />

          {/* Language switcher */}
          <div className="flex items-center gap-1">
            {(['en', 'ar'] as LanguageCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium uppercase transition-colors ${
                  lang === code
                    ? 'bg-header-foreground/15 text-header-foreground'
                    : 'text-header-muted hover:text-header-foreground'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Currency switcher */}
          <div className="flex items-center gap-1">
            {(['KWD', 'INR'] as CurrencyCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  currency === code
                    ? 'bg-header-foreground/15 text-header-foreground'
                    : 'text-header-muted hover:text-header-foreground'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
