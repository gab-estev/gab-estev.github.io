(() => {
  const snoopy = document.getElementById('snoopyFlyby');
  const image = snoopy?.querySelector('img');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!snoopy || !image || motionPreference.matches) return;

  let nextFlight;
  let flying = false;

  function randomBetween(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  function scheduleFlight(delay = randomBetween(9000, 19000)) {
    window.clearTimeout(nextFlight);
    nextFlight = window.setTimeout(flyBy, delay);
  }

  function flyBy() {
    if (document.hidden || flying || !image.complete || !image.naturalWidth) {
      scheduleFlight(randomBetween(8000, 14000));
      return;
    }
    flying = true;
    snoopy.classList.remove('fly-left', 'fly-right');
    snoopy.style.top = `${randomBetween(12, 76)}vh`;
    snoopy.style.setProperty('--flight-duration', `${randomBetween(9000, 14500)}ms`);
    void snoopy.offsetWidth;
    snoopy.classList.add(Math.random() > 0.5 ? 'fly-left' : 'fly-right');
  }

  snoopy.addEventListener('animationend', () => {
    snoopy.classList.remove('fly-left', 'fly-right');
    flying = false;
    scheduleFlight(randomBetween(24000, 48000));
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !flying) scheduleFlight(randomBetween(7000, 13000));
  });
  motionPreference.addEventListener?.('change', (event) => {
    if (event.matches) {
      window.clearTimeout(nextFlight);
      snoopy.classList.remove('fly-left', 'fly-right');
      flying = false;
    } else {
      scheduleFlight(5000);
    }
  });
  scheduleFlight();
})();
