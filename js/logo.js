// Logo management and fallback handling
document.addEventListener('DOMContentLoaded', function() {
    console.log('Logo.js loaded - Setting up logo handling');
    
    // Function to check if an image exists
    function checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }
    
    // Function to set up image with fallback
    async function setupLogoWithFallback(imgElement, localPath, githubPath) {
        // First try the local path
        const localExists = await checkImageExists(localPath);
        if (localExists) {
            imgElement.src = localPath;
            return;
        }
        
        // If local fails, try GitHub path
        const githubExists = await checkImageExists(githubPath);
        if (githubExists) {
            imgElement.src = githubPath;
            return;
        }
        
        // If both fail, use a base64 encoded SVG fallback
        imgElement.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMwMDgxOEYiIHJ4PSI0Ii8+PHRleHQgeD0iMjAiIHk9IjM4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+SlBSIFJPT0ZJTkc8L3RleHQ+PHRleHQgeD0iMjAiIHk9IjUzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IndoaXRlIj5TT0xVVElPTlMgTFREPC90ZXh0Pjwvc3ZnPg==';
    }
    
    // Set up all logo images on the page
    const logoImages = document.querySelectorAll('.logo img, .mobile-logo img, .new-footer-logo img');
    
    logoImages.forEach(img => {
        // Determine appropriate paths based on current environment
        const isGitHubPages = window.location.hostname.includes('github.io');
        const localPath = 'images/logo-white.png';
        const githubPath = isGitHubPages 
            ? 'https://cryptoshrine.github.io/jpr-website-live/images/logo-white.png'
            : 'https://raw.githubusercontent.com/cryptoshrine/jpr-website-live/main/images/logo-white.png';
            
        // Set up this logo with fallback options
        setupLogoWithFallback(img, localPath, githubPath);
        
        // Add error handler as a backup
        img.onerror = function() {
            console.error('Error loading logo image:', img.src);
            // Fallback to a base64 encoded simple text version
            img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMwMDgxOEYiIHJ4PSI0Ii8+PHRleHQgeD0iMjAiIHk9IjM4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+SlBSIFJPT0ZJTkc8L3RleHQ+PHRleHQgeD0iMjAiIHk9IjUzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IndoaXRlIj5TT0xVVElPTlMgTFREPC90ZXh0Pjwvc3ZnPg==';
        };
    });
    
    console.log('Logo handling setup complete');
});
