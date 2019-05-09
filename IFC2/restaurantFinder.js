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

function nearestRestaurant(xa, ya, xb, yb, avg) {
	let closestDistance = lbl(Number.MAX_VALUE, 'alice', 'bob')
	let closestRestaurant = lbl(restaurants[0], 'alice', 'bob')
	for (let i = 0; i < restaurants.length; i++) {
		const r = restaurants[i]
		const da = lbl(getDist(xa, ya, r.locX, r.locY), 'alice')
		const db = lbl(getDist(xb, yb, r.locX, r.locY), 'bob')
		if ((da + db) < closestDistance && r.avgPrice > avg) {
			closestDistance = (da + db)
			closestRestaurant = r
		}
	}
	return closestRestaurant
}

const xa = lbl(0, 'alice')
const ya = lbl(0, 'alice')
const xb = lbl(1, 'bob')
const yb = lbl(1, 'bob')
const price = 100

lprint(nearestRestaurant(xa, ya, xb, yb, price))

