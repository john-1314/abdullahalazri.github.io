// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');

// Toggle menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    }
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = 'auto';
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Update active navigation link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Scroll to target
            const headerHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effects
let lastScrollTop = 0;
let scrollTimeout;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Show/hide navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    // Add scrolled class for styling
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
        // Check if dark theme is active
        if (document.body.classList.contains('dark-theme')) {
            navbar.style.background = 'rgba(1, 4, 3, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.classList.remove('scrolled');
        if (document.body.classList.contains('dark-theme')) {
            navbar.style.background = 'rgba(1, 4, 3, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = 'none';
    }

    // Update active navigation link based on scroll position
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);

    lastScrollTop = scrollTop;
});

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Skill Bars Animation
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.level-bar');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;

    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight * 0.8;

    if (sectionPos < screenPos) {
        progressBars.forEach(bar => {
            const originalWidth = bar.style.width;
            bar.style.width = '0';

            // Trigger reflow
            bar.offsetHeight;

            // Animate to original width
            setTimeout(() => {
                bar.style.width = originalWidth;
            }, 200);
        });
        skillsAnimated = true;
    }
}

window.addEventListener('scroll', animateSkills);

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-card, .project-card, .skill-category, .language-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        } else {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }
    });
};

// Set initial state
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.about-card, .project-card, .skill-category, .language-card');
    elements.forEach(element => {
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    });

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'all 0.8s ease-out';

    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 300);

    // Initial check for animations
    animateOnScroll();
    animateSkills();
});

window.addEventListener('scroll', animateOnScroll);

// Enhanced Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formGroups = contactForm.querySelectorAll('.form-group');
const formSuccess = document.createElement('div');
formSuccess.className = 'form-success';
formSuccess.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <h3>Message Sent Successfully!</h3>
    <p>Thank you for your message. I'll get back to you as soon as possible.</p>
`;

contactForm.parentNode.appendChild(formSuccess);

// Form validation
function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    const message = formGroup.querySelector('.form-message');

    // Reset state
    formGroup.classList.remove('error', 'success');
    message.style.display = 'none';

    if (field.hasAttribute('required') && !value) {
        formGroup.classList.add('error');
        message.textContent = 'This field is required';
        message.style.display = 'block';
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('error');
            message.textContent = 'Please enter a valid email address';
            message.style.display = 'block';
            return false;
        }
    }

    formGroup.classList.add('success');
    message.textContent = 'Looks good!';
    message.style.display = 'block';
    return true;
}

// Real-time validation
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    if (input) {
        // Create message element
        const message = document.createElement('div');
        message.className = 'form-message';
        group.appendChild(message);

        // Validate on input
        input.addEventListener('input', () => validateField(input));

        // Validate on blur
        input.addEventListener('blur', () => validateField(input));
    }
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        // Shake form for error feedback
        contactForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            contactForm.style.animation = '';
        }, 500);
        return;
    }

    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Visual feedback
    const submitBtn = contactForm.querySelector('button');
    const originalBtnContent = submitBtn.innerHTML;
    const isArabic = document.documentElement.lang === 'ar';
    const sendingText = isArabic ? '...جاري الإرسال' : 'Sending...';

    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${sendingText}`;
    submitBtn.disabled = true;

    try {
        // Construct mailto link (fallback for non-JS or as primary method)
        const subjectContent = encodeURIComponent(formData.subject);
        const bodyContent = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        const mailtoLink = `mailto:alazriabdullah829@gmail.com?subject=${subjectContent}&body=${bodyContent}`;

        // Try to use fetch API for form submission (if you have a backend)
        // This is a fallback to mailto if fetch fails
        const response = await fetch('https://formspree.io/f/xbjndvza', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Reset form
            contactForm.reset();
            formGroups.forEach(group => {
                group.classList.remove('success', 'error');
                const message = group.querySelector('.form-message');
                if (message) message.style.display = 'none';
            });

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            }, 3000);

            // Hide success message after 5 seconds
            setTimeout(() => {
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }

    } catch (error) {
        // Fallback to mailto
        console.log('Using mailto fallback:', error);
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();

        // Show success state anyway
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';

        setTimeout(() => {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 3000);
    }
});

