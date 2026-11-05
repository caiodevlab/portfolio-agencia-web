export function initAnimations() {
    // Register GSAP plugins if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Stagger Animation
        gsap.from('.hero-animate', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            stagger: 0.2,
            ease: 'power4.out',
            clearProps: 'all'
        });

        // Scroll Reveal Animations for Sections
        gsap.utils.toArray('.reveal-on-scroll').forEach((elem) => {
            gsap.fromTo(elem, {
                opacity: 0,
                y: 60
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Parallax effect on cards
        gsap.utils.toArray('.parallax-card').forEach((card) => {
            gsap.to(card, {
                y: -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }

    // Custom Mouse Spotlight & Cursor Effect
    const cursorDot = document.createElement('div');
    cursorDot.className = 'fixed w-3 h-3 bg-cyan-400 rounded-full pointer-events-none z-50 transition-transform duration-100 ease-out hidden md:block mix-blend-difference';
    document.body.appendChild(cursorDot);

    const cursorRing = document.createElement('div');
    cursorRing.className = 'fixed w-10 h-10 border border-cyan-400/50 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out hidden md:block';
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    });

    function renderCursor() {
        ringX += (mouseX - ringX - 20) * 0.15;
        ringY += (mouseY - ringY - 20) * 0.15;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, input, select').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.transform += ' scale(1.5)';
            cursorRing.style.borderColor = '#38bdf8';
            cursorRing.style.backgroundColor = 'rgba(6, 182, 212, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.backgroundColor = 'transparent';
            cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.5)';
        });
    });
}
