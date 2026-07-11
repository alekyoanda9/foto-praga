import * as THREE from 'three'
import gsap from 'gsap'
import heroData from '../content/hero.json'
import bisnisData from '../content/bisnis.json'

export function renderHero() {
  const d  = heroData
  const wa = bisnisData.whatsapp
  return `
    <section id="hero" class="fp-hero" aria-label="Foto Praga studio foto Jakarta">
      <img
        src="${d.foto_hero}"
        width="1600" height="900"
        loading="eager" decoding="async" fetchpriority="high"
        alt="Studio foto ${bisnisData.nama}, Tanjung Duren Jakarta"
        class="fp-hero__bg"
      />
      <div class="fp-hero__overlay" aria-hidden="true"></div>
      <canvas id="hero-canvas" aria-hidden="true" class="fp-hero__canvas"></canvas>
      <div id="hero-content" class="fp-hero__content container">
        <p class="fp-eyebrow">${d.lokasi_label}</p>
        <h1 class="fp-hero__heading">
          ${d.heading_line1}<br>
          <span class="fp-accent">${d.heading_line2}</span>
        </h1>
        <p class="fp-hero__sub">${d.subheading}</p>
        <div class="fp-hero__ctas">
          <a href="https://wa.me/${wa}?text=Halo%20Foto%20Praga%2C%20saya%20ingin%20booking%20sesi%20foto"
             class="fp-btn fp-btn--accent fp-btn--lg"
             target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            ${d.cta_booking}
          </a>
          <a href="#layanan" class="fp-btn fp-btn--outline">${d.cta_layanan}</a>
        </div>
      </div>
      <div class="fp-hero__scroll-hint" aria-hidden="true">
        <span></span>
      </div>
    </section>
  `
}

export function initHero() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('#hero-content > *').forEach(el => {
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return
  }

  // Three.js: Light particle bokeh — partikel kecil mengambang seperti bokeh lensa
  const heroEl = document.getElementById('hero')
  const canvas = document.getElementById('hero-canvas')
  if (!heroEl || !canvas) return

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
  renderer.setSize(heroEl.clientWidth, heroEl.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  const scene  = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, heroEl.clientWidth / heroEl.clientHeight, 0.1, 100)
  camera.position.z = 5

  // Bokeh particles — warna amber/gold untuk studio foto
  const COUNT = 180
  const geo   = new THREE.BufferGeometry()
  const pos   = new Float32Array(COUNT * 3)
  const sizes = new Float32Array(COUNT)
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 12
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8
    pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    sizes[i] = Math.random() * 0.06 + 0.01
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const mat = new THREE.PointsMaterial({ color: 0xF5A623, size: 0.04, transparent: true, opacity: 0.45, sizeAttenuation: true })
  scene.add(new THREE.Points(geo, mat))

  let heroVisible = true, animId = null, t0 = 0
  const obs = new IntersectionObserver(([e]) => {
    heroVisible = e.isIntersecting
    if (heroVisible && !animId) animId = requestAnimationFrame(animate)
  }, { threshold: 0.01 })
  obs.observe(heroEl)

  function animate(t) {
    if (!heroVisible) { animId = null; return }
    animId = requestAnimationFrame(animate)
    const elapsed = (t - t0) * 0.001
    // Gentle drift
    const positions = geo.attributes.position.array
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 1] += Math.sin(elapsed * 0.3 + i) * 0.0003
      positions[i * 3]     += Math.cos(elapsed * 0.2 + i) * 0.0002
    }
    geo.attributes.position.needsUpdate = true
    renderer.render(scene, camera)
  }
  t0 = performance.now()
  animId = requestAnimationFrame(animate)

  // GSAP entrance
  gsap.fromTo('#hero-content > *',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.18, delay: 0.25, ease: 'power2.out' }
  )

  // Resize debounced
  let resizeTimer
  function onResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      camera.aspect = heroEl.clientWidth / heroEl.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(heroEl.clientWidth, heroEl.clientHeight)
    }, 200)
  }
  window.addEventListener('resize', onResize)

  window.addEventListener('beforeunload', () => {
    if (animId) cancelAnimationFrame(animId)
    obs.disconnect()
    geo.dispose(); mat.dispose()
    renderer.dispose(); renderer.forceContextLoss()
    window.removeEventListener('resize', onResize)
  })
}
