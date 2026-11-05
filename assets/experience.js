/* YUSRA interactive website examples. No tracking, external services, or form changes. */
document.addEventListener('DOMContentLoaded', function () {
  const root = document.querySelector('[data-experience]');
  if (!root) return;
  const choices = Array.from(root.querySelectorAll('[data-demo]'));
  const frame = root.querySelector('#experience-preview');
  const title = root.querySelector('#experience-title');
  const description = root.querySelector('#experience-description');
  const fullLink = root.querySelector('#experience-full-link');
  const counter = root.querySelector('#experience-counter');
  const examples = {
    moving: { title: 'Moving & Delivery', description: 'Show services clearly and help customers request a moving quote.', href: 'moving-demo.html', position: '01 / 04' },
    renovation: { title: 'Renovation & Restoration', description: 'Present project capabilities with a confident, image-led design.', href: 'renovation-demo.html?v=20261104', position: '02 / 04' },
    cleaning: { title: 'Home Cleaning', description: 'Keep offerings simple, welcoming, and easy to explore.', href: 'cleaning-demo.html', position: '03 / 04' },
    cafe: { title: 'Café & Hospitality', description: 'Use atmosphere, menus, and storytelling to express a distinct brand.', href: 'cafe-demo.html', position: '04 / 04' }
  };
  function choose(key) {
    const item = examples[key];
    if (!item) return;
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.demo === key)));
    if (frame.getAttribute('src') !== item.href) frame.setAttribute('src', item.href);
    frame.setAttribute('title', item.title + ' website demonstration preview');
    title.textContent = item.title;
    description.textContent = item.description;
    fullLink.setAttribute('href', item.href);
    fullLink.setAttribute('aria-label', 'Open full ' + item.title + ' website demonstration');
    counter.textContent = 'DEMO ' + item.position;
  }
  choices.forEach(button => button.addEventListener('click', () => choose(button.dataset.demo)));
});
