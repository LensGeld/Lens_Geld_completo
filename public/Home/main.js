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
const btnGastos = document.getElementById("btn-gastos");
const popUpGastos = document.getElementById("pop-up-gastos");
const popUpValor = document.getElementById("pop-up-valor");
const closePopUp = document.getElementById("close-pop-up");
const closePopUpValor = document.getElementById("close-pop-up-valor");
const btnAdicionar = document.getElementById("btn-adicionar");
const btnSalvar = document.getElementById("btn-salvar");
const btnSalvarRecorrente = document.getElementById("btn-salvar-recorrente");
const searchInput = document.getElementById("search-gastos");
const gastoList = document.querySelectorAll(".gasto-item");
const valorGastoInput = document.getElementById("valor-gasto");
const corGastoInput = document.getElementById("cor-gasto");
const tabela = document.getElementById("tabela-gastos"); // Supõe que existe uma tabela no HTML para exibir os gastos

// Função para mostrar o pop-up de gastos
btnGastos.addEventListener("click", () => {
    popUpGastos.style.visibility = "visible";
});

// Fechar o pop-up de gastos
closePopUp.addEventListener("click", () => {
    popUpGastos.style.visibility = "hidden";
});

// Fechar o pop-up de adicionar valor
closePopUpValor.addEventListener("click", () => {
    popUpValor.style.visibility = "hidden";
});

// Ação de clicar em um gasto pré-definido
gastoList.forEach(gasto => {
    gasto.addEventListener("click", () => {
        popUpValor.style.visibility = "visible";
    });
});

// Adicionar valor no gasto
btnAdicionar.addEventListener("click", () => {
    const valor = valorGastoInput.value;
    const cor = corGastoInput.value;
    
    // Exibir na tabela ou gráfico
    const tr = document.createElement("tr");
    tr.style.backgroundColor = cor;
    tr.innerHTML = `<td>Gasto</td><td>${valor}</td><td style="background-color:${cor};">${valor}</td>`;
    tabela.appendChild(tr);

    // Fechar pop-up após adicionar o gasto
    popUpValor.style.visibility = "hidden";
});

// Adicionar novo gasto
btnSalvar.addEventListener("click", () => {
    const nome = document.getElementById("novo-gasto-nome").value;
    const valor = document.getElementById("novo-gasto-valor").value;
    const cor = document.getElementById("novo-gasto-cor").value;

    // Exibir novo gasto na tabela ou gráfico
    const tr = document.createElement("tr");
    tr.style.backgroundColor = cor;
    tr.innerHTML = `<td>${nome}</td><td>${valor}</td><td style="background-color:${cor};">${valor}</td>`;
    tabela.appendChild(tr);

    popUpGastos.style.visibility = "hidden";
});

// Salvar gasto recorrente
btnSalvarRecorrente.addEventListener("click", () => {
    // Similar à lógica de salvar, mas com alguma diferenciação para gasto recorrente
    alert("Gasto recorrente salvo!");
    popUpGastos.style.visibility = "hidden";
});


const messageIcon = document.getElementById('open-message-box');
const messageBox = document.getElementById('message-box');
const closeMessageBox = document.getElementById('close-message-box');

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
          backgroundColors = expenseNames.map(() => 'rgba(255, 0, 0, 0.9)'); // cor vermelha para todas as fatias
          borderColors = expenseNames.map(() => 'rgba(255, 0, 0, 0.9)'); // bordas também vermelhas
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

