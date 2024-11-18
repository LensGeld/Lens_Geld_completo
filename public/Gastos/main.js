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
let dataAtual = new Date(); // Data inicial para o calendário
const gastosMensais = {
  // Janeiro de 2023
'2023-01-01': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-01-02': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-01-03': [{ descricao: 'Almoço', valor: 18.00 }],
'2023-01-04': [{ descricao: 'Lazer', valor: 35.00 }],
'2023-01-05': [],
'2023-01-06': [{ descricao: 'Cinema', valor: 40.00 }],
'2023-01-07': [{ descricao: 'Combustível', valor: 30.00 }],
'2023-01-08': [],
'2023-01-09': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-01-10': [{ descricao: 'Jantar', valor: 25.00 }, { descricao: 'Lazer', valor: 20.00 }],
'2023-01-11': [{ descricao: 'Almoço', valor: 28.00 }],
'2023-01-12': [{ descricao: 'Lazer', valor: 22.00 }],
'2023-01-13': [],
'2023-01-14': [{ descricao: 'Cinema', valor: 35.00 }],
'2023-01-15': [{ descricao: 'Combustível', valor: 30.00 }],
'2023-01-16': [{ descricao: 'Supermercado', valor: 40.00 }],
'2023-01-17': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-01-18': [{ descricao: 'Lazer', valor: 15.00 }, { descricao: 'Almoço', valor: 12.00 }],
'2023-01-19': [{ descricao: 'Almoço', valor: 25.00 }],
'2023-01-20': [{ descricao: 'Lazer', valor: 22.00 }],
'2023-01-21': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-01-22': [],
'2023-01-23': [{ descricao: 'Supermercado', valor: 35.00 }],
'2023-01-24': [{ descricao: 'Cinema', valor: 35.00 }],
'2023-01-25': [{ descricao: 'Combustível', valor: 30.00 }],
'2023-01-26': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-01-27': [{ descricao: 'Lazer', valor: 10.00 }, { descricao: 'Almoço', valor: 12.00 }],
'2023-01-28': [{ descricao: 'Almoço', valor: 22.00 }],
'2023-01-29': [{ descricao: 'Lazer', valor: 17.00 }],
'2023-01-30': [{ descricao: 'Supermercado', valor: 25.00 }],
'2023-01-31': [{ descricao: 'Combustível', valor: 30.00 }],

  // Fevereiro de 2023
'2023-02-01': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-02-02': [{ descricao: 'Transporte', valor: 30.00 }],
'2023-02-03': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-02-04': [{ descricao: 'Lazer', valor: 45.00 }],
'2023-02-05': [],
'2023-02-06': [{ descricao: 'Cinema', valor: 40.00 }],
'2023-02-07': [{ descricao: 'Combustível', valor: 30.00 }],
'2023-02-08': [{ descricao: 'Supermercado', valor: 55.00 }],
'2023-02-09': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-02-10': [{ descricao: 'Lazer', valor: 35.00 }],
'2023-02-11': [{ descricao: 'Almoço', valor: 28.00 }],
'2023-02-12': [],
'2023-02-13': [{ descricao: 'Cinema', valor: 45.00 }],
'2023-02-14': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-02-15': [{ descricao: 'Combustível', valor: 40.00 }],
'2023-02-16': [{ descricao: 'Almoço', valor: 22.00 }],
'2023-02-17': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-02-18': [{ descricao: 'Jantar', valor: 35.00 }],
'2023-02-19': [{ descricao: 'Transporte', valor: 25.00 }],
'2023-02-20': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-02-21': [{ descricao: 'Lazer', valor: 15.00 }],
'2023-02-22': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-02-23': [{ descricao: 'Cinema', valor: 40.00 }],
'2023-02-24': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-02-25': [{ descricao: 'Combustível', valor: 35.00 }],
'2023-02-26': [{ descricao: 'Lazer', valor: 25.00 }],
'2023-02-27': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-02-28': [{ descricao: 'Almoço', valor: 32.00 }],

  // Março de 2023
'2023-03-01': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-03-02': [{ descricao: 'Transporte', valor: 25.00 }],
'2023-03-03': [{ descricao: 'Almoço', valor: 30.00 }],
'2023-03-04': [{ descricao: 'Lazer', valor: 50.00 }],
'2023-03-05': [{ descricao: 'Cinema', valor: 35.00 }],
'2023-03-06': [{ descricao: 'Supermercado', valor: 80.00 }],
'2023-03-07': [{ descricao: 'Combustível', valor: 45.00 }],
'2023-03-08': [{ descricao: 'Jantar', valor: 40.00 }],
'2023-03-09': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-03-10': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-03-11': [{ descricao: 'Almoço', valor: 25.00 }],
'2023-03-12': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-03-13': [{ descricao: 'Supermercado', valor: 55.00 }],
'2023-03-14': [{ descricao: 'Cinema', valor: 40.00 }],
'2023-03-15': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-03-16': [{ descricao: 'Supermercado', valor: 70.00 }],
'2023-03-17': [{ descricao: 'Lazer', valor: 25.00 }],
'2023-03-18': [{ descricao: 'Combustível', valor: 35.00 }],
'2023-03-19': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-03-20': [{ descricao: 'Jantar', valor: 35.00 }],
'2023-03-21': [{ descricao: 'Lazer', valor: 40.00 }],
'2023-03-22': [{ descricao: 'Cinema', valor: 30.00 }],
'2023-03-23': [{ descricao: 'Almoço', valor: 28.00 }],
'2023-03-24': [{ descricao: 'Transporte', valor: 25.00 }],
'2023-03-25': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-03-26': [{ descricao: 'Combustível', valor: 35.00 }],
'2023-03-27': [{ descricao: 'Almoço', valor: 30.00 }],
'2023-03-28': [{ descricao: 'Lazer', valor: 40.00 }],
'2023-03-29': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-03-30': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-03-31': [{ descricao: 'Cinema', valor: 30.00 }],

  // Abril de 2023
'2023-04-01': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-04-02': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-04-03': [{ descricao: 'Almoço', valor: 30.00 }],
'2023-04-04': [{ descricao: 'Lazer', valor: 40.00 }],
'2023-04-05': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-04-06': [{ descricao: 'Combustível', valor: 35.00 }],
'2023-04-07': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-04-08': [{ descricao: 'Cinema', valor: 20.00 }],
'2023-04-09': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-04-10': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-04-11': [{ descricao: 'Transporte', valor: 15.00 }],
'2023-04-12': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-04-13': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-04-14': [{ descricao: 'Combustível', valor: 25.00 }],
'2023-04-15': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-04-16': [{ descricao: 'Supermercado', valor: 40.00 }],
'2023-04-17': [{ descricao: 'Almoço', valor: 35.00 }],
'2023-04-18': [{ descricao: 'Cinema', valor: 25.00 }],
'2023-04-19': [{ descricao: 'Lazer', valor: 20.00 }],
'2023-04-20': [{ descricao: 'Supermercado', valor: 30.00 }],
'2023-04-21': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-04-22': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-04-23': [{ descricao: 'Combustível', valor: 20.00 }],
'2023-04-24': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-04-25': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-04-26': [{ descricao: 'Lazer', valor: 25.00 }],
'2023-04-27': [{ descricao: 'Cinema', valor: 15.00 }],
'2023-04-28': [{ descricao: 'Supermercado', valor: 30.00 }],
'2023-04-29': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-04-30': [{ descricao: 'Jantar', valor: 20.00 }],

  // Maio de 2023
'2023-05-01': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-05-02': [{ descricao: 'Transporte', valor: 15.00 }],
'2023-05-03': [{ descricao: 'Almoço', valor: 25.00 }],
'2023-05-04': [{ descricao: 'Lazer', valor: 20.00 }],
'2023-05-05': [{ descricao: 'Combustível', valor: 30.00 }],
'2023-05-06': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-05-07': [{ descricao: 'Cinema', valor: 20.00 }],
'2023-05-08': [{ descricao: 'Supermercado', valor: 20.00 }],
'2023-05-09': [{ descricao: 'Almoço', valor: 10.00 }],
'2023-05-10': [{ descricao: 'Lazer', valor: 15.00 }],
'2023-05-11': [{ descricao: 'Transporte', valor: 10.00 }],
'2023-05-12': [{ descricao: 'Combustível', valor: 18.00 }],
'2023-05-13': [{ descricao: 'Supermercado', valor: 20.00 }],
'2023-05-14': [{ descricao: 'Jantar', valor: 15.00 }],
'2023-05-15': [{ descricao: 'Lazer', valor: 12.00 }],
'2023-05-16': [{ descricao: 'Almoço', valor: 8.00 }],
'2023-05-17': [{ descricao: 'Cinema', valor: 10.00 }],
'2023-05-18': [{ descricao: 'Supermercado', valor: 10.00 }],
'2023-05-19': [{ descricao: 'Combustível', valor: 5.00 }],
'2023-05-20': [{ descricao: 'Transporte', valor: 5.00 }],
'2023-05-21': [{ descricao: 'Jantar', valor: 10.00 }],
'2023-05-22': [{ descricao: 'Supermercado', valor: 8.00 }],
'2023-05-23': [{ descricao: 'Almoço', valor: 7.00 }],
'2023-05-24': [{ descricao: 'Lazer', valor: 6.00 }],
'2023-05-25': [{ descricao: 'Transporte', valor: 8.00 }],
'2023-05-26': [{ descricao: 'Combustível', valor: 7.00 }],
'2023-05-27': [{ descricao: 'Jantar', valor: 5.00 }],
'2023-05-28': [{ descricao: 'Supermercado', valor: 15.00 }],
'2023-05-29': [{ descricao: 'Almoço', valor: 6.00 }],
'2023-05-30': [{ descricao: 'Cinema', valor: 4.00 }],
'2023-05-31': [{ descricao: 'Lazer', valor: 10.00 }],

  // Junho de 2023
'2023-06-01': [{ descricao: 'Supermercado', valor: 70.00 }],
'2023-06-02': [{ descricao: 'Transporte', valor: 30.00 }],
'2023-06-03': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-06-04': [{ descricao: 'Combustível', valor: 40.00 }],
'2023-06-05': [{ descricao: 'Lazer', valor: 35.00 }],
'2023-06-06': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-06-07': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-06-08': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-06-09': [{ descricao: 'Cinema', valor: 45.00 }],
'2023-06-10': [{ descricao: 'Supermercado', valor: 80.00 }],
'2023-06-11': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-06-12': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-06-13': [{ descricao: 'Jantar', valor: 40.00 }],
'2023-06-14': [{ descricao: 'Almoço', valor: 10.00 }],
'2023-06-15': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-06-16': [{ descricao: 'Combustível', valor: 25.00 }],
'2023-06-17': [{ descricao: 'Lazer', valor: 15.00 }],
'2023-06-18': [{ descricao: 'Almoço', valor: 18.00 }],
'2023-06-19': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-06-20': [{ descricao: 'Cinema', valor: 30.00 }],
'2023-06-21': [{ descricao: 'Combustível', valor: 20.00 }],
'2023-06-22': [{ descricao: 'Jantar', valor: 28.00 }],
'2023-06-23': [{ descricao: 'Supermercado', valor: 55.00 }],
'2023-06-24': [{ descricao: 'Almoço', valor: 12.00 }],
'2023-06-25': [{ descricao: 'Lazer', valor: 40.00 }],
'2023-06-26': [{ descricao: 'Transporte', valor: 15.00 }],
'2023-06-27': [{ descricao: 'Supermercado', valor: 90.00 }],
'2023-06-28': [{ descricao: 'Almoço', valor: 13.00 }],
'2023-06-29': [{ descricao: 'Cinema', valor: 25.00 }],
'2023-06-30': [{ descricao: 'Jantar', valor: 40.00 }],

  // Julho de 2023
'2023-07-01': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-07-02': [{ descricao: 'Transporte', valor: 25.00 }],
'2023-07-03': [{ descricao: 'Almoço', valor: 18.00 }],
'2023-07-04': [{ descricao: 'Combustível', valor: 30.00 }],
'2023-07-05': [{ descricao: 'Lazer', valor: 45.00 }],
'2023-07-06': [{ descricao: 'Jantar', valor: 35.00 }],
'2023-07-07': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-07-08': [{ descricao: 'Almoço', valor: 12.00 }],
'2023-07-09': [{ descricao: 'Cinema', valor: 40.00 }],
'2023-07-10': [{ descricao: 'Transporte', valor: 22.00 }],
'2023-07-11': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-07-12': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-07-13': [{ descricao: 'Almoço', valor: 25.00 }],
'2023-07-14': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-07-15': [{ descricao: 'Combustível', valor: 20.00 }],
'2023-07-16': [{ descricao: 'Jantar', valor: 38.00 }],
'2023-07-17': [{ descricao: 'Lazer', valor: 28.00 }],
'2023-07-18': [{ descricao: 'Supermercado', valor: 65.00 }],
'2023-07-19': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-07-20': [{ descricao: 'Cinema', valor: 25.00 }],
'2023-07-21': [{ descricao: 'Supermercado', valor: 55.00 }],
'2023-07-22': [{ descricao: 'Transporte', valor: 18.00 }],
'2023-07-23': [{ descricao: 'Lazer', valor: 33.00 }],
'2023-07-24': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-07-25': [{ descricao: 'Almoço', valor: 12.00 }],
'2023-07-26': [{ descricao: 'Supermercado', valor: 70.00 }],
'2023-07-27': [{ descricao: 'Combustível', valor: 18.00 }],
'2023-07-28': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-07-29': [{ descricao: 'Cinema', valor: 22.00 }],
'2023-07-30': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-07-31': [{ descricao: 'Lazer', valor: 30.00 }],

  // Agosto de 2023
'2023-08-01': [{ descricao: 'Supermercado', valor: 55.00 }],
'2023-08-02': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-08-03': [{ descricao: 'Transporte', valor: 15.00 }],
'2023-08-04': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-08-05': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-08-06': [{ descricao: 'Combustível', valor: 35.00 }],
'2023-08-07': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-08-08': [{ descricao: 'Almoço', valor: 18.00 }],
'2023-08-09': [{ descricao: 'Transporte', valor: 22.00 }],
'2023-08-10': [{ descricao: 'Cinema', valor: 30.00 }],
'2023-08-11': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-08-12': [{ descricao: 'Lazer', valor: 28.00 }],
'2023-08-13': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-08-14': [{ descricao: 'Combustível', valor: 20.00 }],
'2023-08-15': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-08-16': [{ descricao: 'Almoço', valor: 12.00 }],
'2023-08-17': [{ descricao: 'Cinema', valor: 28.00 }],
'2023-08-18': [{ descricao: 'Transporte', valor: 15.00 }],
'2023-08-19': [{ descricao: 'Supermercado', valor: 35.00 }],
'2023-08-20': [{ descricao: 'Lazer', valor: 25.00 }],
'2023-08-21': [{ descricao: 'Jantar', valor: 22.00 }],
'2023-08-22': [{ descricao: 'Supermercado', valor: 40.00 }],
'2023-08-23': [{ descricao: 'Combustível', valor: 20.00 }],
'2023-08-24': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-08-25': [{ descricao: 'Lazer', valor: 20.00 }],
'2023-08-26': [{ descricao: 'Supermercado', valor: 38.00 }],
'2023-08-27': [{ descricao: 'Transporte', valor: 17.00 }],
'2023-08-28': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-08-29': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-08-30': [{ descricao: 'Cinema', valor: 24.00 }],
'2023-08-31': [{ descricao: 'Supermercado', valor: 20.00 }],

  // Setembro de 2023
'2023-09-01': [{ descricao: 'Supermercado', valor: 65.00 }],
'2023-09-02': [{ descricao: 'Transporte', valor: 25.00 }],
'2023-09-03': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-09-04': [{ descricao: 'Cinema', valor: 40.00 }],
'2023-09-05': [{ descricao: 'Almoço', valor: 18.00 }],
'2023-09-06': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-09-07': [{ descricao: 'Combustível', valor: 20.00 }],
'2023-09-08': [{ descricao: 'Lazer', valor: 22.00 }],
'2023-09-09': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-09-10': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-09-11': [{ descricao: 'Cinema', valor: 35.00 }],
'2023-09-12': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-09-13': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-09-14': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-09-15': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-09-16': [{ descricao: 'Combustível', valor: 18.00 }],
'2023-09-17': [{ descricao: 'Supermercado', valor: 40.00 }],
'2023-09-18': [{ descricao: 'Almoço', valor: 10.00 }],
'2023-09-19': [{ descricao: 'Jantar', valor: 22.00 }],
'2023-09-20': [{ descricao: 'Transporte', valor: 30.00 }],
'2023-09-21': [{ descricao: 'Cinema', valor: 30.00 }],
'2023-09-22': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-09-23': [{ descricao: 'Lazer', valor: 25.00 }],
'2023-09-24': [{ descricao: 'Jantar', valor: 20.00 }],
'2023-09-25': [{ descricao: 'Combustível', valor: 25.00 }],
'2023-09-26': [{ descricao: 'Supermercado', valor: 35.00 }],
'2023-09-27': [{ descricao: 'Almoço', valor: 12.00 }],
'2023-09-28': [{ descricao: 'Transporte', valor: 15.00 }],
'2023-09-29': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-09-30': [{ descricao: 'Jantar', valor: 23.00 }],

  // Outubro de 2023
'2023-10-01': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-10-02': [{ descricao: 'Transporte', valor: 30.00 }],
'2023-10-03': [{ descricao: 'Jantar', valor: 40.00 }],
'2023-10-04': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-10-05': [{ descricao: 'Academia', valor: 35.00 }],
'2023-10-06': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-10-07': [{ descricao: 'Combustível', valor: 25.00 }],
'2023-10-08': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-10-09': [{ descricao: 'Supermercado', valor: 70.00 }],
'2023-10-10': [{ descricao: 'Cinema', valor: 40.00 }],
'2023-10-11': [{ descricao: 'Almoço', valor: 18.00 }],
'2023-10-12': [{ descricao: 'Conta de Luz', valor: 100.00 }],
'2023-10-13': [{ descricao: 'Supermercado', valor: 55.00 }],
'2023-10-14': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-10-15': [{ descricao: 'Aluguel', valor: 250.00 }],
'2023-10-16': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-10-17': [{ descricao: 'Supermercado', valor: 40.00 }],
'2023-10-18': [{ descricao: 'Academia', valor: 35.00 }],
'2023-10-19': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-10-20': [{ descricao: 'Conta de Água', valor: 40.00 }],
'2023-10-21': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-10-22': [{ descricao: 'Combustível', valor: 25.00 }],
'2023-10-23': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-10-24': [{ descricao: 'Cinema', valor: 20.00 }],
'2023-10-25': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-10-26': [{ descricao: 'Supermercado', valor: 40.00 }],
'2023-10-27': [{ descricao: 'Transporte', valor: 18.00 }],
'2023-10-28': [{ descricao: 'Lazer', valor: 35.00 }],
'2023-10-29': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-10-30': [{ descricao: 'Academia', valor: 30.00 }],
'2023-10-31': [{ descricao: 'Jantar', valor: 25.00 }],

  // Novembro de 2023
'2023-11-01': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-11-02': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-11-03': [{ descricao: 'Jantar', valor: 35.00 }],
'2023-11-04': [{ descricao: 'Almoço', valor: 18.00 }],
'2023-11-05': [{ descricao: 'Academia', valor: 45.00 }],
'2023-11-06': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-11-07': [{ descricao: 'Combustível', valor: 25.00 }],
'2023-11-08': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-11-09': [{ descricao: 'Supermercado', valor: 70.00 }],
'2023-11-10': [{ descricao: 'Cinema', valor: 40.00 }],
'2023-11-11': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-11-12': [{ descricao: 'Conta de Luz', valor: 120.00 }],
'2023-11-13': [{ descricao: 'Supermercado', valor: 55.00 }],
'2023-11-14': [{ descricao: 'Transporte', valor: 22.00 }],
'2023-11-15': [{ descricao: 'Aluguel', valor: 200.00 }],
'2023-11-16': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-11-17': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-11-18': [{ descricao: 'Academia', valor: 30.00 }],
'2023-11-19': [{ descricao: 'Lazer', valor: 40.00 }],
'2023-11-20': [{ descricao: 'Conta de Água', valor: 100.00 }],
'2023-11-21': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-11-22': [{ descricao: 'Combustível', valor: 25.00 }],
'2023-11-23': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-11-24': [{ descricao: 'Cinema', valor: 20.00 }],
'2023-11-25': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-11-26': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-11-27': [{ descricao: 'Transporte', valor: 25.00 }],
'2023-11-28': [{ descricao: 'Lazer', valor: 35.00 }],
'2023-11-29': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-11-30': [{ descricao: 'Supermercado', valor: 50.00 }],

  
// Dezembro de 2023
'2023-12-01': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-12-02': [{ descricao: 'Transporte', valor: 25.00 }],
'2023-12-03': [{ descricao: 'Cinema', valor: 30.00 }],
'2023-12-04': [{ descricao: 'Jantar', valor: 25.00 }],
'2023-12-05': [{ descricao: 'Academia', valor: 45.00 }],
'2023-12-06': [{ descricao: 'Supermercado', valor: 40.00 }],
'2023-12-07': [{ descricao: 'Lazer', valor: 35.00 }],
'2023-12-08': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-12-09': [{ descricao: 'Transporte', valor: 22.00 }],
'2023-12-10': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-12-11': [{ descricao: 'Conta de Luz', valor: 120.00 }],
'2023-12-12': [{ descricao: 'Almoço', valor: 18.00 }],
'2023-12-13': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-12-14': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-12-15': [{ descricao: 'Aluguel', valor: 200.00 }],
'2023-12-16': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-12-17': [{ descricao: 'Supermercado', valor: 50.00 }],
'2023-12-18': [{ descricao: 'Lazer', valor: 30.00 }],
'2023-12-19': [{ descricao: 'Conta de Água', valor: 100.00 }],
'2023-12-20': [{ descricao: 'Almoço', valor: 15.00 }],
'2023-12-21': [{ descricao: 'Cinema', valor: 20.00 }],
'2023-12-22': [{ descricao: 'Supermercado', valor: 40.00 }],
'2023-12-23': [{ descricao: 'Combustível', valor: 25.00 }],
'2023-12-24': [{ descricao: 'Lazer', valor: 35.00 }],
'2023-12-25': [{ descricao: 'Jantar', valor: 30.00 }],
'2023-12-26': [{ descricao: 'Supermercado', valor: 45.00 }],
'2023-12-27': [{ descricao: 'Transporte', valor: 20.00 }],
'2023-12-28': [{ descricao: 'Almoço', valor: 20.00 }],
'2023-12-29': [{ descricao: 'Academia', valor: 45.00 }],
'2023-12-30': [{ descricao: 'Supermercado', valor: 60.00 }],
'2023-12-31': [{ descricao: 'Lazer', valor: 30.00 }],

// Novembro de 2024
  '2024-11-01': [{ descricao: 'Supermercado', valor: 50 }],
  '2024-11-02': [{ descricao: 'Transporte', valor: 20 }, { descricao: 'Café', valor: 10 }],
  '2024-11-03': [{ descricao: 'Aluguel', valor: 60 }],
  '2024-11-04': [{ descricao: 'Lazer', valor: 15 }],
  '2024-11-05': [{ descricao: 'Combustível', valor: 35 }],
  '2024-11-06': [{ descricao: 'Supermercado', valor: 80 }],
  '2024-11-07': [{ descricao: 'Transporte', valor: 22 }],
  '2024-11-08': [{ descricao: 'Jantar', valor: 25 }],
  '2024-11-09': [{ descricao: 'Cinema', valor: 30 }],
  '2024-11-10': [{ descricao: 'Supermercado', valor: 40 }],
  '2024-11-11': [{ descricao: 'Aluguel', valor: 100 }],
  '2024-11-12': [{ descricao: 'Transporte', valor: 20 }, { descricao: 'Café', valor: 15 }],
  '2024-11-13': [{ descricao: 'Lazer', valor: 50 }],
 			'2024-11-14': [{ descricao: 'Supermercado', valor: 70 }],
  '2024-11-15': [{ descricao: 'Combustível', valor: 30 }],
  '2024-11-16': [{ descricao: 'Almoço', valor: 40 }],
  '2024-11-17': [{ descricao: 'Transporte', valor: 25 }],
  '2024-11-18': [{ descricao: 'Jantar', valor: 35 }],
  '2024-11-19': [{ descricao: 'Supermercado', valor: 50 }],
  '2024-11-20': [{ descricao: 'Café', valor: 18 }],
  '2024-11-21': [{ descricao: 'Aluguel', valor: 80 }],
  '2024-11-22': [{ descricao: 'Transporte', valor: 22 }],
  '2024-11-23': [{ descricao: 'Supermercado', valor: 40 }],
  '2024-11-24': [{ descricao: 'Cinema', valor: 20 }],
  '2024-11-25': [{ descricao: 'Jantar', valor: 30 }],
  '2024-11-26': [{ descricao: 'Supermercado', valor: 70 }],
  '2024-11-27': [{ descricao: 'Combustível', valor: 28 }],
					'2024-11-28': [{ descricao: 'Almoço', valor: 30 }],
  '2024-11-29': [{ descricao: 'Transporte', valor: 20 }],
  '2024-11-30': [{ descricao: 'Supermercado', valor: 60 }],

  // Dezembro de 2024
  '2024-12-01': [{ descricao: 'Supermercado', valor: 50 }, { descricao: 'Transporte', valor: 20 }],
  '2024-12-02': [{ descricao: 'Café', valor: 15 }],
  '2024-12-03': [{ descricao: 'Aluguel', valor: 100 }],
  '2024-12-04': [{ descricao: 'Lazer', valor: 40 }],
  '2024-12-05': [{ descricao: 'Combustível', valor: 35 }, { descricao: 'Almoço', valor: 20 }],
  '2024-12-06': [{ descricao: 'Supermercado', valor: 60 }],
  '2024-12-07': [{ descricao: 'Transporte', valor: 30 }],
  '2024-12-08': [{ descricao: 'Jantar', valor: 45 }],
  '2024-12-09': [{ descricao: 'Cinema', valor: 35 }],
  '2024-12-10': [{ descricao: 'Supermercado', valor: 75 }],
  '2024-12-11': [{ descricao: 'Aluguel', valor: 90 }],
};

