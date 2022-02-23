document.body.onload = () => {
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
