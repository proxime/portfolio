import hash from '../images/hash.svg';
import aboutBgIcon from '../images/programming-icon.svg';

class Main {
  constructor() {
    this.about = document.querySelector('.about');
  }

  addSectionImage(section) {
    const img = new Image();
    img.src = hash;
    img.className = `${section.className}__hash`;
    document.querySelector(`.${section.className}__title`).appendChild(img);
  }

  moveAboutIcon(icon, e) {
    const aboutEl = this.about.querySelector('.about__container');

    const iconPos = {
      x: icon.offsetLeft + aboutEl.offsetLeft,
      y: icon.offsetTop + aboutEl.offsetTop,
    };

    const mousePos = {
      x: e.clientX,
      y: e.clientY + window.scrollY,
    };

    const diff = {
      x: iconPos.x - mousePos.x,
      y: iconPos.y - mousePos.y,
    };

    const transformX = -diff.x * 0.02;
    const transformY = (function() {
      if (-diff.y * 0.02 > 10) {
        return 10;
      } else if (-diff.y * 0.02 < -10) {
        return -10;
      }
      return -diff.y * 0.02;
    })();

    icon.style.transform = `translate(${transformX}px, calc(-50% + ${transformY}px))`;
  }

  handleAbout() {
    const aboutEl = this.about.querySelector('.about__container');

    this.addSectionImage(this.about);
    const icon = new Image();
    icon.src = aboutBgIcon;
    icon.className = 'about__bg-icon';
    aboutEl.appendChild(icon);

    document.addEventListener('mousemove', e => this.moveAboutIcon(icon, e));
  }

  init() {
    this.handleAbout();
  }
}

const main = new Main();

export default main;
