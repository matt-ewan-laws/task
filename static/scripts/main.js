//////// IN VIEWPORT
//
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const { top, bottom } = rect
    const height = (window.innerHeight || document.documentElement.clientHeight)
    return (
        rect.top < ((window.innerHeight || document.documentElement.clientHeight) - 200)
    );
}

function showOnView(el) {
    if (isInViewport(el)) {
        console.log('inside')
        el.classList.add('js-animate-in--show')
    }
}

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

//////// NAV
//
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
      enableScrolling()
    } else {
      btn.classList.add('menu-icon--open')
      nav.classList.add('main-nav--open')
      disableScrolling()
      btn.dataset.isOpen = "1"
    }
  })
}

//////// SLIDER
//
const getCurrentSlide = (slider) => parseInt(getComputedStyle(slider).getPropertyValue('--slide'))
const getTotalSlides = (slider) => slider.querySelectorAll('.slider__pip').length

function slideOne(slider, number) {
  const totalSlides = getTotalSlides(slider)
  const currentSlide = getCurrentSlide(slider)

  if (currentSlide + number > totalSlides - 1) {
    gotoSlide(slider, 0)
  }
  else if (currentSlide + number < 0) {
    gotoSlide(slider, totalSlides - 1)
  }
  else {
    gotoSlide(slider, currentSlide + number)
  }
}

const slideLeft = slider => slideOne(slider, -1)
const slideRight = slider => slideOne(slider, 1)

function gotoSlide(slider, slide) {
  // get the slide number

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
          .forEach(pip => pip.addEventListener('click', () => gotoSlide(slider, pip.dataset.slide)))

    const leftButton = slider.querySelector('.slider__left-button')
    const rightButton = slider.querySelector('.slider__right-button')

    if (leftButton) {
      leftButton.addEventListener('click', () => slideLeft(slider))
    }

    if (rightButton) {
      rightButton.addEventListener('click', () => slideRight(slider))
    }
  })
}

//////// BODY ONLOAD
//
document.body.onload = () => {
  initNav()
  initSliders()

  const els = document.querySelectorAll('.js-animate-in')
  els.forEach(showOnView)

  document.body.onscroll = function() {
      els.forEach(showOnView)
  }
}
