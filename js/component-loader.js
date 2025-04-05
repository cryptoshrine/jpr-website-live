/**
 * Component Loader for JPR Roofing Solutions Website
 * This script loads HTML components from the components/ directory
 * and inserts them into the page.
 */

// Track component loading progress
let componentsToLoad = 0;
let componentsLoaded = 0;

document.addEventListener('DOMContentLoaded', function() {
    console.log('Component loader initialized');
    
    // Find all component placeholders
    const componentElements = document.querySelectorAll('[data-component]');
    componentsToLoad = componentElements.length;
    
    if (componentsToLoad === 0) {
        console.log('No components found to load');
        return;
    }
    
    console.log(`Found ${componentsToLoad} components to load`);
    
    // Load each component
    componentElements.forEach(async function(element) {
        const componentName = element.getAttribute('data-component');
        console.log(`Loading component: ${componentName}`);
        
        try {
            const response = await fetch(`components/${componentName}.html`);
            
            if (!response.ok) {
                throw new Error(`Failed to load component ${componentName}: ${response.status} ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Insert the component HTML
            element.innerHTML = html;
            
            // Handle any inline scripts in the component
            executeScripts(element);
            
            // Update loading progress
            componentLoaded();
            
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            componentLoaded(); // Still count as loaded even if there was an error
        }
    });
});

// Execute scripts found within a component
function executeScripts(element) {
    // Find all script elements in the component
    const scripts = element.querySelectorAll('script');
    
    scripts.forEach(oldScript => {
        // Create a new script element
        const newScript = document.createElement('script');
        
        // Copy attributes
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        
        // Copy inline script content
        newScript.textContent = oldScript.textContent;
        
        // Replace the old script with the new one
        if (oldScript.parentNode) {
            oldScript.parentNode.replaceChild(newScript, oldScript);
        } else {
            // If somehow the script is detached, append to document body
            document.body.appendChild(newScript);
        }
    });
}

// Track loaded components and trigger event when all are loaded
function componentLoaded() {
    componentsLoaded++;
    console.log(`Component loaded: ${componentsLoaded}/${componentsToLoad}`);
    
    if (componentsLoaded === componentsToLoad) {
        console.log('All components loaded, dispatching event');
        
        // Create and dispatch a custom event
        const event = new CustomEvent('componentsLoaded');
        document.dispatchEvent(event);
        
        // Initialize components that need JavaScript
        initializeComponents();
    }
}

// Initialize components that require JavaScript after all components are loaded
function initializeComponents() {
    // Re-initialize carousel if needed
    if (typeof initCarousel === 'function') {
        console.log('Initializing carousel');
        initCarousel();
    }
    
    // Re-initialize gallery filters if needed
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        console.log('Setting up gallery filters');
        
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
    
    // Re-initialize testimonial slider if needed
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    if (testimonialSlides.length > 0 && prevButton && nextButton) {
        console.log('Setting up testimonial slider');
        
        let currentSlide = 0;
        
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
    
    // Initialize file upload preview if needed
    const fileUpload = document.getElementById('roof-photos');
    
    if (fileUpload) {
        console.log('Setting up file upload preview');
        
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
    
    // Re-initialize contact form if needed
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        console.log('Setting up contact form');
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Here you would typically send the data to your server
                // For now, we'll just simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Show success message
                alert('Thank you for your inquiry! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Sorry, there was an error submitting your form. Please try again.');
            } finally {
                // Reset button state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.textContent = 'Send';
                submitButton.disabled = false;
            }
        });
    }
    
    // Initialize mobile menu
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeMenu = document.querySelector('.close-menu');
    
    if (hamburger && mobileNav && closeMenu) {
        console.log('Setting up mobile menu');
        
        hamburger.addEventListener('click', function() {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Initialize chatbot
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    
    if (chatbotButton && chatbotContainer && chatbotClose) {
        console.log('Setting up chatbot');
        
        chatbotButton.addEventListener('click', function() {
            chatbotContainer.style.display = 'block';
        });
        
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.style.display = 'none';
        });
    }
    
    // Initialize scroll to contact helper function
    window.scrollToContact = function(event) {
        event.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            window.scrollTo({
                top: contactSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    };
    
    console.log('Component initialization complete');
}
