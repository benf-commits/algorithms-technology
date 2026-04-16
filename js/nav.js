// Mobile navigation toggle
(function () {
  var btn = document.querySelector('.nav__toggle');
  var mobile = document.getElementById('mobile-nav');
  if (!btn || !mobile) return;

  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    mobile.classList.toggle('is-open');
    document.body.style.overflow = open ? '' : 'hidden';
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobile.classList.contains('is-open')) {
      btn.setAttribute('aria-expanded', 'false');
      mobile.classList.remove('is-open');
      document.body.style.overflow = '';
      btn.focus();
    }
  });

  // Close when clicking a link (mobile)
  mobile.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (mobile.classList.contains('is-open')) {
        btn.setAttribute('aria-expanded', 'false');
        mobile.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });
})();
