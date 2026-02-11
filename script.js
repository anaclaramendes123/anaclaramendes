// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Timer de Oferta
function updateCountdown() {
    const countdown = document.getElementById('countdown');
    const ctaHours = document.getElementById('cta-hours');
    const ctaMinutes = document.getElementById('cta-minutes');
    const ctaSeconds = document.getElementById('cta-seconds');
    
    // Definir a data final (24 horas a partir de agora)
    const now = new Date();
    const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    const update = () => {
        const now = new Date();
        const difference = endTime - now;
        
        if (difference <= 0) {
            countdown.innerHTML = "00:00:00";
            ctaHours.textContent = "00";
            ctaMinutes.textContent = "00";
            ctaSeconds.textContent = "00";
            return;
        }
        
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Formatar com dois dígitos
        const format = (num) => num.toString().padStart(2, '0');
        
        countdown.innerHTML = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
        ctaHours.textContent = format(hours);
        ctaMinutes.textContent = format(minutes);
        ctaSeconds.textContent = format(seconds);
    };
    
    update();
    setInterval(update, 1000);
}

// Categorias de Planos
const categoryButtons = document.querySelectorAll('.category-btn');
const planGrids = {
    'fotos': document.getElementById('fotos-plans'),
    'personalizados': document.getElementById('personalizados-plans'),
    'acessos': document.getElementById('acessos-plans')
};

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover classe active de todos os botões
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar classe active ao botão clicado
        button.classList.add('active');
        
        // Obter a categoria
        const category = button.getAttribute('data-category');
        
        // Ocultar todos os grids
        Object.values(planGrids).forEach(grid => {
            grid.style.display = 'none';
        });
        
        // Mostrar o grid correspondente
        if (planGrids[category]) {
            planGrids[category].style.display = 'grid';
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Fechar outros itens
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Alternar item atual
        item.classList.toggle('active');
    });
});

// Efeito de rolagem suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animar elementos ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.plan-card, .feature, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Inicializar contador quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    
    // Adicionar classe inicial para elementos visíveis
    setTimeout(() => {
        document.querySelectorAll('.plan-card, .feature').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animated');
            }, index * 100);
        });
    }, 500);
});