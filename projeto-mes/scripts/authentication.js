const emailInput = document.getElementById("email-input");

const logout = () => {
   window.location.href = "index.html";
   localStorage.removeItem("currentUserId");
};

const authentication = async (email) => {
   try {
      const authenticationResponse = await fetch(
         `https://personal-ga2xwx9j.outsystemscloud.com/TaskBoard_CS/rest/TaskBoard/GetPersonByEmail?Email=${email}`,
         {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      const authenticationData = await authenticationResponse.json();

      if (!authenticationResponse.ok)
         throw new Error("Não foi possível fazer login. Tente novamente.");
      localStorage.setItem("currentUserId", authenticationData.Id);
      window.location.href = "boards.html";
   } catch (error) {
      alert(error.message);
   }
};

const loginButton = document.getElementById("button-login");

if (loginButton) {
   loginButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (emailInput.value === "") {
         alert("Por favor, insira um e-mail válido.");
         return;
      }

      authentication(emailInput.value);
   });
}

const logoutButton = document.getElementById("logout-button");
if (logoutButton) logoutButton.addEventListener("click", logout);
