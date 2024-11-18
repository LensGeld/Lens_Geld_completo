const cors = require("cors")({origin: "*"});
const functions = require("firebase-functions");
const axios = require("axios");

// Função para buscar dados das ações
exports.getStockData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const apiKey = functions.config().alpha_vantage.apikey;
    const symbol = req.query.symbol || "PETR4.SA"; // Ação a ser buscada
    const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY" +
                `&symbol=${symbol}` +
                "&interval=5min&apikey=" + apiKey;

    try {
      const response = await axios.get(url);
      if (!response.data || !response.data["Time Series (5min)"]) {
        return res.status(500).json({error: "Dados não encontrados para a ação"});
      }
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`Erro ao buscar dados de ações de ${url}: ${error.message}`);
      res.status(500).json({error: "Erro ao buscar dados da ação"});
    }
  });
});

// Função para buscar dados de criptomoedas (CoinGecko)
exports.getCryptoData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin";

    try {
      const response = await axios.get(url);
      if (!response.data || !response.data.market_data || !response.data.market_data.current_price) {
        return res.status(500).json({error: "Dados de criptomoeda não encontrados"});
      }
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`Erro ao buscar dados de criptomoedas de ${url}: ${error.message}`);
      res.status(500).json({error: "Erro ao buscar dados de criptomoedas"});
    }
  });
});

// Função para buscar notícias (NewsAPI)
exports.getNews = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const apiKey = functions.config().news_api.apikey;
    const url = "https://newsapi.org/v2/everything?q=mercado+financeiro" +
                `&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (!response.data || !response.data.articles || response.data.articles.length === 0) {
        return res.status(500).json({error: "Dados de notícias não encontrados"});
      }
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`Erro ao buscar notícias de ${url}: ${error.message}`);
      res.status(500).json({error: "Erro ao buscar notícias"});
    }
  });
});

// Função para buscar taxa de câmbio (ExchangeRate-API)
exports.getExchangeRate = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const apiKey = functions.config().exchange_rate.apikey;
    const url = "https://v6.exchangerate-api.com/v6/" +
                `${apiKey}/latest/USD`;

    try {
      const response = await axios.get(url);
      if (!response.data || !response.data.conversion_rates || !response.data.conversion_rates.BRL) {
        return res.status(500).json({error: "Dados de taxa de câmbio não encontrados"});
      }
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`Erro ao buscar taxa de câmbio de ${url}: ${error.message}`);
      res.status(500).json({error: "Erro ao buscar taxa de câmbio"});
    }
  });
});

// Função para buscar dados do Ibovespa (Yahoo Finance)
exports.getIbovespaData = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const url = "https://query1.finance.yahoo.com/v8/finance/chart/%5EBVSP?" +
                "range=1d&interval=1m";

    try {
      const response = await axios.get(url);
      if (!response.data || !response.data.chart || !response.data.chart.result) {
        return res.status(500).json({error: "Dados do Ibovespa não encontrados"});
      }
      res.status(200).json(response.data);
    } catch (error) {
      console.error(`Erro ao buscar dados do Ibovespa de ${url}: ${error.message}`);
      res.status(500).json({error: "Erro ao buscar dados do Ibovespa"});
    }
  });
});
