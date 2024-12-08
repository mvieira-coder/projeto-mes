/**
 * Este script gerencia a criação de novos quadros (boards) no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para a criação do quadro.
 * 2. Define a função `createNewBoard` que faz uma requisição POST para criar um novo quadro.
 * 3. Adiciona eventos aos botões para abrir e fechar o modal de criação de quadro.
 * 4. Adiciona um evento ao botão de salvar para validar os campos e chamar a função de criação do quadro.
 * 5. Adiciona um evento ao `window` para fechar o modal se o usuário clicar fora dele.
 */

// Seleciona os elementos do DOM
const boardName = document.getElementById("board-name");
const boardDescription = document.getElementById("board-description");
const createBoardModal = document.getElementById("add__board__modal");
const openModalBtn = document.getElementById("create-board");
const closeModalBtn = document.getElementById("close-modal");
const saveModalBtn = document.getElementById("save-modal-button");

// Função para criar um novo quadro
const createNewBoard = async () => {
  try {
    const currentUserId = localStorage.getItem("currentUserId") ?? 6;
    const board = {
      Name: boardName.value,
      Description: boardDescription.value,
      IsActive: true,
      CreatedBy: parseInt(currentUserId),
    };

    const response = await fetch(
      "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Board",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(board),
      }
    );
    if (!response.ok) throw new Error("Erro ao criar o quadro");

    window.location.reload();
  } catch (error) {
    alert(error.message);
  }
};

// Adiciona evento ao botão de salvar para criar um novo quadro
saveModalBtn.addEventListener("click", () => {
  if (boardName.value && boardDescription.value) {
    createNewBoard();
  }
});

// Adiciona evento ao botão de abrir o modal
openModalBtn.addEventListener("click", () => {
  createBoardModal.style.display = "flex";
});

// Adiciona evento ao botão de fechar o modal
closeModalBtn.addEventListener("click", () => {
  createBoardModal.style.display = "none";
});

// Adiciona evento ao window para fechar o modal ao clicar fora dele
window.addEventListener("click", (event) => {
  if (event.target === createBoardModal) {
    createBoardModal.style.display = "none";
  }
});
