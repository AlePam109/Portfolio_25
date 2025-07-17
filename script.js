// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    
    // Reset navbar background to match new theme
    const navbar = document.querySelector('.navbar');
    if (newTheme === 'dark') {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    }
}

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    
    // Set navbar background to match initial theme
    const navbar = document.querySelector('.navbar');
    if (savedTheme === 'dark') {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    }
}

// Mobile Navigation Toggle Function
function setupMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    } else {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards for animation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initializeTheme();
    
    // Add theme toggle event listener
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
    
    // Setup mobile navigation
    setupMobileNavigation();
    
    // Setup enhanced interactions
    setupEnhancedInteractions();
    
    // Add fade-in class to elements
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.project-card, .leadership-card, .timeline-content');
    const contactMethods = document.querySelectorAll('.contact-method');
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
    
    contactMethods.forEach(method => {
        method.classList.add('fade-in');
        observer.observe(method);
    });
});

// Enhanced Interactions Function
function setupEnhancedInteractions() {
    // Enhanced hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 8px 60px rgba(0,0,0,0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)';
        });
    });

    // Enhanced hover effects for leadership cards
    document.querySelectorAll('.leadership-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 4px 40px rgba(0,0,0,0.08)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)';
        });
    });

    // Enhanced hover effects for contact methods
    document.querySelectorAll('.contact-method').forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 40px rgba(0,0,0,0.08)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)';
        });
    });

    // Smooth reveal animation for timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        const revealTimeline = () => {
            const itemTop = item.offsetTop;
            const itemHeight = item.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            
            if (scrollTop + windowHeight > itemTop + itemHeight * 0.5) {
                item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        };
        
        window.addEventListener('scroll', revealTimeline);
        revealTimeline(); // Check on load
    });

    // Enhanced button interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px)';
        });
    });

    // Enhanced tag hover effects
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced project link interactions
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Form validation and enhancement
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
            
            // Add floating label effect
            input.addEventListener('input', function() {
                if (this.value.length > 0) {
                    this.classList.add('has-content');
                } else {
                    this.classList.remove('has-content');
                }
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'var(--secondary-color)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Smooth reveal for section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        
        const revealTitle = () => {
            const titleTop = title.offsetTop;
            const windowHeight = window.innerHeight;
            const scrollTop = window.scrollY;
            
            if (scrollTop + windowHeight > titleTop + 100) {
                title.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
        };
        
        window.addEventListener('scroll', revealTitle);
        revealTitle(); // Check on load
    });

    // Enhanced profile picture interaction
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        profilePic.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations are already handled above
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced accessibility
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
});

// Add focus indicators for better accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-color)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Enhanced Contact Form with Vercel Serverless Backend
class SecureContactForm {
    constructor() {
        this.attempts = 0;
        this.lastAttempt = 0;
        this.rateLimitCount = 0;
        this.rateLimitStart = 0;
        this.isProcessing = false;
        this.maxAttempts = 3;
        this.cooldownPeriod = 300000; // 5 minutes
        this.rateLimitWindow = 60000; // 1 minute
    }

    // Security Layer 1: Rate Limiting
    checkRateLimit() {
        const now = Date.now();
        
        // Reset rate limit counter if window has passed
        if (now - this.rateLimitStart > this.rateLimitWindow) {
            this.rateLimitCount = 0;
            this.rateLimitStart = now;
        }
        
        // Check if rate limit exceeded
        if (this.rateLimitCount >= this.maxAttempts) {
            const remainingTime = Math.ceil((this.cooldownPeriod - (now - this.lastAttempt)) / 1000);
            throw new Error(`Too many attempts. Please wait ${remainingTime} seconds before trying again.`);
        }
        
        // Check cooldown period
        if (now - this.lastAttempt < this.cooldownPeriod) {
            const remainingTime = Math.ceil((this.cooldownPeriod - (now - this.lastAttempt)) / 1000);
            throw new Error(`Please wait ${remainingTime} seconds before sending another message.`);
        }
        
        this.rateLimitCount++;
        this.lastAttempt = now;
        return true;
    }

    // Security Layer 2: Input Validation and Sanitization
    validateAndSanitize(formData) {
        const errors = [];
        
        // Name validation
        if (!formData.from_name || formData.from_name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long.');
        }
        if (formData.from_name.length > 50) {
            errors.push('Name must be less than 50 characters.');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.from_email)) {
            errors.push('Please enter a valid email address.');
        }
        
        // Subject validation
        if (!formData.subject || formData.subject.trim().length === 0) {
            errors.push('Subject is required.');
        }
        if (formData.subject.length > 100) {
            errors.push('Subject must be less than 100 characters.');
        }
        
        // Message validation
        if (!formData.message || formData.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long.');
        }
        if (formData.message.length > 1000) {
            errors.push('Message must be less than 1000 characters.');
        }
        
        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
        
        // Sanitize inputs
        return {
            from_name: this.sanitizeInput(formData.from_name),
            from_email: this.sanitizeInput(formData.from_email),
            subject: this.sanitizeInput(formData.subject),
            message: this.sanitizeInput(formData.message)
        };
    }

    // Security Layer 3: Input Sanitization
    sanitizeInput(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+=/gi, '') // Remove event handlers
            .substring(0, 1000); // Limit length
    }

    // Send email via Vercel serverless function
    async sendEmail(formData) {
        try {
            // Check rate limiting
            this.checkRateLimit();
            
            // Validate and sanitize inputs
            const sanitizedData = this.validateAndSanitize(formData);
            
            // Determine the API endpoint based on environment
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiEndpoint = isLocalhost 
                ? 'http://localhost:3000/api/send-email'  // For local development
                : '/api/send-email';                      // For production (Vercel)
            
            // Send email using Vercel serverless function
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sanitizedData)
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Failed to send email');
            }
            
            return result;
            
        } catch (error) {
            console.error('Email sending error:', error);
            throw error;
        }
    }
}

// Initialize secure contact form
const secureContactForm = new SecureContactForm();

// Enhanced sendEmail function with Vercel backend
async function sendEmail(e) {
    e.preventDefault();
    
    // Prevent double submission
    if (secureContactForm.isProcessing) {
        showNotification('Please wait, your message is being sent...', 'info');
        return;
    }
    
    // Get form elements
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoading = document.getElementById('submitLoading');
    const form = document.getElementById('contactForm');
    
    try {
        // Set processing state
        secureContactForm.isProcessing = true;
        submitBtn.disabled = true;
        submitText.style.display = 'none';
        submitLoading.style.display = 'inline';
        
        // Get form data
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Send email via Vercel serverless function
        const result = await secureContactForm.sendEmail(formData);
        
        // Success
        showNotification(result.message || 'Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        
        // Reset rate limit on success
        secureContactForm.rateLimitCount = 0;
        
    } catch (error) {
        // Error handling
        let errorMessage = 'Failed to send message. Please try again.';
        
        if (error.message.includes('Too many attempts') || error.message.includes('Please wait')) {
            errorMessage = error.message;
        } else if (error.message.includes('validation') || error.message.includes('required')) {
            errorMessage = error.message;
        } else if (error.message.includes('Server configuration error')) {
            errorMessage = 'Contact form is temporarily unavailable. Please try again later.';
        }
        
        showNotification(errorMessage, 'error');
        
    } finally {
        // Reset processing state
        secureContactForm.isProcessing = false;
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        submitLoading.style.display = 'none';
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
} 