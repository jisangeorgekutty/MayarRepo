import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import MainHeader from '@/components/layout/MainHeader';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/common/ProductCard';
import FilterSidebar from '@/components/shop/FilterSidebar';
import SortControls from '@/components/shop/SortControls';
import { useLocale } from '@/hooks/useLocale';
import { products } from '@/data/mock/products';
import type { ProductFilters, SortOption, ProductColor, CategoryItem } from '@/types/product';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const ITEMS_PER_PAGE = 12;

const shopCategories: CategoryItem[] = [
  { id: 'women', slug: 'women', name: { en: 'Women', ar: 'نساء' }, productCount: products.filter(p => p.categoryId === 'women').length },
  { id: 'men', slug: 'men', name: { en: 'Men', ar: 'رجال' }, productCount: products.filter(p => p.categoryId === 'men').length },
  { id: 'accessories', slug: 'accessories', name: { en: 'Accessories', ar: 'إكسسوارات' }, productCount: products.filter(p => p.categoryId === 'accessories').length },
  { id: 'shoes', slug: 'shoes', name: { en: 'Shoes', ar: 'أحذية' }, productCount: products.filter(p => p.categoryId === 'shoes').length },
  { id: 'beauty', slug: 'beauty', name: { en: 'Beauty', ar: 'جمال' }, productCount: products.filter(p => p.categoryId === 'beauty').length },
];

const ShopPage = () => {
  const { lang } = useLocale();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>(() => {
    const cat = searchParams.get('category');
    const sale = searchParams.get('sale');
    return {
      categoryId: cat || undefined,
      isOnSale: sale === 'true' || undefined,
    };
  });
  const [sort, setSort] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Compute available brands/colors from products
  const allBrands = useMemo(() => [...new Set(products.map(p => p.brand.en))].sort(), []);
  const allColors = useMemo(() => {
    const map = new Map<string, ProductColor>();
    products.forEach(p => p.colors.forEach(c => map.set(c.id, c)));
    return [...map.values()];
  }, []);

  const priceRange: [number, number] = useMemo(() => {
    const prices = products.map(p => p.basePrice);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, []);

  // Apply filters and sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.categoryId) result = result.filter(p => p.categoryId === filters.categoryId);
    if (filters.subcategoryId) result = result.filter(p => p.subcategoryId === filters.subcategoryId);
    if (filters.colors?.length) result = result.filter(p => p.colors.some(c => filters.colors!.includes(c.id)));
    if (filters.sizes?.length) result = result.filter(p => p.sizes.some(s => filters.sizes!.includes(s.id)));
    if (filters.brands?.length) result = result.filter(p => filters.brands!.includes(p.brand.en));
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(p => p.basePrice >= min && p.basePrice <= max);
    }
    if (filters.isOnSale) result = result.filter(p => p.isOnSale);
    if (filters.inStock) result = result.filter(p => p.inStock);

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.basePrice - b.basePrice); break;
      case 'price-desc': result.sort((a, b) => b.basePrice - a.basePrice); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'popular': result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case 'newest':
      default: result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return result;
  }, [filters, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => { setPage(1); }, [filters, sort]);

  const t = (en: string, ar: string) => lang === 'ar' ? ar : en;

  // Quick filter chips
  const chips = [
    { label: t('All', 'الكل'), active: !filters.categoryId && !filters.isOnSale, onClick: () => setFilters({}) },
    { label: t('New Arrivals', 'وصل حديثاً'), active: false, onClick: () => setSort('newest') },
    { label: t('On Sale', 'تخفيضات'), active: !!filters.isOnSale, onClick: () => setFilters(f => ({ ...f, isOnSale: !f.isOnSale })) },
    { label: t('Best Sellers', 'الأكثر مبيعاً'), active: false, onClick: () => setSort('popular') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopBar /><MainHeader /><NavBar />

      <main className="container py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">{t('Home', 'الرئيسية')}</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{t('Shop', 'المتجر')}</span>
          {filters.categoryId && (
            <>
              <ChevronRight size={12} />
              <span className="text-foreground capitalize">{filters.categoryId}</span>
            </>
          )}
        </nav>

        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            {filters.categoryId
              ? shopCategories.find(c => c.id === filters.categoryId)?.name?.[lang] || t('Shop', 'المتجر')
              : t('Shop All', 'تسوق الكل')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('Discover our curated collection of premium fashion and lifestyle.', 'اكتشف مجموعتنا المختارة من الأزياء الفاخرة ونمط الحياة.')}
          </p>
        </div>

        {/* Quick filter chips */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {chips.map(chip => (
            <button
              key={chip.label}
              onClick={chip.onClick}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                chip.active
                  ? 'bg-header text-header-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              categories={shopCategories}
              brands={allBrands}
              colors={allColors}
              priceRange={priceRange}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <SortControls
              sort={sort}
              onSortChange={setSort}
              viewMode={viewMode}
              onViewChange={setViewMode}
              resultCount={filteredProducts.length}
              onFilterToggle={() => setFilterOpen(true)}
            />

            {/* Product grid */}
            {paginatedProducts.length > 0 ? (
              <div className={`mt-6 grid gap-4 md:gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-2 md:grid-cols-4'
              }`}>
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} compact={viewMode === 'compact'} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">{t('No products match your filters.', 'لا توجد منتجات مطابقة.')}</p>
                <button onClick={() => setFilters({})} className="mt-2 text-sm text-brand hover:underline">
                  {t('Clear filters', 'مسح التصفية')}
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                      p === page
                        ? 'bg-header text-header-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="w-[300px] overflow-y-auto">
          <FilterSidebar
            filters={filters}
            onChange={(f) => { setFilters(f); }}
            categories={shopCategories}
            brands={allBrands}
            colors={allColors}
            priceRange={priceRange}
            onClose={() => setFilterOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default ShopPage;
