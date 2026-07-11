import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import contactData from '../content/contact.json'
import bisnisData from '../content/bisnis.json'

export function renderContact() {
  const d  = contactData
  const wa = bisnisData.whatsapp

  return `
    <section id="contact" class="fp-section fp-section--dark" aria-labelledby="contact-heading">
      <div class="container">
        <div class="fp-section__header">
          <p class="fp-eyebrow">${d.label}</p>
          <h2 id="contact-heading">
            ${d.heading_line1}<br>
            <span class="fp-accent">${d.heading_line2}</span>
          </h2>
        </div>
        <div class="fp-contact__inner">
          <div class="fp-contact__map">
            <iframe
              src="${bisnisData.maps_embed}"
              width="100%" height="100%"
              style="border:0;border-radius:4px;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Peta lokasi ${bisnisData.nama}">
            </iframe>
          </div>
          <div class="fp-contact__details">
            <div class="fp-contact__item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="1.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div>
                <p class="fp-contact__label">Alamat</p>
                <p class="fp-contact__value">${d.alamat}, ${d.area}</p>
              </div>
            </div>
            <div class="fp-contact__item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <div>
                <p class="fp-contact__label">Jam Buka</p>
                <p class="fp-contact__value">Senin - Sabtu: ${d.jam_senin_sabtu}</p>
                <p class="fp-contact__value">Minggu: ${d.jam_minggu}</p>
              </div>
            </div>
            <div class="fp-contact__item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5A623" stroke-width="1.5" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6.17 6.17l1.11-1.11a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <div>
                <p class="fp-contact__label">Telepon</p>
                <p class="fp-contact__value">
                  <a href="tel:+6221-5670318" class="fp-link">${d.telepon}</a>
                </p>
              </div>
            </div>
            <div class="fp-contact__ctas">
              <a href="https://wa.me/${wa}?text=Halo%20Foto%20Praga%2C%20saya%20ingin%20booking%20sesi%20foto"
                 class="fp-btn fp-btn--accent" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                ${d.cta_wa}
              </a>
              <a href="${d.maps_link}" class="fp-btn fp-btn--outline"
                 target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                ${d.cta_maps}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}

export function initContact() {
  gsap.from('.fp-contact__map', {
    opacity: 0, duration: 0.8,
    scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true, lazy: true }
  })
  gsap.from('.fp-contact__details', {
    opacity: 0, x: 20, duration: 0.8, delay: 0.1,
    scrollTrigger: { trigger: '#contact', start: 'top 80%', once: true, lazy: true }
  })
}
