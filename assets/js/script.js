document.addEventListener('DOMContentLoaded', function() {

    // Common header and footer injection
    const headerMarkup = `
        <nav>
            <div class="nav-container">
                <a href="index.html" class="logo">
                    <img src="/wayanad-resort/images/Logo.png" alt="Wayanad Hilltop Logo">
                </a>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="accommodations.html">Accommodations</a></li>
                    <li><a href="amenities.html">Amenities</a></li>
                    <li><a href="dining.html">Dining</a></li>
                    <li><a href="locations.html">Locations</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
                <button class="mobile-menu">☰</button>
            </div>
        </nav>
        <div class="promo-scroller">
            <div class="promo-text">
                Welcome to Wayanad Hilltop Holiday Resort! Stay in the loop with our exclusive offers and updates—follow us on social media!      
            </div>
        </div>
    `;

    const footerMarkup = `
        <div class="container">
            <div class="footer-grid">
                <div class="footer-column">
                    <h4>Wayanad Hilltop</h4>
                    <p>Escape to Paradise. An eco-friendly retreat offering luxury accommodations and a peaceful escape into nature.</p>
                </div>
                <div class="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="accommodations.html">Accommodations</a></li>
                        <li><a href="amenities.html">Amenities</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h4>Contact</h4>
                    <p>Address: Mele PuthenKunnu, Sulthan Batheri, Kerala, India 673513</p>
                    <p>Phone: <a href="tel:{{RESORT_PHONE}}">{{RESORT_PHONE}}</a></p>
                    <p>Email: <a href="mailto:{{RESORT_EMAIL_PRIMARY}}">{{RESORT_EMAIL_PRIMARY}}</a></p>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Wayanad Hilltop Holiday Resort. All Rights Reserved.</p>
        </div>
        <a href="https://wa.me/{{WHATSAPP_NUMBER}}?text={{DEFAULT_WHATSAPP_MESSAGE}}" 
           class="whatsapp-float" target="_blank" title="Chat on WhatsApp" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 5.6 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 5.6-7.6 8.38 8.38 0 0 1 3.8-.9h.5A8.5 8.5 0 0 1 21 11.5z"></path></svg>
        </a>
    `;

    document.getElementById('main-header').innerHTML = headerMarkup;
    document.getElementById('main-footer').innerHTML = footerMarkup;
    
    // Set active nav link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.href.includes(currentPath)) {
            link.classList.add('active');
        }
    });

    // Navigation & Scroll effects
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    document.querySelector('.mobile-menu').addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');
        });
    });

    // Hero Slideshow Logic (only on index.html)
    if (document.querySelector('.hero-slideshow')) {
        const slides = document.querySelectorAll('.hero-slideshow .slide');
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000); // Change slide every 5 seconds
    }

    // Gallery Lightbox Logic (only on gallery.html)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = item.src;
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Contact form status alerts
    const formStatus = document.getElementById('form-status');
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status) {
        if (status === 'success') {
            formStatus.style.display = 'block';
            formStatus.style.backgroundColor = '#d4edda';
            formStatus.style.color = '#155724';
            formStatus.style.border = '1px solid #c3e6cb';
            formStatus.textContent = 'Thank you for your message! We will get back to you shortly.';
        } else if (status === 'error') {
            formStatus.style.display = 'block';
            formStatus.style.backgroundColor = '#f8d7da';
            formStatus.style.color = '#721c24';
            formStatus.style.border = '1px solid #f5c6cb';
            formStatus.textContent = 'There was an error sending your message. Please try again or contact us directly.';
        }
        
        // Remove query parameter from URL after a short delay
        setTimeout(() => {
            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            history.pushState({ path: newUrl }, '', newUrl);
        }, 3000);
    }

});
