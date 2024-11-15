// Função para enviar a mensagem ao clicar no botão ou pressionar Enter
document.getElementById('send-button').addEventListener('click', function() {
    enviarMensagem();
});

document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Evita quebra de linha
        enviarMensagem();
    }
});

// Função para enviar a mensagem e obter resposta da IA
async function enviarMensagem() {
    const inputField = document.getElementById('user-input');
    const mensagem = inputField.value.trim();
    
    if (mensagem === '') return; // Evita envio de mensagens vazias

    // Exibir mensagem do usuário
    adicionarMensagem(mensagem, 'user-message');

    // Mostrar o indicador de carregamento
    mostrarIndicadorPensando(true);

    // Obter resposta da IA
    await obterRespostaIA(mensagem);  // Chama a função para obter a resposta da IA

    // Limpar o campo de entrada
    inputField.value = '';
}
    

// Função para obter resposta da IA
async function obterRespostaIA(mensagem) {
    try {
        const response = await fetch('/api/ma.IA', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pergunta: mensagem })
        });

        const data = await response.json();

            // Exibir a resposta da IA
            if (data.resposta) {
                adicionarMensagem(data.resposta, 'ai-message');
            }
        } catch (error) {
            console.error('Erro ao obter resposta da IA:', error);
        } finally {
            // Esconder o indicador de carregamento após a resposta
            mostrarIndicadorPensando(false);
        }
    }
    

// Função para adicionar mensagens ao chat
function adicionarMensagem(texto, classe) {
    const chatOutput = document.getElementById('chat-output');
    const isScrolledToBottom = chatOutput.scrollHeight - chatOutput.clientHeight <= chatOutput.scrollTop + 1;
    
    const novaMensagem = document.createElement('div');
    novaMensagem.classList.add('message', classe);
    novaMensagem.textContent = texto;
    chatOutput.appendChild(novaMensagem);

    // Apenas rola para o fim se o usuário estiver perto do final do chat
    if (isScrolledToBottom) {
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
}

// Função para mostrar ou esconder o indicador de "pensando"
function mostrarIndicadorPensando(mostrar) {
    const indicador = document.getElementById('thinking-indicator');
    indicador.style.display = mostrar ? 'block' : 'none';
}

// Função para alternar entre modo claro e escuro
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const modeToggle = document.getElementById('mode-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    } else {
        body.classList.remove('dark-mode');
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkModeActive = body.classList.contains('dark-mode');

        if (isDarkModeActive) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
            localStorage.setItem('dark-mode', 'true');
        } else {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
            localStorage.setItem('dark-mode', 'false');
        }
    });
});

// Seleciona os elementos da página
let menu = document.querySelector('#menu-icon');
let sidenavbar = document.querySelector('.side-navbar');
let content = document.querySelector('.content');

// Ação ao clicar no ícone do menu
menu.onclick = () => {
    sidenavbar.classList.toggle('active');
    content.classList.toggle('active');
};

// BTN MENU - Sem jQuery
document.querySelector(".btn-menu").addEventListener('click', () => {
    document.querySelector(".menu").classList.add('show');
});

document.querySelector(".btn-closed").addEventListener('click', () => {
    document.querySelector(".menu").classList.remove('show');
});

// Função para exibir a mensagem inicial da IA
function mensagemBoasVindasIA() {
    const mensagemBoasVindas = "Olá! Seja bem-vindo(a) à ma.IA. Como posso ajudar você hoje?";
    adicionarMensagem(mensagemBoasVindas, 'ai-message'); // Adiciona como mensagem da IA
}

// Chama a função de mensagem de boas-vindas quando a página carregar
document.addEventListener('DOMContentLoaded', mensagemBoasVindasIA);
