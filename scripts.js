document.addEventListener('DOMContentLoaded', () => {

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Preloader
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navigation
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close the mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active navigation link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

// Active link based on scroll position
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Header scroll effect
const header = document.querySelector('.header');
const backToTopButton = document.querySelector('.back-to-top');

function onScroll() {
    if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
        backToTopButton.classList.add('active');
    } else {
        header.classList.remove('scrolled');
        backToTopButton.classList.remove('active');
    }
    
    updateActiveLink();
}

window.addEventListener('scroll', onScroll);

// Back to top button
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skills category tabs
const skillsCategories = document.querySelectorAll('.skills-category');
const skillsGroups = document.querySelectorAll('.skills-group');

skillsCategories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories
        skillsCategories.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked category
        category.classList.add('active');
        
        // Show corresponding skills group
        const categoryId = category.getAttribute('data-category');
        skillsGroups.forEach(group => {
            group.classList.remove('active');
            if (group.id === categoryId) {
                group.classList.add('active');
            }
        });
    });
});

// Initialize skill progress bars
function initSkillBars() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    
    skillProgresses.forEach(progress => {
        const progressValue = progress.getAttribute('data-progress');
        progress.style.width = progressValue;
    });
}

// Lazy initialize skill bars when they come into view
const skillSection = document.getElementById('skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            initSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

if (skillSection) {
    observer.observe(skillSection);
}

// Projects filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter projects
        const filter = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
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

// Project modal
const projectLinks = document.querySelectorAll('.project-link');
const projectModal = document.querySelector('.project-modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// Project details data
const projectDetails = {
    project1: {
        title: "E-commerce Platform",
        category: "Web Development",
        client: "RetailTech Inc.",
        date: "January 2022",
        images: ["./assets/projects/project-1-detail-1.jpg", "./assets/projects/project-1-detail-2.jpg"],
        description: "A full-featured e-commerce platform built with React.js and Node.js. The project includes user authentication, product catalog, shopping cart, payment processing, and order management.",
        technologies: ["React.js", "Node.js", "Express", "MongoDB", "Stripe API", "AWS S3"],
        link: "https://example.com/ecommerce"
    },
    project2: {
        title: "Fitness Tracker App",
        category: "App Design",
        client: "HealthFirst",
        date: "March 2022",
        images: ["./assets/projects/project-2-detail-1.jpg", "./assets/projects/project-2-detail-2.jpg"],
        description: "A mobile fitness tracking application that allows users to record workouts, track progress, set goals, and connect with other fitness enthusiasts. The app includes features like workout plans, nutrition tracking, and progress analytics.",
        technologies: ["React Native", "Firebase", "Redux", "Google Fit API", "Apple HealthKit"],
        link: "https://example.com/fitness-app"
    },
    project3: {
        title: "Banking Dashboard",
        category: "UI/UX Design",
        client: "FinSecure Bank",
        date: "May 2022",
        images: ["./assets/projects/project-3-detail-1.jpg", "./assets/projects/project-3-detail-2.jpg"],
        description: "A comprehensive banking dashboard UI/UX design focused on providing a seamless and secure experience for online banking customers. The design includes account overview, transaction history, fund transfers, bill payments, and financial insights.",
        technologies: ["Figma", "Adobe XD", "Sketch", "Principle"],
        link: "https://example.com/banking-dashboard"
    },
    project4: {
        title: "Artist Portfolio",
        category: "Web Development",
        client: "Creative Minds Studio",
        date: "July 2022",
        images: ["./assets/projects/project-4-detail-1.jpg", "./assets/projects/project-4-detail-2.jpg"],
        description: "A dynamic portfolio website for a digital artist showcasing their work with an immersive gallery experience. The site includes custom animations, filtering capabilities, and a contact system.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Three.js", "GSAP"],
        link: "https://example.com/artist-portfolio"
    },
    project5: {
        title: "Food Delivery App",
        category: "App Design",
        client: "QuickBite",
        date: "September 2022",
        images: ["./assets/projects/project-5-detail-1.jpg", "./assets/projects/project-5-detail-2.jpg"],
        description: "A food delivery application designed for seamless ordering experience. Features include restaurant discovery, real-time order tracking, payment processing, and delivery scheduling.",
        technologies: ["Flutter", "Dart", "Firebase", "Google Maps API", "Stripe"],
        link: "https://example.com/food-delivery"
    },
    project6: {
        title: "Smart Home Interface",
        category: "UI/UX Design",
        client: "HomeConnect",
        date: "November 2022",
        images: ["./assets/projects/project-6-detail-1.jpg", "./assets/projects/project-6-detail-2.jpg"],
        description: "A modern and intuitive interface design for a smart home control system. The design focuses on accessibility, ease of use, and visual feedback for controlling various home automation devices.",
        technologies: ["Figma", "Adobe Illustrator", "Protopie", "Blender"],
        link: "https://example.com/smart-home"
    }
};

projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
            // Build modal content
            let modalHTML = `
                <div class="project-detail">
                    <h2 class="project-detail-title">${project.title}</h2>
                    <div class="project-detail-meta">
                        <span class="meta-item"><strong>Category:</strong> ${project.category}</span>
                        <span class="meta-item"><strong>Client:</strong> ${project.client}</span>
                        <span class="meta-item"><strong>Date:</strong> ${project.date}</span>
                    </div>
                    
                    <div class="project-detail-gallery">
                        ${project.images.map(img => `<img src="${img}" alt="${project.title}">`).join('')}
                    </div>
                    
                    <div class="project-detail-content">
                        <div class="detail-section">
                            <h3>Project Description</h3>
                            <p>${project.description}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Technologies Used</h3>
                            <ul class="technologies-list">
                                ${project.technologies.map(tech => `<li>${tech}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="detail-section">
                            <a href="${project.link}" target="_blank" class="btn btn-primary">Visit Project</a>
                        </div>
                    </div>
                </div>
            `;
            
            modalContent.innerHTML = modalHTML;
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll on body
    });
}


// Close modal when clicking outside
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Testimonial slider
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelector('.testimonial-dots');
const prevButton = document.querySelector('.prev-testimonial');
const nextButton = document.querySelector('.next-testimonial');

if (testimonialTrack && testimonialItems.length > 0) {
    let currentIndex = 0;
    const itemWidth = 100; // as percentage
    
    // Create dots
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        testimonialDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = testimonialItems.length - 1;
        if (index >= testimonialItems.length) index = 0;
        
        currentIndex = index;
        testimonialTrack.style.transform = `translateX(-${itemWidth * currentIndex}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Next and Previous buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }
    
    // Auto slide
    let interval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause auto slide on hover
    testimonialTrack.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    testimonialTrack.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    });
}

