import hash from '../images/hash.svg';
import aboutBgIcon from '../images/programming-icon.svg';

class Main {
  constructor() {
    // Sections
    this.about = document.querySelector('.about');
    this.skills = document.querySelector('.skills');

    // About Icon Animation
    this.mousePos = {
      x: null,
      y: null,
    };
    this.aboutIconPos = {
      x: null,
      y: null,
    };
    this.icon = null;
    this.aboutIconOffset = {
      x: 0,
      y: 0,
    };
  }

  addSectionImage(section) {
    const img = new Image();
    img.src = hash;
    img.className = `${section.className}__hash`;
    document.querySelector(`.${section.className}__title`).appendChild(img);
  }

  moveAboutIcon(e) {
    const aboutEl = this.about.querySelector('.about__container');
    this.aboutIconPos = {
      x: this.icon.offsetLeft + aboutEl.offsetLeft,
      y: this.icon.offsetTop + aboutEl.offsetTop,
    };

    this.mousePos = {
      x: e.clientX,
      y: e.clientY + window.scrollY,
    };
  }

  aboutIconAnimation() {
    const speed = 0.5;

    const diff = {
      x: (this.mousePos.x - this.aboutIconPos.x) * 0.02,
      y: (this.mousePos.y - this.aboutIconPos.y) * 0.04,
    };

    if (diff.x > 20) diff.x = 20;
    else if (diff.x < -20) diff.x = -20;

    if (diff.y > 20) diff.y = 20;
    else if (diff.y < -20) diff.y = -20;

    if (this.mousePos.x < this.aboutIconPos.x) {
      if (this.aboutIconOffset.x > diff.x) this.aboutIconOffset.x -= speed;
      else if (this.aboutIconOffset.x < diff.x) this.aboutIconOffset.x += speed;
    } else if (this.mousePos.x > this.aboutIconPos.x) {
      if (this.aboutIconOffset.x > diff.x) this.aboutIconOffset.x -= speed;
      else if (this.aboutIconOffset.x < diff.x) this.aboutIconOffset.x += speed;
    }

    if (this.mousePos.y < this.aboutIconPos.y) {
      if (this.aboutIconOffset.y > diff.y) this.aboutIconOffset.y -= speed;
      if (this.aboutIconOffset.y < diff.y) this.aboutIconOffset.y += speed;
    } else if (this.mousePos.y > this.aboutIconPos.y) {
      if (this.aboutIconOffset.y < diff.y) this.aboutIconOffset.y += speed;
      if (this.aboutIconOffset.y > diff.y) this.aboutIconOffset.y -= speed;
    }

    this.icon.style.transform = `translate(${this.aboutIconOffset.x}px, calc(-50% + ${this.aboutIconOffset.y}px))`;

    requestAnimationFrame(() => this.aboutIconAnimation());
  }

  handleAbout() {
    const aboutEl = this.about.querySelector('.about__container');

    this.addSectionImage(this.about);
    this.icon = new Image();
    this.icon.src = aboutBgIcon;
    this.icon.className = 'about__bg-icon';
    aboutEl.appendChild(this.icon);

    document.addEventListener('mousemove', (e) => this.moveAboutIcon(e));

    requestAnimationFrame(() => this.aboutIconAnimation());
  }

  handleSkills() {
    this.addSectionImage(this.skills);
  }

  init() {
    this.handleAbout();
    this.handleSkills();
  }
}

const main = new Main();

export default main;
