function show (element) {
  element.style.removeProperty('display')
}

function hide (element) {
  element.style.display = 'none'
}

function enable (element) {
  element.disabled = false
}

function disable (element) {
  element.disabled = true
}

function empty (element) {
  text(element, '')
}

function text (element, text) {
  element.innerHTML = text
}

function addClass (element, className) {
  if (element.className) {
    element.className += ` ${className}`
  } else {
    element.className = `${className}`
  }
}
