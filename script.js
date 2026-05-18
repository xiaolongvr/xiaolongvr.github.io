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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 图片错误处理
document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });
    }
});

// 启动计数动画
animateCounters();
