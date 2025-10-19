// GLOBAL MODAL FUNCTIONS (Must be outside DOMContentLoaded for onclick to work)

function openModal() {
    const modal = document.getElementById('admission-modal');
    modal.style.display = 'flex'; // Use flex for centering
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('admission-modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
}

// Close the main modal or lightbox if the user clicks outside
window.onclick = function(event) {
    const modal = document.getElementById('admission-modal');
    const lightboxModal = document.getElementById('lightbox-modal');
    
    if (event.target === modal) {
        closeModal();
    }
    
    if (event.target === lightboxModal) {
        lightboxModal.style.display = 'none';
        lightboxModal.setAttribute('aria-hidden', 'true');
        // Re-enable scroll unless main modal is currently open
        if (modal.style.display !== 'flex') {
             document.body.style.overflow = 'auto';
        }
    }
}

// NEW ADVANCED FEATURE: Lightbox Gallery
function setupLightbox() {
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close-button');

    galleryPhotos.forEach(photo => {
        photo.addEventListener('click', (e) => {
            const src = e.target.getAttribute('src');
            const alt = e.target.getAttribute('alt');
            
            lightboxImg.setAttribute('src', src);
            lightboxCaption.textContent = alt;
            
            lightboxModal.style.display = 'flex';
            lightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    });

    // Close on button click
    closeBtn.addEventListener('click', () => {
        lightboxModal.style.display = 'none';
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Unlock background scroll
    });
}


// Document Ready Code Starts Here
document.addEventListener("DOMContentLoaded", () => {
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize Advanced Features
    setupLightbox();

    // 1. Setup Intersection Observer for Scroll-In Animations (Performance Tool)
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || '0';
                entry.target.style.setProperty('--animation-delay', `${delay}ms`);
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // 2. Mobile Menu Toggle Logic
    const menuButton = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = mobileNav.querySelectorAll('a');

    menuButton.addEventListener('click', () => {
        const isCurrentlyOpen = mobileNav.classList.toggle('is-open');
        
        menuButton.setAttribute('aria-expanded', isCurrentlyOpen);
        
        // Change icon (Hamburger <-> X)
        const icon = menuButton.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        
        // Toggle body scroll lock
        document.body.style.overflow = isCurrentlyOpen ? 'hidden' : 'auto';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
            menuButton.setAttribute('aria-expanded', 'false');
            
            // Reset the icon to the hamburger
            const icon = menuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto'; 
        });
    });

    // 3. Header Shrink on Scroll Logic
    const header = document.querySelector('.main-header');
    const scrollTrigger = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollTrigger) {
            header.classList.add('shrink');
        } else {
            header.classList.remove('shrink');
        }
    });

    // 4. Parallax Effect for Hero Background
    const heroBg = document.querySelector('.hero-bg-image');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) { // Only apply parallax in hero section
            heroBg.style.transform = `translateY(${scrollY * 0.5}px)`; // Gentle parallax
        }
    });

});