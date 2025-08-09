// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// UI enhancements
document.addEventListener('DOMContentLoaded', () => {
  // Image skeletons
  document.querySelectorAll('.image-wrapper').forEach(wrapper => {
    const img = wrapper.querySelector('img');
    const skeleton = wrapper.querySelector('.img-skeleton');
    const hide = () => skeleton && (skeleton.style.display = 'none');
    if (img && img.complete) hide();
    if (img) img.addEventListener('load', hide, { once: true });
    if (img) img.addEventListener('error', hide, { once: true });
  });

  // Wishlist toggle (client-side only)
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      if (icon) icon.classList.toggle('fa-regular');
      if (icon) icon.classList.toggle('fa-solid');
    });
  });

  // Theme toggle
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const applyTheme = (mode) => {
    root.classList.toggle('theme-dark', mode === 'dark');
  };
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.classList.contains('theme-dark') ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
      // swap icon
      const i = toggle.querySelector('i');
      if (i) {
        i.classList.toggle('fa-moon', next === 'light');
        i.classList.toggle('fa-sun', next === 'dark');
      }
    });
  }
});