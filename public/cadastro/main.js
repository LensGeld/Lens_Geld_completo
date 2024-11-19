// Importando Firebase via módulos
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

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
const db = getFirestore(app);

// Função de cadastro de usuário
document.getElementById('cadastro-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Impede o envio padrão do formulário

  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.disabled = true; // Durante o processo de envio

  // Coletando dados do formulário
  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const cpf = document.getElementById('cpf').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validando se as senhas coincidem
  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return;
  }

  // Validando CPF
  if (!validarCPF(cpf)) {
    document.getElementById('cpf-error').style.display = 'inline'; // Mostra o erro
    return;
  } else {
    document.getElementById('cpf-error').style.display = 'none'; // Oculta o erro
  }

  try {
    // Verificando se o e-mail já está cadastrado
    const methods = await fetchSignInMethodsForEmail(auth, email);
    if (methods.length > 0) {
      alert('Este e-mail já está cadastrado. Por favor, tente outro e-mail.');
      submitButton.disabled = false; // Reabilitar o botão para tentar novamente
      return;
    }

    // Criando o usuário com Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuário cadastrado com sucesso:', user);

    // Enviar e-mail de verificação
    await sendEmailVerification(user);
    console.log('E-mail de verificação enviado para:', user.email);

    // Exibir a tela/modal informando que o e-mail foi enviado
    showVerificationModal();

    // Salvando informações adicionais no Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      cpf: cpf,
      email: email,
      firstname: firstname,
      lastname: lastname,
      criadoEm: new Date() // Data do cadastro
    });
    console.log('Informações adicionais salvas no Firestore.');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error.message);

    // Mensagem de erro para o e-mail já em uso
    if (error.code === 'auth/email-already-in-use') {
      alert('Este e-mail já está cadastrado. Por favor, tente outro e-mail.');
    } else {
      alert('Erro ao realizar o cadastro. Por favor, tente novamente.');
    }

    submitButton.disabled = false; // Reabilitar o botão para tentar novamente
  }
});

// Função para exibir o modal de verificação
function showVerificationModal() {
  const modal = document.getElementById('verificationModal');
  const content = document.getElementById('verificationContent');
  
  // Verifica se o modal e o conteúdo existem antes de alterar o conteúdo
  if (modal && content) {
    // Definir a mensagem que será exibida no modal
    content.innerHTML = "<p>O e-mail de verificação foi enviado para seu endereço de e-mail. Por favor, verifique sua caixa de entrada (e não se esqueça de checar a pasta de spam).</p><p>Aguarde enquanto verificamos seu e-mail...</p>";
    
    // Exibir o modal
    modal.style.display = 'block';  // Mostra o modal

    // Fechar o modal quando clicado no botão de fechamento (X)
    const closeButton = document.getElementById('closeModal');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Esconde o modal
      });
    }

    // Monitorar mudanças no estado de autenticação
    auth.onAuthStateChanged(user => {
      if (user && user.emailVerified) {
        // Redirecionar para a tela de login
        setTimeout(() => {
          alert('E-mail verificado com sucesso! Redirecionando para a tela de login...');
          window.location.href = '/workspaces/Lens_Geld_completo/public/Login/index.html'; // Caminho de redirecionamento
        }, 3000); // Aguardar 3 segundos antes de redirecionar
      }
    });
  }
}

// Função de validação de CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digitoVerificador1 = 11 - (soma % 11);
  if (digitoVerificador1 > 9) digitoVerificador1 = 0;
  if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let digitoVerificador2 = 11 - (soma % 11);
  if (digitoVerificador2 > 9) digitoVerificador2 = 0;
  if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

// Máscara para CPF
var cpfInput = document.getElementById('cpf');
var im = new Inputmask('999.999.999-99');
im.mask(cpfInput);
