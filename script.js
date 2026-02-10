// 粒子背景初始化
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 创建粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // 连接粒子
        particles.forEach((particle, index) => {
            for (let i = index + 1; i < particles.length; i++) {
                const dx = particles[i].x - particle.x;
                const dy = particles[i].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[i].x, particles[i].y);
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();

    // 响应窗口大小改变
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 数字计数动画
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const count = parseInt(entry.target.dataset.count);
                const target = entry.target;
                target.classList.add('counted');

                let current = 0;
                const increment = Math.ceil(count / 50);
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= count) {
                        target.textContent = count;
                        clearInterval(interval);
                    } else {
                        target.textContent = current;
                    }
                }, 30);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// 平滑导航
function setupSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Glitch效果 - 设置data-text属性
function setupGlitchText() {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        el.setAttribute('data-text', el.textContent);
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateCounters();
    setupSmoothNavigation();
    setupGlitchText();
});

// 页面加载完成后的优化
window.addEventListener('load', () => {
    // 确保所有图片都已加载
    document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
            img.addEventListener('error', () => {
                img.style.display = 'none';
            });
        }
    });
});
