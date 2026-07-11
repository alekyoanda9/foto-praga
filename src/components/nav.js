import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bisnisData from '../content/bisnis.json'

export function renderNav() {
  const b = bisnisData
  return `
    <a href="#main" class="skip-link">Langsung ke konten utama</a>
    <nav id="nav" class="fp-nav" aria-label="Navigasi utama">
      <a href="/" class="fp-nav__logo" aria-label="${b.nama} beranda">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect width="28" height="28" rx="6" fill="#F5A623"/>
          <text x="14" y="20" font-family="sans-serif" font-size="13" font-weight="700"
                text-anchor="middle" fill="#0A0A0D">FP</text>
        </svg>
        <span>${b.nama}</span>
      </a>
      <button id="mobile-menu-btn" class="fp-nav__toggle" aria-label="Buka menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <div class="fp-nav__links" id="nav-menu" aria-hidden="false">
        <a href="#layanan">Layanan</a>
        <a href="#gallery">Portfolio</a>
        <a href="#about">Tentang</a>
        <a href="#contact">Lokasi</a>
        <a href="https://wa.me/${b.whatsapp}?text=Halo%20Foto%20Praga%2C%20saya%20ingin%20booking%20sesi%20foto"
           class="fp-btn fp-btn--accent" target="_blank" rel="noopener noreferrer">
          Booking Sekarang
        </a>
      </div>
    </nav>
    <div id="mobile-menu-overlay" class="fp-mobile-menu" aria-hidden="true">
      <a href="#layanan" class="mobile-link">Layanan</a>
      <a href="#gallery" class="mobile-link">Portfolio</a>
      <a href="#about" class="mobile-link">Tentang</a>
      <a href="#contact" class="mobile-link">Lokasi</a>
      <a href="https://wa.me/${b.whatsapp}?text=Halo%20Foto%20Praga%2C%20saya%20ingin%20booking%20sesi%20foto"
         class="fp-btn fp-btn--accent mobile-link" target="_blank" rel="noopener noreferrer">
        Booking Sekarang
      </a>
    </div>
  `
}

export function initNav() {
  const nav     = document.getElementById('nav')
  const btn     = document.getElementById('mobile-menu-btn')
  const overlay = document.getElementById('mobile-menu-overlay')

  // Scroll: nav background
  window.addEventListener('scroll', () => {
    nav.classList.toggle('fp-nav--scrolled', window.scrollY > 60)
  }, { passive: true })

  // Mobile toggle
  btn.addEventListener('click', () => {
    const open = overlay.classList.toggle('open')
    btn.setAttribute('aria-expanded', String(open))
    overlay.setAttribute('aria-hidden', String(!open))
  })

  // Close on link click
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      overlay.classList.remove('open')
      btn.setAttribute('aria-expanded', 'false')
      overlay.setAttribute('aria-hidden', 'true')
    })
  })
}
