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

// Dados fictícios de exemplo para gastos mensais e anuais
const gastosMensais = {
  2023: [324.52, 712.14, 858.95, 467.28, 213.78, 692.37, 580.13, 341.98, 493.77, 725.64, 622.42, 508.65], // Gastos por mês de 2023
  2022: [154.88, 811.73, 303.41, 612.93, 725.05, 199.37, 798.53, 487.62, 672.03, 859.95, 384.27, 536.70], // Gastos por mês de 2022
  2021: [245.17, 561.21, 698.92, 484.35, 672.54, 132.76, 824.61, 729.94, 318.60, 631.84, 481.99, 766.05], // Gastos por mês de 2021
  2020: [308.47, 759.64, 541.93, 898.45, 370.92, 238.56, 634.16, 785.29, 671.91, 314.51, 557.36, 892.43], // Gastos por mês de 2020
  2019: [470.15, 621.76, 547.90, 893.51, 455.11, 178.45, 739.60, 522.94, 668.29, 814.91, 632.67, 384.26], // Gastos por mês de 2019
  2018: [309.63, 479.10, 295.22, 747.22, 541.76, 887.34, 631.04, 756.18, 440.87, 532.95, 374.62, 712.43], // Gastos por mês de 2018
  2017: [179.83, 659.44, 832.56, 311.05, 716.15, 513.79, 408.27, 553.77, 678.29, 497.12, 343.73, 824.94], // Gastos por mês de 2017
  2016: [299.36, 773.81, 673.85, 882.74, 438.08, 571.69, 544.22, 291.13, 683.41, 629.48, 742.00, 369.76], // Gastos por mês de 2016
  2015: [320, 450, 920, 680, 351.50, 740, 200, 250.75, 420, 320, 111, 340], //Gastos por mês de 2015
  2014: [241.95, 220.33, 807.08, 530.59, 706.60, 151.52, 476.56, 664.56, 348.10, 143.05, 404.24, 302.36], //Gastos por mês de 2014
  2013: [739.29, 409.24, 313.05, 546.91, 569.51, 193.84, 799.00, 516.74, 870.09, 239.67, 493.80, 256.06], //Gastos por mês de 2013
  2012: [226.55, 130.49, 842.06, 114.47, 618.70, 387.64, 695.06, 405.26, 336.52, 221.08, 607.09, 404.37], //Gastos por mês de 2012
  2011: [298.04, 421.28, 896.43, 880.66, 727.65, 262.55, 586.59, 670.29, 738.49, 705.24, 759.11, 458.48] //Gastos por mês de 2011
};

const gastosAnuais = {
  2023: 5589.68, // Gastos totais de 2023
  2022: 7555.36, // Gastos totais de 2022
  2021: 6997.38, // Gastos totais de 2021
  2020: 7574.07, // Gastos totais de 2020
  2019: 7368.84, // Gastos totais de 2019
  2018: 6892.76, // Gastos totais de 2018
  2017: 7089.14, // Gastos totais de 2017
  2016: 7480.92, // Gastos totais de 2016
  2015: 5104.25, // Gastos totais de 2015
  2014: 4996.93, // Gastos totais de 2014
  2013: 5947.20, // Gastos totais de 2013
  2012: 4989.29, // Gastos totais de 2012
  2011: 7404.81, // Gastos totais de 2011
};

// Inicializa o gráfico mensal para o ano padrão (2023)
let graficoMensal, graficoAnual;

function mostrarGraficoMensal() {
  // Exibe o gráfico mensal e esconde o gráfico anual
  document.getElementById("graficoMensal").style.display = "block";
  document.getElementById("graficoAnual").style.display = "none";
  document.querySelector(".seletor-ano").style.display = "flex"; // Exibe o seletor de ano

  // Cria o gráfico mensal
  const anoSelecionado = document.getElementById("ano-selecionado").value;
  const dadosMensais = gastosMensais[anoSelecionado];

  const ctxMensal = document.getElementById("graficoMensal").getContext("2d");

  if (graficoMensal) graficoMensal.destroy(); // Destroi o gráfico anterior antes de criar um novo

  graficoMensal = new Chart(ctxMensal, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{
        label: "Gastos Mensais",
        data: dadosMensais,
        backgroundColor: "rgba(28, 40, 62, 0.7)",
        borderColor: "rgba(28, 40, 62, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
}

function mostrarGraficoAnual() {
  // Exibe o gráfico anual e esconde o gráfico mensal
  document.getElementById("graficoMensal").style.display = "none";
  document.getElementById("graficoAnual").style.display = "block";
  document.querySelector(".seletor-ano").style.display = "none"; // Esconde o seletor de ano

  // Cria o gráfico anual (gráfico de linha)
  const ctxAnual = document.getElementById("graficoAnual").getContext("2d");

  if (graficoAnual) graficoAnual.destroy(); // Destroi o gráfico anterior antes de criar um novo

  graficoAnual = new Chart(ctxAnual, {
    type: "line", // Tipo de gráfico alterado para linha
    data: {
      labels: ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"], // Anos
      datasets: [{
        label: "Gastos Anuais",
        data: [
          gastosAnuais[2011],
          gastosAnuais[2012],
          gastosAnuais[2013],
          gastosAnuais[2014],
          gastosAnuais[2015],
          gastosAnuais[2016],
          gastosAnuais[2017],
          gastosAnuais[2018],
          gastosAnuais[2019],
          gastosAnuais[2020],
          gastosAnuais[2021],
          gastosAnuais[2022],
          gastosAnuais[2023]
        ], // Dados dos gastos anuais
        borderColor: "rgba(28, 40, 62, 1)", // Cor da linha
        backgroundColor: "rgba(28, 40, 62, 0.3)", // Cor de fundo da linha
        borderWidth: 2, // Espessura da linha
        tension: 0.4, // Suaviza a linha
        fill: true, // Preenche a área abaixo da linha
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        }
      },
      plugins: {
        legend: {
          position: "top"
        }
      }
    }
  });
}

function atualizarGraficoMensal() {
  // Atualiza o gráfico mensal com o ano selecionado
  const anoSelecionado = document.getElementById("ano-selecionado").value;
  mostrarGraficoMensal(); // Atualiza o gráfico mensal
}

// Inicializa o gráfico mensal ao carregar a página
window.onload = function() {
  mostrarGraficoMensal();
};

// Importando Firebase via módulos
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';