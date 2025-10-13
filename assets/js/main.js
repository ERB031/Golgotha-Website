document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.getElementById('hero-video');
    const logo = document.querySelector('.logo');
    const siteNav = document.getElementById('site-nav');
    const heroSection = document.getElementById('hero');
    const navLinks = document.querySelectorAll('#site-nav nav a');

    const playMuted = () => {
        if (!heroVideo) return;
        heroVideo.muted = true;
        heroVideo.playsInline = true;
        heroVideo.loop = true;
        heroVideo.play().catch(() => {});
    };

    const bootstrapHeroVideo = () => {
        if (!heroVideo) return;
        playMuted();
    };

    const initScrollLogoFade = () => {
        if (!logo) return;
        let ticking = false;

        const updateOpacity = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            const threshold = Math.max(window.innerHeight * 0.6, 1);
            const progress = Math.min(Math.max(scrollTop / threshold, 0), 1);
            logo.style.opacity = progress.toString();
        };

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                updateOpacity();
                ticking = false;
            });
        };

        logo.style.opacity = '0';
        updateOpacity();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', updateOpacity);
    };

    const setActiveNavLink = () => {
        if (!navLinks.length) return;

        const path = window.location.pathname.split('/').pop() || 'index.html';
        const normalized = path === '' ? 'index' : path.replace('.html', '') || 'index';

        navLinks.forEach((link) => {
            const pageKey = link.dataset.page;
            link.classList.toggle('active', pageKey === normalized);
        });
    };

    const watchHeroVisibility = () => {
        if (!siteNav || !heroSection) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        siteNav.classList.remove('visible');
                    } else {
                        siteNav.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(heroSection);
    };

    bootstrapHeroVideo();
    initScrollLogoFade();
    setActiveNavLink();
    watchHeroVisibility();
});
