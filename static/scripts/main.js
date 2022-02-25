function initNav() {
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

function gotoSlide(slider, slideNumber) {
  // getComputedStyle(slider)
    // .setProperty('--slide', slideNumber.toString())
  const style = getComputedStyle(slider)
  const currentSlide = style.getPropertyValue('--slide')
  slider.style.setProperty('--slide', slideNumber)
  const newSlide = style.getPropertyValue('--slide')
  console.log({ slideNumber, newSlide })

}

function initSliders() {
  const sliders = document.querySelectorAll('.slider')

  sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slider__slide')

    slider.querySelectorAll('.slider__pip')
          .forEach(pip => {
            const pipSlide = pip.dataset.slide
            pip.addEventListener('click', () => gotoSlide(slider, pipSlide))
          })
  })
}

document.body.onload = () => {
  initNav()
  initSliders()
}
