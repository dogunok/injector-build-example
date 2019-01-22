const Timer = require('./Timer')
const qs = require('./utils')

const Popup = {
  getMarkup() {
    return `
      <div class="kOverlay">
        <div class="kPopup">
          <span class="kPopup__close">&#10005;</span>
          <section class="kPopup__left">
            <h2 class="kPopup__title">Получите скидку!</h2>
            <p class="kPopup__num">500</p>
            <p class="kPopup__code">По промокоду <span>ZOLOTO585</span></p>
            <div class="kPopup__timer">
              <img src="//storage.kameleoon.eu/zoloto585/watch_black.svg">
            </div>
            <button class="kPopup__cta">Использовать промокод на 500 ₽</button>
          </section>
          <section class="kPopup__right">       
            <img class="kPopup__image" src="//storage.kameleoon.eu/zoloto585/card.jpg" alt="zoloto card">
            <p class="kPopup__discount">500₽</p>
            <p class="kPopup__tip">При заказе от <span>4500 ₽</span></p>
          </section>
        </div>
      </div>`
  },

  setHandlers() {
    const self = this
    let timer

    this.overlay.addEventListener(Kameleoon.Internals.runtime.mouseDownEvent, function(ev) {
      if (Kameleoon.Internals.runtime.touchMoveEvent) return
      if (ev.target.classList.contains('kPopup__cta')) {
        self.destroy('submit')
        Kameleoon.API.processConversion(131561)
      }
      if (ev.target.classList.contains('kPopup__close')) {
        self.destroy('reject')
        Kameleoon.API.processConversion(131562)
      }
      document.documentElement.style.overflow = 'auto'
    })

    this.cta.addEventListener(Kameleoon.Internals.runtime.mouseDownEvent, function(ev) {
      if (Kameleoon.Internals.runtime.touchMoveEvent) return
      if (timer) return
      timer = new Timer(345600)
      timer.init()
    })
  },

  init() {
    document.body.insertAdjacentHTML('afterbegin', this.getMarkup())
    this.overlay = qs('.kOverlay')
    this.popup = qs('.kPopup')
    this.timerBox = qs('.kPopup__timer', this.popup)
    this.cta = qs('.kPopup__cta', this.popup)
    this.setHandlers()

    this.timer = new Timer(3600)
    this.timerBox.insertAdjacentElement('beforeend', this.timer.init())
  },

  show() {
    this.overlay.classList.add('kOverlay--show')
  },

  destroy(cookie) {
    this.overlay.classList.remove('kOverlay--show')
    Kameleoon.Utils.createLocalData(`kPromo-${cookie}`, Date.now(), 60, '', 'COOKIE')
    this.timer.destroy()
    setTimeout(() => document.body.removeChild(this.overlay), 500)
  }
}

module.exports = Popup