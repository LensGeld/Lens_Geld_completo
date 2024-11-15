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

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function toggleEdit() {
    const inputs = document.querySelectorAll('.user-info input');
    const isEditing = inputs[0].disabled; // Verifica o estado atual dos campos

    inputs.forEach(input => {
        input.disabled = !isEditing; // Alterna entre habilitar e desabilitar os campos
        if (!isEditing) {
            input.style.backgroundColor = "transparent"; // Remover fundo para campos desabilitados
        } else {
            input.style.backgroundColor = "#f9f9f9"; // Cor de fundo ao editar
        }
    });

    const button = document.querySelector('.edit-button');
    button.textContent = isEditing ? 'Salvar' : 'Editar'; // Altera o texto do botão
}

async function carregarDadosUsuario(userId) {
  try {
      // Referência ao documento do Firestore
      const usuarioRef = doc(db, "usuarios", userId); 
      const docSnap = await getDoc(usuarioRef);

      if (docSnap.exists()) {
          const dados = docSnap.data();

          // Atualizar os campos do HTML com os dados do Firestore
          document.getElementById("user-name").textContent = `${dados.firstname} ${dados.lastname}`;
          document.getElementById("nome").value = `${dados.firstname} ${dados.lastname}`;
          document.getElementById("email").value = dados.email;
          document.getElementById("telefone").value = dados.telefone || '';
          document.getElementById("cpf").value = dados.cpf || '';
          document.getElementById("endereco").value = dados.endereco || '';
      } else {
          console.log("Nenhum documento encontrado para o usuário.");
      }
  } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
  }
}

// Chamar a função quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  const userId = "ID_DO_USUARIO"; // Substitua pelo ID do usuário
  carregarDadosUsuario(userId);
});