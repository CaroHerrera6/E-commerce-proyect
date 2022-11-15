let userID = 25801;
let cart = [];
let products = [];
let result = [];
let wanted = [];
let ship = document.getElementsByName("option");
let cardPay = document.getElementById("inputTarje");
let transPay = document.getElementById("inputTransfe");
let cardInput = document.getElementById("cc-number");
let transInput = document.getElementById("pagoTransfe");
let dateInput = document.getElementById("expiry-month");
let monthInput = document.getElementById("expiry-year");
let secInput = document.getElementById("security");
let standard = document.getElementById("standard");
let fast = document.getElementById("fast");
let urgent = document.getElementById("urgent");
let myform = document.getElementById("form");
let erase = document.getElementsByName("delete");

//MUESTRO LOS PRODUCTOS QUE SELECCIONÉ PARA COMPRAR
//////////////////////////////////////////////////

function myPurchase() {
  let myCarri = "";

  for (let i = 0; i < compra.length; i++) {
    myCarri += `
    <div class="row mb-4 d-flex justify-content-between align-items-center mx-4 my-2 py-4 border shadow">
    <div class="col-md-2 col-lg-2 col-xl-2"><img
                        src="${compra[i].images}"
                        class="img-fluid rounded-3">
                    </div>
                    
                    <div class="col-md-3 col-lg-3 col-xl-3">
                     <h5 class="text-black mb-2"> ${compra[i].name}</h5>
                      <h6 class="text-muted" name="moneda">${compra[i].currency}</h6>
                      $ <span class="text-black mb-0" name="precio">${compra[i].cost}</span>
                    </div>
                    
                   <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">$ <span class="col" name="subtotal" id="sub${i}"></span>      
                   
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <input name="cantidad" type="number" min="1"value="1" onchange="calcAmount()" id="cant${i}" style="width:2em"/>
                    </div>         
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" class="text-muted"><i class="fas fa-times" name="delete"></i></a>
                    </div>
                  </div>`;
  }

  document.getElementById("buy").innerHTML = myCarri;
  calcAmount();
  for (let i = 0; i < erase.length; i++) {
    erase[i].addEventListener("click", () => {
      deleted(i);
    });
  }
}

/// BORRAR PRODUCTOS///
function deleted(position) {
  compra.splice(position, 1);

  myPurchase();
}

/// CALCULO LOS TOTALES Y SUBTOTALES ///
function calcAmount() {
  let precios = document.getElementsByName("precio");
  let cantidad = document.getElementsByName("cantidad");
  let subtotales = document.getElementsByName("subtotal");
  let subtotal = 0;
  let moneda = document.getElementsByName("moneda");

  for (let i = 0; i < precios.length; i++) {
    if (moneda[i].innerHTML == "USD") {
      subtotal +=
        parseFloat(precios[i].innerHTML) * parseFloat(cantidad[i].value);
      subtotales[i].innerHTML =
        parseFloat(precios[i].innerHTML) * parseFloat(cantidad[i].value);
    } else {
      subtotal +=
        (parseFloat(precios[i].innerHTML) / 40) * parseFloat(cantidad[i].value);
      subtotales[i].innerHTML =
        parseFloat(precios[i].innerHTML) * parseFloat(cantidad[i].value);
    }
  }

  shipping = 0;

  for (let a = 0; a < ship.length; a++) {
    if (ship[a].checked) {
      shipping = subtotal * parseFloat(ship[a].value);
    }
  }

  document.getElementById("prodAmount").innerHTML =
    `$` + " " + subtotal.toFixed(2);
  document.getElementById("shipping_charge").innerHTML =
    `$` + " " + shipping.toFixed(2);
  document.getElementById("total_cart_amt").innerHTML =
    `$` +
    " " +
    (parseFloat(subtotal.toFixed(2)) + parseFloat(shipping.toFixed(2)));
}

/// FORMAS DE PAGO DE LA MODAL ///
function paymentForm() {
  cardPay.addEventListener("click", () => {
    transInput.disabled = true;
    cardInput.disabled = false;

    dateInput.disabled = false;
    monthInput.disabled = false;
    secInput.disabled = false;
  });
  transPay.addEventListener("click", () => {
    cardInput.disabled = true;
    dateInput.disabled = true;
    monthInput.disabled = true;
    secInput.disabled = true;
    transInput.disabled = false;
  });
}

/// VALIDO QUE HAYA UNA FORMA DE PAGO SELECCIONADA///
function checkModal() {
  let respuesta = true;
  if (!cardPay.checked && !transPay.checked) {
    document.getElementById("pay").classList.add("link-danger");
    respuesta = false;
  } else {
    document.getElementById("pay").classList.remove("link-danger");
  }
  return respuesta;
}

document.addEventListener("DOMContentLoaded", () => {
  myform.addEventListener("submit", (evento) => {
    if (!myform.checkValidity() || !form.checkValidity()) {
      evento.preventDefault();
      evento.stopPropagation();
      checkModal();
    } else {
      evento.preventDefault(); // SINO NO APARECE EL SWEET ALERT :(

      swal("Genial!", "Tu pedido va en camino!", "success"); // SI ESTÁ TODO BIEN //
    }

    myform.classList.add("was-validated");
    let eventos = ["change", "input"];

    eventos.forEach((evento) => {
      document.body.addEventListener(evento, checkModal); // QUE SE EJECUTE ANTE ESTOS EVENTOS/
    });
  });
  getJSONData(CART_INFO_URL + userID + EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      // ESTE ES EL JSON DE LOS COMENTARIOS //
      products = resultObj.data.articles;

      compra = JSON.parse(localStorage.getItem("compra"));
      myPurchase();
      calcAmount();
      paymentForm();
    }
  });
  for (let i = 0; i < ship.length; i++) {
    ship[i].addEventListener("click", () => {
      calcAmount();
    });
  }
});
