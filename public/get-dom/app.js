const API_URL = "/api/tarefas";

const btnAtualizar = document.getElementById("btn-atualizar");
const tabelaCorpo = document.getElementById("tabela-corpo");
const mensagemEl = document.getElementById("mensagem");

function criarLinha(tarefa){
  const tr = document.createElement("tr");

  const tdId = document.createElement("td");
  tdId.textContent = tarefa.id;

  const tdTitulo = document.createElement("td");
  tdTitulo.textContent = tarefa.titulo;

  const tdResponsavel = document.createElement("td");
  tdResponsavel.textContent = tarefa.responsavel;

  tr.appendChild(tdId);
  tr.appendChild(tdTitulo);
  tr.appendChild(tdResponsavel);

  return tr;
}

function renderizarTabela(tarefas){
  tabelaCorpo.innerHTML = "";

  if (!Array.isArray(tarefas) || tarefas.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.textContent = "Nenhuma tarefa encontrada.";
    tr.appendChild(td);
    tabelaCorpo.appendChild(tr);
    return;
  }

  tarefas.map(criarLinha).forEach((tr) => tabelaCorpo.appendChild(tr));
}

async function buscarTarefas(){
  mensagemEl.textContent = "Carregando...";

  try {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.erro || "Erro na requisição GET.");
    }

    renderizarTabela(dados);
    mensagemEl.textContent = `Total de tarefas: ${dados.length}`;
  } catch (erro) {
    mensagemEl.textContent = erro.message;
  }
}

btnAtualizar.addEventListener("click", buscarTarefas);
document.addEventListener("DOMContentLoaded", buscarTarefas);