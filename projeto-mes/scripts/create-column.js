/**
 * Este script gerencia a criação de novas colunas no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para a criação da coluna.
 * 2. Define a função `createNewColumn` que faz uma requisição POST para criar uma nova coluna.
 * 3. Define a função `updateBoardColumns` para atualizar as colunas do quadro.
 * 4. Define a função `closeModal` para fechar o modal de criação de coluna.
 * 5. Adiciona eventos aos botões para abrir e fechar o modal de criação de coluna.
 * 6. Adiciona um evento ao botão de salvar para validar os campos e chamar a função de criação da coluna.
 * 7. Adiciona um evento ao `window` para fechar o modal se o usuário clicar fora dele.
 */

// Seleciona os elementos do DOM
const createColumnModal = document.getElementById("add-column-modal");
const saveColumnButton = document.getElementById("save-column-modal-button");
const closeCreateColumnModalButton = document.getElementById(
   "close-add-column-modal"
);
const columnNameInput = document.getElementById("column-name");

// Função para criar uma nova coluna
const createNewColumn = async (boardId) => {
   if (!boardId) {
      alert("Selecione um quadro para criar uma nova coluna");
      return;
   }

   const columnName = columnNameInput.value.trim();
   if (!columnName) {
      alert("Digite um nome para a coluna");
      return;
   }

   try {
      const response = await fetch(
         "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Column",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               BoardId: boardId,
               Name: columnName,
            }),
         }
      );

      if (!response.ok) {
         throw new Error("Erro ao criar uma nova coluna");
      }

      await updateBoardColumns(boardId);
      alert("Nova coluna criada com sucesso");
      closeModal();
   } catch (error) {
      alert(error.message);
   }
};

// Função para atualizar as colunas do quadro
const updateBoardColumns = async (boardId) => {
   const newBoardColumns = await window.loadSelectBoardColumns(boardId);
   window.createBoard(newBoardColumns);
};

// Função para fechar o modal
const closeModal = () => {
   createColumnModal.style.display = "none";
   columnNameInput.value = "";
};

// Adiciona eventos aos botões
saveColumnButton.addEventListener("click", () => {
   const selectedBoardId = document.getElementById("boards-select").value;
   if (selectedBoardId) {
      createNewColumn(selectedBoardId);
   }
});

closeCreateColumnModalButton.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
   if (event.target === createColumnModal) {
      closeModal();
   }
});

// Função para abrir o modal
const openCreateColumnModal = () => {
   createColumnModal.style.display = "flex";
};

// Torna a função disponível globalmente
window.openCreateColumnModal = openCreateColumnModal;
window.updateBoardColumns = updateBoardColumns;
