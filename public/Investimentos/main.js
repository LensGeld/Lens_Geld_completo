// Importando os módulos do Firebase corretamente
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB9lDG5ncGjRyJ_YM1fUofvk6dvXBRFeKg",
  authDomain: "Ylensgeld-9df15.firebaseapp.com",
  databaseURL: "https://lensgeld-9df15-default-rtdb.firebaseio.com/",
  projectId: "lensgeld-9df15",
  storageBucket: "lensgeld-9df15.firebasestorage.app",
  messagingSenderId: "359787924372",
  appId: "1:359787924372:web:a1fc791f808e2cfa3a1d81",
  measurementId: "G-7JZ3FLX7LR"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função chamada ao carregar a página
window.onload = function() {
  fetchTopStocks(); // Chama a função de busca das ações
  fetchCryptoData(); // Chama a função para as criptos
  fetchNews(); // Chama a função para as notícias
  fetchExchangeRate(); // Chama a função para a taxa de câmbio
  fetchIbovespaData(); // Chama a função para carregar o gráfico do Ibovespa
};

// Função para buscar dados das ações (Alpha Vantage)
async function fetchTopStocks() {
  const url = 'https://us-central1-lensgeld-9df15.cloudfunctions.net/getStockData'; // URL da Firebase Function
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados das ações');
    }
    const data = await response.json();

    if (data.stocks && Array.isArray(data.stocks)) {
      const stockData = data.stocks.filter(stock => stock.changePercent > 0); // Filtra ações em alta
      updateStockTable(stockData); // Atualiza a tabela
    } else {
      console.error('Dados de ações não encontrados.');
    }
  } catch (error) {
    console.error('Erro ao buscar dados das ações:', error);
    alert('Ocorreu um erro ao carregar as ações. Tente novamente mais tarde.');
  }
}

// Atualiza a tabela com os dados das ações
function updateStockTable(stockData) {
  const tableBody = document.getElementById('top-stocks-table');
  if (!tableBody) {
    console.error('Elemento da tabela não encontrado!');
    return;
  }

  tableBody.innerHTML = ''; // Limpa a tabela antes de atualizar

  // Ordena as ações em alta por maior variação percentual
  stockData.sort((a, b) => b.changePercent - a.changePercent);

  stockData.forEach(stock => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${stock.symbol}</td>
      <td class="${stock.changePercent >= 0 ? 'positive' : 'negative'}">${stock.changePercent}%</td>
      <td>R$ ${stock.price}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Função para buscar dados de criptomoedas (CoinGecko)
async function fetchCryptoData() {
  const url = 'https://getcryptodata-f6mscryaba-uc.a.run.app'; // URL da API de criptomoedas
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados de criptomoedas');
    }
    const data = await response.json();

    if (!data || !data.price || !data.sparkline) {
      console.error('Dados de criptomoedas não encontrados ou no formato incorreto.');
      return;
    }

    const price = data.price;
    const prices = data.sparkline;
    const dates = Array.from({ length: prices.length }, (_, i) => `Dia ${i + 1}`);
    const ctx = document.getElementById('cryptoChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Preço do Bitcoin (Últimos 7 dias)',
          data: prices,
          borderColor: 'rgba(255, 99, 132, 1)',
          tension: 0.1
        }]
      }
    });

  } catch (error) {
    console.error('Erro ao buscar dados de criptomoedas:', error);
    alert('Ocorreu um erro ao carregar as criptomoedas. Tente novamente mais tarde.');
  }
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

  // Carrega apenas 10 notícias de cada vez
  const newsToLoad = articles.slice(newsOffset, newsOffset + 10);
  newsOffset += 10; // Atualiza o offset para a próxima carga de notícias

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
  const scrollAmount = 320; // Quantidade de pixels para a rolagem

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!newsContainer || !prevBtn || !nextBtn) {
    console.error('Elementos do carrossel não encontrados.');
    return;
  }

  // Função de rolagem para a esquerda (seta anterior)
  prevBtn.addEventListener('click', () => {
    newsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  // Função de rolagem para a direita (seta próxima)
  nextBtn.addEventListener('click', () => {
    newsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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

// Função para buscar dados do Ibovespa
async function fetchIbovespaData() {
  const url = 'https://getibovespadata-f6mscryaba-uc.a.run.app'; // URL da API do Ibovespa
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados do Ibovespa');
    }
    const data = await response.json();

    if (!data || !data.prices || !data.dates) {
      console.error('Dados do Ibovespa não encontrados ou no formato incorreto.');
      return;
    }

    const prices = data.prices;
    const dates = data.dates;

    const labels = dates.map(date => new Date(date * 1000).toLocaleTimeString());
    const ctx = document.getElementById('ibovespaChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Ibovespa',
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1
        }]
      }
    });
  } catch (error) {
    console.error('Erro ao buscar dados do Ibovespa:', error);
    alert('Ocorreu um erro ao carregar os dados do Ibovespa. Tente novamente mais tarde.');
  }
}
