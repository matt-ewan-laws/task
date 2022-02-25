function initNav() {
  // TODO disallow scrolling when nav is open
  const menuButton = document.querySelector('.js-menu-button')

  menuButton.addEventListener('click', function(e) {
    const btn = e.target
    const nav = document.querySelector('.main-nav')

    if (parseInt(btn.dataset.isOpen)) {
        btn.classList.remove('menu-icon--open')
        nav.classList.remove('main-nav--open')
        btn.dataset.isOpen = "0"
    } else {
        btn.classList.add('menu-icon--open')
        nav.classList.add('main-nav--open')
        btn.dataset.isOpen = "1"
    }
  })
}

function gotoSlide(slider, pip) {
  // get the slide number
  const slide = pip.dataset.slide

  // set the css variable
  slider.style.setProperty('--slide', slide)

  // get the slides and pips
  const slides = slider.querySelectorAll('.slider__slide')
  const pips = slider.querySelectorAll('.slider__pip')

  // clear the modifier classes
  pips.forEach(pip => pip.classList.remove('slider__pip--active'))
  slides.forEach(slide => slide.classList.remove('slider__slide--show'))

  // add active and show classes
  pips[slide].classList.add('slider__pip--active')
  slides[slide].classList.add('slider__slide--show')

  // focus for accessibility
  slides[slide].focus()
}

function initSliders() {
  const sliders = document.querySelectorAll('.slider')

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slider__slide')

    slider.querySelectorAll('.slider__pip')
          .forEach(pip => pip.addEventListener('click', () => gotoSlide(slider, pip)))
  })
}

document.body.onload = () => {
  initNav()
  initSliders()
}
