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
function enviarMensagem() {
    const inputField = document.getElementById('user-input');
    const mensagem = inputField.value.trim();
    
    if (mensagem === '') return; // Evita envio de mensagens vazias

    // Exibir mensagem do usuário
    adicionarMensagem(mensagem, 'user-message');

    // Obter resposta da IA
    obterRespostaIA(mensagem); // Chama a função para obter a resposta da IA

    // Limpar o campo de entrada
    inputField.value = '';
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

// Função para alternar entre modo claro e escuro
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body; // Referência ao body
    const modeToggle = document.getElementById('mode-toggle'); // Referência ao botão de alternância
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Verifica se o modo escuro está salvo no localStorage
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'none'; // Oculta o ícone do sol
        moonIcon.style.display = 'inline'; // Mostra o ícone da lua
    } else {
        body.classList.remove('dark-mode');
        sunIcon.style.display = 'inline'; // Mostra o ícone do sol
        moonIcon.style.display = 'none'; // Oculta o ícone da lua
    }

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkModeActive = body.classList.contains('dark-mode');

        // Alterna a visibilidade dos ícones
        if (isDarkModeActive) {
            sunIcon.style.display = 'none'; // Oculta o ícone do sol
            moonIcon.style.display = 'inline'; // Mostra o ícone da lua
            localStorage.setItem('dark-mode', 'true');
        } else {
            sunIcon.style.display = 'inline'; // Mostra o ícone do sol
            moonIcon.style.display = 'none'; // Oculta o ícone da lua
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

