/**
 * Este script carrega as informações do quadro selecionado no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para exibir as informações do quadro.
 * 2. Define a função `loadSelectBoardColumns` que faz uma requisição GET para obter as colunas do quadro selecionado.
 * 3. Define a função `loadCurrentColumnTasks` que faz uma requisição GET para obter as tarefas de uma coluna específica.
 * 4. Define a função `createBoardColumnsAndTasks` para criar as colunas e tarefas do quadro.
 * 5. Define a função `createBoard` para criar o quadro com suas colunas e tarefas.
 * 6. Define a função `showNoContentMessage` para exibir uma mensagem quando nenhum quadro estiver selecionado.
 * 7. Adiciona um evento ao elemento select para carregar as informações do quadro quando um quadro for selecionado.
 */

// Seleciona os elementos do DOM
const newBoardSelect = document.getElementById("boards-select");
const boardContentContainer = document.getElementById("content-container");
const deleteBoardButton = document.getElementById("delete-board");

// Função para carregar as colunas do quadro selecionado
const loadSelectBoardColumns = async (boardId) => {
   try {
      const response = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ColumnByBoardId?BoardId=${boardId}`
      );
      if (!response.ok) {
         throw new Error(
            "Erro ao carregar as informações do quadro selecionado"
         );
      }
      return await response.json();
   } catch (error) {
      alert(error.message);
   }
};

window.loadSelectBoardColumns = loadSelectBoardColumns;

// Função para carregar as tarefas da coluna
const loadCurrentColumnTasks = async (columnId) => {
   try {
      const response = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/TasksByColumnId?ColumnId=${columnId}`
      );
      if (!response.ok) {
         throw new Error("Erro ao carregar as tarefas da coluna");
      }
      return await response.json();
   } catch (error) {
      throw new Error("Erro ao carregar as tarefas da coluna");
   }
};

// Função para criar as colunas e tarefas do quadro
const createBoardColumnsAndTasks = async (boardColumns) => {
   try {
      const columnsWithTasksPromises = boardColumns.map(async (column) => {
         const tasks = await loadCurrentColumnTasks(column.Id);
         return { ...column, tasks };
      });

      const columnsWithTasks = await Promise.all(columnsWithTasksPromises);

      return columnsWithTasks.map((column) => {
         if (!column.Name) return null;

         const columnElement = document.createElement("div");
         columnElement.classList.add("board-content__column");
         columnElement.dataset.columnId = column.Id;
         columnElement.innerHTML = `
            <div class="board-content__column-title">
               <button class="board-content__column-button" onclick="openDeleteColumnModal(${column.Id})">Excluir coluna</button>
               <h2>${column.Name}</h2>
            </div>`;

         column.tasks
            .sort((a, b) => parseInt(a.Id) - parseInt(b.Id))
            .forEach((task) => {
               const taskElement = document.createElement("div");
               taskElement.classList.add("board-content__column__task");
               taskElement.innerHTML = `
                  <div class="board-content__column__task-title" data-taskid-title="${
                     task.Id
                  }">
                     <h3>${task.Title}</h3>
                  </div>
                  <div class="board-content__column__task-description" data-taskid-description="${
                     task.Id
                  }">
                     <p>${task.Description ?? ""}</p>
                  </div>
                  <div class="board-content__column__actions">
                     <button onclick="openEditTaskModal(${task.Id}, ${
                  task.ColumnId
               })">Editar</button>
                     <button onclick="openDeleteTaskModal(${
                        task.Id
                     })">Excluir</button>
                  </div>`;
               columnElement.appendChild(taskElement);
            });

         const addTaskButton = document.createElement("button");
         addTaskButton.classList.add("add-task__button");
         addTaskButton.innerHTML = `<button onclick="openCreateTaskModal(${column.Id})">Adicionar tarefa</button>`;
         columnElement.appendChild(addTaskButton);

         return columnElement;
      });
   } catch (error) {
      throw new Error("Erro ao criar as colunas e tarefas do quadro");
   }
};

// Função para criar o quadro com suas colunas e tarefas
const createBoard = async (boardColumns) => {
   try {
      boardContentContainer.innerHTML = "";
      const boardContentWrapper = document.createElement("div");
      boardContentWrapper.classList.add("board-content");
      boardContentContainer.appendChild(boardContentWrapper);

      const columnElements = await createBoardColumnsAndTasks(boardColumns);

      columnElements
         .filter((columnElement) => columnElement)
         .sort(
            (a, b) =>
               parseInt(a.dataset.columnId) - parseInt(b.dataset.columnId)
         )
         .forEach((columnElement) => {
            boardContentWrapper.appendChild(columnElement);
         });

      const addColumnButton = document.createElement("div");
      addColumnButton.classList.add("add-column__column");
      addColumnButton.innerHTML = `<button onclick="openCreateColumnModal()">Adicionar coluna</button>`;
      boardContentWrapper.appendChild(addColumnButton);
   } catch (error) {
      alert(error.message);
   }
};

window.createBoard = createBoard;

// Função para exibir uma mensagem quando nenhum quadro estiver selecionado
const showNoContentMessage = () => {
   boardContentContainer.innerHTML = `
      <div class="board-no-content">
         <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#000000" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path>
         </svg>
         <h3>Ops, você ainda não selecionou nenhum board!</h3>
         <p>Use o menu acima para selecionar o board que você deseja visualizar.</p>
      </div>`;
};

// Adiciona um evento ao elemento select para carregar as informações do quadro quando um quadro for selecionado
newBoardSelect.addEventListener("change", async () => {
   const selectedBoardId = newBoardSelect.value;
   if (selectedBoardId === "000") {
      showNoContentMessage();
      deleteBoardButton.disabled = true;
      return;
   }
   const boardColumns = await loadSelectBoardColumns(selectedBoardId);
   createBoard(boardColumns);
   deleteBoardButton.disabled = false;
});
