// Mobile navigation enhancements
(function () {
  var btn = document.querySelector('.nav__toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      mobileNav.classList.remove('is-open');
      btn.focus();
    }
  });

  // Close when clicking a link (mobile)
  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileNav.classList.remove('is-open');
    });
  });
})();
