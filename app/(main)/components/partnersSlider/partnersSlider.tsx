'use client';
import React from 'react';
import Slider from 'react-slick';
import styles from './styles.module.css';
import Image from 'next/image';

const PartnersSlider = () => {
  const partners = [
    { id: 1, logo: '/icons/exodus.svg', alt: 'Exodus' },
    { id: 2, logo: '/icons/edge.svg', alt: 'Edge' },
    { id: 3, logo: '/icons/adex.svg', alt: 'Adex' },
    { id: 4, logo: '/icons/monero.svg', alt: 'Monero' },
    { id: 5, logo: '/icons/ledger.svg', alt: 'Ledger' },
    { id: 6, logo: '/icons/swapzone.svg', alt: 'Swapzone' },
    { id: 7, logo: '/icons/coin-market.svg', alt: 'Coin Market' },
    { id: 8, logo: '/icons/coin-market.svg', alt: 'Coin Market' },
  ];

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id="partners" className={styles.partners}>
      <span>List of our partners</span>
      <Slider {...settings} className={styles.partnersBlocks}>
        {partners.map((partner) => (
          <div key={partner.id} className={styles.partnersBlock}>
            <Image src={partner.logo} alt={partner.alt} width={200} height={200} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PartnersSlider;
