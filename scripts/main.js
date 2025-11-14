// ==========================================
// MindMotion Psychology - Main JavaScript
// Smooth scrolling and mobile menu
// ==========================================

// Wait for page to load completely
document.addEventListener('DOMContentLoaded', function () {

    // ========== SMOOTH SCROLLING FOR NAVIGATION ==========
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevent default jump behavior
            e.preventDefault();

            // Get the target section ID from the href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Smoothly scroll to the section
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ========== MOBILE HAMBURGER MENU ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            // Toggle mobile menu
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }


    // ========== HIGHLIGHT ACTIVE SECTION IN NAV ==========
    // Get all sections
    const sections = document.querySelectorAll('section[id]');

    // Function to highlight active nav link based on scroll position
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + 100; // Offset for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to current section's link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', highlightNavOnScroll);


    // ========== FORM SUBMISSION SUCCESS MESSAGE ==========
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // Netlify will handle the actual submission
            // This just provides user feedback
            console.log('Form submitted successfully!');
        });
    }

});