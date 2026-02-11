// CONFIGURAÇÃO DOS GATEWAYS DE PAGAMENTO
// Substitua os links abaixo pelos seus links reais de gateway

const gatewayLinks = {
    // Planos de Fotos & Vídeos
    'inicial': 'https://go.zeroonepay.com.br/3tnudibprd',
    'premium': 'https://go.zeroonepay.com.br/j2cnooc2d3',
    'completo': 'https://go.zeroonepay.com.br/pyzxjm7uh4',
    
    // Personalizados
    'personalizado-basico': 'https://go.zeroonepay.com.br/hkd27bvdxi',
    'personalizado-premium': 'https://go.zeroonepay.com.br/pbfz6up7oj',
    
    // Acessos Exclusivos
    'grupo-vip': 'https://seusite.com/gateway/grupo-vip',
    'whatsapp-exclusivo': 'https://seusite.com/gateway/whatsapp-exclusivo',
    'tudo-incluido': 'https://seusite.com/gateway/tudo-incluido',
    
    // Extras Avulsos
    '20-fotos': 'https://go.zeroonepay.com.br/qatrbbteqj',
    'video-avulso': 'https://seusite.com/gateway/video-avulso',
    'foto-frase': 'https://seusite.com/gateway/foto-frase',
    'audio-personalizado': 'https://seusite.com/gateway/audio-personalizado'
};

// Função para redirecionar para o gateway
function redirectToGateway(planId) {
    const link = gatewayLinks[planId];
    if (link) {
        // Você pode adicionar analytics ou tracking aqui
        console.log(`Redirecionando para: ${link}`);
        
        // Redirecionar para o gateway
        window.location.href = link;
    } else {
        console.error('Link do gateway não encontrado para:', planId);
        alert('Desculpe, ocorreu um erro. Por favor, tente novamente.');
    }
}

// Adicionar eventos de clique aos botões de compra
document.addEventListener('DOMContentLoaded', function() {
    // Botões principais de compra
    document.querySelectorAll('.btn-buy').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planId = this.getAttribute('data-plan');
            redirectToGateway(planId);
        });
    });
    
    // Botões de extras
    document.querySelectorAll('.btn-extra').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planId = this.getAttribute('data-plan');
            redirectToGateway(planId);
        });
    });
    
    // Modal de confirmação (opcional)
    const confirmModal = document.createElement('div');
    confirmModal.id = 'confirm-modal';
    confirmModal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 2000;
        align-items: center;
        justify-content: center;
    `;
    
    confirmModal.innerHTML = `
        <div style="background: #1a1a2e; padding: 40px; border-radius: 20px; max-width: 500px; text-align: center; border: 2px solid #ff2d95;">
            <h3 style="margin-bottom: 20px;">Confirmar Compra</h3>
            <p id="modal-message" style="margin-bottom: 30px;"></p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="modal-confirm" style="background: #ff2d95; color: white; border: none; padding: 12px 30px; border-radius: 30px; cursor: pointer; font-weight: bold;">Continuar</button>
                <button id="modal-cancel" style="background: #333; color: white; border: none; padding: 12px 30px; border-radius: 30px; cursor: pointer;">Cancelar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmModal);
    
    // Variáveis para controle do modal
    let currentPlanId = null;
    
    // Sobrescrever eventos para usar o modal
    document.querySelectorAll('.btn-buy, .btn-extra').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            currentPlanId = this.getAttribute('data-plan');
            const planName = this.closest('.plan-card') ? 
                this.closest('.plan-card').querySelector('h3').textContent : 
                this.closest('.extra-card').querySelector('h4').textContent;
            
            document.getElementById('modal-message').textContent = 
                `Você está prestes a comprar: ${planName}. Você será redirecionado para a página de pagamento.`;
            
            confirmModal.style.display = 'flex';
        });
    });
    
    // Eventos do modal
    document.getElementById('modal-confirm').addEventListener('click', function() {
        if (currentPlanId) {
            redirectToGateway(currentPlanId);
        }
        confirmModal.style.display = 'none';
    });
    
    document.getElementById('modal-cancel').addEventListener('click', function() {
        confirmModal.style.display = 'none';
        currentPlanId = null;
    });
    
    // Fechar modal ao clicar fora
    confirmModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            currentPlanId = null;
        }
    });
});

// Tracking de conversões (opcional)
function trackConversion(planId, amount) {
    // Implemente seu tracking aqui (Google Analytics, Facebook Pixel, etc.)
    console.log(`Conversão: ${planId} - R$${amount}`);
    
    // Exemplo para Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'purchase', {
            'transaction_id': `order_${Date.now()}`,
            'value': amount,
            'currency': 'BRL',
            'items': [{
                'item_id': planId,
                'item_name': planId
            }]
        });
    }
}