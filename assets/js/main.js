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

        const hlsSrc = heroVideo.dataset.hlsSrc;
        const mp4Src = heroVideo.dataset.mp4Src;
        const canPlayHlsNatively = heroVideo.canPlayType('application/vnd.apple.mpegurl');

        if (canPlayHlsNatively && hlsSrc) {
            heroVideo.src = hlsSrc;
            heroVideo.addEventListener('loadedmetadata', playMuted, { once: true });
            heroVideo.load();
            return;
        }

        if (window.Hls && window.Hls.isSupported() && hlsSrc) {
            const hls = new window.Hls({
                autoStartLoad: true,
            });
            hls.loadSource(hlsSrc);
            hls.attachMedia(heroVideo);
            hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                playMuted();
            });
            hls.on(window.Hls.Events.ERROR, (event, data) => {
                if (data?.fatal && mp4Src) {
                    hls.destroy();
                    heroVideo.src = mp4Src;
                    heroVideo.addEventListener('loadedmetadata', playMuted, { once: true });
                    heroVideo.load();
                }
            });
            return;
        }

        if (mp4Src) {
            heroVideo.src = mp4Src;
            heroVideo.addEventListener('loadedmetadata', playMuted, { once: true });
            heroVideo.load();
        }
    };

    const revealLogo = () => {
        if (!logo) return;
        requestAnimationFrame(() => {
            logo.classList.remove('hidden');
        });
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
    revealLogo();
    setActiveNavLink();
    watchHeroVisibility();
});
