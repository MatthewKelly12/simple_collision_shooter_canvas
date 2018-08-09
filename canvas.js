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

// Variable to show score on screen
let score = 0;

// Array to hold bullets
let bullets = []

// Array to hold targets
let targets = []

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



// Draws 'Score:' text
scoreText = () => {
	c.beginPath()
	c.font = "60pt Comic Sans MS"
	c.fillStyle = "green"
	c.fillText('Score:', 500, 600, 300)
	c.fill()
}

// Draws actual score number, starts at 0
scoreNumber = () => {
	c.beginPath()
	c.font = "60pt Comic Sans MS"
	c.fillStyle = "green"
	c.fillText(score, 750, 600, 300)
	c.fill()
}

// Draws shooter, blue cirlce with x and y coordinates of mouse
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
		this.draw()
		this.y -= 21

		// for (let t = 0; t < targets.length; t++) {
		// 	if (distance(this.x, this.y, targets[t].x,
		// 	targets[t].y) < 50) {

		// 	targets.slice(t, 1)
		// 	// targets.slice(t.x, 1)
		// 	// targets.slice(t.y, 1)

		// 	score += 1

		// 	console.log(targets)
		// 	console.log("hit")
		// 	}
		// }

	}
}
// if (distance(this.x, this.y, greenTarget.x,
// 	greenTarget.y) < 30) {

// 		greenTarget.color = "yellow"
// 		score += 1

// 		console.log(targets)
// 		console.log("hit")
// }


// if (distance(this.x, this.y, blueTarget.x,
// 	blueTarget.y) < 30) {

// 		blueTarget.color = "yellow"
// 		score += 1
// 		targets.pop()
// 		console.log(targets)
// 		console.log("hit")
// }

// Creates Targets
makeTargets = () => {
	for (let i = 0; i < 3; i++) {
		let x = (Math.random() * innerWidth - 50) + 50
		let y = (Math.random() * 100 + 50)

		targets.push(new Target(x, y))
	}
}
makeTargets()

// Shoots Bullets
addEventListener('click', event => {
	const bullet = new Bullet(mouse.x, mouse.y)
	bullets.push(bullet)


	for (let t = 0; t < targets.length; t++) {
		for (let b = 0; b < bullets.length; b++) {
			// Creating new targets if length of targets
				// array is less than zero
			if (targets.length < 1) {
					makeTargets()
			}
			// Collision detection between bullets and targets
			if (distance(bullets[b].x, bullets[b].y, targets[t].x,
				targets[t].y) < 100) {
				// If collision, score increases by 1
				score += 1
				// If collision, remove hit target
				targets.splice(t, 1)
				console.log(targets)
				console.log("hit")
				console.log(targets.length)
			}
		}
	}
})


console.log(targets)
// console.log(bullets)



// Creates animation
animate = () => {
	requestAnimationFrame(animate)

	// clears screen to prevent trailing
	c.clearRect(0, 0, innerWidth, innerHeight)

	// Circle at attached to mouse
	// Shoots bullets on click of mouse
	shooter()

	// Draws "Score:"
	scoreText()

	// Draws score number
	scoreNumber()

	// Draws and animates bullet in bullets array
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].update()
	}

	// Draws and animates target in targets array
	for (let i = 0; i < targets.length; i++) {
		targets[i].update()
	}
}


animate()