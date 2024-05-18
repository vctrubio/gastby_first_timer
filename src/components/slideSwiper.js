import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export const SlideSwiper = ({ imgs_url }) => {
  const initialActiveIndex = Math.floor(imgs_url.length / 3 - 1);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const [swiper, setSwiper] = useState(null);
  const handleClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
    setActiveIndex(index);
  };

  return (
    <div className="d-flex flex-start" style={{ marginBottom: '6em' }}>
      <Swiper
        modules={[Autoplay]}
        style={{ width: '85%' }}
        spaceBetween={0}
        onSwiper={setSwiper}
        slidesPerView={2}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        initialSlide={initialActiveIndex}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {imgs_url.map((url, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleClick(index)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
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
                transform: activeIndex === index ? 'scale(1.5)' : 'scale(0.3)',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
