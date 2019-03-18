const orangeBarWidth = 100
const items = [
  {width: 200, id: 1},
  {width: 200, id: 2},
  {width: 200, id: 3},
  {width: 200, id: 4},
  {width: 200, id: 5},
]

let orangeBarContents = []
let blueBarContents = []

let totalItemWidth = items.reduce((a,b) => a + b)
let count = Math.floor(orangeBarWidth / items[0].width)

for (let i = 0; i < count; i++) {
  orangeBarContents.push(items[i])
}

for (let i = count; i < items.length; i++) {
  blueBarContents.push(items[i])
}

console.log('primaryMenuContents', orangeBarContents)
console.log('overflowMenuContents', blueBarContents)