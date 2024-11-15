// Importar Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

console.log(auth); // Verifique se o auth está sendo inicializado corretamente


// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Obter instâncias do Firebase Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Função de cadastro de usuário
document.getElementById('cadastro-form').addEventListener('submit', async (e) => {
  e.preventDefault();// Impede o envio padrão do formulário

  // Desabilitar o botão de submit enquanto o processo de cadastro ocorre
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
  document.getElementById('cpf-error').style.display = 'inline';
  return;
} else {
  document.getElementById('cpf-error').style.display = 'none';
}

try {
  // Verificando se o e-mail já está cadastrado
  const methods = await fetchSignInMethodsForEmail(auth, email);
  if (methods.length > 0) {
    alert('Este e-mail já está cadastrado. Por favor, tente outro e-mail.');
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
  alert('Erro ao realizar o cadastro. Por favor, tente novamente.');
}
});

// Função para exibir a tela/modal de verificação
function showVerificationModal() {
  console.log('Modal de verificação sendo exibido...');
const modal = document.getElementById('verificationModal');
const modalContent = document.getElementById('verificationContent');
modalContent.innerHTML = 'Um e-mail de verificação foi enviado. Por favor, verifique sua caixa de entrada para confirmar seu e-mail.';
modal.style.display = 'block';

// Checando a verificação do e-mail a cada 2 segundos
const user = auth.currentUser;
const checkEmailVerified = setInterval(async () => {
  await user.reload();  // Atualiza os dados do usuário
  if (user.emailVerified) {
    clearInterval(checkEmailVerified);
    // Redireciona para a tela de login assim que o e-mail for verificado
    modal.style.display = 'none'; // Fechar o modal
    window.location.href = '/login'; // Altere para a URL de sua página de login
  }
}, 2000);
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
