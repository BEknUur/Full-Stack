'use strict'


const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 100,
  },

  direction: 'horizontal',
  loop: true,
  parallax: true,
  speed: 1200,
  autoplay: true,
  autoplayDisableOnInteraction: false,
  waitForTransition: false,
  
  pagination: {
    el: '.swiper-pagination',
  },


  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const observer = new IntersectionObserver(entries => {
  const firstEntry = entries[0];
  if (firstEntry.isIntersecting) {
    swiper.autoplay.start();
  } else {
    swiper.autoplay.stop();
  }
});

const swiperContainer = document.querySelector('.swiper');
observer.observe(swiperContainer);