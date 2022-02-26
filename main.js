const box = document.querySelector('#box').getContext('2d')

const gridElementSize = 300

function drawRulers () {
  box.beginPath()
  box.lineWidth = 5
  box.strokeStyle = '#8ACBBC'
  box.moveTo(0, gridElementSize)
  box.lineTo(3 * gridElementSize, gridElementSize)
  box.stroke()
  box.beginPath()
  box.moveTo(0, 2 * gridElementSize)
  box.lineTo(3 * gridElementSize, 2 * gridElementSize)
  box.stroke()
  box.beginPath()
  box.moveTo(gridElementSize, 0)
  box.lineTo(gridElementSize, 3 * gridElementSize)
  box.stroke()
  box.beginPath()
  box.moveTo(2 * gridElementSize, 0)
  box.lineTo(2 * gridElementSize, 3 * gridElementSize)
  box.stroke()
}

function init () {
  drawRulers()
}

window.addEventListener('load', init)
