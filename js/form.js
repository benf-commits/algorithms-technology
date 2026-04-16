// Newsletter form handler — calls Supabase edge function
(function () {
  var ENDPOINT = 'https://wgfptqqdumhhldsitoaj.supabase.co/functions/v1/contact-welcome';
  var ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZnB0cXFkdW1oaGxkc2l0b2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTE3NjIsImV4cCI6MjA5MDI2Nzc2Mn0.tGgLTc0yPlahCjoRQ4EaSze9NLtEPZ4YR7jPLJeWLl8';

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
          'Authorization': 'Bearer ' + ANON_KEY,
          'apikey': ANON_KEY
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
