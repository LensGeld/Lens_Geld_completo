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
       document.getElementById("expenses").innerText = expen;
       

    if (productName && !isNaN(productPrice) && productPrice > 0) {
        expenses.push({ name: productName, price: productPrice });
        updateTable();
        updateChart();
        updateh1();

       
        /*
            let h1Element = document.getElementById("expenses");
            h1Element.innerText = "-R$" + expenseValues;
            let inputValue = parseFloat(document.getElementById("product-price").value);
            let newTotal = currentTotal + inputValue; 
            document.getElementById("expenses").innerText = "-R$" + newTotal; */
        
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
    const expenseValues = expenses.map(expense => expense.price);
    const remainingMoney = totalMoney - expenseValues.reduce((a, b) => a + b, 0);

    let s1 = parseFloat(document.getElementById("expenses").innerText);
    let lucro = totalMoney - s1;
       document.getElementById("lucro").innerText = lucro;

    
    if (isNaN(totalMoney) || totalMoney <= 0) {
        alert("Por favor, insira um valor total de dinheiro válido.");
        return;
    }

    const chartData = {
        labels: [...expenseNames, "Restante"],
        datasets: [{
            label: '',
            data: [...expenseValues, remainingMoney],
            backgroundColor: [...expenseNames.map(() => 'rgba(255, 100, 100, 0.9)'), 'rgba(100, 255, 126, 0.9)'],
            borderColor: [...expenseNames.map(() => 'rgba(255, 100, 100, 0.9)'), 'rgba(100, 255, 126, 0.9)'],
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
                    text: 'Distribuição dos Gastos no Mês'
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