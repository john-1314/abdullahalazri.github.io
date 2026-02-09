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
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
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

// Theme Toggle (Optional - can be enabled if needed)
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

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.style.color = '#fbbf24';
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.style.color = 'var(--dark)';
    }
});

// Add dark theme styles
const darkThemeStyles = document.createElement('style');
darkThemeStyles.textContent = `
    .dark-theme {
        --dark: #f9fafb;
        --dark-light: #d1d5db;
        --light: #111827;
        --gray-light: #374151;
        --glass-bg: rgba(17, 24, 39, 0.85);
        --glass-border: 1px solid rgba(255, 255, 255, 0.1);
        --primary-light: rgba(37, 99, 235, 0.2);
    }
    
    .dark-theme body {
        background: linear-gradient(-45deg, #111827, #1f2937, #374151, #4b5563);
    }
    
    .dark-theme .navbar {
        background: rgba(17, 24, 39, 0.98);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .dark-theme .logo-text {
        color: var(--dark);
    }
    
    .dark-theme .nav-menu a {
        color: var(--dark-light);
    }
    
    .dark-theme .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: var(--dark);
        border-color: rgba(255, 255, 255, 0.2);
    }
    
    .dark-theme .contact-form,
    .dark-theme .skill-category,
    .dark-theme .about-card,
    .dark-theme .project-card,
    .dark-theme .timeline-item,
    .dark-theme .language-card {
        background: var(--glass-bg);
        border: var(--glass-border);
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
