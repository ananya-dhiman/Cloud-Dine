import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ImageCarousel = ({ images, alt = 'Image' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, emblaMainApi] = useEmblaCarousel({ loop: true });
  const [thumbViewportRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on('select', onSelect);
    return () => {
      emblaMainApi.off('select', onSelect);
    };
  }, [emblaMainApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  const scrollNext = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  if (!images || images.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-lg bg-muted">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-lg shadow-carousel transition-shadow duration-300 hover:shadow-carousel-hover">
        <div ref={mainViewportRef} className="overflow-hidden">
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative min-w-0 flex-[0_0_100%]"
                style={{ aspectRatio: '16/9' }}
              >
                <img
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
              onClick={scrollPrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background hover:scale-110"
              onClick={scrollNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-background/80 px-3 py-1 text-sm font-medium backdrop-blur-sm">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="overflow-hidden" ref={thumbViewportRef}>
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={`relative min-w-0 flex-[0_0_20%] overflow-hidden rounded-md transition-all duration-300 ${
                  index === selectedIndex
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <div className="aspect-video">
                  <img
                    src={image}
                    alt={`${alt} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
