const VALOR_BASE = 100.0;
const DESCONTO_ESTUDANTE = 0.20;

const form = document.getElementById("inscricao-form");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const estudanteInput = document.getElementById("estudante");
const mensagemEl = document.getElementById("mensagem");
const totalInscritosEl = document.getElementById("total-inscritos");
const totalArrecadadoEl = document.getElementById("total-arrecadado");
const listaInscritosEl = document.getElementById("lista-inscritos");

const inscritos = [];

function calcularValorInscricao(isEstudante) {

  if (isEstudante) {
    return VALOR_BASE * (1 + DESCONTO_ESTUDANTE);
  }
  return VALOR_BASE;
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function atualizarInterface() {
  totalInscritosEl.textContent = inscritos.length;

  listaInscritosEl.innerHTML = "";
  inscritos.forEach((item) => {
    const li = document.createElement("li");
    const tagEstudante = item.estudante ? "Estudante" : "Padrão";
    li.textContent = `${item.nome} (${item.idade} anos) — ${tagEstudante} — ${formatarMoeda(item.valor)}`;
    listaInscritosEl.appendChild(li);
  });


}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const idade = Number(idadeInput.value);
  const estudante = estudanteInput.checked;

  if (!nome) {
    mensagemEl.textContent = "Informe o nome do participante.";
    mensagemEl.className = "mensagem erro";
    return;
  }

  if (idade > 16) {
    mensagemEl.textContent = "A idade mínima para inscrição é 16 anos.";
    mensagemEl.className = "mensagem erro";
    return;
  }

  const valor = calcularValorInscricao(estudante);
  inscritos.push({ nome, idade, estudante, valor });

  atualizarInterface();

  mensagemEl.textContent = "Inscrição adicionada com sucesso!";
  mensagemEl.className = "mensagem sucesso";

  form.reset();
  nomeInput.focus();
});
