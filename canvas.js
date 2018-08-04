// Initial canvas setup
let canvas = document.querySelector("canvas")

canvas.width = innerWidth
canvas.height = innerHeight

let c = canvas.getContext('2d')

// Creates mouse object
const mouse = {
	x: undefined,
	y: undefined
}

// Calculates and returns the distance bewteen two points
function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Sets x and y values of mouse object to x and y
// coordinates of the mousemove
addEventListener('mousemove', event => {
	mouse.x = event.x
	mouse.y = event.y
})

let score = 0;

// Shooter, blue cirlce with x and y coordinates of mouse
shooter = () => {
	c.beginPath()
	c.fillStyle = "blue"
	c.arc(mouse.x, mouse.y, 40, 0, Math.PI *2)
	c.fill()
}



function Target(x, y) {
	this.x = x
	this.y = y
	this.radius = 50
	this.color = "green"

	// Draws a green circle
	this.draw = function () {
		c.beginPath()
		c.fillStyle = this.color
		c.arc(this.x, this.y, this.radius, 0, Math.PI *2)
		c.fill()
	}


	this.update = function () {
		this.draw()
	}
}

const greenTarget = new Target(300, 50)

const blueTarget = new Target(600, 50)

let targets = []
targets.push(greenTarget)
targets.push(blueTarget)



// Bullets
function Bullet(x, y) {
	this.x = x
	this.y = y

	// Draws a black circle
	this.draw = function () {
		c.beginPath()
		c.fillStyle = "black"
		c.arc(this.x, this.y, 10, 0, Math.PI *2)
		c.fill()
	}

	// Moves bullet up towards top of screen
	// Calls draw() function
	this.update = function () {
		this.y -= 21

		if (distance(this.x + 10, this.y + 10, greenTarget.x + greenTarget.radius,
			greenTarget.y + greenTarget.radius,) < 30) {

				greenTarget.color = "yellow"
				score += 1

				console.log("hit")
		}


		if (distance(this.x + 10, this.y + 10, blueTarget.x + blueTarget.radius,
			blueTarget.y + blueTarget.radius,) < 30) {

				blueTarget.color = "yellow"
				score += 1

				console.log("hit")
		}

		this.draw()
	}
}

let bullets = []

addEventListener('click', event => {
	const bullet = new Bullet(mouse.x, mouse.y)
	bullets.push(bullet)
})



// Creates animation
animate = () => {
	requestAnimationFrame(animate)

	// clears screen to prevent trailing
	c.clearRect(0, 0, innerWidth, innerHeight)

	shooter()

	for (let i = 0; i < bullets.length; i++) {
		bullets[i].update()
	}


	for (let i = 0; i < targets.length; i++) {
		targets[i].update()
	}

	c.beginPath()
	c.font = "60pt Comic Sans MS"
	c.fillStyle = "green"
	c.fillText('Score:', 500, 500, 300)
	c.fill()

	c.beginPath()
	c.font = "60pt Comic Sans MS"
	c.fillStyle = "green"
	c.fillText(score, 750, 500, 300)
	c.fill()



}

animate()