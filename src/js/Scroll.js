const ease = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

export default (target, duration, offset) => {
  const targetPosition = target.offsetTop;
  const startPosition = window.scrollY;
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  console.log(offset);
  const distance = offset
    ? targetPosition - startPosition - navbarHeight - offset
    : targetPosition - startPosition - navbarHeight;
  let startTime = null;
  let sameDistance = 0;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    if (run === startPosition) sameDistance++;
    if (sameDistance >= 2) return;
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  requestAnimationFrame(animation);
};
