// Carousel JavaScript for JPR Roofing Solutions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    initCarousel();
    
    function initCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;
        
        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        const prevButton = carousel.querySelector('.carousel-control-prev');
        const nextButton = carousel.querySelector('.carousel-control-next');
        
        let currentIndex = 0;
        let interval;
        
        // Show first slide
        items[0].classList.add('active');
        if (indicators.length > 0) {
            indicators[0].classList.add('active');
        }
        
        // Start automatic sliding
        startAutoSlide();
        
        // Add event listeners
        if (prevButton) {
            prevButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToPrevSlide();
                resetAutoSlide();
                return false;
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToNextSlide();
                resetAutoSlide();
                return false;
            });
        }
        
        // Add indicator click events
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
                resetAutoSlide();
                return false;
            });
        });
        
        // Pause auto-sliding when hovering over carousel
        carousel.addEventListener('mouseenter', function() {
            clearInterval(interval);
        });
        
        carousel.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
        
        // Functions
        function goToSlide(index) {
            // Remove active class from current slide and indicator
            items[currentIndex].classList.remove('active');
            if (indicators.length > 0) {
                indicators[currentIndex].classList.remove('active');
            }
            
            // Update current index
            currentIndex = index;
            
            // Add active class to new slide and indicator
            items[currentIndex].classList.add('active');
            if (indicators.length > 0) {
                indicators[currentIndex].classList.add('active');
            }
        }
        
        function goToNextSlide() {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= items.length) {
                nextIndex = 0;
            }
            goToSlide(nextIndex);
        }
        
        function goToPrevSlide() {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = items.length - 1;
            }
            goToSlide(prevIndex);
        }
        
        function startAutoSlide() {
            interval = setInterval(function() {
                goToNextSlide();
            }, 5000); // Change slide every 5 seconds
        }
        
        function resetAutoSlide() {
            clearInterval(interval);
            startAutoSlide();
        }
    }
});
