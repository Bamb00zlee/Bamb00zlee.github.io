document.addEventListener('DOMContentLoaded', () => {
    let list = document.querySelector('.slider .list');
    let items = document.querySelectorAll('.slider .list .item');
    let dots = document.querySelectorAll('.slider .dots li');
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');

    let active = 0;
    let lengthItems = items.length - 1;

    function reloadSlider() {
        let width = items[0].offsetWidth;
        list.style.left = - (active * width) + 'px';
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[active].classList.add('active');
    }

    next.onclick = function() {
        if (active + 1 > lengthItems) {
            active = 0;
        } else {
            active = active + 1;
        }
        reloadSlider();
    }

    prev.onclick = function() {
        if (active - 1 < 0) {
            active = lengthItems;
        } else {
            active = active - 1;
        }
        reloadSlider();
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            active = index;
            reloadSlider();
        });
    });

    let autoSlider = setInterval(function() {
        next.click();
    }, 3000);

    document.querySelector('.slider').addEventListener('mouseenter', function() {
        clearInterval(autoSlider);
    });

    document.querySelector('.slider').addEventListener('mouseleave', function() {
        autoSlider = setInterval(function() {
            next.click();
        }, 3000);
    });

    window.addEventListener('resize', function() {
        reloadSlider();
    });

    reloadSlider();
});

/*--------------------------Все что касается бургер меню------------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
    
    function openMenu() {
        burger.classList.add('burger--active');
        nav.classList.add('nav--open');
        overlay.classList.add('overlay--active');
        document.body.classList.add('no-scroll');
    }
    
    function closeMenu() {
        burger.classList.remove('burger--active');
        nav.classList.remove('nav--open');
        overlay.classList.remove('overlay--active');
        document.body.classList.remove('no-scroll');
    }
    
    burger.addEventListener('click', function() {
        if (nav.classList.contains('nav--open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    overlay.addEventListener('click', closeMenu);
    
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            closeMenu();
            
            if (targetElement) {
                setTimeout(function() {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('nav--open')) {
            closeMenu();
        }
    });
});