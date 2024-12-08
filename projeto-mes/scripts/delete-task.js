/**
 * Este script gerencia a exclusão de tarefas no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para a exclusão da tarefa.
 * 2. Define a função `deleteTask` que faz uma requisição DELETE para excluir uma tarefa.
 * 3. Define a função `openDeleteTaskModal` para abrir o modal de exclusão de tarefa.
 * 4. Define a função `closeDeleteTaskModal` para fechar o modal de exclusão de tarefa.
 * 5. Adiciona eventos aos botões para abrir e fechar o modal de exclusão de tarefa.
 * 6. Adiciona um evento ao botão de deletar para validar a seleção e chamar a função de exclusão da tarefa.
 * 7. Adiciona um evento ao `window` para fechar o modal se o usuário clicar fora dele.
 */

// Seleciona os elementos do DOM
const deleteTaskModal = document.getElementById("delete-task-modal");
const closeDeleteTaskModalButton = document.getElementById(
   "close-delete-task-modal"
);
const cancelDeleteTaskButton = document.getElementById(
   "delete-cancel-modal-button"
);
const confirmDeleteTaskButton = document.getElementById(
   "delete-task-modal-button"
);

let deleteTaskId = null;

// Função para excluir uma tarefa
const deleteTask = async (taskId) => {
   try {
      const response = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Task?TaskId=${taskId}`,
         {
            method: "DELETE",
         }
      );

      if (!response.ok) {
         throw new Error("Erro ao deletar a tarefa");
      }

      const selectedBoardId = document.getElementById("boards-select").value;
      await window.updateBoardColumns(selectedBoardId);
      alert("Tarefa deletada com sucesso");
      closeDeleteTaskModal();
   } catch (error) {
      alert(error.message);
   }
};

// Função para abrir o modal de exclusão de tarefa
const openDeleteTaskModal = (taskId) => {
   deleteTaskId = taskId;
   deleteTaskModal.style.display = "flex";
};

// Função para fechar o modal de exclusão de tarefa
const closeDeleteTaskModal = () => {
   deleteTaskModal.style.display = "none";
};

// Adiciona eventos aos botões
confirmDeleteTaskButton.addEventListener("click", () => {
   if (deleteTaskId) {
      deleteTask(deleteTaskId);
      deleteTaskId = null;
   }
});

closeDeleteTaskModalButton.addEventListener("click", closeDeleteTaskModal);
cancelDeleteTaskButton.addEventListener("click", closeDeleteTaskModal);

window.addEventListener("click", (event) => {
   if (event.target === deleteTaskModal) {
      closeDeleteTaskModal();
   }
});

// Torna a função disponível globalmente
window.openDeleteTaskModal = openDeleteTaskModal;
