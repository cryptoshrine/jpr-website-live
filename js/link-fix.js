// Fix for carousel buttons and links on GitHub Pages and local file viewing
document.addEventListener('DOMContentLoaded', function() {
    console.log('Link fix script loaded');
    
    // Fix for carousel buttons
    const allCarouselButtons = document.querySelectorAll('.carousel-buttons a, .carousel-content a.cta-button, .carousel-content a.secondary-button');
    
    allCarouselButtons.forEach(button => {
        // Remove any existing click handlers by cloning
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add proper click handler
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            console.log('Carousel button clicked, href:', href);
            
            if (href && href.startsWith('#')) {
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                } else {
                    console.error('Target element not found:', targetId);
                }
            } else if (href && href.startsWith('tel:')) {
                // Handle phone links properly
                window.location.href = href;
            } else {
                // For any other type of link
                window.location.href = href;
            }
        });
    });
    
    // Fix for any generic CTA buttons (like "Get a Free Quote" in header)
    const ctaButtons = document.querySelectorAll('a.cta-button');
    
    ctaButtons.forEach(button => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
                return false;
            });
        }
    });
    
    // Enhanced scrollToContact function for any elements using this function
    window.scrollToContact = function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation(); 
        }
        
        console.log('scrollToContact called');
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            window.scrollTo({
                top: contactSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
        return false;
    };
});
