/**
 * Este script gerencia a edição de tarefas no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para a edição da tarefa.
 * 2. Define a função `updateTask` que faz uma requisição PUT para atualizar uma tarefa.
 * 3. Define a função `loadTaskInfo` para carregar as informações da tarefa no modal de edição.
 * 4. Define a função `openEditTaskModal` para abrir o modal de edição de tarefa.
 * 5. Define a função `closeEditTaskModal` para fechar o modal de edição de tarefa.
 * 6. Adiciona eventos aos botões para abrir e fechar o modal de edição de tarefa.
 * 7. Adiciona um evento ao botão de salvar para validar os campos e chamar a função de atualização da tarefa.
 * 8. Adiciona um evento ao `window` para fechar o modal se o usuário clicar fora dele.
 */

// Seleciona os elementos do DOM
const editTaskModal = document.getElementById("edit-task-modal");
const closeEditTaskModalButton = document.getElementById(
   "close-modal-edit-task"
);
const saveEditTaskButton = document.getElementById(
   "save-task-edit-modal-button"
);
const editTaskTitleInput = document.getElementById("task-edit-title");
const editTaskDescriptionInput = document.getElementById(
   "task-edit-description"
);

let currentEditColumnId = null;
let currentTaskId = null;

// Função para atualizar uma tarefa
const updateTask = async () => {
   try {
      const task = {
         Id: currentTaskId,
         Title: editTaskTitleInput.value,
         Description: editTaskDescriptionInput.value,
         ColumnId: currentEditColumnId,
         isActive: true,
      };

      const response = await fetch(
         "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Task",
         {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
         }
      );

      if (!response.ok) throw new Error("Erro ao atualizar a tarefa");

      const selectedBoardId = document.getElementById("boards-select").value;
      await window.updateBoardColumns(selectedBoardId);
      closeEditTaskModal();
      alert("Tarefa atualizada com sucesso");
   } catch (error) {
      alert(error.message);
   }
};

// Função para carregar as informações da tarefa no modal de edição
const loadTaskInfo = (taskId) => {
   const taskTitleElement = document.querySelector(
      `[data-taskid-title="${taskId}"] h3`
   );
   const taskDescriptionElement = document.querySelector(
      `[data-taskid-description="${taskId}"] p`
   );
   editTaskTitleInput.value = taskTitleElement.innerText;
   editTaskDescriptionInput.value = taskDescriptionElement.innerText;
};

// Função para abrir o modal de edição de tarefa
const openEditTaskModal = (taskId, columnId) => {
   currentTaskId = taskId;
   currentEditColumnId = columnId;
   loadTaskInfo(taskId);
   editTaskModal.style.display = "flex";
};

// Função para fechar o modal de edição de tarefa
const closeEditTaskModal = () => {
   editTaskModal.style.display = "none";
   editTaskTitleInput.value = "";
   editTaskDescriptionInput.value = "";
};

// Adiciona eventos aos botões
saveEditTaskButton.addEventListener("click", () => {
   if (editTaskTitleInput.value && editTaskDescriptionInput.value) {
      updateTask();
   }
});

closeEditTaskModalButton.addEventListener("click", closeEditTaskModal);

window.addEventListener("click", (event) => {
   if (event.target === editTaskModal) {
      closeEditTaskModal();
   }
});

// Torna a função disponível globalmente
window.openEditTaskModal = openEditTaskModal;
