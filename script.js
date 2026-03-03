/* =============================================
   MAA SHAKTI HOSPITAL - JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================
    // PRELOADER (minimal & fast)
    // =========================================
    const preloader = document.getElementById('preloader');

    // Hide the preloader very quickly to avoid blocking UX.
    // Use DOMContentLoaded + tiny delay so pages without heavy assets show immediately.
    setTimeout(function() {
        if (!preloader) return;
        preloader.classList.add('hidden');
        // remove from DOM after transition to free rendering
        preloader.addEventListener('transitionend', () => {
            try { preloader.remove(); } catch(e) {}
        }, { once: true });
    }, 120);

    // =========================================
    // MOBILE NAVIGATION
    // =========================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // =========================================
    // STICKY HEADER
    // =========================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });

    // =========================================
    // ACTIVE NAV LINK ON SCROLL
    // =========================================
    const sections = document.querySelectorAll('section[id]');
    
    function activeNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 200;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-links a[href*=' + sectionId + ']');
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', activeNavOnScroll);

    // =========================================
    // HERO SLIDER
    // =========================================
    const slides = document.querySelectorAll('.slide');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dots .dot');

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto slide
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    startSlideShow();

    // Touch / swipe support for hero slider
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
        let hStartX = 0;
        heroEl.addEventListener('touchstart', e => { hStartX = e.touches[0].clientX; }, { passive: true });
        heroEl.addEventListener('touchend', e => {
            const diff = hStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                stopSlideShow();
                diff > 0 ? nextSlide() : prevSlide();
                startSlideShow();
            }
        }, { passive: true });
    }

    // Controls
    nextBtn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        startSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        startSlideShow();
    });

    // =========================================
    // COUNTER ANIMATION
    // =========================================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + '+';
                }
            };

            updateCounter();
        });
    }

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, observerOptions);

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // =========================================
    // DEPARTMENT TABS
    // =========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // =========================================
    // TESTIMONIAL SLIDER
    // =========================================
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrevBtn = document.querySelector('.testimonial-btn.prev');
    const testimonialNextBtn = document.querySelector('.testimonial-btn.next');
    let currentTestimonial = 0;
    const testimonialCount = testimonialCards.length;

    function getTestimonialsPerView() {
        if (window.innerWidth <= 992) return 1;
        return 2;
    }

    function updateTestimonialSlider() {
        const testimonialsPerView = getTestimonialsPerView();
        // Use track width ÷ perView to get accurate card slot width
        const trackWidth = testimonialTrack.parentElement.offsetWidth;
        const cardSlotWidth = trackWidth / testimonialsPerView;
        const maxSlide = testimonialCount - testimonialsPerView;
        
        if (currentTestimonial > maxSlide) currentTestimonial = maxSlide;
        if (currentTestimonial < 0) currentTestimonial = 0;
        
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * cardSlotWidth}px)`;
    }

    testimonialNextBtn.addEventListener('click', () => {
        const maxSlide = testimonialCount - getTestimonialsPerView();
        if (currentTestimonial < maxSlide) {
            currentTestimonial++;
            updateTestimonialSlider();
        }
    });

    testimonialPrevBtn.addEventListener('click', () => {
        if (currentTestimonial > 0) {
            currentTestimonial--;
            updateTestimonialSlider();
        }
    });

    window.addEventListener('resize', updateTestimonialSlider);

    // Touch / swipe support for testimonial slider
    let tStartX = 0;
    testimonialTrack.addEventListener('touchstart', e => { tStartX = e.touches[0].clientX; }, { passive: true });
    testimonialTrack.addEventListener('touchend', e => {
        const diff = tStartX - e.changedTouches[0].clientX;
        const maxSlide = testimonialCount - getTestimonialsPerView();
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentTestimonial < maxSlide) { currentTestimonial++; }
            else if (diff < 0 && currentTestimonial > 0) { currentTestimonial--; }
            updateTestimonialSlider();
        }
    }, { passive: true });

    // =========================================
    // FAQ ACCORDION
    // =========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =========================================
    // BACK TO TOP BUTTON
    // =========================================
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =========================================
    // SMOOTH SCROLLING
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // FORM SUBMISSIONS
    // =========================================
    
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);
            
            // Show success message
            showNotification('Appointment request submitted successfully! We will contact you shortly.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Notification function
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification ' + type;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
            max-width: 400px;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to body
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => notification.remove(), 500);
            }
        }, 5000);
    }

    // =========================================
    // SCROLL ANIMATIONS
    // =========================================
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .blog-card, .stat-item, .info-card, .contact-card, .gallery-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });

    // =========================================
    // SET MINIMUM DATE FOR APPOINTMENT
    // =========================================
    const dateInput = document.querySelector('input[name="date"]');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // =========================================
    // TYPING EFFECT FOR HERO (OPTIONAL)
    // =========================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // =========================================
    // LAZY LOADING SIMULATION
    // =========================================
    const lazyElements = document.querySelectorAll('.gallery-item, .service-card, .doctor-card');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });

    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });

    // =========================================
    // PARALLAX EFFECT (DESKTOP ONLY)
    // =========================================
    const heroParallaxEl = document.querySelector('.hero-content');
    function handleParallax() {
        if (window.innerWidth <= 768) {
            // Reset any applied styles on mobile
            if (heroParallaxEl) {
                heroParallaxEl.style.transform = '';
                heroParallaxEl.style.opacity = '';
            }
            return;
        }
        const scrolled = window.pageYOffset;
        if (heroParallaxEl && scrolled < window.innerHeight) {
            heroParallaxEl.style.transform = `translateY(${scrolled * 0.25}px)`;
            heroParallaxEl.style.opacity = 1 - (scrolled / window.innerHeight) * 1.4;
        }
    }
    window.addEventListener('scroll', handleParallax, { passive: true });
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && heroParallaxEl) {
            heroParallaxEl.style.transform = '';
            heroParallaxEl.style.opacity = '';
        }
    });

    // =========================================
    // FORM INPUT ANIMATIONS
    // =========================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // =========================================
    // GALLERY LIGHTBOX (SIMPLE IMPLEMENTATION)
    // =========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const overlay = document.createElement('div');
            const content = this.querySelector('.gallery-image').cloneNode(true);
            
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                cursor: pointer;
            `;
            
            content.style.cssText = `
                width: 80%;
                max-width: 800px;
                height: 500px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            content.querySelector('.gallery-overlay').remove();
            
            overlay.appendChild(content);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            overlay.addEventListener('click', function() {
                this.remove();
                document.body.style.overflow = '';
            });
        });
    });

    // =========================================
    // DYNAMIC DOCTOR DEPARTMENT FILTER
    // =========================================
    const departmentSelect = document.querySelector('select[name="department"]');
    const doctorSelect = document.querySelector('select[name="doctor"]');
    
    const doctorsByDepartment = {
        cardiology: [{ value: 'dr-rajesh', name: 'Dr. Rajesh Kumar' }],
        gynecology: [{ value: 'dr-priya', name: 'Dr. Priya Sharma' }],
        neurology: [{ value: 'dr-amit', name: 'Dr. Amit Verma' }],
        pediatrics: [{ value: 'dr-sunita', name: 'Dr. Sunita Patel' }],
        orthopedics: [{ value: 'dr-vikram', name: 'Dr. Vikram Singh' }],
        dermatology: [{ value: 'dr-meera', name: 'Dr. Meera Gupta' }],
        general: [
            { value: 'dr-rajesh', name: 'Dr. Rajesh Kumar' },
            { value: 'dr-priya', name: 'Dr. Priya Sharma' },
            { value: 'dr-amit', name: 'Dr. Amit Verma' },
            { value: 'dr-sunita', name: 'Dr. Sunita Patel' },
            { value: 'dr-vikram', name: 'Dr. Vikram Singh' },
            { value: 'dr-meera', name: 'Dr. Meera Gupta' }
        ]
    };

    if (departmentSelect && doctorSelect) {
        departmentSelect.addEventListener('change', function() {
            const selectedDept = this.value;
            
            // Clear current options
            doctorSelect.innerHTML = '<option value="">Select Doctor *</option>';
            
            if (selectedDept && doctorsByDepartment[selectedDept]) {
                doctorsByDepartment[selectedDept].forEach(doctor => {
                    const option = document.createElement('option');
                    option.value = doctor.value;
                    option.textContent = doctor.name;
                    doctorSelect.appendChild(option);
                });
            } else {
                // Show all doctors if no department selected
                Object.values(doctorsByDepartment).flat().forEach(doctor => {
                    if (!Array.from(doctorSelect.options).some(opt => opt.value === doctor.value)) {
                        const option = document.createElement('option');
                        option.value = doctor.value;
                        option.textContent = doctor.name;
                        doctorSelect.appendChild(option);
                    }
                });
            }
        });
    }

    // =========================================
    // PHONE NUMBER FORMATTING
    // =========================================
    const phoneInput = document.querySelector('input[name="phone"]');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }

    // =========================================
    // SERVICE CARDS HOVER EFFECT
    // =========================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // =========================================
    // CONSOLE LOG FOR DEVELOPERS
    // =========================================
    console.log('%c Welcome to Maa Shakti Hospital ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
    console.log('%c Your Health is Our Priority! ', 'color: #10b981; font-size: 14px;');

});

// =========================================
// ADDITIONAL UTILITY FUNCTIONS
// =========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
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
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format date for display
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-IN', options);
}

// Validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validate phone (Indian format)
function isValidPhone(phone) {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
}
