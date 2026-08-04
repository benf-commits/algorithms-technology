// Newsletter form handler — calls the newsletter-signup edge function.
//
// NOT LOADED BY ANY PAGE as at 04/08/2026. The signup form came off the site
// while the backend was down, so no page includes this script and privacy.html
// states that the site collects nothing. To bring the form back: restore the
// newsletter section markup, add <script src="js/form.js"></script> to each
// page, and confirm public.newsletter_signups exists in the fitz-brain project.
//
// Backend moved off the standalone algorithms.technology Supabase project, which
// is paused, so every signup during the pause failed. Signups now land in the
// fitz-brain project, table public.newsletter_signups.
//
// SITE_TOKEN is public by design. It is not a credential: the function holds no
// read access, only inserts, and the token exists so a bot has to read this file
// rather than POST at the endpoint blind.
(function () {
  var ENDPOINT = 'https://upddzgdnopjrulgfxcgd.supabase.co/functions/v1/newsletter-signup';
  var SITE_TOKEN = 'dab2bd01083870119e311e7ec485c28b2a47234a34b0dc91731b2f70e3e5a586';

  var forms = document.querySelectorAll('#newsletter-form');
  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var msg = form.querySelector('#form-message');
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;

      // Honeypot check
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return;

      // Collect fields — compact form only has email, full form has all fields
      var data = { email: form.querySelector('input[name="email"]').value };

      var name = form.querySelector('input[name="name"]');
      if (name && name.value) data.name = name.value;

      var role = form.querySelector('select[name="role"]');
      if (role && role.value) data.role = role.value;

      var state = form.querySelector('select[name="state"]');
      if (state && state.value) data.state = state.value;

      var school = form.querySelector('input[name="school"]');
      if (school && school.value) data.school = school.value;

      // Source tracking
      data.source = window.location.pathname;

      btn.textContent = 'Sending...';
      btn.disabled = true;

      fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-site-token': SITE_TOKEN
        },
        body: JSON.stringify(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Server error');
          if (msg) {
            msg.textContent = 'Thank you. You\'ll hear from us when it matters.';
            msg.style.color = '#4ade80';
          }
          form.reset();
        })
        .catch(function () {
          if (msg) {
            msg.textContent = 'Something went wrong. Email hello@algorithms.technology instead.';
            msg.style.color = '#f87171';
          }
        })
        .finally(function () {
          btn.textContent = original;
          btn.disabled = false;
        });
    });
  });
})();
