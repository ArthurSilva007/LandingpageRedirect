// Inicialização e efeitos visuais
document.addEventListener('DOMContentLoaded', function() {
    // Animação de entrada dos elementos
    animateOnScroll();
    
    // Efeito de clique nos botões
    addClickEffects();
    
    // Controlar visitantes
    trackVisitors();
    
    // Smooth scroll para links internos
    smoothScroll();
    
    // Adicionar efeito parallax nos bubbles
    parallaxBubbles();
    
    // Adicionar ripple effect ao clicar nos cards
    addRippleEffect();
});

// Animação ao fazer scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.link-card').forEach(card => {
        observer.observe(card);
    });
}

// Efeito de clique nos botões
function addClickEffects() {
    const linkCards = document.querySelectorAll('.link-card');
    
    linkCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Criar elemento de ondulação
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Feedback tátil (se suportado)
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Rastreamento de visitantes usando localStorage
function trackVisitors() {
    const visitKey = 'landing_page_visitors';
    const today = new Date().toDateString();
    const visitData = localStorage.getItem(visitKey);
    
    let data = visitData ? JSON.parse(visitData) : {};
    
    if (!data[today]) {
        data[today] = 0;
    }
    data[today]++;
    
    localStorage.setItem(visitKey, JSON.stringify(data));
    
    // Log de visitantes (opcional - remover em produção)
    console.log('👋 Visitantes de hoje:', data[today]);
}

// Smooth scroll
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Efeito parallax nos bubbles
function parallaxBubbles() {
    const bubbles = document.querySelectorAll('.bubble');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        bubbles.forEach((bubble, index) => {
            const speed = (index + 1) * 10;
            bubble.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// Adicionar efeito ripple ao clicar
function addRippleEffect() {
    const cards = document.querySelectorAll('.link-card');
    
    cards.forEach(card => {
        card.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Detectar modo escuro do dispositivo e ajustar
function detectDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }
}

// Monitorar mudanças de modo escuro
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

// Função para compartilhar (Share API)
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Nossa Coleção',
            text: 'Confira nossa coleção de fones, roupas e acessórios!',
            url: window.location.href
        }).catch(err => console.log('Erro ao compartilhar:', err));
    }
}

// Adicionar dados estruturados para SEO
function addStructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Nossa Coleção",
        "description": "Fones, Roupas e Acessórios para Todos",
        "url": window.location.href
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Chamar após DOM carregar
addStructuredData();
detectDarkMode();

// Adicionar suporte a gestos de toque
function addTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            console.log('Swipe para esquerda detectado');
        }
        if (touchEndX > touchStartX + 50) {
            console.log('Swipe para direita detectado');
        }
    }
}

addTouchSupport();

// Performance: Lazy loading de imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Log de performance
console.log('🚀 Landing Page carregada com sucesso!');
console.log('⏱️ Tempo de carregamento:', performance.now().toFixed(2) + 'ms');
