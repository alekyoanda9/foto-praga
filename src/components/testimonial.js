import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import testimonialData from '../content/testimonials.json'

export function renderTestimonial() {
  const d = testimonialData

  const stars = (n) => Array(n).fill(
    `<svg width="14" height="14" viewBox="0 0 24 24" fill="#F5A623" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`
  ).join('')

  const cards = d.items.map(item => `
    <li class="fp-testimonial__card">
      <div class="fp-testimonial__stars" aria-label="${item.rating} bintang">
        ${stars(item.rating)}
      </div>
      <blockquote class="fp-testimonial__quote">"${item.ulasan}"</blockquote>
      <div class="fp-testimonial__author">
        <span class="fp-testimonial__name">${item.nama}</span>
        <span class="fp-testimonial__profesi">${item.profesi}</span>
      </div>
    </li>
  `).join('')

  return `
    <section id="testimonial" class="fp-section fp-section--surface" aria-labelledby="testimonial-heading">
      <div class="container">
        <div class="fp-section__header fp-section__header--dark">
          <p class="fp-eyebrow fp-eyebrow--dark">${d.label}</p>
          <h2 id="testimonial-heading" class="fp-heading--dark">
            ${d.heading_line1}<br>
            <span class="fp-accent-dark">${d.heading_line2}</span>
          </h2>
        </div>
        <ul class="fp-testimonial__grid" role="list">${cards}</ul>
      </div>
    </section>
  `
}

export function initTestimonial() {
  gsap.from('.fp-testimonial__card', {
    opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#testimonial', start: 'top 82%', once: true, lazy: true }
  })
}
