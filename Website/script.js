// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Adjust feature section position
    adjustFeatureSectionPosition();
    
    // Header buttons functionality
    initHeaderButtons();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Header scroll effect
    initHeaderScrollEffect();
    
    // Animation for elements when they come into view
    initScrollAnimations();
    
    // Initialize feature card links
    initFeatureCards();
});

// Adjust the position of the feature section to move it upward
function adjustFeatureSectionPosition() {
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        // Reduce the top padding of the features section
        featuresSection.style.paddingTop = '3rem';
        
        // Also adjust the padding of hero section to reduce space
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.paddingBottom = '2rem';
            // Reduce min-height to make it more compact
            heroSection.style.minHeight = 'auto';
        }
        
        // If there's any section between hero and features, adjust that too
        const sectionAboveFeatures = featuresSection.previousElementSibling;
        if (sectionAboveFeatures && sectionAboveFeatures !== heroSection) {
            sectionAboveFeatures.style.paddingBottom = '1rem';
        }
    }
}

// Header buttons functionality
function initHeaderButtons() {
    // Login button redirects to login page
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Create a login page with black background and blue elements
            createNewPage('login');
        });
    }
    
    // Get Started button redirects to create account page
    const getStartedBtn = document.querySelector('.btn-primary');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            // Create a create account page with black background and blue elements
            createNewPage('signup');
        });
    }
    
    // About navigation link
    const aboutLink = document.querySelector('nav a[href="#"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Navigate to about page
            window.location.href = 'about.html'; // You'll need to create this page
        });
    }
    
    // Learn More button scrolls to footer
    const learnMoreBtn = document.querySelector('.btn-outline.btn-large');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to the footer section
            const footer = document.querySelector('footer');
            if (footer) {
                window.scrollTo({
                    top: footer.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Create new page for login or signup
function createNewPage(type) {
    // Save current body content
    const currentContent = document.body.innerHTML;
    
    // Clear the body
    document.body.innerHTML = '';
    
    // Change body background to black
    document.body.style.backgroundColor = '#000';
    document.body.style.color = '#fff';
    
    // Create header with back button
    const header = document.createElement('header');
    header.classList.add('header');
    header.style.backgroundColor = '#000';
    header.style.borderBottom = '1px solid #333';
    
    // Add logo
    const logo = document.createElement('div');
    logo.classList.add('logo');
    logo.textContent = 'AMIA STUDIOS';
    
    // Add back button
    const backBtn = document.createElement('button');
    backBtn.classList.add('btn', 'btn-outline');
    backBtn.textContent = 'Back to Home';
    backBtn.style.color = '#5E62E2';
    
    backBtn.addEventListener('click', function() {
        // Restore previous content
        document.body.innerHTML = currentContent;
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        
        // Reinitialize all event listeners
        initHeaderButtons();
        initSmoothScrolling();
        initHeaderScrollEffect();
        initScrollAnimations();
        initFeatureCards();
        adjustFeatureSectionPosition(); // Don't forget to reapply position adjustments
    });
    
    header.appendChild(logo);
    header.appendChild(backBtn);
    document.body.appendChild(header);
    
    // Create main content
    const main = document.createElement('main');
    main.style.maxWidth = '500px';
    main.style.margin = '100px auto';
    main.style.padding = '2rem';
    
    // Form title
    const title = document.createElement('h2');
    title.textContent = type === 'login' ? 'Log In to Your Account' : 'Create New Account';
    title.style.marginBottom = '2rem';
    title.style.color = '#fff';
    
    // Create form
    const form = document.createElement('form');
    
    // Email field
    const emailGroup = document.createElement('div');
    emailGroup.style.marginBottom = '1.5rem';
    
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email';
    emailLabel.style.display = 'block';
    emailLabel.style.marginBottom = '0.5rem';
    emailLabel.style.color = '#fff';
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.required = true;
    emailInput.style.width = '100%';
    emailInput.style.padding = '1rem';
    emailInput.style.borderRadius = '8px';
    emailInput.style.border = '1px solid #333';
    emailInput.style.backgroundColor = '#111';
    emailInput.style.color = '#fff';
    
    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);
    
    // Password field
    const passwordGroup = document.createElement('div');
    passwordGroup.style.marginBottom = '2rem';
    
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';
    passwordLabel.style.display = 'block';
    passwordLabel.style.marginBottom = '0.5rem';
    passwordLabel.style.color = '#fff';
    
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.required = true;
    passwordInput.style.width = '100%';
    passwordInput.style.padding = '1rem';
    passwordInput.style.borderRadius = '8px';
    passwordInput.style.border = '1px solid #333';
    passwordInput.style.backgroundColor = '#111';
    passwordInput.style.color = '#fff';
    
    passwordGroup.appendChild(passwordLabel);
    passwordGroup.appendChild(passwordInput);
    
    // Add name field if signup
    if (type === 'signup') {
        const nameGroup = document.createElement('div');
        nameGroup.style.marginBottom = '1.5rem';
        
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Full Name';
        nameLabel.style.display = 'block';
        nameLabel.style.marginBottom = '0.5rem';
        nameLabel.style.color = '#fff';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.required = true;
        nameInput.style.width = '100%';
        nameInput.style.padding = '1rem';
        nameInput.style.borderRadius = '8px';
        nameInput.style.border = '1px solid #333';
        nameInput.style.backgroundColor = '#111';
        nameInput.style.color = '#fff';
        
        nameGroup.appendChild(nameLabel);
        nameGroup.appendChild(nameInput);
        
        // Insert name field before email
        form.appendChild(nameGroup);
    }
    
    // Submit button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.classList.add('btn', 'btn-primary');
    submitBtn.textContent = type === 'login' ? 'Log In' : 'Create Account';
    submitBtn.style.width = '100%';
    submitBtn.style.padding = '1rem';
    submitBtn.style.borderRadius = '8px';
    submitBtn.style.backgroundColor = '#5E62E2';
    submitBtn.style.color = '#fff';
    submitBtn.style.border = 'none';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.fontWeight = 'bold';
    
    // Add form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert(type === 'login' ? 'Login functionality will be implemented here' : 'Account creation will be implemented here');
    });
    
    // Add fields to form
    form.appendChild(emailGroup);
    form.appendChild(passwordGroup);
    form.appendChild(submitBtn);
    
    // Alternative option
    const altOption = document.createElement('p');
    altOption.style.textAlign = 'center';
    altOption.style.marginTop = '2rem';
    altOption.style.color = '#999';
    
    const altLink = document.createElement('a');
    altLink.href = '#';
    altLink.style.color = '#5E62E2';
    altLink.style.textDecoration = 'underline';
    
    if (type === 'login') {
        altOption.textContent = "Don't have an account? ";
        altLink.textContent = 'Sign up';
        altLink.addEventListener('click', function(e) {
            e.preventDefault();
            createNewPage('signup');
        });
    } else {
        altOption.textContent = 'Already have an account? ';
        altLink.textContent = 'Log in';
        altLink.addEventListener('click', function(e) {
            e.preventDefault();
            createNewPage('login');
        });
    }
    
    altOption.appendChild(altLink);
    
    // Add all elements to main
    main.appendChild(title);
    main.appendChild(form);
    main.appendChild(altOption);
    
    // Add main to body
    document.body.appendChild(main);
}

// Initialize feature cards with specific functionality
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        // For the first feature card (Smart Notes)
        if (index === 0) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                window.location.href = 'https://smart-notes-fyi.netlify.app/';
            });
        }
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Smooth scroll to the element
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                    
                    // Update active state in navigation
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        }
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.padding = '1rem 2rem';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
            header.style.padding = '1.5rem 2rem';
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Select elements to animate
    const elementsToAnimate = [
        '.hero-content',
        '.hero-image',
        '.feature-card'
    ];
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to add animate class to elements in viewport
    function checkElementsInViewport() {
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        });
    }
    
    // Initialize elements with default styles
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (!element.classList.contains('animated')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    });
    
    // Check elements on load
    checkElementsInViewport();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkElementsInViewport);
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    // Only add mobile menu on smaller screens
    if (window.innerWidth <= 768) {
        header.insertBefore(mobileMenuToggle, nav);
        
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Update on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                header.insertBefore(mobileMenuToggle, nav);
            }
        } else {
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.remove();
                nav.classList.remove('active');
            }
        }
    });
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
});