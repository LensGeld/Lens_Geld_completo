document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const questions = document.querySelectorAll('.question');
    const progressBar = document.querySelector('.progress');
    let currentQuestionIndex = 0;

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.style.display = i === index ? 'block' : 'none';
        });
    
        const totalQuestions = questions.length;
        const progressPercentage = ((index + 1) / totalQuestions) * 100;
    
        progressBar.style.width = `${progressPercentage}%`;
    
        // Ativar ou desativar os botões corretamente
        prevButton.disabled = index === 0; // Primeiro botão
        nextButton.disabled = index === totalQuestions - 1; // Último botão
    }
    
    // Navega para a próxima pergunta
    nextButton.addEventListener('click', () => {
        console.log(`Current Question Index Before: ${currentQuestionIndex}`);
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            console.log(`Current Question Index After: ${currentQuestionIndex}`);
            showQuestion(currentQuestionIndex);
        }
    });

    // Navega para a pergunta anterior
    prevButton.addEventListener('click', () => {
        console.log(`Current Question Index Before: ${currentQuestionIndex}`);
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            console.log(`Current Question Index After: ${currentQuestionIndex}`);
            showQuestion(currentQuestionIndex);
        }
    });

    // Inicializa com a primeira pergunta
    showQuestion(currentQuestionIndex);
});

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

    // Atualizar a barra de progresso
    atualizarBarraProgresso(respostas.length);

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

// Função para atualizar a barra de progresso
function atualizarBarraProgresso(perguntaAtual) {
    const totalPerguntas = 10;
    const progresso = (perguntaAtual / totalPerguntas) * 100; // Percentual do progresso
    
    // Atualiza a largura da barra de progresso
    document.querySelector('.progress').style.width = `${progresso}%`;
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

// Atualiza os botões com base na seleção
document.querySelectorAll('.option-input').forEach(input => {
    input.addEventListener('change', function () {
        const parent = this.closest('.question');
        const allInputs = parent.querySelectorAll('input');

        allInputs.forEach(input => {
            const checkmark = input.closest('.option-container').querySelector('.checkmark');
            if (input.checked) {
                checkmark.style.backgroundColor = "#1c283e";
            } else {
                checkmark.style.backgroundColor = "#f1f1f1";
            }
        });
    });
});

// Importando Firebase via módulos
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';