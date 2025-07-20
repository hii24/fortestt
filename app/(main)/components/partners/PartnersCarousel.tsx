'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay'
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';

export function PartnersCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center', containScroll: 'trimSnaps' }, [
    AutoScroll({}),
  ]);

  const images = [
    '/icons/partners/gate.svg',
    '/icons/partners/whitebit.svg',
    '/icons/partners/binance.svg',
    '/icons/partners/amlbot.svg',
  ];

  // Duplicate the images array to have more slides for smoother scrolling
  const duplicatedImages = [...images, ...images, ...images, ...images, ...images];

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {duplicatedImages.map((image, index) => {
          return (
            <div key={index} className="embla__slide__partners">
              <Image src={image} alt={'image partner'} width={200} height={200}></Image>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PartnersCarousel;
