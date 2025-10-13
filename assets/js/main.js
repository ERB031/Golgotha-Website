
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    logo.classList.add('hidden'); // Ensure it's hidden on load

    const fadeInLogo = () => {
        logo.classList.remove('hidden');
        window.removeEventListener('scroll', fadeInLogo); // Run only once
    };

    window.addEventListener('scroll', fadeInLogo);
});
