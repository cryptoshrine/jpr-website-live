// Main JavaScript for JPR Roofing Solutions Ltd

document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded, initializing scripts...');

    // Fix for GitHub Pages navigation - detect environment
    const isGitHubPages = window.location.hostname.includes('github.io');
    const basePath = isGitHubPages ? '/jpr-website-live' : '';
    
    console.log('Environment detection:', { 
        isGitHubPages: isGitHubPages, 
        hostname: window.location.hostname,
        basePath: basePath
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-menu');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenu && mobileNav) {
        closeMenu.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Only handle anchor links now since buttons handle other navigation
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        link.addEventListener('click', function(e) {
            console.log('Anchor link clicked:', href);
            e.preventDefault();
            
            const targetId = href;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Scroll to target with header offset
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    if (testimonialSlides.length > 0 && prevButton && nextButton) {
        // Show first slide
        testimonialSlides[0].style.display = 'block';
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Show the selected slide
            testimonialSlides[index].style.display = 'block';
        }
        
        // Previous button click
        prevButton.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = testimonialSlides.length - 1;
            }
            showSlide(currentSlide);
        });
        
        // Next button click
        nextButton.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
        
        // Auto-rotate slides every 5 seconds
        setInterval(function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Project Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide gallery items based on filter
                galleryItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Contact Form Submission
    const quoteForm = document.getElementById('contactForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Show loading state
                const submitButton = quoteForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Here you would typically send the data to your server
                // For now, we'll just simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Show success message
                alert('Thank you for your inquiry! We will get back to you soon.');
                quoteForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Sorry, there was an error submitting your form. Please try again.');
            } finally {
                // Reset button state
                const submitButton = quoteForm.querySelector('button[type="submit"]');
                submitButton.textContent = 'Send';
                submitButton.disabled = false;
            }
        });
    }
    
    // File Upload Preview
    const fileUpload = document.getElementById('roof-photos');
    
    if (fileUpload) {
        fileUpload.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            const label = document.querySelector('.upload-btn');
            
            if (files.length > 0) {
                label.innerHTML = `<i class="fas fa-check"></i> ${files.length} file${files.length === 1 ? '' : 's'} selected`;
                label.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                label.style.borderColor = '#4CAF50';
                label.style.color = '#4CAF50';
                label.classList.add('has-files');
            } else {
                label.innerHTML = `<i class="fas fa-cloud-upload-alt"></i> Upload Photos of Your Roof`;
                label.style.backgroundColor = '';
                label.style.borderColor = '';
                label.style.color = '';
                label.classList.remove('has-files');
            }
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .gallery-item, .process-step, .funding-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();

    // Fix mobile touch events for buttons and interactive elements
    function fixMobileTouchEvents() {
        // Fix form buttons
        const allButtons = document.querySelectorAll('.btn, .cta-button, .form-button, button[type="submit"], .gallery-filter button, .upload-btn, .send-btn, .whatsapp-btn, a.btn');
        
        allButtons.forEach(button => {
            // Add touchstart event for mobile devices
            button.addEventListener('touchstart', function(e) {
                // Add active class to provide visual feedback
                this.classList.add('active');
            }, { passive: true });
            
            button.addEventListener('touchend', function(e) {
                // Remove active class
                this.classList.remove('active');
            }, { passive: true });
        });

        // Fix file upload button specifically
        const fileUploadBtn = document.querySelector('.upload-btn, #upload-btn');
        if (fileUploadBtn) {
            fileUploadBtn.addEventListener('touchend', function(e) {
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) {
                    e.preventDefault();
                    fileInput.click();
                }
            });
        }

        // Fix WhatsApp button
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('touchend', function(e) {
                const href = this.getAttribute('href');
                if (href) {
                    e.preventDefault();
                    window.location.href = href;
                }
            });
        }

        // Fix project gallery filter buttons
        const filterButtons = document.querySelectorAll('.gallery-filter button');
        filterButtons.forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get data-filter attribute
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Call the function to fix mobile touch events
    fixMobileTouchEvents();

    // Fix for overlay issues and unclickable elements on mobile
    function fixOverlayIssues() {
        // Ensure all interactive elements are clickable
        const allInteractiveElements = document.querySelectorAll('a, button, .btn, .cta-button, .form-button, ' +
            '.gallery-filter button, .filter-button, .upload-btn, .send-btn, .whatsapp-btn, ' +
            'input[type="submit"], .file-upload label, .carousel-control, .filter-button, ' +
            '.gallery-item, .social-link, .footer-link a');
        
        allInteractiveElements.forEach(element => {
            // Add explicit touch event listeners with stopPropagation
            element.addEventListener('touchstart', function(e) {
                // Don't propagate the touchstart event to potential overlay elements
                e.stopPropagation();
            }, { passive: false });
            
            element.addEventListener('touchend', function(e) {
                // Don't propagate the touchend event to potential overlay elements
                e.stopPropagation();
                
                // If this is a link or button with href, handle click
                if (element.tagName === 'A' && element.getAttribute('href')) {
                    const href = element.getAttribute('href');
                    
                    // Handle anchor links specially
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const targetElement = document.querySelector(href);
                        if (targetElement) {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            }, { passive: false });
        });
        
        // Fix for project filter buttons
        const projectFilters = document.querySelectorAll('.filter-button, .gallery-filter button');
        projectFilters.forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Get the filter value
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                projectFilters.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter gallery items
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        if (item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            }, { passive: false });
        });
        
        // Ensure the upload button works
        const uploadBtn = document.querySelector('.upload-btn, #upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Trigger the file input click
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) {
                    fileInput.click();
                }
            }, { passive: false });
        }
        
        // Ensure the WhatsApp button works
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('touchend', function(e) {
                e.stopPropagation();
                // Let the default click behavior happen
            }, { passive: false });
        }
        
        // Ensure the send button works
        const sendBtn = document.querySelector('.send-btn, #send-btn');
        if (sendBtn) {
            sendBtn.addEventListener('touchend', function(e) {
                e.stopPropagation();
                // Let the default submit behavior happen
            }, { passive: false });
        }
    }
    
    // Helper function for direct navigation
    window.navigateToPage = function(path) {
        window.location.href = path;
    };
    
    // Helper function for scrolling to contact section
    window.scrollToContact = function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation(); // Stop event bubbling to prevent issues
        }
        console.log('scrollToContact function called');
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            window.scrollTo({
                top: contactSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
        return false; // Prevent default and stop propagation
    };
    
    // Run the overlay fix function after a short delay to ensure DOM is fully loaded
    setTimeout(fixOverlayIssues, 500);
    
    // Fix any overlay issues on window resize (orientation change)
    window.addEventListener('resize', function() {
        setTimeout(fixOverlayIssues, 500);
    });
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavMenu = document.querySelector('.mobile-nav .nav-menu');
    const closeMenu = document.querySelector('.mobile-nav .close-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    const body = document.body;

    if (!hamburger || !mobileNav) {
        console.error('Mobile navigation elements not found!');
        return;
    }

    function toggleMobileMenu(show) {
        if (show) {
            mobileNav.classList.add('active');
            body.style.overflow = 'hidden';
            hamburger.classList.add('active');
        } else {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
            hamburger.classList.remove('active');
        }
    }

    // Event Listeners for Mobile Navigation
    if (hamburger && mobileNav && closeMenu) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu(true);
        });

        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu(false);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('active') && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
                toggleMobileMenu(false);
            }
        });

        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu(false);
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Form Handling
    const quoteForm = document.getElementById('contactForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Show loading state
                const submitButton = quoteForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Here you would typically send the data to your server
                // For now, we'll just simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Show success message
                alert('Thank you for your inquiry! We will get back to you soon.');
                quoteForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Sorry, there was an error submitting your form. Please try again.');
            } finally {
                // Reset button state
                const submitButton = quoteForm.querySelector('button[type="submit"]');
                submitButton.textContent = 'Send';
                submitButton.disabled = false;
            }
        });
    }

    // File Upload Preview
    const fileUpload = document.getElementById('roof-photos');
    if (fileUpload) {
        fileUpload.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            const label = document.querySelector('.upload-btn');
            
            if (files.length > 0) {
                label.innerHTML = `<i class="fas fa-check"></i> ${files.length} file${files.length === 1 ? '' : 's'} selected`;
                label.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
                label.style.borderColor = '#4CAF50';
                label.style.color = '#4CAF50';
                label.classList.add('has-files');
            } else {
                label.innerHTML = `<i class="fas fa-cloud-upload-alt"></i> Upload Photos of Your Roof`;
                label.style.backgroundColor = '';
                label.style.borderColor = '';
                label.style.color = '';
                label.classList.remove('has-files');
            }
        });
    }
});
