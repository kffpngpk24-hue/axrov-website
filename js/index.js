// Scroll animations on homepage
const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-cta');
if (heroElements.length > 0) {
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `slideInDown 0.8s ease ${index * 0.1}s forwards`;
    });
}

// Stat counter animation
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    
    if (!statsSection) return;
    
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const finalValue = parseInt(stat.textContent);
                    const increment = finalValue / 30;
                    let currentValue = 0;
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            stat.textContent = finalValue + (stat.textContent.includes('%') ? '%' : '+');
                            clearInterval(counter);
                        } else {
                            stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('%') ? '%' : '+');
                        }
                    }, 30);
                });
                observerStats.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observerStats.observe(statsSection);
}

animateStatNumbers();

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}