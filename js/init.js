const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL =
  "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL =
  "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let usuario = localStorage.getItem("nombre");

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      hideSpinner();
      return result;
    });
};
function calcAmount() {
  let precios = document.getElementsByName("precio");
  let cantidad = document.getElementsByName("cantidad");
  let subtotales = document.getElementsByName("subtotal");
  let subtotal = 0;
  let moneda = document.getElementsByName("moneda");

  shipping = 0;

  for (let a = 0; a < ship.length; a++) {
    if (ship[a].checked) {
      shipping = subtotal * parseFloat(ship[a].value);
    }
  }

  document.getElementById("prodAmount").innerHTML = subtotal.toFixed(2);
  document.getElementById("shipping_charge").innerHTML = shipping.toFixed(2);
  document.getElementById("total_cart_amt").innerHTML =
    parseFloat(subtotal.toFixed(2)) + parseFloat(shipping.toFixed(2));
}

if (usuario == null) {
  document.getElementById("persona").innerHTML = `Ingresar`;
  document.getElementById("persona").addEventListener("click", () => {
    window.location = "login.html";
  });
} else {
  document.getElementById("persona").innerHTML = `Hola` + " " + usuario;
  // document.getElementById("persona").addEventListener("click", () => {
  //   location.href = "my-profile.html";
  // });
}

document.getElementById("finish").addEventListener("click", () => {
  localStorage.removeItem("nombre");
  localStorage.removeItem("userName");
  localStorage.removeItem("userLastName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("compra");
  localStorage.removeItem("userPic");

  // window.location = "login.html";
});

function setProdID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html";
}
