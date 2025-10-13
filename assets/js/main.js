document.addEventListener('DOMContentLoaded', () => {
    const heroVideo = document.getElementById('hero-video');
    const logo = document.querySelector('.logo');
    const triggerPoint = 100; // Pixels to scroll before fade-in

    const bootstrapHeroVideo = () => {
        if (!heroVideo) return;

        const hlsSrc = heroVideo.dataset.hlsSrc;
        const canPlayHlsNatively = heroVideo.canPlayType('application/vnd.apple.mpegurl');

        if (canPlayHlsNatively && hlsSrc) {
            heroVideo.src = hlsSrc;
            heroVideo.play().catch(() => {});
            return;
        }

        if (window.Hls && window.Hls.isSupported() && hlsSrc) {
            const hls = new window.Hls({
                autoStartLoad: true,
            });
            hls.loadSource(hlsSrc);
            hls.attachMedia(heroVideo);
            hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
                heroVideo.play().catch(() => {});
            });
        }
    };

    const revealLogo = () => {
        if (!logo) return;
        requestAnimationFrame(() => {
            logo.classList.remove('hidden');
        });
    };

    // Hide logo on load
    if (logo) {
        logo.classList.add('hidden');
    }

    const handleScroll = () => {
        if (window.scrollY > triggerPoint) {
            revealLogo();
            window.removeEventListener('scroll', handleScroll);
        }
    };

    bootstrapHeroVideo();
    window.addEventListener('scroll', handleScroll);
});