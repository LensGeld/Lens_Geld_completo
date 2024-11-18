// Gastos pré-definidos
/*const predefinedExpenses = [
    { name: "Aluguel", color: "#FF5733" },
    { name: "Conta de luz", color: "#33C1FF" },
    { name: "Mercado", color: "#FFC300" },
    { name: "Internet", color: "#33C1FF" },
    { name: "Transporte", color: "#FF5733" },
    { name: "Saúde", color: "#33FF57" },
    { name: "Educação", color: "#FF5733" },
    { name: "Entretenimento", color: "#FFC300" },
    { name: "Impostos", color: "#FF5733" },
    { name: "Seguros", color: "#33C1FF" }
];*/
// Referências aos elementos
const btnGastos = document.getElementById('btn-gastos');
const modalGastos = document.getElementById('modal-gastos');
const closeModalGastos = document.getElementById('close-modal-gastos');
const btnAdicionar = document.getElementById("btn-adicionar");
const btnSalvar = document.getElementById("btn-salvar");
const btnSalvarRecorrente = document.getElementById("btn-salvar-recorrente");
const searchInput = document.getElementById("search-gastos");
const gastoList = document.querySelectorAll(".gasto-item");
const valorGastoInput = document.getElementById("valor-gasto");
const corGastoInput = document.getElementById("cor-gasto");
const tabela = document.getElementById("tabela-gastos"); // Supõe que existe uma tabela no HTML para exibir os gastos
const messageIcon = document.getElementById('open-message-box');
const messageBox = document.getElementById('message-box');
const closeMessageBox = document.getElementById('close-message-box');
  fetchNews(); // Chama a função para as notícias
const btnValor = document.getElementById('btn-salvar');
const modalValor = document.getElementById('modal-valor');
const closeModalValor = document.getElementById('close-modal-valor');

// Função para abrir o modal de Gastos
btnGastos.addEventListener('click', () => {
    modalGastos.classList.add('show');
});

// Função para fechar o modal de Gastos
closeModalGastos.addEventListener('click', () => {
    modalGastos.classList.remove('show');
});

// Função para abrir o modal de Valor
btnValor.addEventListener('click', () => {
    modalValor.classList.add('show');
});

// Função para fechar o modal de Valor
closeModalValor.addEventListener('click', () => {
    modalValor.classList.remove('show');
});

// Dark mode
document.getElementById('mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Abrir a caixa de mensagens ao clicar no ícone
messageIcon.addEventListener('click', () => {
    messageBox.style.display = 'block';
});

// Fechar a caixa de mensagens ao clicar no botão "X"
closeMessageBox.addEventListener('click', () => {
    messageBox.style.display = 'none';
});
// Controle para abrir e fechar a FAQ
const faqIcon = document.getElementById('open-faq-box');
const faqBox = document.getElementById('faq-box');
const closeFaqBox = document.getElementById('close-faq-box');

// Abrir a caixa de FAQ ao clicar no ícone
faqIcon.addEventListener('click', () => {
    faqBox.style.display = 'block';
});

// Fechar a caixa de FAQ ao clicar no botão "X"
closeFaqBox.addEventListener('click', () => {
    faqBox.style.display = 'none';
});

// Controle para abrir e fechar as respostas das perguntas
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;

        // Fechar todas as outras respostas abertas
        document.querySelectorAll('.faq-answer').forEach(answerDiv => {
            if (answerDiv !== answer) {
                answerDiv.classList.remove('show');
                answerDiv.style.maxHeight = null;
            }
        });

        // Abrir ou fechar a resposta clicada
        if (answer.classList.contains('show')) {
            answer.classList.remove('show');
            answer.style.maxHeight = null;
        } else {
            answer.classList.add('show');
            answer.style.maxHeight = answer.scrollHeight + 'px';
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

/*-- TABELA GASTOS----*/

let expenses = [];

function addExpense() {
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);

    let s1 = parseFloat(document.getElementById("expenses").innerText);
    let expen = productPrice + s1;
    document.getElementById("expenses").innerText = expen.toFixed(2);

    if (productName && !isNaN(productPrice) && productPrice > 0) {
        expenses.push({ name: productName, price: productPrice });
        updateTable();
        updateChart();
        updateh1();
    } else {
        alert("Por favor, insira um nome de produto válido e um preço positivo.");
    }
}

function updateTable() {
    const tableBody = document.getElementById("expenses-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    expenses.forEach(expense => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const priceCell = row.insertCell(1);

        nameCell.innerText = expense.name;
        priceCell.innerText = "R$ " + expense.price.toFixed(2);
    });
}

