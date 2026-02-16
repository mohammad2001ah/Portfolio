/* ============================================
   Portfolio — Optimized Interactivity
   Performance: passive listeners, RAF-batched
   scroll, IntersectionObserver reveals
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== TYPING EFFECT ==========
    const titles = [
        'QA Engineer',
        'Full-Stack Developer',
        'Manual Tester',
        'MERN Stack Developer',
        'Problem Solver'
    ];
    const typingEl = document.getElementById('typingText');
    let titleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function type() {
        const word = titles[titleIdx];
        let delay;

        if (deleting) {
            charIdx--;
            delay = 40;
        } else {
            charIdx++;
            delay = 80;
        }

        typingEl.textContent = word.substring(0, charIdx);

        if (!deleting && charIdx === word.length) {
            delay = 2200;
            deleting = true;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            titleIdx = (titleIdx + 1) % titles.length;
            delay = 350;
        }

        setTimeout(type, delay);
    }

    type();


    // ========== MOBILE NAV ==========
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            links.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    // ========== SCROLL — RAF BATCHED ==========
    const navbar   = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const y = window.scrollY;

            // Navbar bg
            navbar.classList.toggle('scrolled', y > 40);

            // Active section
            let current = '';
            const offset = 180;

            for (let i = sections.length - 1; i >= 0; i--) {
                if (y + offset >= sections[i].offsetTop) {
                    current = sections[i].id;
                    break;
                }
            }

            navLinks.forEach(l => {
                l.classList.toggle('active',
                    l.getAttribute('href') === `#${current}`);
            });

            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    // ========== SCROLL REVEAL ==========
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));


    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ========== CONTACT FORM ==========
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const original = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';
        btn.disabled = true;
        btn.style.opacity = '0.7';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.style.opacity = '1';

            setTimeout(() => {
                form.reset();
                btn.innerHTML = original;
                btn.disabled = false;
            }, 2200);
        }, 1200);
    });

});
