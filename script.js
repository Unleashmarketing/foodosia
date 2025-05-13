// DOM Elements
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');
const cuisineSlides = document.querySelectorAll('.cuisine-slide');
const prevCuisineBtn = document.querySelector('.prev-slide');
const nextCuisineBtn = document.querySelector('.next-slide');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevTestimonialBtn = document.querySelector('.prev-testimonial');
const nextTestimonialBtn = document.querySelector('.next-testimonial');

// Mobile Navigation Toggle
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // Toggle hamburger icon to X
        const spans = mobileNavToggle.querySelectorAll('span');
        if (mainNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (mainNav && mainNav.classList.contains('active') && 
        !mainNav.contains(event.target) && 
        !mobileNavToggle.contains(event.target)) {
        mainNav.classList.remove('active');
        const spans = mobileNavToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cuisine Slider functionality
let currentCuisineSlide = 0;

function showCuisineSlide(index) {
    // Hide all slides
    cuisineSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Show current slide
    if (cuisineSlides[index]) {
        cuisineSlides[index].style.display = 'block';
    }
}

// Initialize cuisine slider
if (cuisineSlides.length > 0) {
    showCuisineSlide(currentCuisineSlide);
    
    // Next cuisine slide
    if (nextCuisineBtn) {
        nextCuisineBtn.addEventListener('click', () => {
            currentCuisineSlide++;
            if (currentCuisineSlide >= cuisineSlides.length) {
                currentCuisineSlide = 0;
            }
            showCuisineSlide(currentCuisineSlide);
        });
    }
    
    // Previous cuisine slide
    if (prevCuisineBtn) {
        prevCuisineBtn.addEventListener('click', () => {
            currentCuisineSlide--;
            if (currentCuisineSlide < 0) {
                currentCuisineSlide = cuisineSlides.length - 1;
            }
            showCuisineSlide(currentCuisineSlide);
        });
    }
    
    // Auto slide for cuisine slider
    setInterval(() => {
        if (nextCuisineBtn) {
            nextCuisineBtn.click();
        }
    }, 5000);
}

// Testimonial Slider functionality
let currentTestimonialSlide = 0;

function showTestimonialSlide(index) {
    // Hide all testimonials
    testimonialSlides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Show current testimonial
    if (testimonialSlides[index]) {
        testimonialSlides[index].style.display = 'block';
    }
}

// Initialize testimonial slider
if (testimonialSlides.length > 0) {
    showTestimonialSlide(currentTestimonialSlide);
    
    // Next testimonial slide
    if (nextTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', () => {
            currentTestimonialSlide++;
            if (currentTestimonialSlide >= testimonialSlides.length) {
                currentTestimonialSlide = 0;
            }
            showTestimonialSlide(currentTestimonialSlide);
        });
    }
    
    // Previous testimonial slide
    if (prevTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', () => {
            currentTestimonialSlide--;
            if (currentTestimonialSlide < 0) {
                currentTestimonialSlide = testimonialSlides.length - 1;
            }
            showTestimonialSlide(currentTestimonialSlide);
        });
    }
    
    // Auto slide for testimonial slider
    setInterval(() => {
        if (nextTestimonialBtn) {
            nextTestimonialBtn.click();
        }
    }, 6000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const spans = mobileNavToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// Add animation on scroll
const animatedElements = document.querySelectorAll('.service-card, .event-card');

function checkIfInView() {
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Add animated class to CSS
const style = document.createElement('style');
style.textContent = `
    .service-card, .event-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animated, .event-card.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Check elements on load
window.addEventListener('load', checkIfInView);

// Check elements on scroll
window.addEventListener('scroll', checkIfInView);

// Sticky header effect
const header = document.querySelector('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.7rem 0';
    } else {
        header.style.boxShadow = 'none';
        header.style.padding = '1rem 0';
    }
    
    lastScrollTop = scrollTop;
});

// Active menu item based on section in viewport
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
