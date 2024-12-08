/**
 * Este script gerencia a exclusão de colunas no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para a exclusão da coluna.
 * 2. Define a função `deleteColumn` que faz uma requisição DELETE para excluir uma coluna.
 * 3. Define a função `openDeleteColumnModal` para abrir o modal de exclusão de coluna.
 * 4. Define a função `closeDeleteColumnModal` para fechar o modal de exclusão de coluna.
 * 5. Adiciona eventos aos botões para abrir e fechar o modal de exclusão de coluna.
 * 6. Adiciona um evento ao botão de deletar para validar a seleção e chamar a função de exclusão da coluna.
 * 7. Adiciona um evento ao `window` para fechar o modal se o usuário clicar fora dele.
 */

// Seleciona os elementos do DOM
const deleteColumnModal = document.getElementById("delete-column-modal");
const cancelDeleteColumnButton = document.getElementById(
   "cancel-delete-column-button"
);
const closeDeleteColumnButton = document.getElementById(
   "close-delete-column-modal"
);
const confirmDeleteColumnButton = document.getElementById(
   "delete-column-modal-button"
);

let currentDeleteColumnId = null;

// Função para excluir uma coluna
const deleteColumn = async (columnId) => {
   try {
      const response = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Column?ColumnId=${columnId}`,
         {
            method: "DELETE",
         }
      );

      if (!response.ok) {
         throw new Error("Erro ao deletar a coluna");
      }

      const selectedBoardId = document.getElementById("boards-select").value;
      await window.updateBoardColumns(selectedBoardId);
      alert("Coluna deletada com sucesso");
      closeDeleteColumnModal();
   } catch (error) {
      alert(error.message);
   }
};

// Função para abrir o modal de exclusão de coluna
const openDeleteColumnModal = (columnId) => {
   currentDeleteColumnId = columnId;
   deleteColumnModal.style.display = "flex";
};

// Função para fechar o modal de exclusão de coluna
const closeDeleteColumnModal = () => {
   deleteColumnModal.style.display = "none";
};

// Adiciona eventos aos botões
confirmDeleteColumnButton.addEventListener("click", async () => {
   if (currentDeleteColumnId) {
      await deleteColumn(currentDeleteColumnId);
      currentDeleteColumnId = null;
   }
});

closeDeleteColumnButton.addEventListener("click", closeDeleteColumnModal);
cancelDeleteColumnButton.addEventListener("click", closeDeleteColumnModal);

window.addEventListener("click", (event) => {
   if (event.target === deleteColumnModal) {
      closeDeleteColumnModal();
   }
});

// Torna a função disponível globalmente
window.openDeleteColumnModal = openDeleteColumnModal;
