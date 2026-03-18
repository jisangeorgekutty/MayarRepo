import { Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';
import type { ProductItem } from '@/types/product';
import { useState } from 'react';

interface ProductCardProps {
  product: ProductItem;
  compact?: boolean;
}

const ProductCard = ({ product, compact }: ProductCardProps) => {
  const { t, formatPrice } = useLocale();
  const [liked, setLiked] = useState(false);
  const primaryImg = product.images.find(i => i.isPrimary) || product.images[0];
  const discount = product.compareAtPrice
    ? Math.round((1 - product.basePrice / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:shadow-md transition-shadow">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={primaryImg?.url}
          alt={primaryImg ? t(primaryImg.alt) : t(product.name)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 start-2 flex flex-col gap-1">
          {product.isOnSale && discount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-header text-header-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              NEW
            </span>
          )}
        </div>
        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-2 end-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors z-10"
          aria-label="Wishlist"
        >
          <Heart size={16} className={liked ? 'fill-destructive text-destructive' : 'text-muted-foreground'} />
        </button>
      </Link>

      {/* Info */}
      <div className={`p-3 ${compact ? 'p-2' : 'p-3'}`}>
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-0.5 truncate">
          {t(product.brand)}
        </p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-foreground leading-tight mb-1.5 line-clamp-2 hover:text-brand transition-colors">
            {t(product.name)}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={11}
                className={star <= Math.round(product.rating) ? 'fill-brand text-brand' : 'text-border'}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{formatPrice(product.basePrice)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {product.colors.slice(0, 5).map(color => (
              <span
                key={color.id}
                className="w-3.5 h-3.5 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={t(color.name)}
              />
            ))}
            {product.colors.length > 5 && (
              <span className="text-[10px] text-muted-foreground">+{product.colors.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
