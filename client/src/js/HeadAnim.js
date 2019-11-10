const belts = [...document.querySelectorAll('.belt')];
const oddBelts = belts.filter((belt, index) => (index % 2 ? belt : null));
const evenBelts = belts.filter((belt, index) => (!(index % 2) ? belt : null));

export default function() {
  TweenMax.set(belts, { visibility: 'visible' });
  TweenMax.set(oddBelts, { x: '-150%' });
  TweenMax.set(evenBelts, { x: '150%' });
  TweenMax.staggerTo(oddBelts, 1, { x: '+=150%', ease: Power2.easeOut }, 0.2);
  TweenMax.staggerTo(evenBelts, 1, { x: '-=150%', ease: Power2.easeOut }, 0.2);
}
