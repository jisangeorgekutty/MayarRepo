import { useState, useRef, useCallback } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { megaMenuItems } from '@/data/mock/megaMenuData';
import MegaMenuPanel from './MegaMenuPanel';
import { AnimatePresence } from 'framer-motion';

const NavBar = () => {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearClose();
    closeTimer.current = setTimeout(() => setActiveId(null), 180);
  }, [clearClose]);

  const handleEnter = useCallback((id: string) => {
    clearClose();
    setActiveId(id);
  }, [clearClose]);

  const activeItem = megaMenuItems.find((i) => i.id === activeId && i.type === 'mega');

  return (
    <>
      <nav className="hidden lg:block bg-background border-b border-border relative z-50">
        <div className="container">
          <ul className="flex items-center justify-center gap-8 h-11">
            {megaMenuItems.map((item) => {
              const isMega = item.type === 'mega';
              const isActive = activeId === item.id;

              return (
                <li
                  key={item.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={isMega ? () => handleEnter(item.id) : undefined}
                  onMouseLeave={isMega ? scheduleClose : undefined}
                >
                  <a
                    href={item.slug}
                    className={`relative text-sm font-medium transition-colors inline-flex items-center gap-1.5 py-2 ${
                      isActive ? 'text-brand' : 'text-foreground hover:text-brand'
                    }`}
                    onFocus={isMega ? () => handleEnter(item.id) : undefined}
                  >
                    {t(item.label)}
                    {item.badge && (
                      <span className="bg-brand text-brand-foreground text-[9px] px-1.5 py-px rounded-full font-bold leading-none">
                        {t(item.badge)}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mega menu panel — rendered outside nav but shares hover group via timers */}
      <AnimatePresence>
        {activeItem && (
          <MegaMenuPanel
            key={activeItem.id}
            item={activeItem}
            onMouseEnter={clearClose}
            onMouseLeave={scheduleClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
