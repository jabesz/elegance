function validateRegistrationForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!name || !email || !password) {
    alert('Todos os campos são obrigatórios!');
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return false;
  }

  if (password.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return false;
  }

  return true;
}

function validateLoginForm() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert('Todos os campos são obrigatórios!');
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return false;
  }

  return true;
}

export { validateRegistrationForm, validateLoginForm };