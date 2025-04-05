// Fix for carousel link issues on GitHub Pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing carousel link fix...');
    
    // Fix for all carousel buttons
    const carouselButtons = document.querySelectorAll('.carousel-buttons a, .carousel-content a');
    
    carouselButtons.forEach(button => {
        // Remove any existing event handlers by cloning the button
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            // Prevent default behavior to stop potential protocol handler issues
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            console.log('Carousel button clicked, href:', href);
            
            // Handle different types of links
            if (href && href.startsWith('#')) {
                // For anchor links like #contact
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    console.log('Scrolled to', targetId);
                } else {
                    console.error('Target element not found:', targetId);
                }
            } else if (href && href.startsWith('tel:')) {
                // For phone links like tel:02031142105
                window.location.href = href;
                console.log('Initiating phone call to', href);
            } else {
                // For any other type of link
                window.location.href = href;
                console.log('Navigating to', href);
            }
            
            return false;
        });
    });
    
    // Also fix all button-styled links with class cta-button or secondary-button
    const ctaButtons = document.querySelectorAll('a.cta-button, a.secondary-button, button.cta-button, button.secondary-button');
    
    ctaButtons.forEach(button => {
        // Skip buttons that are inside carousel (already handled above)
        if (button.closest('.carousel-buttons') || button.closest('.carousel-content')) {
            return;
        }
        
        // If it's a button element with an onclick handler for scrollToContact
        if (button.tagName === 'BUTTON' && button.hasAttribute('onclick') && 
            button.getAttribute('onclick').includes('scrollToContact')) {
            // Replace the onclick attribute with our own handler
            const newButton = button.cloneNode(true);
            newButton.removeAttribute('onclick');
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    window.scrollTo({
                        top: contactSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    console.log('Scrolled to contact section');
                }
                
                return false;
            });
        } 
        // If it's an anchor tag
        else if (button.tagName === 'A') {
            const href = button.getAttribute('href');
            
            // Only handle it if it's an anchor link
            if (href && href.startsWith('#')) {
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
                
                newButton.addEventListener('click', function(e) {
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
                        console.log('Scrolled to', targetId);
                    } else {
                        console.error('Target element not found:', targetId);
                    }
                    
                    return false;
                });
            }
        }
    });
    
    // Override the scrollToContact function globally
    window.scrollToContact = function(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            window.scrollTo({
                top: contactSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            console.log('Scrolled to contact section via scrollToContact function');
        }
    };
    
    console.log('Carousel link fix initialized');
});
