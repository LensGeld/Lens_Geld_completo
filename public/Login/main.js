const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const Email = document.getElementById('login-email').value;
    const Senha = document.getElementById('login-password').value;

    // Fazer login com Firebase Authentication
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Login bem-sucedido:', user);
      })
      .catch((error) => {
        console.error('Erro no login:', error);
      });
  });