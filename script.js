document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Animated Particle Background ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 150;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() * 0.5 - 0.25);
            this.speedY = (Math.random() * 0.5 - 0.25);
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 200, 225, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- 2. Typewriter Text Effect ---
    const textElement = document.getElementById('animated-text');
    const fullText = "Get ready to be part of something that goes beyond the ordinary. A session unlike any other is on the horizon—one that promises to challenge your thinking, expand your perspective, and spark ideas that reach far beyond the expected. A powerful voice is about to take the stage. Who it is remains just out of reach—for now. But one thing is certain: what’s coming will leave an impact. Stay alert. Stay curious. The countdown has already begun.";
    let charIndex = 0;

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    textElement.appendChild(cursor);

    function type() {
        if (charIndex < fullText.length) {
            const char = document.createTextNode(fullText.charAt(charIndex));
            textElement.insertBefore(char, cursor);
            charIndex++;
            setTimeout(type, 35);
        } else {
            setTimeout(() => {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';
            }, 2000);
        }
    }

    setTimeout(type, 2000);
});
