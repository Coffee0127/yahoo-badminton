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

  showPlayerPools()
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
let pointerIndex = 0

function callNextPlayers (isAnimate = true) {
  callNextBtn.disabled = true
  const fromPointerIndex = pointerIndex
  let fromX = pointerPositions[fromPointerIndex].x
  let fromY = pointerPositions[fromPointerIndex].y
  const toPointerIndex = (fromPointerIndex + 1) % pointerPositions.length
  const toX = pointerPositions[toPointerIndex].x
  const toY = pointerPositions[toPointerIndex].y
  const animationSpeed = isAnimate && 60 || 1
  const stepX = (toX - fromX) / animationSpeed
  const stepY = (toY - fromY) / animationSpeed

  const pointerSize = 80
  const pointer = document.querySelector('#pointer')

  function clearPlayers (index) {
    const fromPlayerPosition = playerPositions[index]
    box.clearRect(
      fromPlayerPosition.x,
      fromPlayerPosition.y - playerNameFontSize,
      gridElementSize - initPlayersPositionX - 2,
      playerMarginY + 2 * playerNameFontSize)
  }

  if (isAnimate) {
    clearPlayers(fromPointerIndex)
    playerNames.push(...((queuedPlayers[fromPointerIndex])))
    showPlayerPools()
    delete queuedPlayers[fromPointerIndex]
    addPlayerBtn.disabled = false
    addPlayerResult.style.display = 'none'

    if (queuedPlayers[toPointerIndex]) {
      pointerIndex = ++pointerIndex % pointerPositions.length
      window.requestAnimationFrame(animate)
      callNextBtn.innerHTML = '球員上場中...'
    } else {
      // No players in the queue
      playerPositionIndex--
      if (playerPositionIndex < 0) {
        playerPositionIndex += 8
      }
      callNextBtn.disabled = true
      callNextResult.style.display = 'inline'
    }

    function animate () {
      if (fromX !== toX || fromY !== toY) {
        box.clearRect(fromX, fromY, pointerSize, pointerSize)
        clearPlayers(toPointerIndex)
        drawPlayers(toPointerIndex, queuedPlayers[toPointerIndex])
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
    box.drawImage(pointer, fromX, fromY, pointerSize, pointerSize)
  }
}

const callNextBtn = document.querySelector('#call-next-btn'),
  callNextResult = document.querySelector('#call-next-result')
callNextBtn.addEventListener('click', callNextPlayers)

const playerNames = [
  'Brandi Grey', 'Sohail Craft', 'Abbey Stacey', 'Benjamin Justice',
  'Alberto Matthews', 'Adelle Butler', 'Fraser Spooner', 'Haley Kay',
  'Nylah Simons', 'Shanae Chambers', 'Umer Malone', 'Caius Cano',
  'Tobi Maynard', 'Humphrey Morgan', 'Hadassah Horton', 'Isla-Rae Hickman',
  'Suzanne Rasmus', 'Kelsie Stubbs', 'Nile Bourne', 'Sade Mcintosh',
  'Phoebe Ward', 'Stefanie Banks', 'Junior Franks', 'Viktoria Lord',
  'Zachery Findlay', 'Presley Barnes', 'Kieron Pierce', 'Aleah Bray',
  'Kobe Crawford', 'Aniqa Figueroa', 'Rhianna Hagan', 'Elin Barclay',
  'Wilf Olsen', 'Mark Woods', 'Tulisa Ray', 'Leticia Golden'
]
const playerPools = document.querySelector('#player-pools'),
  addPlayerBtn = document.querySelector('#add-player-btn'),
  addPlayerResult = document.querySelector('#add-player-result')

function showPlayerPools () {
  playerPools.innerHTML = ''
  for (const playerName of playerNames) {
    const player = document.createElement('li')
    player.innerHTML = playerName
    playerPools.appendChild(player)
  }
}

const initPlayersPositionX = 30
const initPlayersPositionY = 70
let playerPositionIndex = 0
const playerPositions = [
  { x: initPlayersPositionX, y: initPlayersPositionY },
  { x: initPlayersPositionX + gridElementSize, y: initPlayersPositionY },
  { x: initPlayersPositionX + 2 * gridElementSize, y: initPlayersPositionY },
  { x: initPlayersPositionX + 2 * gridElementSize, y: initPlayersPositionY + gridElementSize },
  { x: initPlayersPositionX + 2 * gridElementSize, y: initPlayersPositionY + 2 * gridElementSize },
  { x: initPlayersPositionX + gridElementSize, y: initPlayersPositionY + 2 * gridElementSize },
  { x: initPlayersPositionX, y: initPlayersPositionY + 2 * gridElementSize },
  { x: initPlayersPositionX, y: initPlayersPositionY + gridElementSize }
]
const playerMarginX = 135
const playerMarginY = 80
const playerNameFontSize = 14
const queuedPlayers = {}

function drawPlayers (playerPositionIndex, players) {
  const playerPosition = playerPositions[playerPositionIndex]
  let playerIndex = 0
  box.fillText(players[playerIndex++], playerPosition.x, playerPosition.y)
  box.fillText(players[playerIndex++], playerPosition.x + playerMarginX, playerPosition.y)
  box.fillText(players[playerIndex++], playerPosition.x, playerPosition.y + playerMarginY)
  box.fillText(players[playerIndex++], playerPosition.x + playerMarginX, playerPosition.y + playerMarginY)
}

addPlayerBtn.addEventListener('click', () => {
  box.beginPath()
  box.textAlign = 'left'
  box.textBaseline = 'middle'
  box.font = `${playerNameFontSize}px Arial`
  box.fillStyle = 'black'
  const players = [playerNames.shift(), playerNames.shift(), playerNames.shift(), playerNames.shift()]
  queuedPlayers[playerPositionIndex] = players
  drawPlayers(playerPositionIndex, players)
  playerPositionIndex = ++playerPositionIndex % playerPositions.length
  showPlayerPools()
  if (Object.keys(queuedPlayers).length === playerPositions.length) {
    addPlayerResult.style.display = 'inline'
    addPlayerBtn.disabled = true
  } else {
    addPlayerResult.style.display = 'none'
    callNextBtn.disabled = false
    callNextResult.style.display = 'none'
  }
})
