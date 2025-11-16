// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all roadmap steps
document.querySelectorAll('.roadmap-step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(50px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(step);
});

// Observe resource cards
document.querySelectorAll('.resource-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add progress indicator on scroll
let progressBar;

function createProgressBar() {
    progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
}

function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

createProgressBar();
window.addEventListener('scroll', updateProgressBar);

// Add floating particles effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: 0;
        animation: float 4s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    document.querySelector('.hero').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 4000);
}

// Create particles periodically
if (window.innerWidth > 768) {
    setInterval(createParticle, 300);
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add copy to clipboard functionality for links
document.querySelectorAll('.resource-list a').forEach(link => {
    link.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const url = link.href;
        navigator.clipboard.writeText(url).then(() => {
            // Show tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Link copied!';
            tooltip.style.cssText = `
                position: fixed;
                background: #10b981;
                color: white;
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 0.9rem;
                z-index: 10000;
                pointer-events: none;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: fadeOut 2s forwards;
            `;
            document.body.appendChild(tooltip);
            setTimeout(() => tooltip.remove(), 2000);
        });
    });
});

// Add fade out animation for tooltip
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(tooltipStyle);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
});

// Add enhanced hover effects
document.querySelectorAll('.roadmap-step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.background = 'var(--light-bg)';
    });
});

console.log('%c🚀 Frontend Developer Roadmap', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cCreated by Magdy Elsayyad', 'color: #764ba2; font-size: 14px;');
console.log('%chttps://www.linkedin.com/in/magdy-elsayyad-14a086193/', 'color: #0077b5; font-size: 12px;');