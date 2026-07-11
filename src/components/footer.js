import footerData from '../content/footer.json'
import bisnisData from '../content/bisnis.json'

export function renderFooter() {
  const d  = footerData
  const b  = bisnisData

  return `
    <footer class="fp-footer" role="contentinfo">
      <div class="container fp-footer__inner">
        <div class="fp-footer__brand">
          <a href="/" class="fp-nav__logo" aria-label="${b.nama} beranda">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" rx="6" fill="#F5A623"/>
              <text x="14" y="20" font-family="sans-serif" font-size="13" font-weight="700"
                    text-anchor="middle" fill="#0A0A0D">FP</text>
            </svg>
            <span>${b.nama}</span>
          </a>
          <p class="fp-footer__tagline">${d.tagline}</p>
        </div>
        <div class="fp-footer__info">
          <p>${d.alamat}</p>
          <p>${d.jam_buka}</p>
          <p><a href="tel:+6221-5670318" class="fp-link">${d.telepon}</a></p>
        </div>
      </div>
      <div class="fp-footer__bottom">
        <p>&copy; <span id="footer-year"></span> ${d.copyright}. Hak cipta dilindungi undang-undang.</p>
      </div>
    </footer>
    <script>document.getElementById('footer-year').textContent = new Date().getFullYear()</script>
  `
}
