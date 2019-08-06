// Variables
const footer = document.querySelector('footer')
const navbar = document.querySelector('nav')
const primarybar = document.querySelector('nav .overflow-menu-primary')
const overflowbar = document.querySelector('nav .overflow-menu-overflow')
const toggleButton = document.querySelector('[data-action="overflow-toggle"]')
let navItems = Array.prototype.slice.call(navbar.querySelectorAll('li'))
let overflowItems = Array.prototype.slice.call(overflowbar.querySelectorAll('li'))
let browserWidth, startingBrowserWidth, navbarWidth, primarybarWidth, navItemWidths

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
  let navbarContents = []
  let overflowbarContents = []
  let count = (Math.floor((elementWidth(navbar) - elementWidth(toggleButton.parentElement)) / elementWidth(navItems[0])) - 1)
  if (count < 0) {
    count = 0
  }
  if (count > navItems.length) {
    count = navItems.length
  }
  console.log(`Can fit ${count} items in navbar`)
  for (let i = 0; i < count; i++) {
    navbarContents.push(navItems[i])
  }

  for (let i = count; i < navItems.length; i++) {
    overflowbarContents.push(navItems[i])
  }
  console.log('primaryMenuContents', navbarContents)
  console.log('overflowMenuContents', overflowbarContents)
  if (overflowbarContents.length > 0) {
    toggleButton.style.display = 'inline-flex'
  } else {
    toggleButton.style.display = 'none'
  }
  primarybar.innerHTML = ''
  overflowbar.innerHTML = ''
  navbarContents.reverse().map((primarybarItem) => {
    primarybar.insertAdjacentElement('afterbegin', primarybarItem)
  })
  overflowbarContents.reverse().map((overflowbarItem) => {
    overflowbar.insertAdjacentElement('afterbegin', overflowbarItem)
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
  overflowbar.dataset.active = !toBoolean(overflowbar.dataset.active)
})