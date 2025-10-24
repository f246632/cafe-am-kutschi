// ===================================
// Gallery & Lightbox Functionality
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // Gallery elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImageIndex = 0;
    const images = [];

    // Collect all image sources
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt
            });

            // Set data-index attribute
            item.setAttribute('data-index', index);
        }
    });

    // ===================================
    // Open Lightbox
    // ===================================
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            openLightbox(index);
        });

        // Keyboard accessibility
        item.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const index = parseInt(this.getAttribute('data-index'));
                openLightbox(index);
            }
        });

        // Make gallery items keyboard focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View image ${parseInt(this.getAttribute('data-index')) + 1}`);
    });

    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Focus management for accessibility
        lightboxClose.focus();
    }

    // ===================================
    // Close Lightbox
    // ===================================
    lightboxClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling

        // Return focus to the gallery item that was clicked
        const currentGalleryItem = document.querySelector(`[data-index="${currentImageIndex}"]`);
        if (currentGalleryItem) {
            currentGalleryItem.focus();
        }
    }

    // ===================================
    // Navigate Images
    // ===================================
    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage('next');
    });

    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage('prev');
    });

    function navigateImage(direction) {
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
        } else {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        }

        updateLightboxImage();
    }

    function updateLightboxImage() {
        const currentImage = images[currentImageIndex];

        // Fade out effect
        lightboxImage.style.opacity = '0';

        setTimeout(() => {
            lightboxImage.src = currentImage.src;
            lightboxImage.alt = currentImage.alt;

            // Fade in effect
            lightboxImage.style.opacity = '1';
        }, 200);

        // Update ARIA label
        lightbox.setAttribute('aria-label', `Image ${currentImageIndex + 1} of ${images.length}`);
    }

    // ===================================
    // Keyboard Navigation
    // ===================================
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowRight':
                navigateImage('next');
                break;
            case 'ArrowLeft':
                navigateImage('prev');
                break;
        }
    });

    // ===================================
    // Touch Swipe Support for Mobile
    // ===================================
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                navigateImage('next');
            } else {
                // Swipe right - previous image
                navigateImage('prev');
            }
        }
    }

    // ===================================
    // Image Preloading
    // ===================================
    function preloadImages() {
        images.forEach(imageData => {
            const img = new Image();
            img.src = imageData.src;
        });
    }

    // Preload images after page load
    if (window.requestIdleCallback) {
        requestIdleCallback(preloadImages);
    } else {
        setTimeout(preloadImages, 1000);
    }

    // ===================================
    // Gallery Grid Animation on Scroll
    // ===================================
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for gallery items
                const delay = entry.target.getAttribute('data-index') * 50;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, delay);

                galleryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        galleryObserver.observe(item);
    });

    // ===================================
    // Lightbox Image Transition Effect
    // ===================================
    lightboxImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    // ===================================
    // Gallery Item Counter Display
    // ===================================
    function createImageCounter() {
        const counter = document.createElement('div');
        counter.id = 'lightbox-counter';
        counter.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 0.5rem 1.5rem;
            border-radius: 20px;
            z-index: 2001;
        `;
        lightbox.appendChild(counter);
        return counter;
    }

    const imageCounter = createImageCounter();

    // Update counter when image changes
    function updateCounter() {
        imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    }

    // Call updateCounter when opening lightbox or navigating
    const originalOpenLightbox = openLightbox;
    openLightbox = function(index) {
        originalOpenLightbox(index);
        updateCounter();
    };

    const originalNavigateImage = navigateImage;
    navigateImage = function(direction) {
        originalNavigateImage(direction);
        updateCounter();
    };

    // ===================================
    // Loading Spinner for Images
    // ===================================
    function createLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.id = 'lightbox-spinner';
        spinner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            z-index: 2000;
        `;

        // Add keyframe animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        lightbox.appendChild(spinner);
        return spinner;
    }

    const loadingSpinner = createLoadingSpinner();
    loadingSpinner.style.display = 'none';

    // Show spinner while image loads
    lightboxImage.addEventListener('loadstart', () => {
        loadingSpinner.style.display = 'block';
    });

    lightboxImage.addEventListener('load', () => {
        loadingSpinner.style.display = 'none';
    });

    // ===================================
    // Zoom Functionality (Optional Enhancement)
    // ===================================
    let isZoomed = false;

    lightboxImage.addEventListener('click', function(e) {
        e.stopPropagation();

        if (!isZoomed) {
            this.style.transform = 'scale(1.5)';
            this.style.cursor = 'zoom-out';
            isZoomed = true;
        } else {
            this.style.transform = 'scale(1)';
            this.style.cursor = 'zoom-in';
            isZoomed = false;
        }
    });

    lightboxImage.style.cursor = 'zoom-in';

    // Reset zoom when changing images
    const originalUpdateLightboxImage = updateLightboxImage;
    updateLightboxImage = function() {
        isZoomed = false;
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.style.cursor = 'zoom-in';
        originalUpdateLightboxImage();
    };

    // ===================================
    // Accessibility Enhancements
    // ===================================

    // Add ARIA labels
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image gallery lightbox');

    lightboxClose.setAttribute('aria-label', 'Close lightbox');
    lightboxPrev.setAttribute('aria-label', 'Previous image');
    lightboxNext.setAttribute('aria-label', 'Next image');

    // Trap focus within lightbox when open
    const focusableElements = [lightboxClose, lightboxPrev, lightboxNext, lightboxImage];
    let currentFocusIndex = 0;

    lightbox.addEventListener('keydown', function(e) {
        if (!this.classList.contains('active')) return;

        if (e.key === 'Tab') {
            e.preventDefault();
            currentFocusIndex = (currentFocusIndex + (e.shiftKey ? -1 : 1) + focusableElements.length) % focusableElements.length;
            focusableElements[currentFocusIndex].focus();
        }
    });

    // ===================================
    // Performance: Lazy Load Gallery Images
    // ===================================
    const galleryImages = document.querySelectorAll('.gallery-item img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load if using lazy loading
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    galleryImages.forEach(img => {
        imageObserver.observe(img);
    });

    console.log(`✅ Gallery initialized with ${images.length} images`);
});
