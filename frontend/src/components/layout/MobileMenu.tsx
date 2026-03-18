import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { megaMenuItems } from '@/data/mock/megaMenuData';
import { User, Heart, ChevronDown } from 'lucide-react';
import type { LanguageCode, CurrencyCode } from '@/types';
import type { NavMenuItem } from '@/types/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu = () => {
  const { t, lang, currency, setLang, setCurrency } = useLocale();
  const [expandedNav, setExpandedNav] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleNav = (id: string) => {
    setExpandedNav(expandedNav === id ? null : id);
    setExpandedSection(null);
  };

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Logo area */}
      <div className="px-5 py-4 border-b border-border">
        <span className="text-xl font-heading font-bold text-foreground">Mayar</span>
        <span className="text-xl font-heading font-light text-brand ms-1">Shop</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-2">
        {megaMenuItems.map((item) => (
          <MobileNavItem
            key={item.id}
            item={item}
            isExpanded={expandedNav === item.id}
            expandedSection={expandedSection}
            onToggle={() => toggleNav(item.id)}
            onToggleSection={toggleSection}
            t={t}
          />
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border px-5 py-4 space-y-3">
        <div className="flex items-center gap-4">
          <a href="/account" className="flex items-center gap-2 text-sm text-foreground">
            <User size={16} /> {lang === 'ar' ? 'حسابي' : 'My Account'}
          </a>
          <a href="/wishlist" className="flex items-center gap-2 text-sm text-foreground">
            <Heart size={16} /> {lang === 'ar' ? 'المفضلة' : 'Wishlist'}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {(['en', 'ar'] as LanguageCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                  lang === code ? 'bg-secondary text-foreground' : 'text-muted-foreground'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {(['KWD', 'INR'] as CurrencyCode[]).map((code) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  currency === code ? 'bg-secondary text-foreground' : 'text-muted-foreground'
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

interface MobileNavItemProps {
  item: NavMenuItem;
  isExpanded: boolean;
  expandedSection: string | null;
  onToggle: () => void;
  onToggleSection: (id: string) => void;
  t: (text: { en: string; ar: string }) => string;
}

const MobileNavItem = ({ item, isExpanded, expandedSection, onToggle, onToggleSection, t }: MobileNavItemProps) => {
  if (item.type === 'link') {
    return (
      <a
        href={item.slug}
        className="flex items-center justify-between px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
      >
        <span>{t(item.label)}</span>
        {item.badge && (
          <span className="bg-brand text-brand-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
            {t(item.badge)}
          </span>
        )}
      </a>
    );
  }

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
      >
        <span>{t(item.label)}</span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && item.sections && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-secondary/30"
          >
            {item.sections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => onToggleSection(section.id)}
                  className="w-full flex items-center justify-between px-7 py-2.5 text-[13px] font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  <span>{t(section.title)}</span>
                  <ChevronDown
                    size={12}
                    className={`text-muted-foreground transition-transform duration-200 ${expandedSection === section.id ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {expandedSection === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      {section.links.map((link) => (
                        <a
                          key={link.id}
                          href={`/category/${link.slug}`}
                          className="block px-9 py-2 text-[12px] text-muted-foreground hover:text-brand transition-colors"
                        >
                          {t(link.label)}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
