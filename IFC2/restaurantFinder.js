let restaurants = [
	{ name: 'Restaurant1', locX: 0, locY: 0, avgPrice: 100 },
	{ name: 'Restaurant2', locX: 10, locY: 0, avgPrice: 150 },
	{ name: 'Restaurant3', locX: 12, locY: 23, avgPrice: 120 },
	{ name: 'Restaurant4', locX: 5, locY: 6, avgPrice: 200 },
	{ name: 'Restaurant5', locX: 4, locY: 12, avgPrice: 300 },
	{ name: 'Restaurant6', locX: 12, locY: 23, avgPrice: 150 },
	{ name: 'Restaurant7', locX: 10, locY: 10, avgPrice: 75 },
	{ name: 'Restaurant8', locX: 5, locY: 25, avgPrice: 105 },
	{ name: 'Restaurant9', locX: 90, locY: 99, avgPrice: 95 },
	{ name: 'Restaurant10', locX: 12, locY: 10, avgPrice: 100 },
]

let xa = lbl(76, 'alice')
let ya = lbl(10, 'alice')
let xb = lbl(22, 'bob')
let yb = lbl(13, 'bob')
const avg = 0
let xc = lbl(0, 'charlie')
let yc = lbl(0, 'charlie')

function getDist(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2))
}

function nearestRestaurant() {
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

function chooseRestaurant() {
	const rest = nearestRestaurant()
	xa = rest.locX
	ya = rest.locY
	xb = rest.locX
	yb = rest.locY
	return rest
}

function distanceAliceCharlie() {
	return getDist(declassify(xa), declassify(ya), xc, yc)
}

function guessRestaurant(dist) {
	let closestDistance = lbl(Number.MAX_VALUE, 'charlie')
	let closestRestaurant = lbl(restaurants[0], 'charlie')
	for (let i = 0; i < restaurants.length; i++) {
		const r = restaurants[i]
		if (dist === getDist(r.locX, r.locY, xc, yc)) {
			print(r)
			closestRestaurant = r
		}
	}
	return closestRestaurant
}


// Choose restaurant for Alice and Bob with average price of better than some threshold (Task 1 and 2)
lprint(chooseRestaurant())

// Return distance between Alice and Charlie, find restaurant where Alice and Bob have dinner (Task 3)
let dist = distanceAliceCharlie()
lprint(guessRestaurant(dist))



// Task 4
// Create wallets for Alice and Bob, pay for the dinner

// wallets of A and B
let walletA = lbl(100, 'alice', 'restaurant');
let walletB = lbl(10, 'bob', 'restaurant');

function pay(wallet, price) {

	let message; // get security context of price

	if(declassify(wallet >= price)) {
		wallet =- price;
		message = "Payment Done";
	} else {
		message = "Error Message";
	}
	return message + lbl('', 'restaurant');
}

// pay 50 for dinner (bob cannot afford!)
lprint(pay(walletA, lbl(50,'restaurant')));
lprint(pay(walletB, lbl(50,'restaurant')));



// Task 5
// Charlie performs a trilateration attack 

function trilaterate() {
	let x = ( dist*dist - dist1*dist1 + xc*xc ) / (2*xc);
	let y = Math.sqrt(Math.abs(dist*dist - x*x));
	let coords = lbl([x,y],'charlie');
	return coords;
}

// update Charlie's x-coordinate randomly, get distance to Alice and estimate Alice's coordinates
xc = lbl(Math.floor((Math.random() * 100)), 'charlie');
let dist1 = distanceAliceCharlie();
lprint(trilaterate());


