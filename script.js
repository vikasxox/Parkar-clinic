(() => {
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');
  const setMenu = (open) => {
    if (!menuToggle || !navigation) return;
    menuToggle.classList.toggle('is-open', open);
    navigation.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-open', open);
  };
  menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  // Progressive reveal effects. Content remains visible if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    document.body.classList.add('reveal-ready');
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealItems.forEach((element) => observer.observe(element));
  } else {
    revealItems.forEach((element) => element.classList.add('is-visible'));
  }

  // Expand the last row of photos only when requested.
  const galleryGrid = document.querySelector('#gallery-grid');
  const galleryMore = document.querySelector('#gallery-more');
  galleryMore?.addEventListener('click', () => {
    const expanded = galleryGrid?.classList.toggle('expanded') ?? false;
    galleryMore.setAttribute('aria-expanded', String(expanded));
    galleryMore.innerHTML = expanded ? 'Show fewer photos <span aria-hidden="true">↑</span>' : 'View all photos <span aria-hidden="true">↓</span>';
  });

  // Accessible local photo viewer with previous/next navigation.
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox?.querySelector('figure img');
  const lightboxCaption = lightbox?.querySelector('figcaption');
  const photoButtons = Array.from(document.querySelectorAll('.gallery-item'));
  let activePhoto = -1;
  let lastFocus = null;
  const showPhoto = (index) => {
    if (!lightbox || !lightboxImage || !photoButtons.length) return;
    activePhoto = (index + photoButtons.length) % photoButtons.length;
    const item = photoButtons[activePhoto];
    lightboxImage.src = item.dataset.full || item.querySelector('img')?.src || '';
    lightboxImage.alt = item.dataset.alt || item.querySelector('img')?.alt || 'Parkar Health Care photo';
    if (lightboxCaption) lightboxCaption.textContent = item.dataset.alt || item.querySelector('img')?.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lightbox.querySelector('.lightbox-close')?.focus();
  };
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImage?.removeAttribute('src');
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  };
  photoButtons.forEach((button, index) => button.addEventListener('click', () => {
    lastFocus = button;
    showPhoto(index);
  }));
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.querySelector('.lightbox-prev')?.addEventListener('click', () => showPhoto(activePhoto - 1));
  lightbox?.querySelector('.lightbox-next')?.addEventListener('click', () => showPhoto(activePhoto + 1));
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (!lightbox?.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(activePhoto - 1);
    if (event.key === 'ArrowRight') showPhoto(activePhoto + 1);
  });
})();
