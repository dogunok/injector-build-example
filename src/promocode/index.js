const Popup = require('./Popup')
const Timer = require('./Timer')
const setPromo = require('./setPromo')

const wasStarted = +Kameleoon.Utils.readLocalData('kPromo-submit', 'COOKIE')
let time
let timer

if (!wasStarted) {
  Popup.init()
  document.body.offsetHeight
  Popup.show()
} else {
  time = 345600 - Math.ceil((Date.now() - wasStarted) / 1000)
  if (time < 0) Kameleoon.Utils.createLocalData(`kPromo-reject`, 1, 60, '', 'COOKIE')
  else {
    timer = new Timer(time)
    timer.init()
  }
}

if (location.href.match('/basket') && time) {
  setPromo(timer.destroy.bind(timer))
}