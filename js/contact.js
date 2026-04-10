// algorithms.technology contact form handler
(function() {
  var ENDPOINT = 'https://nmfzcozvatcjmznuslst.supabase.co/functions/v1/contact-welcome';

  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Honeypot
      var hp = form.querySelector('[name="website"]');
      if (hp && hp.value) return;

      var btn = form.querySelector('button[type="submit"]');
      var msg = document.getElementById('form-message');
      var originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = 'Submitting...';
      if (msg) msg.textContent = '';

      var data = {
        email: form.querySelector('[name="email"]').value.trim(),
        name: form.querySelector('[name="name"]').value.trim() || null,
        school: form.querySelector('[name="school"]').value.trim() || null,
        role: form.querySelector('[name="role"]').value || null,
        state: form.querySelector('[name="state"]').value || null,
        source: 'schools'
      };

      if (!data.email) {
        btn.disabled = false;
        btn.textContent = originalText;
        if (msg) msg.textContent = 'Please enter your email address.';
        return;
      }

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function(response) {
        if (response.ok) {
          form.reset();
          btn.textContent = 'Signed up';
          btn.style.background = '#10b981';
          if (msg) {
            msg.style.color = '#10b981';
            msg.textContent = 'Thank you. Check your email.';
          }
        } else {
          throw new Error('Server error');
        }
      })
      .catch(function() {
        btn.disabled = false;
        btn.textContent = originalText;
        if (msg) {
          msg.style.color = '#dc4a3a';
          msg.textContent = 'Something went wrong. Please try again.';
        }
      });
    });
  });
})();
