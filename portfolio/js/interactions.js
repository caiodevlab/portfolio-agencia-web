import { projectsData } from './data.js';

export function initInteractions() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Render Projects Grid Dynamically
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projectsGrid.innerHTML = projectsData.map(project => `
            <div class="card-glass rounded-2xl overflow-hidden group transition duration-300 flex flex-col justify-between">
                <div>
                    <div class="h-56 bg-slate-800 relative overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                        <span class="absolute top-4 left-4 ${project.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow">${project.badge}</span>
                    </div>
                    <div class="p-6 space-y-3">
                        <span class="text-xs uppercase tracking-widest text-cyan-400 font-semibold">${project.category}</span>
                        <h3 class="text-xl font-bold text-white font-heading">${project.title}</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">${project.description}</p>
                    </div>
                </div>
                <div class="p-6 pt-0 flex flex-col gap-4">
                    <div class="flex flex-wrap gap-2">
                        ${project.techs.map(tech => `<span class="text-[11px] bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/50">${tech}</span>`).join('')}
                    </div>
                    <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span class="text-xs text-slate-500">Produção Pronta</span>
                        <a href="${project.demoUrl}" target="_blank" class="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                            Ver Projeto <i class="fa-solid fa-arrow-right text-xs"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Scroll Reveal Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}