function updateChart() {
    const totalMoney = parseFloat(document.getElementById("total-money").value);
    const expenseNames = expenses.map(expense => expense.name);
    const expenseValues = expenses.map(expense => expense.price.toFixed(2));
    const remainingMoney = totalMoney - expenseValues.reduce((a, b) => a + b, 0);

    let s1 = parseFloat(document.getElementById("expenses").innerText);

    let lucro = totalMoney - s1;
    const lucroFormatado = lucro.toFixed(2);
    document.getElementById("lucro").innerText = lucroFormatado;

    if (isNaN(totalMoney) || totalMoney <= 0) {
        alert("Por favor, insira um valor total de dinheiro válido.");
        return;
    }

    // Verificando se as despesas são maiores que o lucro
    let backgroundColors;
    let borderColors;

    if (s1 > totalMoney) {
        // Se as despesas forem maiores que o total de dinheiro, o gráfico será todo vermelho
        backgroundColors = expenseNames.map(() => 'rgba(255, 0, 0, 0.9)');
        borderColors = expenseNames.map(() => 'rgba(255, 0, 0, 0.9)');
    } else {
        // Caso contrário, usa a cor vermelha para as despesas e verde para o lucro
        backgroundColors = [...expenseNames.map(() => 'rgba(255, 100, 100, 0.9)'), 'rgba(100, 255, 126, 0.9)'];
        borderColors = [...expenseNames.map(() => 'rgba(255, 100, 100, 0.9)'), 'rgba(100, 255, 126, 0.9)'];
    }

    const chartData = {
        labels: [...expenseNames, "Restante"],
        datasets: [{
            label: '',
            data: [...expenseValues, lucroFormatado],
            backgroundColor: [...backgroundColors],
            borderColor: [...borderColors],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribuição de Gastos no Mês'
                }
            }
        },
    };

    const chartContainer = document.getElementById('expense-chart').getContext('2d');
    if (window.expenseChart) {
        window.expenseChart.destroy();
    }
    window.expenseChart = new Chart(chartContainer, config);
}


let newsOffset = 0; // Variável para controlar o número de notícias carregadas

// Função para buscar notícias (NewsAPI)
async function fetchNews() {
  const url = 'https://getnews-f6mscryaba-uc.a.run.app'; // URL da API de notícias
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar notícias');
    }
    const data = await response.json();
    const articles = data.articles; // Ajuste conforme o formato retornado pela nova API

    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) {
      console.error('Elemento news-container não encontrado.');
      return;
    }

    newsContainer.innerHTML = ''; // Limpa o conteúdo anterior

    loadMoreNews(articles); // Carrega a primeira parte das notícias
    setupCarousel(articles); // Configura o carrossel com as notícias

  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    alert('Ocorreu um erro ao carregar as notícias. Tente novamente mais tarde.');
  }
}

// Função para carregar mais notícias no carrossel
function loadMoreNews(articles) {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
  
    // Carrega apenas o número de notícias baseado no espaço visível
    const itemWidth = 320; // Largura de cada item
    const visibleItems = Math.floor(newsContainer.clientWidth / itemWidth); // Quantos itens cabem na tela
    const newsToLoad = articles.slice(newsOffset, newsOffset + visibleItems);
    newsOffset += visibleItems; // Atualiza o offset para a próxima carga de notícias
  
    newsToLoad.forEach((article) => {
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');
  
      const imageUrl = article.urlToImage || 'default-image.jpg';
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = article.title;
      image.classList.add('news-image');
  
      newsItem.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || 'Descrição não disponível'}</p>
        <a href="${article.url}" target="_blank">Leia mais</a>
      `;
      newsItem.insertBefore(image, newsItem.firstChild);
  
      newsContainer.appendChild(newsItem);
    });
  }
  
// Função de controle do carrossel de notícias
function setupCarousel(articles) {
    const newsContainer = document.getElementById('news-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
  
    if (!newsContainer || !prevBtn || !nextBtn) {
      console.error('Elementos do carrossel não encontrados.');
      return;
    }
  
    // Calcular a quantidade de itens que cabem na tela
    const itemWidth = 320; // Ajuste a largura de cada item
    const visibleItems = Math.floor(newsContainer.clientWidth / itemWidth); // Quantos itens são visíveis por vez
    const scrollAmount = itemWidth * visibleItems; // Quantidade de pixels para a rolagem
  
    // Função de rolagem para a esquerda (seta anterior)
    prevBtn.addEventListener('click', () => {
      // Verifica se há espaço à esquerda para rolar
      if (newsContainer.scrollLeft > 0) {
        newsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    });
  
    // Função de rolagem para a direita (seta próxima)
    nextBtn.addEventListener('click', () => {
      // Verifica se há mais conteúdo para rolar à direita
      if (newsContainer.scrollLeft + newsContainer.clientWidth < newsContainer.scrollWidth) {
        newsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  
    // Detecta quando o usuário chega ao final do carrossel para carregar mais notícias
    newsContainer.addEventListener('scroll', () => {
      // Verifica se o usuário chegou ao final do carrossel
      if (newsContainer.scrollLeft + newsContainer.clientWidth >= newsContainer.scrollWidth) {
        loadMoreNews(articles);
      }
    });
  
    // Inicialmente, carrega as primeiras notícias
    loadMoreNews(articles);
  }
  
  
  window.addEventListener('resize', function() {
    setupCarousel(articles);  // Recalcula a quantidade de itens visíveis
  });
  console.log('Item width:', itemWidth);
console.log('Visible items:', visibleItems);
console.log('Scroll amount:', scrollAmount);