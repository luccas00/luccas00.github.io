fetch('/partials/navbar.html')
  .then(res => res.text())
  .then(html => {
    const container = document.getElementById('navbar');
    if (container) {
      container.innerHTML = html;
      window.dispatchEvent(new Event('navbar:loaded'));
    }
  })
  .catch(err => console.warn('navbar load failed', err));
