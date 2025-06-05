export const smoothScroll = (target, duration = 800, offset = 80) => {
  // Handle both ID selectors and direct element references
  const targetElement = target.startsWith('#') ? document.querySelector(target) : document.getElementById(target.replace('#', ''));
  if (!element) {
    console.error(`Element with target ${target} not found.`);
    return;
  }

  const targetPosition = element.offsetTop - offset; // Subtract offset to prevent scrolling too far
  const startPosition = window.scrollY; // Current scroll position
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  // Cubic easing function for smoother scrolling
  const easeInOutCubic = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  };

  requestAnimationFrame(animation);
};