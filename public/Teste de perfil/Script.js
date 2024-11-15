document.getElementById('perfil-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calcularPerfil();
});

function calcularPerfil() {
    const respostas = document.querySelectorAll('input[type="radio"]:checked');

    if (respostas.length < 10) {
        alert('Por favor, responda todas as perguntas.');
        return;
    }

    // Calcular a soma das respostas
    let soma = 0;
    respostas.forEach((resposta) => {
        soma += parseInt(resposta.value);
    });

    // Determinar o perfil de investidor e definir recomendações
    let perfil = '';
    let recomendacoes = [];
    if (soma <= 20) {
        perfil = 'Conservador';
        recomendacoes = [
            { nome: 'Tesouro Direto', url: 'https://www.tesourodireto.com.br' },
            { nome: 'CDB', url: 'https://www.cdb.com.br' },
            { nome: 'Fundos de Renda Fixa', url: 'https://www.fundosrenda.com.br' }
        ];
    } else if (soma <= 30) {
        perfil = 'Moderado';
        recomendacoes = [
            { nome: 'Fundos Multimercado', url: 'https://www.fundosmultimercado.com.br' },
            { nome: 'Debêntures', url: 'https://www.debentures.com.br' },
            { nome: 'Fundos Imobiliários', url: 'https://www.fundosimobiliarios.com.br' }
        ];
    } else if (soma <= 40) {
        perfil = 'Agressivo';
        recomendacoes = [
            { nome: 'Ações', url: 'https://www.acoes.com.br' },
            { nome: 'ETFs', url: 'https://www.etfs.com.br' },
            { nome: 'Fundos de Ações', url: 'https://www.fundosacoes.com.br' }
        ];
    } else {
        perfil = 'Arrojado';
        recomendacoes = [
            { nome: 'Criptomoedas', url: 'https://www.criptomoedas.com.br' },
            { nome: 'Startups', url: 'https://www.startups.com.br' },
            { nome: 'Mercado de Opções', url: 'https://www.mercadodeopcoes.com.br' }
        ];
    }

    // Exibir o perfil no modal de resultado
    document.getElementById('perfil').innerText = perfil;

    // Exibir recomendações no modal de resultado
    const listaRecomendacoes = document.getElementById('recomendacoes');
    listaRecomendacoes.innerHTML = '';
    recomendacoes.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} <a href="${item.url}" target="_blank">Saiba mais</a>`;
        listaRecomendacoes.appendChild(li);
    });

    // Mostrar o modal de resultado
    document.getElementById('resultModal').style.display = 'block';
}

// Fechar o modal ao clicar no "X"
function closeModal() {
    document.getElementById('resultModal').style.display = 'none';
}

// Adicionar o evento ao formulário para calcular o perfil ao submeter
document.getElementById('perfil-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calcularPerfil();
});

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


let menu = document.querySelector('#menu-icon');
let sidenavbar = document.querySelector('.side-navbar');
let content = document.querySelector('.content');

menu.onclick = () => {
    sidenavbar.classList.toggle('active');
    content.classList.toggle('active');
}

/* BTN MENU*/
$(".btn-menu").click(function(){
    $(".menu").show();
});
$(".btn-closed").click(function(){
    $(".menu").hide();
});