// Update Copyright Year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Theme Toggle with localStorage persistence
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
themeToggle.setAttribute('aria-label', 'Toggle theme');
themeToggle.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: var(--glass-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    cursor: pointer;
    z-index: 998;
    box-shadow: var(--shadow-lg);
    transition: var(--transition);
    color: var(--dark);
`;

document.body.appendChild(themeToggle);

// Function to update theme toggle icon and styles
function updateThemeToggle(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.style.color = '#28cc7d';
        themeToggle.style.background = 'rgba(1, 4, 3, 0.9)';
        themeToggle.style.border = '1px solid rgba(40, 204, 125, 0.2)';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.style.color = 'var(--dark)';
        themeToggle.style.background = 'var(--glass-bg)';
        themeToggle.style.border = 'var(--glass-border)';
    }
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeToggle(true);
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');

    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Update toggle appearance
    updateThemeToggle(isDark);

    // Update navbar background
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
        navbar.style.background = isDark ? 'rgba(1, 4, 3, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = isDark ? 'rgba(1, 4, 3, 0.95)' : 'rgba(255, 255, 255, 0.98)';
    }
});

// Add dark theme styles with new color palette
const darkThemeStyles = document.createElement('style');
darkThemeStyles.textContent = `
    /* Dark Mode Color Variables */
    .dark-theme {
        --color-dark: #010403;
        --color-light: #ddf8e9;
        --color-accent: #28cc7d;
        --color-secondary: #15216f;
        --color-highlight: #4921a6;
        
        --primary: #28cc7d;
        --primary-dark: #20a865;
        --primary-light: rgba(40, 204, 125, 0.2);
        --secondary: #15216f;
        --secondary-dark: #0f1850;
        --accent: #4921a6;
        --accent-light: rgba(73, 33, 166, 0.2);
        --dark: #ddf8e9;
        --dark-light: #b8e6cc;
        --light: #010403;
        --gray: #6b8c78;
        --gray-light: #1a3d2a;
        --white: #0a1a10;
        
        --glass-bg: rgba(1, 4, 3, 0.9);
        --glass-border: 1px solid rgba(40, 204, 125, 0.2);
        --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
        
        --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
        --shadow-md: 0 4px 12px -1px rgba(0, 0, 0, 0.4);
        --shadow-lg: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        --shadow-xl: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
        --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
    }
    
    .dark-theme body {
        background: linear-gradient(to bottom, #010403 0%, #020810 20%, #0a0f2a 50%, #15082e 80%, #1a0a35 100%);
        background-attachment: fixed;
    }
    
    /* Starry Night Sky Effect */
    .dark-theme body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
            /* Large bright stars */
            radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #ddf8e9, transparent),
            radial-gradient(2px 2px at 50px 160px, #ffffff, transparent),
            radial-gradient(2px 2px at 90px 40px, #28cc7d, transparent),
            radial-gradient(2px 2px at 130px 80px, #ffffff, transparent),
            radial-gradient(2px 2px at 160px 120px, #ddf8e9, transparent),
            /* Medium stars */
            radial-gradient(1.5px 1.5px at 200px 50px, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 250px 90px, #a78bfa, transparent),
            radial-gradient(1.5px 1.5px at 300px 30px, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 350px 140px, #28cc7d, transparent),
            radial-gradient(1.5px 1.5px at 400px 60px, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 450px 100px, #ddf8e9, transparent),
            /* Small stars */
            radial-gradient(1px 1px at 100px 200px, #ffffff, transparent),
            radial-gradient(1px 1px at 180px 250px, #ffffff, transparent),
            radial-gradient(1px 1px at 260px 180px, #ddf8e9, transparent),
            radial-gradient(1px 1px at 340px 220px, #ffffff, transparent),
            radial-gradient(1px 1px at 420px 280px, #28cc7d, transparent),
            radial-gradient(1px 1px at 500px 150px, #ffffff, transparent),
            /* More scattered stars */
            radial-gradient(1px 1px at 60px 300px, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 140px 350px, #a78bfa, transparent),
            radial-gradient(1px 1px at 220px 320px, #ffffff, transparent),
            radial-gradient(2px 2px at 300px 380px, #28cc7d, transparent),
            radial-gradient(1px 1px at 380px 340px, #ddf8e9, transparent),
            radial-gradient(1.5px 1.5px at 460px 400px, #ffffff, transparent),
            /* Additional star layers */
            radial-gradient(1px 1px at 520px 50px, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 580px 120px, #ddf8e9, transparent),
            radial-gradient(1px 1px at 640px 80px, #ffffff, transparent),
            radial-gradient(2px 2px at 700px 160px, #28cc7d, transparent),
            radial-gradient(1px 1px at 760px 40px, #ffffff, transparent),
            radial-gradient(1px 1px at 820px 200px, #a78bfa, transparent),
            /* Deep space glow */
            radial-gradient(ellipse at 10% 20%, rgba(40, 204, 125, 0.08) 0%, transparent 40%),
            radial-gradient(ellipse at 90% 10%, rgba(21, 33, 111, 0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 80% 80%, rgba(73, 33, 166, 0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 90%, rgba(40, 204, 125, 0.06) 0%, transparent 35%);
        background-repeat: repeat;
        background-size: 550px 450px;
        animation: twinkle 8s ease-in-out infinite alternate;
        pointer-events: none;
        z-index: -1;
    }
    
    /* Stars twinkling animation */
    @keyframes twinkle {
        0% {
            opacity: 0.8;
        }
        25% {
            opacity: 1;
        }
        50% {
            opacity: 0.85;
        }
        75% {
            opacity: 0.95;
        }
        100% {
            opacity: 0.9;
        }
    }
    
    /* Add a second layer for more depth */
    .dark-theme body::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image:
            radial-gradient(1.5px 1.5px at 80px 120px, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1px 1px at 160px 200px, rgba(221, 248, 233, 0.7), transparent),
            radial-gradient(2px 2px at 240px 80px, rgba(40, 204, 125, 0.9), transparent),
            radial-gradient(1px 1px at 320px 160px, rgba(255, 255, 255, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 400px 240px, rgba(167, 139, 250, 0.8), transparent),
            radial-gradient(1px 1px at 480px 100px, rgba(255, 255, 255, 0.7), transparent),
            radial-gradient(1px 1px at 560px 180px, rgba(221, 248, 233, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 640px 260px, rgba(40, 204, 125, 0.7), transparent);
        background-repeat: repeat;
        background-size: 700px 350px;
        animation: twinkle 6s ease-in-out infinite alternate-reverse;
        pointer-events: none;
        z-index: -1;
    }
    
    .dark-theme .navbar {
        background: rgba(1, 4, 3, 0.95);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(40, 204, 125, 0.1);
    }
    
    .dark-theme .navbar.scrolled {
        background: rgba(1, 4, 3, 0.98);
    }
    
    .dark-theme .logo-text {
        color: #ddf8e9;
    }
    
    .dark-theme .nav-menu a {
        color: #b8e6cc;
    }
    
    .dark-theme .nav-menu a:hover,
    .dark-theme .nav-menu a.active {
        color: #28cc7d;
    }
    
    .dark-theme .hero-title {
        color: #ddf8e9;
    }
    
    .dark-theme .hero-subtitle {
        background: linear-gradient(135deg, #ddf8e9, #28cc7d);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .dark-theme .hero-description {
        color: #b8e6cc;
    }
    
    .dark-theme .btn-secondary {
        background: rgba(40, 204, 125, 0.1);
        color: #ddf8e9;
        border-color: rgba(40, 204, 125, 0.3);
    }
    
    .dark-theme .btn-secondary:hover {
        background: rgba(40, 204, 125, 0.2);
        border-color: #28cc7d;
    }
    
    .dark-theme .stat {
        background: rgba(1, 4, 3, 0.8);
        border: 1px solid rgba(40, 204, 125, 0.2);
    }
    
    .dark-theme .stat h3 {
        color: #28cc7d;
    }
    
    .dark-theme .stat p {
        color: #b8e6cc;
    }
    
    .dark-theme .section-title {
        background: linear-gradient(135deg, #28cc7d, #4921a6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .dark-theme .section-label {
        background: rgba(40, 204, 125, 0.15);
        color: #28cc7d;
    }
    
    .dark-theme .section-header p {
        color: #b8e6cc;
    }
    
    .dark-theme .about-card,
    .dark-theme .project-card,
    .dark-theme .skill-category,
    .dark-theme .language-card,
    .dark-theme .timeline-item {
        background: rgba(1, 4, 3, 0.8);
        border: 1px solid rgba(40, 204, 125, 0.15);
    }
    
    .dark-theme .about-card h3,
    .dark-theme .project-title,
    .dark-theme .timeline-content h3,
    .dark-theme .category-header h3,
    .dark-theme .language-card h3 {
        color: #ddf8e9;
    }
    
    .dark-theme .about-card p,
    .dark-theme .project-description,
    .dark-theme .timeline-content h4 {
        color: #b8e6cc;
    }
    
    .dark-theme .tag,
    .dark-theme .skill-tag {
        background: rgba(40, 204, 125, 0.15);
        color: #28cc7d;
    }
    
    .dark-theme .tag:hover,
    .dark-theme .skill-tag:hover {
        background: #28cc7d;
        color: #010403;
    }
    
    .dark-theme .project-tech span {
        background: rgba(73, 33, 166, 0.2);
        color: #a78bfa;
    }
    
    .dark-theme .skill-level {
        background: rgba(40, 204, 125, 0.1);
    }
    
    .dark-theme .level-bar {
        background: linear-gradient(90deg, #28cc7d, #4921a6);
    }
    
    .dark-theme .contact-form {
        background: rgba(1, 4, 3, 0.9);
        border: 1px solid rgba(40, 204, 125, 0.15);
    }
    
    .dark-theme .contact-info h3 {
        color: #ddf8e9;
    }
    
    .dark-theme .contact-info p {
        color: #b8e6cc;
    }
    
    .dark-theme .contact-item {
        background: rgba(40, 204, 125, 0.05);
        border: 1px solid rgba(40, 204, 125, 0.1);
    }
    
    .dark-theme .contact-item h4 {
        color: #ddf8e9;
    }
    
    .dark-theme .contact-item p {
        color: #b8e6cc;
    }
    
    .dark-theme input,
    .dark-theme textarea {
        background: rgba(10, 26, 16, 0.8);
        border-color: rgba(40, 204, 125, 0.2);
        color: #ddf8e9;
    }
    
    .dark-theme input:focus,
    .dark-theme textarea:focus {
        border-color: #28cc7d;
        box-shadow: 0 0 0 3px rgba(40, 204, 125, 0.1);
    }
    
    .dark-theme input::placeholder,
    .dark-theme textarea::placeholder {
        color: #6b8c78;
    }
    
    .dark-theme label {
        color: #b8e6cc;
    }
    
    .dark-theme .footer {
        background: rgba(1, 4, 3, 0.98);
        border-top: 1px solid rgba(40, 204, 125, 0.1);
    }
    
    .dark-theme .footer h3,
    .dark-theme .footer h4 {
        color: #ddf8e9;
    }
    
    .dark-theme .footer p,
    .dark-theme .footer a {
        color: #b8e6cc;
    }
    
    .dark-theme .footer a:hover {
        color: #28cc7d;
    }
    
    .dark-theme .social-link {
        background: rgba(40, 204, 125, 0.1);
        color: #28cc7d;
        border-color: rgba(40, 204, 125, 0.2);
    }
    
    .dark-theme .social-link:hover {
        background: #28cc7d;
        color: #010403;
    }
    
    .dark-theme .back-to-top {
        background: linear-gradient(135deg, #28cc7d, #4921a6);
    }
    
    .dark-theme .lang-switch {
        background: rgba(40, 204, 125, 0.15);
        color: #28cc7d;
    }
    
    .dark-theme .lang-switch:hover {
        background: #28cc7d;
        color: #010403;
    }
    
    .dark-theme .hero-badge {
        background: linear-gradient(135deg, rgba(40, 204, 125, 0.2), rgba(73, 33, 166, 0.2));
        color: #28cc7d;
        border-color: rgba(40, 204, 125, 0.3);
    }
    
    .dark-theme .highlight::after {
        background: linear-gradient(90deg, #28cc7d, #4921a6);
    }
    
    .dark-theme .timeline::before {
        background: linear-gradient(to bottom, #28cc7d, #4921a6);
    }
    
    .dark-theme .timeline-item::before {
        background: #010403;
        border-color: #28cc7d;
        box-shadow: 0 0 0 8px rgba(40, 204, 125, 0.1);
    }
    
    .dark-theme .focus-points li {
        border-bottom-color: rgba(40, 204, 125, 0.1);
        color: #b8e6cc;
    }
    
    .dark-theme .focus-points i {
        color: #28cc7d;
    }
    
    .dark-theme .language-level {
        color: #28cc7d;
    }
    
    .dark-theme .language-skills span {
        background: rgba(40, 204, 125, 0.1);
        color: #28cc7d;
    }
`;
document.head.appendChild(darkThemeStyles);

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add shake animation for form error
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    img[data-src] {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Initialize animations on load
window.addEventListener('load', () => {
    // Trigger initial skill animation if already in view
    animateSkills();

    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
});
