document.getElementById("theme-toggle").addEventListener("change", function() {
    document.body.classList.toggle("dark-theme", this.checked);
});

document.getElementById("font-selector").addEventListener("change", function() {
    document.body.style.fontFamily = this.value;
});

document.getElementById("highlight-color").addEventListener("input", function() {
    document.documentElement.style.setProperty("--highlight-color", this.value);
});

// Função para aplicar o tema baseado na preferência armazenada
function applyTheme() {
    const theme = localStorage.getItem("theme") || "light"; // Valor padrão é claro
    document.body.classList.toggle("dark-theme", theme === "dark");
}

// Salvar a preferência de tema no Local Storage e aplicar o tema
document.getElementById("theme-toggle").addEventListener("change", function() {
    const theme = this.checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    applyTheme();
});

// Aplicar tema automaticamente ao carregar a página
applyTheme();

