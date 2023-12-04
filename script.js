// Variável para armazenar a referência à linha que está sendo editada
var editingRow = null;

// Função para abrir o modal
function openModal() {
  document.querySelector('.modal-container').style.display = 'flex';
}

// Função para fechar o modal
function closeModal() {
  document.querySelector('.modal-container').style.display = 'none';
}

// Função para adicionar um novo funcionário
function addEmployee() {
  // Obter valores dos campos do formulário modal
  var nome = document.getElementById('m-nome').value;
  var funcao = document.getElementById('m-funcao').value;
  var salario = document.getElementById('m-salario').value;

  // Validar se todos os campos estão preenchidos
  if (nome && funcao && salario) {
    // Se já estiver editando, atualizar a linha existente
    if (editingRow) {
      editingRow.cells[0].innerText = nome;
      editingRow.cells[1].innerText = funcao;
      editingRow.cells[2].innerText = salario;
      editingRow = null; // Limpar a referência após editar
    } else {
      // Criar uma nova linha na tabela com os dados do novo funcionário
      var tableBody = document.querySelector('tbody');
      var newRow = tableBody.insertRow();
      newRow.innerHTML = `<td>${nome}</td><td>${funcao}</td><td>${salario}</td><td class="acao" onclick="editEmployee(this)" style="cursor: pointer;">Editar</td><td class="acao" onclick="deleteEmployee(this)" style="cursor: pointer;">Excluir</td>`;
    }

    // Fechar o modal após adicionar ou editar o funcionário
    closeModal();

    // Limpar os campos do formulário modal
    document.getElementById('m-nome').value = '';
    document.getElementById('m-funcao').value = '';
    document.getElementById('m-salario').value = '';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
}

// Função para editar um funcionário
function editEmployee(row) {
  var cells = row.parentNode.cells;
  document.getElementById('m-nome').value = cells[0].innerText;
  document.getElementById('m-funcao').value = cells[1].innerText;
  document.getElementById('m-salario').value = cells[2].innerText;

  // Armazenar a referência à linha que está sendo editada
  editingRow = row.parentNode;

  // Abrir o modal com os dados preenchidos para edição
  openModal();
}

// Função para excluir um funcionário
function deleteEmployee(row) {
  // Confirmar a exclusão
  var confirmDelete = confirm('Deseja realmente excluir este funcionário?');

  if (confirmDelete) {
    // Remover a linha da tabela
    row.parentNode.parentNode.removeChild(row.parentNode);

    // Limpar a referência se estiver deletando a linha em edição
    if (editingRow === row.parentNode) {
      editingRow = null;
    }
  }
}

// Adicionar eventos aos botões
document.getElementById('new').addEventListener('click', openModal);
document.getElementById('btnSalvar').addEventListener('click', addEmployee);