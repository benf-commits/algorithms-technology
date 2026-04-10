// algorithms.technology contact form handler
(function() {
  const SUPABASE_URL = 'https://nmfzcozvatcjmznuslst.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZnpjb3p2YXRjam16bnVzbHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MTYyNTUsImV4cCI6MjA5MTM5MjI1NX0.Uq7YOyE14IkpknVOMThXDAtC9xGLIhnOnwbesTJgidU';

  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Honeypot check
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

      fetch(SUPABASE_URL + '/rest/v1/contacts', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(data)
      })
      .then(function(response) {
        if (response.ok || response.status === 201) {
          form.reset();
          btn.textContent = 'Signed up';
          btn.style.background = '#10b981';
          if (msg) {
            msg.style.color = '#10b981';
            msg.textContent = 'Thank you. We will be in touch.';
          }
        } else if (response.status === 409) {
          btn.disabled = false;
          btn.textContent = originalText;
          if (msg) {
            msg.style.color = '#10b981';
            msg.textContent = 'You are already signed up. Thank you.';
          }
        } else {
          throw new Error('Server error');
        }
      })
      .catch(function() {
        btn.disabled = false;
        btn.textContent = originalText;
        if (msg) {
          msg.style.color = 'var(--accent)';
          msg.textContent = 'Something went wrong. Please try again.';
        }
      });
    });
  });
})();
