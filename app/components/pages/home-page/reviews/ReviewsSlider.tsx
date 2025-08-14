'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import ava from '@/public/_home/_reviews/ava.svg';
import Link from 'next/link';
import { EmblaCarouselType } from 'embla-carousel';
import { useTranslations } from 'next-intl';

interface Review {
  userName: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
  date: string;
  image: string;
  link: string;
}

interface ReviewItem {
  id: number;
  type: string;
  review: Review;
}

const ReviewsSlider = () => {
  const tHome = useTranslations('home');
  const tReviews = useTranslations('home.reviews');
  const reviewGroups: ReviewItem[] = React.useMemo(
    () => [
      {
        id: 1,
        type: 'simple',
        review: {
          userName: 'John Aruest',
          rating: 5,
          reviewTitle: tReviews('title1'),
          reviewText: tReviews('text1'),
          date: 'Jun 14, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/684d79fe5d196e5e44717340',
        },
      },
      {
        id: 2,
        type: 'simple',
        review: {
          userName: 'Dolfchail',
          rating: 5,
          reviewTitle: tReviews('title2'),
          reviewText: tReviews('text2'),
          date: 'Jun 13, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/684c0b3f759030e306784a30',
        },
      },
      {
        id: 3,
        type: 'simple',
        review: {
          userName: 'Arthur Dep',
          rating: 4,
          reviewTitle: tReviews('title3'),
          reviewText: tReviews('text3'),
          date: 'Jun 13, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/6849d5e6a5af259091c1ab73',
        },
      },
      {
        id: 4,
        type: 'simple',
        review: {
          userName: 'Bendjok',
          rating: 5,
          reviewTitle: tReviews('title4'),
          reviewText: tReviews('text4'),
          date: 'Jun 12, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/684b0eafef42e6b5eb5ff1a7',
        },
      },
      {
        id: 5,
        type: 'simple',
        review: {
          userName: 'Misha P',
          rating: 5,
          reviewTitle: tReviews('title5'),
          reviewText: tReviews('text5'),
          date: 'Jun 12, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/684ab8cac9b306a425c54df2',
        },
      },
      {
        id: 6,
        type: 'simple',
        review: {
          userName: 'Bin Asa Ri',
          rating: 5,
          reviewTitle: tReviews('title6'),
          reviewText: tReviews('text6'),
          date: 'Jun 10, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/6847491a084f18cfa90dd2c0',
        },
      },
      {
        id: 7,
        type: 'simple',
        review: {
          userName: 'Mico Guddzfield',
          rating: 5,
          reviewTitle: tReviews('title7'),
          reviewText: tReviews('text7'),
          date: 'Jun 8, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/68454ba27409752774d9f50f',
        },
      },
      {
        id: 8,
        type: 'simple',
        review: {
          userName: 'Poachok',
          rating: 5,
          reviewTitle: tReviews('title8'),
          reviewText: tReviews('text8'),
          date: 'Jun 7, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/6843f7d651cd17449fc60f38',
        },
      },
      {
        id: 9,
        type: 'simple',
        review: {
          userName: 'Munilo Too',
          rating: 5,
          reviewTitle: tReviews('title9'),
          reviewText: tReviews('text9'),
          date: 'May 20, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/682c97fcad16ffdb16fb3130',
        },
      },
      {
        id: 10,
        type: 'simple',
        review: {
          userName: 'Dimitar Ivanov',
          rating: 5,
          reviewTitle: tReviews('title10'),
          reviewText: tReviews('text10'),
          date: 'May 20, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/682a4d3fd98d117019adeb12',
        },
      },
      {
        id: 11,
        type: 'simple',
        review: {
          userName: 'Lucas',
          rating: 5,
          reviewTitle: tReviews('title11'),
          reviewText: tReviews('text11'),
          date: 'May 20, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/6828f803b47a868735a2c026',
        },
      },
      {
        id: 12,
        type: 'simple',
        review: {
          userName: 'Ardian Berish',
          rating: 5,
          reviewTitle: tReviews('title12'),
          reviewText: tReviews('text12'),
          date: 'May 16, 2025',
          image: ava,
          link: 'https://www.trustpilot.com/reviews/682647355fccb529617c265a',
        },
      },
    ],
    [tReviews]
  );

  const [slidesPerView, setSlidesPerView] = useState(4);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSlidesPerView = useCallback(() => {
    if (window.innerWidth < 768) {
      // md breakpoint
      setSlidesPerView(1);
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      // between md and lg
      setSlidesPerView(2);
    } else if (window.innerWidth >= 1024 && window.innerWidth < 1280) {
      // between lg and xl
      setSlidesPerView(3);
    } else {
      // xl and above
      setSlidesPerView(4);
    }
  }, []);

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, [updateSlidesPerView]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
  });

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const renderReview = (item: ReviewItem) => {
    const { review } = item;

    return (
      <div className="bg-[#FFFAFA]  w-full rounded-2xl p-5 min-h-[312px] flex flex-col justify-between transition-all duration-700 hover:shadow-[0px_0px_17px_0px_rgba(52,96,253,0.5)]">
        <div className="flex items-center w-full gap-[10px]">
          <span className="flex justify-center items-center gap-2.5">
            <Image src={review.image} alt="avatar" width={40} height={40} />
          </span>
          <p className="font-medium text-base leading-none font-[Roboto] text-[#7d7878]">{review.userName}</p>
          <div className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Image
                key={i}
                src={i < review.rating ? '/icons/star-active.svg' : '/icons/star-disable.svg'}
                alt={i < review.rating ? 'star active' : 'star disable'}
                width={14}
                height={14}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex-1">
          {review.reviewTitle && (
            <p className="font-medium text-lg leading-none font-[Roboto] mb-1.5">{review.reviewTitle}</p>
          )}
          <span className="font-normal text-base leading-none font-[Roboto]">{review.reviewText}</span>
        </div>

        <div className="flex justify-start items-center gap-2.5 text-sm font-medium leading-none font-[Roboto] text-[#7d7878]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 18.0393L17.2143 16.7013L19.3929 23.5L12 18.0393ZM24 9.25157H14.8214L12 0.5L9.17857 9.25157H0L7.42858 14.6761L4.60714 23.4277L12.0357 18.0031L16.6071 14.6761L24 9.25157Z"
              fill="#219653"
            />
          </svg>
          <span>{review.date} Via TrustPilot</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full select-none flex flex-col ">
      <p className="mt-[100px] text-[#3460fd] font-bold text-3xl font-[Inter] px-4 md:px-6 lg:px-8">
        {tHome('reviews.title')}
      </p>

      <div className="overflow-hidden w-full py-[50px] px-4 md:px-6 lg:px-8" ref={emblaRef}>
        <div className="flex">
          {reviewGroups.map((item) => (
            <Link
              href={item.review.link}
              target={'_blank'}
              key={item.id}
              className={`${
                item.id !== reviewGroups[reviewGroups.length - 1].id ? 'mr-[20px]' : ''
              } w-full flex-[0_0_100%] md:flex-[0_0_calc(300px)] xl:flex-[0_0_calc(350px)] flex justify-center`}>
              {renderReview(item)}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex gap-2.5 justify-center">
        {Array.from({ length: Math.ceil(reviewGroups.length / slidesPerView) }).map((_, index) => (
          <div
            key={index}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
              Math.floor(selectedIndex / slidesPerView) === index ? 'bg-[#3460fd]' : 'bg-[#cdc8c8]'
            }`}
            onClick={() => scrollTo(index * slidesPerView)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSlider;
