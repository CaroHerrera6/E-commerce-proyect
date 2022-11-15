//CUANDO EL DOCUMENTO CARGA
//CUANDO EL BOTON ES CLICKEADO
//SI EL EMAIL, EL NOMBRE O LA CONTRASEÑA ESTÁN VACÍOS
//GUARDO EL NOMBRE EN EL LOCAL STORAGE
//REDIRIJO A LA PÁGINA QUE QUIERO

let user = document.getElementById("typeName");
let email = document.getElementById("typeEmailX");
let password = document.getElementById("typePasswordX");
let form = document.getElementById("login-form");

document.getElementById("btn-submit").addEventListener("click", () => {
  user.value === "" || email.value === "" || password.value === ""
    ? form.classList.add("was-validated")
    : (localStorage.setItem("nombre", user.value),
      localStorage.setItem("email", email.value),
      location.assign("index.html"));
});
