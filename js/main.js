/* ================================================
   MAIN.JS — OATSADA CHATTHONG PORTFOLIO
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ----- Typing Effect -----
    const typedText = document.getElementById('typed-text');
    const titles = [
        'Software Engineer',
        'AI Enthusiast',
        'Python Developer',
        'DevOps Engineer',
        'Full Stack Developer'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const current = titles[titleIndex];

        if (isDeleting) {
            typedText.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            typingSpeed = 2000; // pause
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();


    // ----- Navbar Scroll Effect -----
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveLink();
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ----- Mobile Menu -----
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // ----- Active Navigation Link -----
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }


    // ----- Scroll Animations (Intersection Observer) -----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Animate skill bars
                if (entry.target.classList.contains('skill-category')) {
                    const bars = entry.target.querySelectorAll('.skill-progress');
                    bars.forEach((bar, i) => {
                        setTimeout(() => {
                            const width = bar.dataset.width;
                            bar.style.width = width + '%';
                            bar.classList.add('animate-bar');
                        }, i * 150);
                    });
                }

                // Animate counters
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    animateCounter(counter);
                });

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });


    // ----- Counter Animation -----
    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic

            el.textContent = Math.round(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }


    // ----- Hero Particles -----
    const particlesContainer = document.getElementById('particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const delay = Math.random() * 5;
        const size = 2 + Math.random() * 3;

        const colors = ['#7b61ff', '#00d4ff', '#ff6b9d'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            left: ${x}%;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;

        particlesContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 30; i++) {
        createParticle();
    }

    // Continuously add particles
    setInterval(() => {
        if (particlesContainer.children.length < 40) {
            createParticle();
        }
    }, 800);


    // ----- Contact Form Handler -----
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn-submit');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = 'linear-gradient(135deg, #00c853, #00d4ff)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });


    // ----- Smooth Scroll for all anchor links -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
