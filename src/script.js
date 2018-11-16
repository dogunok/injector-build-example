function start() {

  const qs = selector => document.querySelector(selector)

  const moveFantomasZone = () => {
    const btn = qs('.zone-coordonnees .zone-fantomas')
    const parent = qs('.zoneCTA')
    parent.insertAdjacentElement('afterbegin', btn)
  }

  Kameleoon.API.runWhenElementPresent('.zone-coordonnees .zone-fantomas', moveFantomasZone)

}















var check_Kameleoon = setInterval(function() {
  if (typeof Kameleoon !== 'undefined') {
    clearInterval(check_Kameleoon)
    start()
  }
}, 100)
