// Contact form — progressive enhancement over Netlify's native form POST
// (BUILD-ROADMAP.md Phase 8: accessible form + success/error states).
// No-ops on any page without #contact-form, so it's safe to load everywhere.

(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-form-status');
  if (!form || !status) return;

  function encodeFormData(data) {
    return Object.keys(data)
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');
  }

  function setStatus(state, message) {
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = message;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = value;
    });

    setStatus('pending', 'Sending…');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData(data)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Form submission failed');
        form.reset();
        setStatus('success', 'Thanks for reaching out — I’ll get back to you soon.');
      })
      .catch(function () {
        setStatus('error', 'Something went wrong sending that. Please try again, or email sarah@sarahtoninsounds.com directly.');
      });
  });
})();
