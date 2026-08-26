(function () {
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-scroll-target]');
    if (!trigger) return;

    const targetId = trigger.getAttribute('data-scroll-target');
    const target = document.getElementById(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  const links = document.querySelectorAll('.nav-links a, .category-link, .nav-cta, .show-more, .button-primary, .button-secondary');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
    });
  });
})();
