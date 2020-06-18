export default (target, offset) => {
  const targetPosition = target.offsetTop;
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const distance = offset
    ? targetPosition - navbarHeight - offset
    : targetPosition - navbarHeight;

  window.scroll({
    top: distance,
    behavior: 'smooth',
  });
};
