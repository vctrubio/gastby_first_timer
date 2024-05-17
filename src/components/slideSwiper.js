
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

export const SlideSwiper = ({nodes}) => {
  SwiperCore.use([Autoplay, EffectCoverflow]);
  const indexSpace = window.innerWidth < 768 ? 2 : 5;
  
  const imgs_url = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
    'https://swiperjs.com/demos/images/nature-4.jpg',
    'https://swiperjs.com/demos/images/nature-5.jpg',
    'https://swiperjs.com/demos/images/nature-6.jpg'
  ];

  const initialActiveIndex = Math.floor(imgs_url.length / 3); // Set initial active index
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex); // State to track active index

  const [swiper, setSwiper] = useState(null);
  const handleClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
    setActiveIndex(index); // Update active index when a slide is clicked
  };
  

  return (
    <div className="d-flex flex-start" style={{ marginBottom: '8em'}}>
      <Swiper
        style={{ width: '85%' }}
        spaceBetween={0}
        onSwiper={setSwiper}
        slidesPerView={2}
        grabCursor={true}
        centeredSlides={true}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        initialSlide={initialActiveIndex}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update activeIndex on slide change
      >
        {imgs_url.map((url, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleClick(index)}
            style={{
              display: 'flex',
              alignItems: 'center', // Center children vertically
              justifyContent: 'center', // Center children horizontally
              height: '100%', // Take full height
            }}
          >
            <img
              src={url}
              alt={`Slide ${index}`}
              style={{
                verticalAlign: 'baseline',
                height: activeIndex === index ? '50vh' : '100%',
                width: activeIndex === index ? '100%' : '80%',
                objectFit: 'cover',
                opacity: activeIndex === index ? 1 : 0.2,
                transform: activeIndex === index ? 'scale(1.4)' : 'scale(.3)',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};
