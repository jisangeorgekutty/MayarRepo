import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import TopBar from '@/components/layout/TopBar';
import MainHeader from '@/components/layout/MainHeader';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import ReviewsSection from '@/components/product/ReviewsSection';
import ProductSection from '@/components/home/ProductSection';
import { useLocale } from '@/hooks/useLocale';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { products, getProductBySlug, getRelatedProducts } from '@/data/mock/products';

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLocale();
  const { viewedIds, addViewed } = useRecentlyViewed();
  const product = getProductBySlug(slug || '');

  useEffect(() => {
    if (product) addViewed(product.id);
    window.scrollTo(0, 0);
  }, [product, addViewed]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar /><MainHeader /><NavBar />
        <div className="container py-20 text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
            {lang === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}
          </h1>
          <Link to="/shop" className="text-brand hover:underline">{lang === 'ar' ? 'تصفح المتجر' : 'Browse Shop'}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = getRelatedProducts(product.id);
  const recentProducts = viewedIds
    .filter(id => id !== product.id)
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <div className="min-h-screen bg-background">
      <TopBar /><MainHeader /><NavBar />

      <main className="container py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-foreground whitespace-nowrap">{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-foreground whitespace-nowrap">{lang === 'ar' ? 'المتجر' : 'Shop'}</Link>
          <ChevronRight size={12} />
          <span className="text-foreground truncate">{t(product.name)}</span>
        </nav>

        {/* Product main */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />

        <div className="mt-12">
          <ReviewsSection reviews={product.reviews} rating={product.rating} reviewCount={product.reviewCount} />
        </div>
      </main>

      {related.length > 0 && (
        <ProductSection titleEn="Related Products" titleAr="منتجات مشابهة" products={related} viewAllHref="/shop" />
      )}

      {recentProducts.length > 0 && (
        <ProductSection titleEn="Recently Viewed" titleAr="شاهدتها مؤخراً" products={recentProducts} viewAllHref="/shop" />
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
