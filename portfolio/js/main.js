import { initCalculator } from './calculator.js';
import { initInteractions } from './interactions.js';
import { initAnimations } from './animations.js';
import { initSpaceBackground } from './space-background.js';

document.addEventListener('DOMContentLoaded', () => {
    initSpaceBackground();
    initAnimations();
    initInteractions();
    initCalculator();

    // Scroll progress bar indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Card mouse coordinate tracking for glow effect
    document.querySelectorAll('.card-glass').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    console.log('NEXUS Digital Studio [Space & Moon Edition] — Initialized successfully.');
});
