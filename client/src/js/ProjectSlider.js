import chinczykImage1 from '../images/slider-chinczyk-1.PNG';
import chinczykImage2 from '../images/slider-chinczyk-2.PNG';
import chinczykImage3 from '../images/slider-chinczyk-3.PNG';

import i20481 from '../images/slider-2048-1.PNG';
import i20482 from '../images/slider-2048-2.PNG';

const chinczykImages = [chinczykImage1, chinczykImage2, chinczykImage3];
const game2048Images = [i20481, i20482];

const images = [chinczykImages, game2048Images];

class ProjectSlider {
  constructor() {
    this.slider = document.querySelector('.slider');
    this.slides = document.querySelectorAll('.slider__slide');
    this.container = document.querySelector('.slider__container');
    this.switches = [];

    this.actuallSlide = 0;
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
    this.actuallSlide = slideNumber;

    this.container.style.left = `${
      slideNumber === 0 ? '0' : '-' + slideNumber + '00%'
    }`;
    this.switches.forEach((switchEl, index) => {
      if (index === slideNumber) {
        switchEl.classList.add('active');
      } else {
        switchEl.classList.remove('active');
      }
    });
  }

  createSliderSwitches() {
    const sliderSwitchesEl = document.createElement('div');
    sliderSwitchesEl.className = 'slider__switches';
    this.slides.forEach((slide, index) => {
      const slideSwitchEl = document.createElement('div');
      slideSwitchEl.className = `slider__switch ${
        index === this.actuallSlide ? 'active' : ''
      }`;
      slideSwitchEl.addEventListener('click', () => this.changeSlide(index));
      this.switches.push(slideSwitchEl);
      sliderSwitchesEl.appendChild(slideSwitchEl);
    });
    document
      .querySelector('.projects__container')
      .appendChild(sliderSwitchesEl);
  }

  init() {
    this.createSliderSwitches();
    this.apendImages();
  }
}

const Slider = new ProjectSlider();
Slider.init();

export default Slider;
