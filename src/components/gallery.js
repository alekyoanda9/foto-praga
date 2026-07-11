import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import galleryData from '../content/gallery.json'

export function renderGallery() {
  const d = galleryData

  const items = d.items.map((item, i) => `
    <li class="fp-gallery__item fp-gallery__item--${i % 3 === 0 ? 'tall' : 'normal'}"
        data-index="${i}">
      <img
        src="${item.url}"
        alt="${item.alt}"
        width="600" height="${i % 3 === 0 ? 800 : 400}"
        loading="lazy" decoding="async"
        style="aspect-ratio:${i % 3 === 0 ? '3/4' : '4/3'};object-fit:cover;width:100%;height:100%;"
      />
      <div class="fp-gallery__caption">
        <span>${item.kategori}</span>
      </div>
    </li>
  `).join('')

  return `
    <section id="gallery" class="fp-section fp-section--light" aria-labelledby="gallery-heading">
      <div class="container">
        <div class="fp-section__header fp-section__header--dark">
          <p class="fp-eyebrow fp-eyebrow--dark">${d.label}</p>
          <h2 id="gallery-heading" class="fp-heading--dark">
            ${d.heading_line1}<br>
            <span class="fp-accent-dark">${d.heading_line2}</span>
          </h2>
          <p class="fp-section__desc fp-section__desc--dark">${d.deskripsi}</p>
        </div>
        <ul class="fp-gallery__grid" role="list" id="gallery-grid">
          ${items}
        </ul>
      </div>

      <!-- Lightbox -->
      <div id="lightbox" class="fp-lightbox" aria-modal="true" role="dialog" aria-label="Portfolio foto" hidden>
        <button class="fp-lightbox__close" aria-label="Tutup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <img id="lightbox-img" src="" alt="" class="fp-lightbox__img" />
        <p id="lightbox-caption" class="fp-lightbox__caption"></p>
      </div>
    </section>
  `
}

export function initGallery() {
  gsap.from('.fp-gallery__item', {
    opacity: 0, y: 30, stagger: 0.07, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#gallery', start: 'top 80%', once: true, lazy: true }
  })

  // Lightbox
  const lightbox = document.getElementById('lightbox')
  const lbImg    = document.getElementById('lightbox-img')
  const lbCap    = document.getElementById('lightbox-caption')
  const lbClose  = lightbox.querySelector('.fp-lightbox__close')

  document.querySelectorAll('.fp-gallery__item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img')
      const cap = item.querySelector('.fp-gallery__caption span')
      lbImg.src = img.src
      lbImg.alt = img.alt
      lbCap.textContent = cap ? cap.textContent : ''
      lightbox.hidden = false
      document.body.style.overflow = 'hidden'
      lbClose.focus()
    })
    // Hover reveal caption
    if (!window.matchMedia('(hover: none)').matches) {
      item.addEventListener('mouseenter', () =>
        gsap.to(item.querySelector('.fp-gallery__caption'), { opacity: 1, y: 0, duration: 0.2 }))
      item.addEventListener('mouseleave', () =>
        gsap.to(item.querySelector('.fp-gallery__caption'), { opacity: 0, y: 8, duration: 0.2 }))
    }
  })

  function closeLightbox() {
    lightbox.hidden = true
    document.body.style.overflow = ''
  }
  lbClose.addEventListener('click', closeLightbox)
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox() })
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox() })
}
