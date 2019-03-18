// Variables
const footer = document.querySelector('footer')
const orangeBar = document.querySelector('nav')
const purpleBar = document.querySelector('nav .desktop')
const blueBar = document.querySelector('nav .overflow')
const toggleButton = document.querySelector('[data-action="overflow-toggle"]')
let navItems = Array.prototype.slice.call(document.querySelectorAll('li'))
let overflowItems = Array.prototype.slice.call(blueBar.querySelectorAll('li'))
let browserWidth, startingBrowserWidth, orangeBarWidth, purpleBarWidth, navItemWidths

// Functions

const toBoolean = (input) => {
  if (input === 'false') {
    return false
  }
  if (input === 'true') {
    return true
  }
  return false
}

const elementWidth = (element) => {
  return ~~(window.getComputedStyle(element, null).getPropertyValue('width').slice(0, -2))
}

const sortMenus = () => {
  let orangeBarContents = []
  let blueBarContents = []
  let count = Math.floor((elementWidth(orangeBar) - elementWidth(toggleButton.parentElement)) / elementWidth(navItems[0]))
  if (count < 0) {
    count = 0
  }
  if (count > navItems.length) {
    count = navItems.length
  }
  console.log(`Can fit ${count} items in orangeBar`)
  for (let i = 0; i < count; i++) {
    orangeBarContents.push(navItems[i])
  }

  for (let i = count; i < navItems.length; i++) {
    blueBarContents.push(navItems[i])
  }
  console.log('primaryMenuContents', orangeBarContents)
  console.log('overflowMenuContents', blueBarContents)
  if (blueBarContents.length > 0) {
    toggleButton.style.display = 'inline-flex'
  } else {
    toggleButton.style.display = 'none'
  }
  purpleBar.innerHTML = ''
  blueBar.innerHTML = ''
  orangeBarContents.reverse().map((purpleBarItem) => {
    purpleBar.insertAdjacentElement('afterbegin', purpleBarItem)
  })
  blueBarContents.reverse().map((blueBarItem) => {
    blueBar.insertAdjacentElement('afterbegin', blueBarItem)
  })
}

// Event Listeners
window.addEventListener('load', () => {
  sortMenus()
})

window.addEventListener('resize', sortMenus)

toggleButton.addEventListener('click', (e) => {
  e.preventDefault();
  e.currentTarget.dataset.active = !toBoolean(e.currentTarget.dataset.active)
  blueBar.dataset.active = !toBoolean(blueBar.dataset.active)
})