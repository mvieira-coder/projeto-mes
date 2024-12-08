/**
 * Este script é responsável por aplicar configurações personalizadas do usuário
 * ao carregar a página, utilizando informações obtidas de uma API REST.
 *
 * Funcionalidades principais:
 * 1. **Obtenção de Configurações do Usuário:**
 *    - Recupera o ID do usuário atual do `localStorage` ou utiliza um ID padrão (6) caso não esteja disponível.
 *    - Faz uma requisição para buscar configurações personalizadas do usuário, como o tema padrão (claro ou escuro).
 *
 * 2. **Obtenção de Informações do Usuário:**
 *    - Recupera informações detalhadas do usuário, como nome e e-mail, através de uma API REST.
 *    - Fornece valores padrão caso ocorra um erro ao buscar essas informações.
 *
 * 3. **Aplicação das Configurações:**
 *    - Define o tema (claro ou escuro) com base no valor retornado pela API.
 *    - Atualiza elementos da interface, como a exibição do tema atual e o e-mail do usuário na página.
 *
 * 4. **Gestão de Erros:**
 *    - Exibe alertas em caso de falha nas requisições e aplica valores padrão para evitar interrupções no funcionamento.
 *
 * **Eventos:**
 * - O script é executado automaticamente quando o evento `DOMContentLoaded` é disparado, garantindo que as configurações sejam aplicadas assim que a página for carregada.
 */

const currentUserId = localStorage.getItem("currentUserId") ?? 6;

const fetchUserConfigs = async (userId) => {
   try {
      const userConfigsResponse = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/PersonConfigById?PersonId=${userId}`
      );
      const userConfigs = await userConfigsResponse.json();
      return userConfigs;
   } catch (error) {
      alert("Não foi possível carregar as configurações do usuário");
      return {
         DefaultThemeId: 1,
         DefaultBoardId: null,
      };
   }
};

const fetchUserInfo = async (userId) => {
   try {
      const userInfoResponse = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/PersonById?PersonId=${userId}`
      );
      const userInfo = await userInfoResponse.json();
      return userInfo;
   } catch (error) {
      alert("Não foi possível carregar as informações do usuário");
      return {
         Id: 6,
         Name: "Matheus",
         BirthDate: "2014-12-31",
         PhoneNumber: "459999999999",
         Email: "matheus@mail.com",
      };
   }
};

const applyUserConfigs = async () => {
   const userInfo = await fetchUserInfo(currentUserId);
   const userConfigs = await fetchUserConfigs(currentUserId);
   const body = document.body;
   const toggle = document.getElementById("theme-toggle");
   const currentThemeText = document.getElementById("theme-text");
   const currentUserEmail = document.getElementById("user-email");

   if (userConfigs.DefaultThemeId === 2) {
      body.classList.add("dark");
      toggle.checked = true;
      currentThemeText.textContent = "Escuro";
   } else {
      body.classList.add("light");
      toggle.checked = false;
      currentThemeText.textContent = "Claro";
   }

   currentUserEmail.textContent = userInfo.Email;
};

window.addEventListener("DOMContentLoaded", applyUserConfigs);
