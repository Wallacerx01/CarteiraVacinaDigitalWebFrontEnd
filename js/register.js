const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const messageDiv = document.getElementById("message");
const errorDiv = document.getElementById("error");

registerBtn.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  messageDiv.textContent = "";
  errorDiv.textContent = "";

  // Validação de campos
  if (!nome || !email || !senha) {
    errorDiv.textContent = "Preencha todos os campos.";
    return;
  }

  // Validação de senha mínima
  if (senha.length < 8) {
    errorDiv.textContent = "A senha precisa ter no mínimo 8 caracteres.";
    return;
  }

  try {
    const res = await fetch(
      "https://carteiravacinadigitalweb.onrender.com/admin/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      }
    );

    const data = await res.json();

    if(res.ok) {
      Toastify({
        text: "Administrador registrado com sucesso!",
        duration: 3000, // 3 segundos
        close: true, // botão de fechar
        gravity: "top", // posição vertical: top ou bottom
        position: "right", // posição horizontal: left, center, right
        backgroundColor: "linear-gradient(to right, #00b09b)", // cor personalizada
      }).showToast();
      console.log("teste bandido")
    }

    if (res.ok) {
      messageDiv.textContent = data.message;
      registerBtn.style.display = "none";
      loginBtn.style.display = "block"; // mostra o botão de login
    } else {
      errorDiv.textContent = data.error || "Erro ao registrar.";
    }
  } catch (err) {
    console.error(err);
    errorDiv.textContent = "Erro na conexão com o servidor.";
  }
});

loginBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
