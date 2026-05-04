'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
        <Image 
          src={activeImage || 'https://picsum.photos/800/800'} 
          alt="Product image" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(img)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                activeImage === img ? 'border-accent-green' : 'border-transparent hover:border-gray-200'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
