import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ProductImage } from '@/types/product';
import { useLocale } from '@/hooks/useLocale';

interface ProductGalleryProps {
  images: ProductImage[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const { t, dir } = useLocale();
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + images.length) % images.length);
  const next = () => setActive(i => (i + 1) % images.length);

  if (!images.length) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px]">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-md overflow-hidden border-2 transition-colors ${
              i === active ? 'border-brand' : 'border-border hover:border-muted-foreground'
            }`}
          >
            <img src={img.url} alt={t(img.alt)} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-secondary group">
        <img
          src={images[active]?.url}
          alt={images[active] ? t(images[active].alt) : ''}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute top-1/2 start-2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 hover:bg-background transition-colors opacity-0 group-hover:opacity-100">
              {dir === 'rtl' ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            <button onClick={next} className="absolute top-1/2 end-2 -translate-y-1/2 p-1.5 rounded-full bg-background/70 hover:bg-background transition-colors opacity-0 group-hover:opacity-100">
              {dir === 'rtl' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
