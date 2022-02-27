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

  // Initial pointer
  callNextPlayers(false)
}

window.addEventListener('load', init)

const initPointerPositionX = 110
const initPointerPositionY = 210
const pointerPositions = [
  { x: initPointerPositionX, y: initPointerPositionY },
  { x: initPointerPositionX + gridElementSize, y: initPointerPositionY },
  { x: initPointerPositionX + 2 * gridElementSize, y: initPointerPositionY },
  { x: initPointerPositionX + 2 * gridElementSize, y: initPointerPositionY + gridElementSize },
  { x: initPointerPositionX + 2 * gridElementSize, y: initPointerPositionY + 2 * gridElementSize },
  { x: initPointerPositionX + gridElementSize, y: initPointerPositionY + 2 * gridElementSize },
  { x: initPointerPositionX, y: initPointerPositionY + 2 * gridElementSize },
  { x: initPointerPositionX, y: initPointerPositionY + gridElementSize }
]
let pointerIndex = pointerPositions.length - 1

function callNextPlayers (isAnimate = true) {
  callNextBtn.disabled = true
  let fromX = pointerPositions[pointerIndex].x
  let fromY = pointerPositions[pointerIndex].y
  pointerIndex = ++pointerIndex % pointerPositions.length
  const toX = pointerPositions[pointerIndex].x
  const toY = pointerPositions[pointerIndex].y
  const animationSpeed = isAnimate && 60 || 1
  const stepX = (toX - fromX) / animationSpeed
  const stepY = (toY - fromY) / animationSpeed

  const pointerSize = 80
  const pointer = document.querySelector('#pointer')
  if (isAnimate) {
    window.requestAnimationFrame(animate)
    callNextBtn.innerHTML = '球員上場中...'

    function animate () {
      if (fromX !== toX || fromY !== toY) {
        box.clearRect(fromX, fromY, pointerSize, pointerSize)
        drawRulers()
        const newX = fromX + stepX
        const newY = fromY + stepY
        box.drawImage(pointer, newX, newY, pointerSize, pointerSize)
        fromX = newX
        fromY = newY
        requestAnimationFrame(animate)
      } else {
        callNextBtn.disabled = false
        callNextBtn.innerHTML = '下一組上場'
      }
    }
  } else {
    box.drawImage(pointer, toX, toY, pointerSize, pointerSize)
  }
}

const callNextBtn = document.querySelector('#call-next-btn')
callNextBtn.addEventListener('click', callNextPlayers)
