/**
 * Este script carrega os quadros (boards) disponíveis no aplicativo TaskBoard.
 *
 * Fluxo e funcionamento:
 * 1. Seleciona os elementos do DOM necessários para exibir os quadros.
 * 2. Define a função `loadAvaiablesBoards` que faz uma requisição GET para obter os quadros disponíveis.
 * 3. Filtra os quadros pelo usuário atual e adiciona-os ao elemento select.
 * 4. Adiciona um evento ao `DOMContentLoaded` para carregar os quadros quando a página for carregada.
 */

// Seleciona os elementos do DOM
const boardsSelect = document.getElementById("boards-select");

// Função para carregar os quadros disponíveis
const loadAvaiablesBoards = async () => {
   try {
      const currentUserId = localStorage.getItem("currentUserId") ?? 6;
      const response = await fetch(
         "https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/Boards"
      );

      if (!response.ok) {
         throw new Error("Erro ao carregar os quadros disponíveis");
      }
      const boards = await response.json();
      populateBoardsSelect(boards, currentUserId);
   } catch (error) {
      alert("Não foi possível carregar os quadros disponíveis");
   }
};

// Função para adicionar os quadros ao elemento select
const populateBoardsSelect = (boards, currentUserId) => {
   boards.forEach((board) => {
      if (board.CreatedBy !== parseInt(currentUserId)) return;
      const option = document.createElement("option");
      option.value = board.Id;
      option.text = board.Name;
      boardsSelect.appendChild(option);
   });
};

// Adiciona um evento ao DOMContentLoaded para carregar os quadros quando a página for carregada
window.addEventListener("DOMContentLoaded", loadAvaiablesBoards);
