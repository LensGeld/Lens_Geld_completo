function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
  
    // Verifica se o CPF tem 11 dígitos ou se é uma sequência inválida
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    // Verificação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digitoVerificador1 = 11 - (soma % 11);
    if (digitoVerificador1 > 9) digitoVerificador1 = 0;
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
    }
  
    // Verificação do segundo dígito verificador
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