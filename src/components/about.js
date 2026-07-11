import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutData from '../content/about.json'
import bisnisData from '../content/bisnis.json'

export function renderAbout() {
  const d  = aboutData
  const wa = bisnisData.whatsapp

  const stats = d.stats.map(s => `
    <div class="fp-about__stat">
      <span class="fp-about__stat-num">${s.angka}</span>
      <span class="fp-about__stat-label">${s.label}</span>
    </div>
  `).join('')

  const paragraphs = d.paragraf.map(p => `<p class="fp-about__para">${p}</p>`).join('')

  return `
    <section id="about" class="fp-section fp-section--dark" aria-labelledby="about-heading">
      <div class="container fp-about__inner">
        <div class="fp-about__text">
          <p class="fp-eyebrow">${d.label}</p>
          <h2 id="about-heading">
            ${d.heading_line1}<br>
            <span class="fp-accent">${d.heading_line2}</span>
          </h2>
          ${paragraphs}
          <div class="fp-about__stats" role="list">
            ${stats}
          </div>
          <a href="https://wa.me/${wa}?text=Halo%20Foto%20Praga%2C%20saya%20ingin%20booking%20sesi%20foto"
             class="fp-btn fp-btn--accent" target="_blank" rel="noopener noreferrer">
            ${d.cta}
          </a>
        </div>
        <div class="fp-about__image">
          <img
            src="${d.foto}"
            width="800" height="600"
            loading="lazy" decoding="async"
            alt="Studio Foto Praga, Tanjung Duren Jakarta"
            style="aspect-ratio:4/3;object-fit:cover;width:100%;border-radius:4px;"
          />
        </div>
      </div>
    </section>
  `
}

export function initAbout() {
  gsap.from('.fp-about__text', {
    opacity: 0, x: -30, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '#about', start: 'top 80%', once: true, lazy: true }
  })
  gsap.from('.fp-about__image', {
    opacity: 0, x: 30, duration: 0.8, delay: 0.15, ease: 'power2.out',
    scrollTrigger: { trigger: '#about', start: 'top 80%', once: true, lazy: true }
  })
  gsap.from('.fp-about__stat', {
    opacity: 0, y: 20, stagger: 0.1, duration: 0.5,
    scrollTrigger: { trigger: '.fp-about__stats', start: 'top 85%', once: true, lazy: true }
  })
}
