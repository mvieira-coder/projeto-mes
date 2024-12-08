/**
 * Este script gerencia a alternância entre os temas claro e escuro na página
 * e também salva a preferência do usuário em um servidor remoto utilizando uma API REST.
 *
 * Funcionalidades principais:
 * 1. **Alternância de Tema:**
 *    - Verifica a classe atual do elemento `body` para identificar o tema ativo (claro ou escuro).
 *    - Atualiza dinamicamente a classe do `body` para alternar entre os temas.
 *    - Atualiza o texto que indica o tema atual na interface (ex.: "Claro" ou "Escuro").
 *
 * 2. **Salvamento de Preferência de Tema:**
 *    - Envia uma requisição `PATCH` para uma API REST, salvando a preferência do usuário
 *      (tema claro ou escuro) associada ao seu ID.
 *    - Lida com possíveis erros durante a comunicação com a API, exibindo mensagens de erro ou sucesso ao usuário.
 *
 * 3. **Eventos:**
 *    - Escuta o evento `change` no elemento de alternância (switch).
 *    - Reage à interação do usuário, alterando o tema e salvando a preferência no servidor.
 */

const body = document.body;
const toggle = document.getElementById("theme-toggle");
const currentThemeText = document.getElementById("theme-text");

const saveUserDefaultTheme = async (themeId) => {
   try {
      const currentUserId = localStorage.getItem("currentUserId") ?? 6;
      const patchUserThemeResponse = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/ConfigPersonTheme?PersonId=${currentUserId}`,
         {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ThemeId: themeId }),
         }
      );
      if (!patchUserThemeResponse.ok) {
         throw new Error("Erro ao salvar o tema do usuário");
      }
      alert("Tema do usuário salvo com sucesso");
   } catch (error) {
      alert(error.message);
   }
};

toggle.addEventListener("change", () => {
   if (body.classList.contains("dark")) {
      body.classList.replace("dark", "light");
      currentThemeText.textContent = "Claro";
      saveUserDefaultTheme(1);
   } else {
      body.classList.replace("light", "dark");
      currentThemeText.textContent = "Escuro";
      saveUserDefaultTheme(2);
   }
});
