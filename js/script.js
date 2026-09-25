tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                mono: [
                    'JetBrains Mono',
                    'IBM Plex Mono',
                    'SFMono-Regular',
                    'Consolas',
                    'Liberation Mono',
                    'monospace'
                ],
                sans: [
                    'Arial',
                    'Helvetica Neue',
                    'Helvetica',
                    'sans-serif'
                ]
            },
            colors: {
                ink: '#0B0B0B',
                line: '#222222',
                silver: '#A3A3A3',
                signal: '#00FF66'
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.reveal-on-scroll, .timeline-reveal');
    if (!targets.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(el => observer.observe(el));
});