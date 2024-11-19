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
  const storage = firebase.storage();
  
  // Função para carregar os dados do usuário
  const usuariosRef = db.collection("Usuários");
  async function carregarDadosUsuario(userId) {
    try {
      // Referência ao documento do Firestore
      const usuarioRef = db.collection("Usuários").doc(userId);
      const docSnap = await usuarioRef.get();
  
      if (docSnap.exists) {
        const dados = docSnap.data();
  
        // Atualizar os campos do HTML com os dados do Firestore
        document.getElementById("user-name").textContent = `${dados.firstname} ${dados.lastname}`;
        document.getElementById("nome").value = `${dados.firstname} ${dados.lastname}`;
        document.getElementById("email").value = dados.email;
        document.getElementById("telefone").value = dados.telefone || '';
        document.getElementById("cpf").value = dados.cpf || '';
        document.getElementById("endereco").value = dados.endereco || '';
  
        // Carregar a foto do Firestore ou do localStorage, se houver
        const fotoPerfil = localStorage.getItem('fotoPerfil') || dados.fotoPerfil;
        if (fotoPerfil) {
          const fotoUsuario = document.querySelector('.profile-photo img');
          fotoUsuario.src = fotoPerfil;
        }
      } else {
        console.log("Nenhum documento encontrado para o usuário.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  }
  
  // Função para alternar entre modo edição e visualização
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
  
  // Função que lida com a mudança da foto de perfil
  document.getElementById('foto-perfil').addEventListener('change', function(event) {
    const arquivo = event.target.files[0];
    if (arquivo) {
      const reader = new FileReader();
      reader.onload = async function(e) {
        // Salva a URL da imagem no localStorage
        const fotoUrl = e.target.result;
        localStorage.setItem('fotoPerfil', fotoUrl);
  
        // Atualiza a imagem exibida na tela de configurações
        const fotoUsuario = document.querySelector('.profile-photo img');
        fotoUsuario.src = fotoUrl;
  
        // Salva a foto no Firebase Storage e atualiza a referência no Firestore
        try {
          const userId = "ID_DO_USUARIO"; // Substitua pelo ID do usuário
          const storageRef = storage.ref().child(`fotos_perfil/${userId}.jpg`);
          await storageRef.putString(fotoUrl.split(',')[1], 'base64', { contentType: 'image/jpeg' });
  
          const fotoUrlFirebase = await storageRef.getDownloadURL();
          await db.collection("usuarios").doc(userId).update({
            fotoPerfil: fotoUrlFirebase
          });
        } catch (error) {
          console.error("Erro ao salvar a foto no Firebase:", error);
        }
      };
      reader.readAsDataURL(arquivo);
    }
  });
  
  // Carregar a foto salva ao carregar a página
  window.onload = function() {
    const fotoSalva = localStorage.getItem('fotoPerfil');
    if (fotoSalva) {
      // Atualiza a imagem em todas as páginas que carregarem o localStorage
      const fotoUsuario = document.querySelector('.profile-photo img');
      if (fotoUsuario) {
        fotoUsuario.src = fotoSalva;
      }
    }
  };
  
// Função que prepara a exibição do botão "Mudar Foto"
function mostrarBotaoMudarFoto() {
    const changePhotoBtn = document.getElementById('change-photo-btn');
    if (changePhotoBtn) {
      changePhotoBtn.style.display = 'block'; // Exibe o botão de mudar foto
    }
  }
  
  // Carregar os dados do usuário ao carregar a página
  document.addEventListener("DOMContentLoaded", () => {
    const userId = "ID_DO_USUARIO"; // Substitua pelo ID do usuário
    carregarDadosUsuario(userId); // Carrega os dados do usuário
    mostrarBotaoMudarFoto(); // Exibe o botão de mudar foto logo após o carregamento
  });
  
  // Importando Firebase via módulos
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';