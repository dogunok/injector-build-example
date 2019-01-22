const qs = require('./utils')

const setPromo = callback => {

  Kameleoon.API.runWhenElementPresent('.cart-total__price-number', arr => {
    const total = +arr[0].textContent.replace(/\D/g, '')

    Kameleoon.API.runWhenElementPresent(
      '.basket-finishList', 
      () => {
        Kameleoon.Utils.createLocalData(`kPromo-used`, 1, 60, '', 'COOKIE')
        callback && callback()
        if (total < 4500) Kameleoon.API.processConversion(131564)
        else Kameleoon.API.processConversion(131563)
      },
      false,
      300
    )

    if (total < 4500) return

    Kameleoon.API.runWhenElementPresent('.cart-total__row .form-field__button', arr => {
      const input = qs('.confirmation-order__form input[name="promoCode"]')
      arr[0].addEventListener(Kameleoon.Internals.runtime.mouseDownEvent, function() {
        if (Kameleoon.Internals.runtime.touchMoveEvent) return
        input.value = 'ZOLOTO585'
        input.dispatchEvent(new Event('input'))
      })
    })
  })  
}

module.exports = setPromo