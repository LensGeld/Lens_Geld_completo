function calcularPerfil() {
    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.querySelector('input[name="q2"]:checked');
    let q3 = document.querySelector('input[name="q3"]:checked');
    let q4 = document.querySelector('input[name="q4"]:checked');
    let q5 = document.querySelector('input[name="q5"]:checked');
    let q6 = document.querySelector('input[name="q6"]:checked');
    let q7 = document.querySelector('input[name="q7"]:checked');
    let q8 = document.querySelector('input[name="q8"]:checked');
    let q9 = document.querySelector('input[name="q9"]:checked');
    let q10 = document.querySelector('input[name="q10"]:checked');

    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8 || !q9 || !q10) {
        alert('Por favor, responda todas as perguntas.');
        return;
    }

    let soma = parseInt(q1.value) + parseInt(q2.value) + parseInt(q3.value) +
               parseInt(q4.value) + parseInt(q5.value) + parseInt(q6.value) +
               parseInt(q7.value) + parseInt(q8.value) + parseInt(q9.value) +
               parseInt(q10.value);
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

    document.getElementById('perfil').innerText = perfil;

    let listaRecomendacoes = document.getElementById('recomendacoes');
    listaRecomendacoes.innerHTML = '';
    recomendacoes.forEach(function(item) {
        let li = document.createElement('li');
        li.innerHTML = `${item.nome} <a href="${item.url}" target="_blank">Saiba mais</a>`;
        listaRecomendacoes.appendChild(li);
    });

    document.querySelector('.result').style.display = 'block';
    document.querySelector('.investments').style.display = 'block';
}

document.getElementById('perfil-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calcularPerfil();
});
