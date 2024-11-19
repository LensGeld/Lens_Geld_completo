// Verificar se há um resultado de perfil de investidor no localStorage
window.onload = function() {
    const resultadoPerfil = localStorage.getItem('perfilInvestidor');
    const resultadoDiv = document.getElementById('resultado-perfil');

    if (resultadoPerfil) {
        // Exibir o resultado do teste se encontrado
        resultadoDiv.innerHTML = `<p><strong>Seu perfil de investidor: ${resultadoPerfil}</strong></p>`;
    } else {
        // Caso não tenha feito o teste, exibir mensagem padrão
        resultadoDiv.innerHTML = '<p>Você ainda não fez o teste de perfil de investidor.</p>';
    }
};