// Contact form submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to your server
        // For demo purposes, we'll just log it and show a success message
        console.log('Form submission:', { name, email, subject, message });
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <span>Message Sent!</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        `;
        submitBtn.style.backgroundColor = 'var(--color-success)';
        
        // Reset the form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    // Show custom cursor only on desktop
    if (window.innerWidth > 768) {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 80);
        });
        
        // Cursor effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-item, .filter-btn, .skills-category');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.width = '0px';
                cursor.style.height = '0px';
                cursorFollower.style.width = '50px';
                cursorFollower.style.height = '50px';
                cursorFollower.style.borderColor = 'rgba(59, 130, 246, 0.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.width = '12px';
                cursor.style.height = '12px';
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            });
        });
    }
}

// Create placeholder assets folder structure
function createAssetsPlaceholder() {
    console.log('Note: For a real implementation, you need to create the following folder structure:');
    console.log('- assets/');
    console.log('  |- profile.jpg');
    console.log('  |- resume.pdf');
    console.log('  |- favicon.svg');
    console.log('  |- projects/');
    console.log('  |  |- project-1.jpg through project-6.jpg');
    console.log('  |  |- project-1-detail-1.jpg through project-6-detail-2.jpg');
    console.log('  |- testimonials/');
    console.log('     |- person-1.jpg through person-3.jpg');
}

// Call this function to log placeholder assets info
createAssetsPlaceholder();

});

