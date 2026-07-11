import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import layananData from '../content/layanan.json'
import bisnisData from '../content/bisnis.json'

const ICONS = [
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22" aria-hidden="true"><circle cx="12" cy="8" r="5"/><path d="M3 21v-2a7 7 0 0 1 14 0v2"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
]

export function renderLayanan() {
  const d  = layananData
  const wa = bisnisData.whatsapp

  const cards = d.items.map((item, i) => `
    <li class="fp-service-card ${item.terpopuler ? 'fp-service-card--featured' : ''}">
      ${item.terpopuler ? '<span class="fp-badge">Terpopuler</span>' : ''}
      <div class="fp-service-card__icon">${ICONS[i % ICONS.length]}</div>
      <h3 class="fp-service-card__name">${item.nama}</h3>
      <p class="fp-service-card__desc">${item.deskripsi}</p>
      <div class="fp-service-card__footer">
        <span class="fp-service-card__price">${item.harga}</span>
        ${item.durasi ? `<span class="fp-service-card__durasi">${item.durasi}</span>` : ''}
      </div>
    </li>
  `).join('')

  return `
    <section id="layanan" class="fp-section fp-section--dark" aria-labelledby="layanan-heading">
      <div class="container">
        <div class="fp-section__header">
          <p class="fp-eyebrow">${d.label}</p>
          <h2 id="layanan-heading">
            ${d.heading_line1}<br>
            <span class="fp-accent">${d.heading_line2}</span>
          </h2>
          <p class="fp-section__desc">${d.deskripsi}</p>
        </div>
        <ul class="fp-services-grid" role="list">${cards}</ul>
        <div class="fp-section__cta">
          <a href="https://wa.me/${wa}?text=Halo%20Foto%20Praga%2C%20saya%20ingin%20tanya%20soal%20layanan"
             class="fp-btn fp-btn--accent" target="_blank" rel="noopener noreferrer">
            ${d.cta}
          </a>
        </div>
      </div>
    </section>
  `
}

export function initLayanan() {
  gsap.from('.fp-service-card', {
    opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#layanan', start: 'top 82%', once: true, lazy: true }
  })
  if (!window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.fp-service-card').forEach(card => {
      card.addEventListener('mouseenter', () => gsap.to(card, { y: -4, duration: 0.2 }))
      card.addEventListener('mouseleave', () => gsap.to(card, { y: 0,  duration: 0.2 }))
    })
  }
}
