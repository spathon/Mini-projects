
const canvas = document.getElementById('board')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const ctx = canvas.getContext('2d')
ctx.fillStyle = 'rgba(0, 0, 0, .5)'
ctx.strokeStyle = '#007bd2'
// ctx.fillStyle = '#007bd2'
// ctx.strokeStyle = 'rgba(0, 0, 0, .5)'
ctx.lineWidth = 1

const SIZE = 15
const TOTAL_SIZE = SIZE + 3
const grid = []
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const HEX_WIDTH = TOTAL_SIZE * 2
const HEX_HEIGHT = Math.sqrt(3) * TOTAL_SIZE
const HEX_SPACING = HEX_WIDTH * 3/4
const ITEMS_WIDTH = WIDTH / HEX_SPACING
const ITEMS_HEIGHT = HEIGHT / HEX_HEIGHT

function oddqToCube(hex) {
  const x = hex.x
  const z = hex.y - (hex.x - (hex.x & 1)) / 2
  const y = -x-z
  return { x, y, z }
}

function Point(x, y) {
  this.x = x
  this.y = y
}

function Hex(x, y) {
  this.x = x
  this.y = y
  this.points = []

  var offSetX = (TOTAL_SIZE / 2 * x) * -1
  var offSetY = 0
  if (x % 2 == 1) offSetY = Math.sqrt(3) / 2 * TOTAL_SIZE

  this.center = new Point(
    x * TOTAL_SIZE * 2 + offSetX,
    y * Math.sqrt(3) / 2 * TOTAL_SIZE * 2 + offSetY
  )

  for (let i = 0; i < 6; i++) {
    var degree = 60 * i
    var radian = Math.PI / 180 * degree

    var point = new Point(
      this.center.x + SIZE * Math.cos(radian),
      this.center.y + SIZE * Math.sin(radian)
    )

    this.points.push(point)
  }
}



for (let iY = 0; iY < ITEMS_HEIGHT; iY++) {
  for (let iX = 0; iX < ITEMS_WIDTH; iX++) {
    const hex = new Hex(iX, iY)
    grid.push(hex)
  }
}

let g = 0
function draw() {
  const hex = grid[g]
  g += 1
  const cube = oddqToCube(hex)
  console.log(cube, 'x:', hex.x, 'y', hex.y)
  ctx.beginPath()
  ctx.moveTo(hex.points[0].x, hex.points[0].y)

  for (let k = 1; k < hex.points.length; k++) {
    ctx.lineTo(hex.points[k].x, hex.points[k].y)
  }

  ctx.closePath()
  ctx.stroke()
  // const hexGradient = ctx.createRadialGradient(hex.center.x, hex.center.y, 1, hex.center.x, hex.center.y, SIZE*2)
  // hexGradient.addColorStop(0, '#000944')
  // hexGradient.addColorStop(1, '#000020')
  // ctx.fillStyle = hexGradient
  ctx.fill()
  if(g < grid.length - 1) setTimeout(draw, 1)
}
  
draw()


