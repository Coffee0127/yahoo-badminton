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

  function toAngle (degree) {
    return degree * Math.PI / 180
  }

  function arrow (angle) {
    box.save()
    box.fillStyle = '#75F94C'
    // adjustment angle to make the arrow closer to the circle
    const adjustmentAngle = angle + toAngle(5)
    box.translate(
      origin + radius * Math.cos(adjustmentAngle),
      origin + radius * Math.sin(adjustmentAngle))
    box.rotate(angle)
    box.beginPath()
    const sideLength = 25
    box.moveTo(-sideLength, -sideLength)
    box.lineTo(0, 0)
    box.lineTo(sideLength, -sideLength)
    // box.stroke()
    box.fill()
    box.restore()
  }

  // Circle with arrow
  const origin = 450
  const radius = 120
  box.strokeStyle = '#75F94C'
  box.lineWidth = 20
  // bottom
  box.beginPath()
  box.arc(origin, origin, radius, toAngle(40), toAngle(140))
  box.stroke()
  // top left
  box.beginPath()
  box.arc(origin, origin, radius, toAngle(160), toAngle(260))
  box.stroke()
  // top right
  box.beginPath()
  box.arc(origin, origin, radius, toAngle(280), toAngle(20))
  box.stroke()

  arrow(toAngle(140))
  arrow(toAngle(260))
  arrow(toAngle(20))

  box.beginPath()
  box.textAlign = 'center'
  box.textBaseline = 'middle'
  box.font = '26px Arial'
  box.fillStyle = 'black'
  box.fillText('順時針依序插拍', origin, origin)
}

window.addEventListener('load', init)
