const qs = require('./utils')

function Timer(time) {
  this.value = time
}

Timer.prototype.getMarkup = function() {
  return `
    <section class="kTimer">
      <span class="kTimer__value kTimer__value--day"></span>
      <span class="kTimer__sep">:</span>
      <span class="kTimer__value kTimer__value--hour"></span>
      <span class="kTimer__sep">:</span>
      <span class="kTimer__value kTimer__value--min"></span>
      <span class="kTimer__sep">:</span>
      <span class="kTimer__value kTimer__value--sec"></span>
    </section>`
}

Timer.prototype.getUnit = function(result, unit, sep) {
  if (result[0][0] >= sep) {
    const unitValue = Math.floor(result[0][0] / sep)
    result[0][0] -= unitValue * sep
    result.unshift([unitValue, unit])
  } else {
    result.unshift([0, unit])
  }
}

Timer.prototype.getEnd = function(val, name) {
  const last = +val.slice(-1)
  let result

  if (name === 'd') {
    if (!last) result = 'дней'
    else result = last === 1 ? 'день': 'дня'
  }

  if (name === 'h') {
    if (!last || +val > 4 && +val < 21) result = 'часов'
    else result = last === 1 ? 'час': 'часа'
  }

  if (name === 'm') {
    if (!last || +val > 4 && +val < 21 || last > 4) result = 'минут'
    else result = last === 1 ? 'минута': 'минуты'
  }

  if (name === 's') {
    if (!last || +val > 4 && +val < 21 || last > 4) result = 'секунд'
    else result = last === 1 ? 'секуда': 'секунды'
  }
  return result
}

Timer.prototype.getTime = function() {
  const time = [ [this.value, 's'] ]
  this.getUnit(time, 'm', 60)
  this.getUnit(time, 'h', 60)
  this.getUnit(time, 'd', 24)
  return time.reduce((acc, el) => {
    const val = el[0] + ''
    const key = el[1]
    acc[key] = `${el[0] < 10 ? '0' + el[0] : el[0]}<span>${this.getEnd(val, key)}</span>`
    return acc
  }, {})
}

Timer.prototype.setTime = function() {
  const time = this.getTime()
  this.dayView.innerHTML = time.d
  this.hourView.innerHTML = time.h
  this.minView.innerHTML = time.m
  this.secView.innerHTML = time.s
}

Timer.prototype.init = function() {
  document.body.insertAdjacentHTML('afterbegin', this.getMarkup())
  this.timer = qs('.kTimer')
  this.dayView = qs('.kTimer__value--day', this.timer)
  this.hourView = qs('.kTimer__value--hour', this.timer)
  this.minView = qs('.kTimer__value--min', this.timer)
  this.secView = qs('.kTimer__value--sec', this.timer)
  this.setTime()
  this.interval = setInterval(() => {
    if (this.value < 1) this.destroy()
    this.value -= 1
    this.setTime()
  }, 1000)

  return this.timer
}

Timer.prototype.destroy = function() {
  clearInterval(this.interval)
}

module.exports = Timer
