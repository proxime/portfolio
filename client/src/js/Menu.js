class Menu {
  constructor() {
    this.hamburger = document.querySelector(
      '.navbar__mobile-button .hamburger',
    );
    this.mobileNavbar = document.querySelector('.navbar-mobile');
  }

  init() {
    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('is-active');
      this.mobileNavbar.classList.toggle('active');
    });
  }
}

const menu = new Menu();
export default menu;
