const cadastroForm = document.getElementById('form');

cadastroForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const PrimeiroNome = document.getElementById('firstname').value;
  const UltimoNome = document.getElementById('lastname').value;
  const Email = document.getElementById('email').value;
  const CPF = document.getElementById('CPF').value;
  const Senha = document.getElementById('password').value;
  const ConfirmarSenha = document.getElementById('confirmpassword').value;

  // Cadastrar o usuário no Firebase Authentication
  auth.createUserWithEmailAndPassword(PriemiroNome, UltimoNome, Email, CPF, Senha, ConfirmarSenha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Usuário cadastrado com sucesso:', user);

      

      // Opcional: salvar informações adicionais no Firestore
      return db.collection('usuarios').doc(user.uid).set({
        cpf: cpf,
        email: user.email,
        firstname: firstname,
        lastname: lastname,
        criadoEm: new Date() // Data do cadastro
      });
    })
    .then(() => {
      console.log('Informações adicionais salvas no Firestore.');
    })
    .catch((error) => {
      console.error('Erro ao cadastrar usuário:', error);
    });
});