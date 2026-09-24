// Contact form — progressive enhancement over Netlify's native form POST
// (BUILD-ROADMAP.md Phase 8: accessible form + success/error states).
// Without JS the form posts normally and Netlify shows its own
// confirmation page. No-ops on any page without #contact-form.

(function () {
  var form = document.getElementById('contact-form');
  var status = document.getElementById('contact-form-status');
  if (!form || !status) return;

  var button = form.querySelector('button[type="submit"]');

  function setStatus(state, message) {
    status.dataset.state = state;
    status.textContent = message;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    button.disabled = true;
    setStatus('pending', 'Sending…');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Form submission failed');
        form.reset();
        setStatus('success', 'Thanks for reaching out. I’ll get back to you soon.');
      })
      .catch(function () {
        setStatus('error', 'Something went wrong sending that. Please try again, or email sarah@sarahtoninsounds.com directly.');
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();
