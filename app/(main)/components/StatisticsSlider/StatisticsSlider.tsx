'use client';
import React, { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import styles from './styles.module.css';

const StatisticsSlider = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Configure embla carousel with AutoScroll plugin
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
    },
    [AutoScroll({ speed: 1 })]
  );

  // Check if we're on mobile for responsive design
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Statistics items data
  const statisticsItems = [
    {
      id: 1,
      title: '3643+',
      description: 'Visits today',
    },
    {
      id: 2,
      title: '7min',
      description: 'Average processing time',
    },
    {
      id: 3,
      title: '864+',
      description: 'Transactions carried out',
    },
    {
      id: 4,
      title: '615',
      description: 'Active Users',
    },
  ];

  return (
    <div className={styles.toDayStatisctic}>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {statisticsItems.map((item) => (
            <div
              key={item.id}
              className="embla__slide__statistics"
              style={{
                flex: isMobile ? '0 0 100%' : '0 0 calc(25% - 15px)',
                minWidth: isMobile ? '100%' : 'calc(25% - 15px)',
                margin: '0 7.5px',
              }}>
              <h1 className={styles.toDayStatisticsBlocksText}>{item.title}</h1>
              <h5 className={styles.toDayStatisticsBlocksDescriptionText}>{item.description}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSlider;
