// Detecta o botão de alternância do tema
const themeToggle = document.getElementById('theme-toggle');

// Função para alternar o modo claro/escuro
function toggleDarkMode() {
    if (themeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); // Salva a escolha do tema no localStorage
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light'); // Salva a escolha do tema no localStorage
    }
}

// Verifica a preferência do usuário e aplica o tema correspondente ao carregar a página
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true; // Marca o switcher se o tema salvo for escuro
    } else {
        document.body.classList.remove('dark-mode');
        if (themeToggle) themeToggle.checked = false; // Desmarca o switcher se o tema salvo for claro
    }
});

// Adiciona o evento de alternância ao switcher
if (themeToggle) {
    themeToggle.addEventListener('change', toggleDarkMode);
}
