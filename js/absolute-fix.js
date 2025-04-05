// Radical fix for link handling issues
document.addEventListener('DOMContentLoaded', function() {
    console.log('Absolute fix script loaded');
    
    // Run this script after a short delay to ensure DOM is fully loaded
    setTimeout(function() {
        // APPROACH: Replace all carousel links with buttons
        
        // Helper function to navigate to a section
        function navigateToSection(sectionId) {
            console.log('Navigating to section:', sectionId);
            const section = document.getElementById(sectionId.replace('#', ''));
            if (section) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                window.scrollTo({
                    top: section.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            } else {
                console.error('Section not found:', sectionId);
            }
        }
        
        // Helper function to make a phone call
        function makePhoneCall(phoneNumber) {
            console.log('Making phone call to:', phoneNumber);
            window.location.href = 'tel:' + phoneNumber.replace(/\s/g, '');
        }
        
        // Completely replace carousel buttons
        document.querySelectorAll('.carousel-buttons').forEach(function(buttonContainer) {
            // Get the original buttons
            const originalButtons = buttonContainer.querySelectorAll('a');
            
            // Clear the container
            buttonContainer.innerHTML = '';
            
            // Recreate buttons as real buttons
            originalButtons.forEach(function(originalButton) {
                const href = originalButton.getAttribute('href');
                const text = originalButton.textContent.trim();
                const classes = originalButton.className;
                
                const newButton = document.createElement('button');
                newButton.innerHTML = text;
                newButton.className = classes.replace('secondary-button', 'secondary-btn').replace('cta-button', 'cta-btn');
                
                if (href && href.startsWith('#')) {
                    const sectionId = href.substring(1);
                    newButton.addEventListener('click', function() {
                        navigateToSection(sectionId);
                    });
                } else if (href && href.startsWith('tel:')) {
                    const phoneNumber = href.replace('tel:', '');
                    newButton.addEventListener('click', function() {
                        makePhoneCall(phoneNumber);
                    });
                }
                
                buttonContainer.appendChild(newButton);
            });
        });
        
        // Also fix header CTA button
        const headerCTA = document.querySelector('.header .cta-button');
        if (headerCTA) {
            const ctaParent = headerCTA.parentNode;
            const ctaText = headerCTA.textContent.trim();
            
            // Create a new button element
            const newCTAButton = document.createElement('button');
            newCTAButton.textContent = ctaText;
            newCTAButton.className = 'cta-btn';
            newCTAButton.addEventListener('click', function() {
                navigateToSection('contact');
            });
            
            // Replace the anchor with the button
            ctaParent.replaceChild(newCTAButton, headerCTA);
        }
        
        // Fix mobile menu CTA button
        const mobileCTA = document.querySelector('.mobile-nav-footer .cta-button');
        if (mobileCTA) {
            const ctaParent = mobileCTA.parentNode;
            const ctaText = mobileCTA.textContent.trim();
            
            // Create a new button element
            const newCTAButton = document.createElement('button');
            newCTAButton.textContent = ctaText;
            newCTAButton.className = 'cta-btn';
            newCTAButton.addEventListener('click', function() {
                navigateToSection('contact');
                document.querySelector('.mobile-nav').classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Replace the anchor with the button
            ctaParent.replaceChild(newCTAButton, mobileCTA);
        }
        
        // Override existing scrollToContact function
        window.scrollToContact = function(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            navigateToSection('contact');
            return false;
        };
        
        // Style fixes to make buttons look like links
        const style = document.createElement('style');
        style.textContent = `
            .cta-btn {
                font-family: inherit;
                font-size: inherit;
                border: none;
                cursor: pointer;
                margin: 0;
                padding: 0.75rem 1.5rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
                background-color: var(--accent-color);
                color: var(--white);
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            
            .cta-btn:hover {
                background-color: var(--primary-color);
                color: var(--white);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .secondary-btn {
                font-family: inherit;
                font-size: inherit;
                background-color: transparent;
                color: var(--white);
                border: 2px solid var(--white);
                border-radius: 4px;
                padding: 0.75rem 1.5rem;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .secondary-btn:hover {
                background-color: var(--white);
                color: var(--primary-color);
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(style);
        
        console.log('Absolute fix applied');
    }, 500);
});
