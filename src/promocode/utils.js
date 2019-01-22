const qs = (selector, parent) => {
  if (parent) return parent.querySelector(selector)
  return document.querySelector(selector)
}

module.exports = qs