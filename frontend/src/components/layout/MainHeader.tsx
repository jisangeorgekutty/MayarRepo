import { useState, useRef, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';
import { useAuth } from '@/context/AuthContext';
import logoImg from '@/assets/logo.png';
import { cartSummary } from '@/data/mock/siteSettings';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MobileMenu from './MobileMenu';
import { AnimatePresence, motion } from 'framer-motion';

const headerCategories = [
  { id: 'fashion', name: { en: 'Fashion', ar: 'أزياء' }, slug: 'fashion' },
  { id: 'beauty', name: { en: 'Beauty', ar: 'جمال' }, slug: 'beauty' },
  { id: 'accessories', name: { en: 'Accessories', ar: 'إكسسوارات' }, slug: 'accessories' },
  { id: 'watches', name: { en: 'Watches', ar: 'ساعات' }, slug: 'watches' },
  { id: 'fragrance', name: { en: 'Fragrance', ar: 'عطور' }, slug: 'fragrance' },
  { id: 'home-living', name: { en: 'Home & Living', ar: 'المنزل' }, slug: 'home-living' },
];

const MainHeader = () => {
  const { t, lang } = useLocale();
  const { isLoggedIn, user, logout } = useAuth();
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  const searchPlaceholder = lang === 'ar' ? 'ابحث عن منتجات...' : 'Search for products...';
  const allCategoriesLabel = lang === 'ar' ? 'جميع الفئات' : 'All Categories';

  // Close dropdown on outside click
  useEffect(() => {
    if (!catOpen) return;
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [catOpen]);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="container mx-auto max-w-7xl flex items-center justify-center h-16 md:h-20 gap-4 px-4">
        {/* Mobile hamburger */}
        <div className="lg:hidden flex-shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 text-foreground" aria-label="Menu">
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="w-[300px] p-0">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>

        {/* Categories dropdown - desktop */}
        <div className="hidden lg:block relative flex-shrink-0" ref={catRef}>
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-lg text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Menu size={16} />
            <span>{allCategoriesLabel}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${catOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {catOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full start-0 mt-1.5 w-52 bg-popover border border-border rounded-xl shadow-lg z-50 py-1.5 overflow-hidden"
              >
                {headerCategories.map((cat) => (
                  <a
                    key={cat.id}
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent transition-colors"
                    onClick={() => setCatOpen(false)}
                  >
                    {t(cat.name)}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search bar - desktop */}
        <div className="hidden md:flex flex-1 min-w-0 max-w-lg">
          <div className="relative w-full">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full h-10 ps-10 pe-4 bg-secondary border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
            />
          </div>
        </div>

        {/* Logo - centered */}
        <div className="flex-1 lg:flex-none flex justify-center flex-shrink-0 px-2">
          <Link to="/" className="flex items-center">
            <img
              src={logoImg}
              alt="Mayar Shop"
              className="h-10 md:h-12 w-auto max-w-[140px] md:max-w-[160px] object-contain"
            />
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-1 md:gap-2 lg:gap-3 flex-shrink-0 ms-auto lg:ms-0">
          {/* Mobile search */}
          <button className="md:hidden p-2 text-foreground" aria-label="Search">
            <Search size={20} />
          </button>

          {isLoggedIn ? (
            <>
              <Link
                to="/account"
                className="hidden md:flex items-center gap-1.5 px-2 py-1.5 text-foreground hover:text-brand transition-colors"
                title={user?.fullName}
              >
                <User size={19} />
                <span className="hidden lg:inline text-xs font-medium">{lang === 'ar' ? 'حسابي' : 'Account'}</span>
              </Link>
              <button
                onClick={logout}
                className="hidden md:flex items-center gap-1.5 px-2 py-1.5 text-foreground hover:text-brand transition-colors"
              >
                <span className="hidden lg:inline text-xs font-medium">{lang === 'ar' ? 'خروج' : 'Logout'}</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 px-2 py-1.5 text-foreground hover:text-brand transition-colors"
              >
                <LogIn size={19} />
                <span className="hidden lg:inline text-xs font-medium">{lang === 'ar' ? 'دخول' : 'Login'}</span>
              </Link>
              <Link
                to="/signup"
                className="hidden md:flex items-center gap-1.5 px-2 py-1.5 text-foreground hover:text-brand transition-colors"
              >
                <UserPlus size={19} />
                <span className="hidden lg:inline text-xs font-medium">{lang === 'ar' ? 'تسجيل' : 'Sign Up'}</span>
              </Link>
            </>
          )}

          <Link to="/wishlist" className="hidden md:flex p-2 text-foreground hover:text-brand transition-colors" aria-label="Wishlist">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="relative p-2 text-foreground hover:text-brand transition-colors" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartSummary.itemCount > 0 && (
              <span className="absolute -top-0.5 -end-0.5 bg-brand text-brand-foreground text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full">
                {cartSummary.itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
