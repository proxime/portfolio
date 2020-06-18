import scroll from './Scroll';

class Menu {
  constructor() {
    this.hamburger = document.querySelector(
      '.navbar__mobile-button .hamburger',
    );
    this.mobileNavbar = document.querySelector('.navbar-mobile');
    this.desktopItems = document.querySelectorAll('.navbar__item');
    this.mobileItems = document.querySelectorAll('.navbar-mobile__item');

    this.scrolling = false;
  }

  scrollToSection(sectionName) {
    if (!this.scrolling) {
      const section = document.querySelector(`.${sectionName}`);
      scroll(section);
      this.scrolling = true;
      setTimeout(() => (this.scrolling = false), 500);
    }
  }

  init() {
    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('is-active');
      this.mobileNavbar.classList.toggle('active');
    });

    this.desktopItems.forEach((item) =>
      item.addEventListener('click', () =>
        this.scrollToSection(item.dataset.section),
      ),
    );

    this.mobileItems.forEach((item) =>
      item.addEventListener('click', () => {
        this.scrollToSection(item.dataset.section);
        this.mobileNavbar.classList.remove('active');
        this.hamburger.classList.remove('is-active');
      }),
    );
  }
}

const menu = new Menu();
export default menu;
