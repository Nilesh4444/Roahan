
// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Events tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabName = button.getAttribute('data-tab');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showAlert('Thank you for your message! We will get back to you soon.', 'success');
        contactForm.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation for dynamic content
    addLoadingAnimations();
});

// CTA Button functionality
function exploreMore() {
    showAlert('Welcome to our AIML Department! Scroll down to explore our programs and facilities.', 'info');
    
    // Smooth scroll to about section
    const aboutSection = document.getElementById('about');
    const offsetTop = aboutSection.offsetTop - 100;
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
}

// Feedback form functionality
function openFeedbackForm() {
    const feedbackHTML = `
        <div id="feedbackModal" class="modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Feedback Form</h3>
                <form id="feedbackForm">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <select required>
                        <option value="">Select Category</option>
                        <option value="curriculum">Curriculum</option>
                        <option value="faculty">Faculty</option>
                        <option value="facilities">Facilities</option>
                        <option value="events">Events</option>
                        <option value="general">General</option>
                    </select>
                    <textarea placeholder="Your Feedback" rows="4" required></textarea>
                    <div class="rating">
                        <label>Rate your experience:</label>
                        <div class="stars">
                            <span class="star" data-rating="1">★</span>
                            <span class="star" data-rating="2">★</span>
                            <span class="star" data-rating="3">★</span>
                            <span class="star" data-rating="4">★</span>
                            <span class="star" data-rating="5">★</span>
                        </div>
                    </div>
                    <button type="submit" class="submit-btn">Submit Feedback</button>
                </form>
            </div>
        </div>
    `;

    // Add modal styles if not already present
    if (!document.getElementById('modalStyles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modalStyles';
        modalStyles.textContent = `
            .modal {
                display: flex;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                background-color: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: slideIn 0.3s ease;
            }
            .close-modal {
                position: absolute;
                right: 1rem;
                top: 1rem;
                font-size: 2rem;
                cursor: pointer;
                color: #999;
            }
            .close-modal:hover {
                color: #333;
            }
            .modal-content h3 {
                margin-bottom: 1.5rem;
                color: #2d3748;
            }
            .modal-content input,
            .modal-content select,
            .modal-content textarea {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                margin-bottom: 1rem;
                font-family: inherit;
            }
            .rating {
                margin-bottom: 1rem;
            }
            .rating label {
                display: block;
                margin-bottom: 0.5rem;
                color: #2d3748;
            }
            .stars {
                display: flex;
                gap: 0.25rem;
            }
            .star {
                font-size: 1.5rem;
                color: #e2e8f0;
                cursor: pointer;
                transition: color 0.2s ease;
            }
            .star:hover,
            .star.active {
                color: #fbbf24;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyles);
    }

    // Create and show modal
    const modalDiv = document.createElement('div');
    modalDiv.innerHTML = feedbackHTML;
    document.body.appendChild(modalDiv.firstElementChild);

    const modal = document.getElementById('feedbackModal');
    const closeBtn = modal.querySelector('.close-modal');
    const feedbackForm = document.getElementById('feedbackForm');
    const stars = modal.querySelectorAll('.star');

    // Star rating functionality
    let selectedRating = 0;
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-rating'));
            updateStars();
        });

        star.addEventListener('mouseover', () => {
            const hoverRating = parseInt(star.getAttribute('data-rating'));
            highlightStars(hoverRating);
        });
    });

    modal.querySelector('.stars').addEventListener('mouseleave', () => {
        updateStars();
    });

    function updateStars() {
        stars.forEach((star, index) => {
            if (index < selectedRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#fbbf24';
            } else {
                star.style.color = '#e2e8f0';
            }
        });
    }

    // Close modal functionality
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Form submission
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (selectedRating === 0) {
            showAlert('Please provide a rating!', 'warning');
            return;
        }
        showAlert('Thank you for your feedback! We appreciate your input.', 'success');
        modal.remove();
    });
}

// Alert system
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <span>${message}</span>
        <button class="alert-close">&times;</button>
    `;

    // Add alert styles if not already present
    if (!document.getElementById('alertStyles')) {
        const alertStyles = document.createElement('style');
        alertStyles.id = 'alertStyles';
        alertStyles.textContent = `
            .alert {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 3000;
                max-width: 400px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                animation: slideInRight 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            .alert-success { background-color: #10b981; }
            .alert-warning { background-color: #f59e0b; }
            .alert-error { background-color: #ef4444; }
            .alert-info { background-color: #3b82f6; }
            .alert-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: 1rem;
                padding: 0;
            }
            .alert-close:hover {
                opacity: 0.8;
            }
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(alertStyles);
    }

    document.body.appendChild(alertDiv);

    // Close button functionality
    alertDiv.querySelector('.alert-close').addEventListener('click', () => {
        alertDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }
    }, 5000);
}

// Add loading animations for cards
function addLoadingAnimations() {
    const cards = document.querySelectorAll('.faculty-card, .project-card, .achievement-card, .internship-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

// Add typing effect to hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;
            
            if (i === text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }, 100);
    }
}

// Initialize typing effect after a delay
setTimeout(addTypingEffect, 1000);

// Add interactive hover effects for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Console welcome message
console.log(`
🎓 Welcome to AIML Department Website!
🚀 Built with modern web technologies
💡 Featuring AI and Machine Learning excellence
📧 Contact us at aiml.department@university.edu
`);
