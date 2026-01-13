/*--- Start Scripting ---*/
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};


// Anime.js Scroll Animation for Boxes
if (typeof anime !== 'undefined') {
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [100, 0], // Slide up from 100px down
                    opacity: [0, 1],
                    duration: 950,
                    easing: 'cubicBezier(0.1, 0.7, 0.5, 1)',
                    delay: anime.stagger(200) // Stagger effect for multiple boxes
                });
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.box').forEach(box => {
        box.style.opacity = '0'; // Initial state hidden
        observer.observe(box);
    });
}

// Add fade-in class to sections and content for animation
document.querySelectorAll('section, .box, .content, .heading').forEach(el => {
    el.classList.add('fade-in');
});

/* Scroll Animation (Intersection Observer) */
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});




// Home Slider Swiper Removed (Static Hero)

var swiper = new Swiper(".reviews-slider", {
    loop: true,
    spaceBetween: 50,
    grabCursor: true,
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});


let loadMoreBtn = document.querySelector('.packages .load-more .btn');
let currentItem = 3;

// Check for "show=all" query parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('show') === 'all') {
    // If "show=all" is present, show ALL packages immediately
    // Use a timeout or ensure DOM is ready? Script is usually at bottom so it's fine.
    // However, we need to override the initial state.
    // We'll set currentItem to a large number or just loop all.
    let boxes = [...document.querySelectorAll('.packages .box-container .box')];
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.display = 'flex';
    }
    // Hide the button since everything is shown
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
}

if (loadMoreBtn && urlParams.get('show') !== 'all') {
    loadMoreBtn.onclick = () => {
        let boxs = [...document.querySelectorAll('.packages .box-container .box')];
        // Show all remaining packages on click
        for (var i = 0; i < boxs.length; i++) {
            boxs[i].style.display = 'flex';
        }
        loadMoreBtn.style.display = 'none';
    };
}
let readMoreBtns = document.querySelectorAll('.packages .box .content .read-more, .home-packages .box .content .read-more');

readMoreBtns.forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        let box = btn.closest('.box');
        let title = box.querySelector('h3').innerText;
        let content = box.querySelector('.more-details').innerHTML;
        let imgSrc = box.querySelector('.image img').src;

        let modalTitle = document.getElementById('modal-title');
        let modalBody = document.getElementById('modal-body');
        let modalImg = document.getElementById('modal-img');
        let modalBookBtn = document.getElementById('modal-book-btn');

        if (modal && modalTitle && modalBody && modalImg) {
            modalTitle.innerText = title;
            modalBody.innerHTML = content;
            modalImg.src = imgSrc;
            modalImg.style.display = 'block';
            if (modalBookBtn) modalBookBtn.style.display = 'block'; // Show book button
            modal.style.display = 'flex';
            toggleScrollLock(true);
        }
    }
});


let closeModal = document.getElementById('close-modal');
let modal = document.getElementById('package-modal');

function toggleScrollLock(active) {
    if (active) {
        document.body.classList.add('stop-scrolling');
        document.documentElement.classList.add('stop-scrolling');
    } else {
        document.body.classList.remove('stop-scrolling');
        document.documentElement.classList.remove('stop-scrolling');
    }
}

if (closeModal && modal) {
    closeModal.onclick = () => {
        modal.style.display = 'none';
        toggleScrollLock(false);
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            toggleScrollLock(false);
        }
    }
}


let readMoreAboutBtn = document.querySelector('.about .content .read-more-about');
if (readMoreAboutBtn) {
    readMoreAboutBtn.onclick = () => {
        let moreAboutDetails = document.querySelector('.about .content .more-about-details');

        if (moreAboutDetails.style.display === 'none') {
            moreAboutDetails.style.display = 'block';
            readMoreAboutBtn.innerText = 'Show Less';
        } else {
            moreAboutDetails.style.display = 'none';
            readMoreAboutBtn.innerText = 'Learn More';
        }
    }
}

/*--- Footer Extra Links Modal Logic ---*/
const footerContent = {
    'questions': {
        title: 'Ask Questions',
        body: '<p>If you have any questions regarding our packages, booking process, or services, please feel free to reach out to our support team. <br><br> Email: formicro32@gmail.com <br> Phone: +91 7801974180</p>'
    },
    'about': {
        title: 'About Us',
        body: '<p>We are a premier travel agency dedicated to providing specific and unforgettable travel experiences. With over 10 years of experience, we have served thousands of happy travelers.</p>'
    },
    'privacy': {
        title: 'Privacy Policy',
        body: '<p>Your privacy is important to us. We collect only necessary information to process your bookings and improve your experience. We do not share your data with third parties without consent.</p>'
    },
    'terms': {
        title: 'Terms of Use',
        body: '<p>By using our website, you agree to our terms and conditions. All bookings are subject to availability and confirmation. Cancellation policies apply as per the package details.</p>'
    }
};

let footerLinks = document.querySelectorAll('.footer .box a[data-key]');

footerLinks.forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        let key = link.getAttribute('data-key');
        let content = footerContent[key];

        if (content) {
            let modalTitle = document.getElementById('modal-title');
            let modalBody = document.getElementById('modal-body');
            let modalImg = document.getElementById('modal-img');
            let modalBookBtn = document.getElementById('modal-book-btn');

            if (modal && modalTitle && modalBody && modalImg) {
                modalTitle.innerText = content.title;
                modalBody.innerHTML = content.body;
                modalImg.style.display = 'none'; // Hide image for text-only modals
                if (modalBookBtn) modalBookBtn.style.display = 'none'; // Hide book button
                modal.style.display = 'flex';
                toggleScrollLock(true);
            }
        }
    }
});
