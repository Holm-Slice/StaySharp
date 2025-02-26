export function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const start = window.pageYOffset;
  const distance = targetElement.getBoundingClientRect().top;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1); // Ensure progress does not exceed 1
    const easeProgress = easeInOutCubic(progress);
    const scrollPosition = start + distance * easeProgress;

    window.scrollTo(0, scrollPosition);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, start + distance); // Ensure it ends exactly at the target
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  requestAnimationFrame(animation);
}