const coresDespesas = {
  'Supermercado': '#4a6a8c',  // Exemplo de cor
  'Transporte': '#68879b',
  'Aluguel': '#25384b',
  'Lazer': '#5c7589',
  'Combustível': '#1e2d42',
  'Café': '#3e5366',
  'Jantar': '#1c283e',
  'Cinema': '#68879b',
  'Almoço': '#4a6a8c',
};

// Carregar o calendário
function carregarCalendario() {
  const calendario = document.getElementById('calendario');
  const mesAno = document.getElementById('mes-ano');
  calendario.innerHTML = '';

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  mesAno.textContent = `${new Date(ano, mes).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}`;

  const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  // Criar a linha de dias da semana
  diasSemana.forEach(dia => {
    const diaSemana = document.createElement('div');
    diaSemana.textContent = dia;
    diaSemana.classList.add('dia-semana');
    calendario.appendChild(diaSemana);
  });

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  // Obter o dia atual
  const hoje = new Date();
  const diaAtual = hoje.getDate();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  // Adicionar espaços vazios antes do primeiro dia do mês
  for (let i = 0; i < primeiroDia; i++) {
    const espacoVazio = document.createElement('div');
    espacoVazio.classList.add('espaco-vazio');
    calendario.appendChild(espacoVazio);
  }

  // Preencher os dias do mês
  for (let dia = 1; dia <= diasNoMes; dia++) {
    const botaoDia = document.createElement('button');
    botaoDia.classList.add('dia');
    botaoDia.textContent = dia;
    const dataCompleta = `${ano}-${(mes + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    // Verificar se há gastos para o dia
    if (!gastosMensais[dataCompleta]) {
      botaoDia.classList.add('sem-gastos');
    }

    // Marcar o dia atual
    if (dia === diaAtual && mes === mesAtual && ano === anoAtual) {
      botaoDia.classList.add('dia-atual');
    }

    botaoDia.onclick = () => verGastosDiarios(dataCompleta);
    calendario.appendChild(botaoDia);
  }

  atualizarGrafico();
}




// Alterar mês (navegação)
function alterarMes(direcao) {
  const calendarioContainer = document.querySelector('.calendario-container');

  // Determinar a animação de saída com base na direção
  if (direcao === -1) {
    // Mês Anterior (animação da direita para a esquerda)
    calendarioContainer.classList.add('slide-out-right');
  } else if (direcao === 1) {
    // Próximo Mês (animação da esquerda para a direita)
    calendarioContainer.classList.add('slide-out-left');
  }

  // Esperar a animação de saída terminar antes de atualizar o calendário
  setTimeout(() => {
    dataAtual.setMonth(dataAtual.getMonth() + direcao);

    // Atualizar o calendário
    carregarCalendario();

    // Remover animações de saída
    calendarioContainer.classList.remove('slide-out-right', 'slide-out-left');

    // Aplicar animação de entrada com base na direção
    if (direcao === -1) {
      calendarioContainer.classList.add('slide-in-left');
    } else if (direcao === 1) {
      calendarioContainer.classList.add('slide-in-right');
    }

    // Remover animações de entrada após a conclusão
    setTimeout(() => {
      calendarioContainer.classList.remove('slide-in-left', 'slide-in-right');
    }, 500);
  }, 500); // Tempo da animação de saída
}

// Ver gastos diários
function verGastosDiarios(data) {
  const modal = document.getElementById('modal-gastos-diarios');
  const dataGasto = document.getElementById('data-gasto');
  const listaGastosDiarios = document.getElementById('lista-gastos-diarios');

  listaGastosDiarios.innerHTML = '';
  const dataFormatada = data.split('-').reverse().join('/');
  dataGasto.textContent = dataFormatada;

  if (gastosMensais[data]) {
    let total = 0;
    gastosMensais[data].forEach(gasto => {
      const item = document.createElement('li');
      item.textContent = `${gasto.descricao} - R$${gasto.valor.toFixed(2)}`;
      listaGastosDiarios.appendChild(item);
      total += gasto.valor;
    });

    const totalItem = document.createElement('li');
    totalItem.textContent = `Total: R$${total.toFixed(2)}`;
    totalItem.style.fontWeight = 'bold';
    listaGastosDiarios.appendChild(totalItem);
  } else {
    const item = document.createElement('li');
    item.textContent = 'Nenhum gasto registrado para este dia.';
    listaGastosDiarios.appendChild(item);
  }

  modal.style.display = 'flex';
}

// Função para fechar o modal
function fecharModal() {
  var modal = document.getElementById("modal-gastos-diarios");
  modal.style.display = "none";
}

// Função para abrir o modal (caso você precise em algum momento)
function abrirModal() {
  var modal = document.getElementById("modal-gastos-diarios");
  modal.style.display = "block";
}

// Fechar o modal se o usuário clicar fora dele
window.onclick = function(event) {
  var modal = document.getElementById("modal-gastos-diarios");
  if (event.target == modal) {
    fecharModal();
  }
}


// Calcular maiores gastos do mês
function calcularMaioresGastos() {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  const gastosDoMes = Object.keys(gastosMensais)
    .filter(data => data.startsWith(`${ano}-${(mes + 1).toString().padStart(2, '0')}`))
    .map(data => gastosMensais[data])
    .flat();

  const gastosAgrupados = gastosDoMes.reduce((acc, gasto) => {
    acc[gasto.descricao] = (acc[gasto.descricao] || 0) + gasto.valor;
    return acc;
  }, {});

  return Object.entries(gastosAgrupados).sort((a, b) => b[1] - a[1]).slice(0, 5);
}

// Atualizar gráfico
function atualizarGrafico() {
  const maioresGastos = calcularMaioresGastos();
  
  // Verificar se há gastos no mês
  if (maioresGastos.length === 0) {
    const graficoContainer = document.getElementById('grafico-container');
    graficoContainer.style.display = 'none';
    return;
  }

  // Mostrar o gráfico se houver gastos
  const graficoContainer = document.getElementById('grafico-container');
  graficoContainer.style.display = 'block';

  const labels = maioresGastos.map(item => item[0]);
  const valores = maioresGastos.map(item => item[1]);

  // Definindo as cores para cada categoria
  const cores = labels.map(categoria => coresDespesas[categoria] || '#007bff'); // Caso a categoria não tenha cor definida, será azul

  const ctx = document.getElementById('grafico-maiores-gastos').getContext('2d');
  if (window.chart instanceof Chart) {
    window.chart.destroy();
  }

  window.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Maiores Gastos do Mês',
        data: valores,
        backgroundColor: cores,  // Aplicar as cores de cada categoria
        borderColor: '#0056b3',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Navegação com teclas (setas)
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    alterarMes(-1);
  } else if (event.key === 'ArrowRight') {
    alterarMes(1);
  }
});

// Iniciar o calendário ao carregar a página
document.addEventListener('DOMContentLoaded', carregarCalendario);
