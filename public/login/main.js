// Importando Firebase via módulos
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Configurações do Firebase
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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função de login de usuário
document.getElementById('login_form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário

  const submitButton = document.getElementById('login_button');
  submitButton.disabled = true; // Desabilita o botão durante o processo

  // Coletando dados do formulário
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Realizando o login com Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuário logado com sucesso:', user);

    // Verificar se o e-mail foi verificado
    if (!user.emailVerified) {
      alert('Por favor, verifique seu e-mail antes de continuar.');
      submitButton.disabled = false; // Reabilitar o botão para tentar novamente
      return;
    }

    // Redirecionar para a tela home após login bem-sucedido
    window.location.href = '/workspaces/Lens_Geld_completo/public/Home/index.html'; // Caminho correto para a tela Home

  } catch (error) {
    console.error('Erro ao realizar login:', error.message);

    // Exibir mensagens de erro apropriadas
    if (error.code === 'auth/user-not-found') {
      alert('E-mail não cadastrado. Por favor, crie uma conta.');
    } else if (error.code === 'auth/wrong-password') {
      alert('Senha incorreta. Por favor, tente novamente.');
    } else {
      alert('Erro ao realizar o login. Por favor, tente novamente.');
    }

    submitButton.disabled = false; // Reabilitar o botão para tentar novamente
  }
});
