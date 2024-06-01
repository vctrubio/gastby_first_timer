import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const SlideSwiper = ({ imgs_url }) => {
  const initialActiveIndex = Math.floor(imgs_url.length / 3 - 1);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [swiper, setSwiper] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const handleClick = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
    setActiveIndex(index);
  };

  return (
    <div className="d-flex flex-start" style={{ marginBottom: '6em', width: '101vw', margin: '0 !important'}}>
      {isMobile ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          style={{ width: '100%' }}
          onSwiper={setSwiper}
          slidesPerView={1}
          grabCursor={true}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {imgs_url.map((url, index) => (
            <SwiperSlide key={index}>
              <img
                src={url}
                alt={`Slide ${index}`}
                loading="eager"
                onLoad={(e) => e.target.style.opacity = 1}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '60vh'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          modules={[Autoplay]}
          style={{ width: '85%' }}
          spaceBetween={0}
          onSwiper={setSwiper}
          slidesPerView={2}
          grabCursor={true}
          centeredSlides={true}
          lazy={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          initialSlide={initialActiveIndex}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {imgs_url.map((url, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleClick(index)}
              loading="eager"
              onLoad={(e) => e.target.style.opacity = 1}
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
      )}
    </div>
  );
};
