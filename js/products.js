const ORDER_ASC_BY_COST = "$";
const ORDER_DESC_BY_COST = "$$$";
const ORDER_BY_SOLD = "Cant.";
let products = [];
// let productosFiltrados = [];
let currentProductsArray = [];
let minCost = undefined;
let maxCost = undefined;
let filtered = [];
let listaFiltrada = [];

//Función para ordenar por costo (ascendente o descendente), por cantidad de vendidos (relevancia)

function ordenar(orden, array) {
  let result = [];
  if (orden === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (orden === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (orden === ORDER_BY_SOLD) {
    result = array.sort(function (a, b) {
      let aSold = parseInt(a.soldCount);
      let bSold = parseInt(b.soldCount);

      if (aSold > bSold) {
        return -1;
      }
      if (aSold < bSold) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function setProdID(id) {
  localStorage.setItem("ProdID", id);
  window.location = "product-info.html";
}

function showProductsList(currentProductsArray) {
  let htmlContentToAppend = "";

  for (let i = 0; i < currentProductsArray.length; i++) {
    let products = currentProductsArray[i];

    // si el minCost no está definido o está definido y es mayor o igual al minCost,y, el
    // maxCost no está definido o está definido y es menor o igual al maxCost: Mostrar.
    // esta condicional funciona con el filtro

    if (
      (minCost == undefined ||
        (minCost != undefined && parseInt(products.cost) >= minCost)) &&
      (maxCost == undefined ||
        (minCost != undefined && parseInt(products.cost) <= maxCost))
    ) {
      htmlContentToAppend += `

            <div onclick="setProdID(${products.id})" class="list-group-item list-group-item-action cursor-active shadow">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name} - ${products.currency} ${products.cost}</h4>
                            <small class="text-muted">${products.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                    </div>
                </div>
            </div>
            `;
    }

    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
  }
}
function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = ordenar(currentSortCriteria, currentProductsArray);

  //Muestro las categorías ordenadas
  showProductsList(products);
}

// funcion para buscar

function searchFor(array) {
  let textoBuscado = document.getElementById("search").value;

  let listaFiltrada = filtered.filter((resultado) => {
    return (
      resultado.name.toLowerCase().indexOf(textoBuscado.toLowerCase()) > -1
    );
  });
  showProductsList(listaFiltrada);
}

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE).then(
    function (resultObj) {
      if (resultObj.status === "ok") {
        currentProductsArray = resultObj.data.products;
        filtered = resultObj.data.products;

        showProductsList(currentProductsArray);
      }
    }
  );
  document.getElementById("search").addEventListener("keyup", () => {
    searchFor();
  });

  // acá voy a llamar al filtro de búsqueda cuando funcione

  // la función que filtra la lista por mínimmo y máximo

  document.getElementById("rangeFilterCount").addEventListener("click", () => {
    minCost = document.getElementById("rangeFilterCountMin").value;
    maxCost = document.getElementById("rangeFilterCountMax").value;

    //si minCount está definida, y no está vacía, y es mayor o igual a 0,
    // minCount toma ese valor
    //else puede quedar sin definir
    // si maxCount está definida, y no está vacía, y es mayor o igual a 0,
    //maxCount toma ese valor
    // else puede quedar sin definir

    if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
      minCost = parseInt(minCost);
    } else {
      minCost = undefined;
    }

    if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
      maxCost = parseInt(maxCost);
    } else {
      maxCost = undefined;
    }

    showProductsList(products);
  });

  //limpia el filtro y vuelve a la lista principal
  //los inputs quedan vacíos y minCount y maxCount quedan sin definir

  document.getElementById("clearRangeFilter").addEventListener("click", () => {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCost = undefined;
    maxCost = undefined;

    showProductsList(products);
  });

  //cuando hago click en los input se ejecuta sortAndShowProducts acorde al parámetro
  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(ORDER_DESC_BY_COST);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_SOLD);
  });
});
