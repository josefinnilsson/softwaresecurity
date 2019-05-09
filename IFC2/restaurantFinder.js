let restaurants = [
	{ name: 'Restaurant1', locX: 0, locY: 0, avgPrice: 100 },
	{ name: 'Restaurant2', locX: 10, locY: 0, avgPrice: 150 },
	{ name: 'Restaurant3', locX: 12, locY: 23, avgPrice: 120 },
	{ name: 'Restaurant4', locX: 5, locY: 6, avgPrice: 200 },
	{ name: 'Restaurant5', locX: 4, locY: 12, avgPrice: 300 },
	{ name: 'Restaurant6', locX: 12, locY: 23, avgPrice: 150 },
	{ name: 'Restaurant7', locX: -10, locY: -10, avgPrice: 75 },
	{ name: 'Restaurant8', locX: -5, locY: 25, avgPrice: 105 },
	{ name: 'Restaurant9', locX: 90, locY: -100, avgPrice: 95 },
	{ name: 'Restaurant10', locX: 0, locY: 10, avgPrice: 100 },
]

function getDist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2))
}

function nearestRestaurant(xa, ya, xb, yb) {
	let closestDistance = Number.MAX_VALUE
	let closestRestaurant = restaurants[0]
	restaurants.forEach(function(r) {
		const da = getDist(xa, ya, r.locX, r.locY)
		const db = getDist(xb, yb, r.locX, r.locY)
		if ((da + db) < closestDistance) {
			closestDistance = (da + db)
			closestRestaurant = r
		}
	})
	return closestRestaurant
}
