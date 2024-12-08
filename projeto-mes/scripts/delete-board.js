/**
 * Este script gerencia a exclusão de quadros (boards) no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para a exclusão do quadro.
 * 2. Define a função `deleteBoard` que faz uma requisição DELETE para excluir um quadro.
 * 3. Define a função `openDeleteBoardModal` para abrir o modal de exclusão de quadro.
 * 4. Define a função `closeDeleteBoardModal` para fechar o modal de exclusão de quadro.
 * 5. Adiciona eventos aos botões para abrir e fechar o modal de exclusão de quadro.
 * 6. Adiciona um evento ao botão de deletar para validar a seleção e chamar a função de exclusão do quadro.
 * 7. Adiciona um evento ao `window` para fechar o modal se o usuário clicar fora dele.
 */

// Seleciona os elementos do DOM
const openDeleteModalButton = document.getElementById("delete-board");
const deleteModalButton = document.getElementById("delete-modal-button");
const deleteBoardModal = document.getElementById("delete-board-modal");
const cancelDeleteButton = document.getElementById(
   "cancel-delete-modal-button"
);
const closeDeleteModalButton = document.getElementById("close-delete-modal");
const currentBoardSelect = document.getElementById("boards-select");

// Função para excluir um quadro
const deleteBoard = async () => {
   try {
      const response = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Board?BoardId=${currentBoardSelect.value}`,
         {
            method: "DELETE",
         }
      );

      if (!response.ok) {
         throw new Error("Erro ao deletar o quadro");
      }

      alert("Quadro deletado com sucesso");
      location.reload();
   } catch (error) {
      alert(error.message);
   }
};

// Função para abrir o modal de exclusão de quadro
const openDeleteBoardModal = () => {
   deleteBoardModal.style.display = "flex";
};

// Função para fechar o modal de exclusão de quadro
const closeDeleteBoardModal = () => {
   deleteBoardModal.style.display = "none";
};

// Adiciona eventos aos botões
deleteModalButton.addEventListener("click", () => {
   if (currentBoardSelect.value) {
      deleteBoard();
   }
});

openDeleteModalButton.addEventListener("click", openDeleteBoardModal);
cancelDeleteButton.addEventListener("click", closeDeleteBoardModal);
closeDeleteModalButton.addEventListener("click", closeDeleteBoardModal);

window.addEventListener("click", (event) => {
   if (event.target === deleteBoardModal) {
      closeDeleteBoardModal();
   }
});
