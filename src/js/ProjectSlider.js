import scroll from './Scroll';

import stronyImage1 from '../images/slider-strony-1.PNG';
import stronyImage2 from '../images/slider-strony-2.PNG';

import chinczykImage1 from '../images/slider-chinczyk-1.PNG';
import chinczykImage2 from '../images/slider-chinczyk-2.PNG';
import chinczykImage3 from '../images/slider-chinczyk-3.PNG';

import memory1 from '../images/slider-memory-1.PNG';
import memory2 from '../images/slider-memory-2.PNG';
import memory3 from '../images/slider-memory-3.PNG';

import i20481 from '../images/slider-2048-1.PNG';
import i20482 from '../images/slider-2048-2.PNG';

import airImage1 from '../images/slider-air-1.PNG';
import airImage2 from '../images/slider-air-2.PNG';
import airImage3 from '../images/slider-air-3.PNG';

import swImage1 from '../images/slider-sw-1.PNG';
import swImage2 from '../images/slider-sw-2.PNG';

import taskerImage1 from '../images/slider-tasker-1.PNG';
import taskerImage2 from '../images/slider-tasker-2.PNG';
import taskerImage3 from '../images/slider-tasker-3.PNG';

import talkerImage1 from '../images/slider-talker-1.PNG';
import talkerImage2 from '../images/slider-talker-2.PNG';

const stronyImages = [stronyImage1, stronyImage2];
const chinczykImages = [chinczykImage1, chinczykImage2, chinczykImage3];
const memoryImages = [memory1, memory2, memory3];
const game2048Images = [i20481, i20482];
const airImages = [airImage1, airImage2, airImage3];
const swImages = [swImage1, swImage2];
const taskerImages = [taskerImage1, taskerImage2, taskerImage3];
const talkerImages = [talkerImage1, talkerImage2];

const images = [
  stronyImages,
  chinczykImages,
  memoryImages,
  game2048Images,
  airImages,
  swImages,
  taskerImages,
  talkerImages,
];

class ProjectSlider {
  constructor() {
    this.slider = document.querySelector('.slider');
    this.slides = document.querySelectorAll('.slider__slide');
    this.container = document.querySelector('.slider__container');
    this.arrows = document.querySelectorAll('.slider__arrow');
    this.switches = [];

    this.actuallSlide = 0;
    this.sliderLength = images.length;
    this.actualImages = [];
    for (let i = 0; i < images.length; ++i) {
      this.actualImages[i] = {
        el: this.slides[i].querySelector('.slider__main img'),
        number: 0,
      };
    }
  }

  changeSlideImage(slide, number) {
    this.actualImages[slide].number = number;
    this.actualImages[slide].el.src = images[slide][number];

    this.slides[slide]
      .querySelectorAll('.slider__photo')
      .forEach((photo, index) => {
        if (index === number) {
          photo.classList.add('active');
        } else {
          photo.classList.remove('active');
        }
      });
  }

  apendImages() {
    images.forEach((imagesArr, index) => {
      imagesArr.forEach((image, i) => {
        const photoEl = document.createElement('div');
        const imageEl = document.createElement('img');

        photoEl.className = `slider__photo ${
          this.actualImages[index].number === i ? 'active' : ''
        }`;
        imageEl.src = image;

        photoEl.addEventListener('click', () =>
          this.changeSlideImage(index, i),
        );

        photoEl.appendChild(imageEl);
        this.slides[index]
          .querySelector('.slider__photos')
          .appendChild(photoEl);
      });
    });
  }

  changeSlide(slideNumber) {
    scroll(document.querySelector('.projects'), -this.slider.offsetTop);
    this.container.style.transition = `transform ${
      Math.abs(this.actuallSlide - slideNumber) * 0.2
    }s ease-in`;

    this.container.style.transform = `${
      slideNumber === 0
        ? 'translateX(0)'
        : 'translateX(-' + slideNumber + '00%)'
    }`;
    this.switches.forEach((switchEl, index) => {
      if (index === slideNumber) {
        switchEl.classList.add('active');
      } else {
        switchEl.classList.remove('active');
      }
    });

    this.arrows.forEach((arrow) => (arrow.disabled = false));
    if (slideNumber === 0) {
      document.querySelector('.slider__arrow--left').disabled = true;
    } else if (slideNumber === this.sliderLength - 1) {
      document.querySelector('.slider__arrow--right').disabled = true;
    }

    this.actuallSlide = slideNumber;
  }

  createSliderSwitches() {
    const sliderSwitchesEl = document.querySelector('.slider__switches');
    this.slides.forEach((_, index) => {
      const slideSwitchEl = document.createElement('div');
      slideSwitchEl.className = `slider__switch ${
        index === this.actuallSlide ? 'active' : ''
      }`;
      slideSwitchEl.addEventListener('click', () => this.changeSlide(index));
      this.switches.push(slideSwitchEl);
      sliderSwitchesEl.appendChild(slideSwitchEl);
    });
  }

  init() {
    this.arrows.forEach((arrow) =>
      arrow.addEventListener('click', () => {
        const isLeft = arrow.dataset.direction === 'left';
        this.changeSlide(
          isLeft ? this.actuallSlide - 1 : this.actuallSlide + 1,
        );
      }),
    );

    this.createSliderSwitches();
    this.apendImages();
  }
}

const Slider = new ProjectSlider();
Slider.init();

export default Slider;
