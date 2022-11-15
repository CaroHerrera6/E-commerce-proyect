document.addEventListener("DOMContentLoaded", () => {
  if (usuario == null) {
    Swal.fire("Por favor inicia sesión para acceder a tu cuenta");
    document.addEventListener("click", () => {
      // location.href = "login.html";
    });
  } else {
    document.getElementById("persona").innerHTML = `Hola ` + usuario;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("autos").addEventListener("click", function () {
    localStorage.setItem("catID", 101);
    window.location = "products.html";
  });
  document.getElementById("juguetes").addEventListener("click", function () {
    localStorage.setItem("catID", 102);
    window.location = "products.html";
  });
  document.getElementById("muebles").addEventListener("click", function () {
    localStorage.setItem("catID", 103);
    window.location = "products.html";
  });
});
