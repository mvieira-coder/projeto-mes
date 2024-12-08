/**
 * Este script gerencia a criação de novas tarefas no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para a criação da tarefa.
 * 2. Define a função `createTaskOnColumn` que faz uma requisição POST para criar uma nova tarefa.
 * 3. Define a função `closeTaskModal` para fechar o modal de criação de tarefa.
 * 4. Adiciona eventos aos botões para abrir e fechar o modal de criação de tarefa.
 * 5. Adiciona um evento ao botão de salvar para validar os campos e chamar a função de criação da tarefa.
 * 6. Adiciona um evento ao `window` para fechar o modal se o usuário clicar fora dele.
 */

// Seleciona os elementos do DOM
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const createTaskModal = document.getElementById("add-task-modal");
const closeTaskModalButton = document.getElementById("close-modal-task");
const saveTaskModalButton = document.getElementById("save-task-modal-button");

let currentColumnId = null;

// Função para criar uma nova tarefa na coluna
const createTaskOnColumn = async (columnId) => {
   if (!columnId) {
      alert("Coluna não selecionada");
      return;
   }

   const taskTitle = taskTitleInput.value.trim();
   const taskDescription = taskDescriptionInput.value.trim();
   if (!taskTitle || !taskDescription) {
      alert("Preencha todos os campos");
      return;
   }

   try {
      const currentUserId = localStorage.getItem("currentUserId") ?? 6;
      const task = {
         Title: taskTitle,
         Description: taskDescription,
         IsActive: true,
         CreatedBy: currentUserId,
         ColumnId: columnId,
      };

      const response = await fetch(
         "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Task",
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
         }
      );

      if (!response.ok) throw new Error("Erro ao criar a tarefa");

      const selectedBoardId = document.getElementById("boards-select").value;
      await window.updateBoardColumns(selectedBoardId);
      closeTaskModal();
      alert("Nova tarefa criada com sucesso");
   } catch (error) {
      alert(error.message);
   }
};

// Função para fechar o modal
const closeTaskModal = () => {
   createTaskModal.style.display = "none";
   taskTitleInput.value = "";
   taskDescriptionInput.value = "";
};

// Adiciona eventos aos botões
saveTaskModalButton.addEventListener("click", () => {
   createTaskOnColumn(currentColumnId);
});

closeTaskModalButton.addEventListener("click", closeTaskModal);

window.addEventListener("click", (event) => {
   if (event.target === createTaskModal) {
      closeTaskModal();
   }
});

// Função para abrir o modal de criação de tarefa
const openCreateTaskModal = (columnId) => {
   currentColumnId = columnId;
   createTaskModal.style.display = "flex";
};

// Torna a função disponível globalmente
window.openCreateTaskModal = openCreateTaskModal;
