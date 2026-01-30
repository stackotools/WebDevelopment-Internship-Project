// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    initMobileNav();

    // Smooth Scrolling - Fixed
    initSmoothScroll();

    // Typewriter Effect
    initTypewriter();

    // Form Submission
    initContactForm();

    // Back to Top Button
    initBackToTop();

    // Animate Elements on Scroll
    initScrollAnimations();

    // Animate Skill Bars
    initSkillBars();

    // Update Copyright Year
    updateCopyrightYear();

    // Initialize all animations
    initAnimations();

    // Navbar scroll effect
    initNavbarScroll();

    // Initialize tooltips
    initTooltips();
});

// ===== MOBILE NAVIGATION =====
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== SMOOTH SCROLLING - FIXED =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                if (hamburger && navLinks && navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }

                // Get navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                // Use smooth scroll with requestAnimationFrame for better performance
                smoothScrollTo(targetPosition, 800);
            }
        });
    });
}

// Improved smooth scroll function
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for smooth scroll
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    const typewriterText = document.querySelector('.typewriter-text');
    const typewriterCursor = document.querySelector('.typewriter-cursor');
    if (!typewriterText || !typewriterCursor) return;

    const texts = ['Web Developer', 'Frontend Developer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function type() {
        const currentText = texts[textIndex];

        if (isWaiting) {
            // Pause between words
            isWaiting = false;
            setTimeout(type, 1000);
            return;
        }

        if (isDeleting) {
            // Deleting text
            typewriterText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typewriterCursor.style.animation = 'cursorBlink 0.5s infinite';
        } else {
            // Typing text
            typewriterText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typewriterCursor.style.animation = 'cursorBlink 0.8s infinite';
        }

        // Typing speed
        let typeSpeed = 100;

        if (isDeleting) {
            typeSpeed = 50; // Faster when deleting
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Finished typing word
            isDeleting = true;
            typeSpeed = 1500; // Pause at end of word
            typewriterCursor.style.animation = 'cursorBlink 1.2s infinite';
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting word
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
            isWaiting = true;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing after page loads
    window.addEventListener('load', () => {
        setTimeout(type, 1000);
    });
}

// DOM Content Loaded - Add this function call
document.addEventListener('DOMContentLoaded', function () {
    // ... other initialization code ...

    // Typewriter Effect
    initTypewriter();

    // ... other initialization code ...
});






// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add specific animation classes based on element
                if (entry.target.classList.contains('slide-in-left') ||
                    entry.target.classList.contains('slide-in-right') ||
                    entry.target.classList.contains('slide-up')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .slide-in-left, .slide-in-right, .slide-up').forEach(el => {
        observer.observe(el);
    });
}

// ===== SKILL BARS ANIMATION =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';

                setTimeout(() => {
                    skillBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    skillBar.style.width = width;
                }, 300);

                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showNotification('🎉 Message sent successfully! I\'ll get back to you soon.', 'success');
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showNotification('❌ Failed to send message. Please try again or email me directly.', 'error');
                console.error('Form error:', error);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="close-notification">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1.2rem 1.5rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        z-index: 9999;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        animation: notificationSlideIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        min-width: 300px;
    `;

    // Add animation styles
    const style = document.createElement('style');
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes notificationSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes notificationSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                flex: 1;
            }
            
            .close-notification {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0 0.5rem;
                line-height: 1;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }
            
            .close-notification:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button event
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.style.animation = 'notificationSlideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'notificationSlideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.title = 'Back to Top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');

    // Styles
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        transform: scale(0.8);
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
            backToTopBtn.style.transform = 'scale(1)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
            backToTopBtn.style.transform = 'scale(0.8)';
        }
    });

    // Scroll to top
    backToTopBtn.addEventListener('click', () => {
        smoothScrollTo(0, 800);
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===== INITIALIZE ANIMATIONS =====
function initAnimations() {
    // Add animation delays
    document.querySelectorAll('.slide-up').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.slide-in-left').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.slide-in-right').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    // Initialize floating animation for tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });
}

// ===== UPDATE COPYRIGHT YEAR =====
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== TOOLTIPS =====
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');

    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.title;

            // Position tooltip
            const rect = e.target.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.top = `${rect.top - 10}px`;
            tooltip.style.transform = 'translate(-50%, -100%)';

            // Styles
            tooltip.style.cssText += `
                background: var(--dark-gray);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 0.9rem;
                white-space: nowrap;
                z-index: 10000;
                pointer-events: none;
                border: 1px solid var(--border);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;

            document.body.appendChild(tooltip);
            e.target.dataset.tooltipId = 'tooltip-' + Date.now();
        });

        el.addEventListener('mouseleave', (e) => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// ===== CONSOLE GREETING =====
console.log('%c🌟 Awais Raja - Web Developer', 'color: #6366f1; font-size: 20px; font-weight: bold; text-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);');
console.log('%cPortfolio Website | BTech CSE Student', 'color: #8b5cf6; font-size: 16px;');
console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'color: #ec4899; font-size: 14px;');
console.log('%cGitHub: https://github.com/stackotools', 'color: #64748b; font-size: 12px;');
console.log('%cLinkedIn: https://linkedin.com/in/awais-raja-a2735b37b/', 'color: #64748b; font-size: 12px;');

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Performance intensive tasks here
    }, 100);
});

// Prevent multiple clicks on buttons
document.querySelectorAll('.btn, .nav-link').forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.classList.contains('disabled')) {
            e.preventDefault();
            return;
        }

        this.classList.add('disabled');
        setTimeout(() => {
            this.classList.remove('disabled');
        }, 1000);
    });
});