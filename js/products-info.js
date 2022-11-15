let url = PRODUCT_INFO_URL + localStorage.getItem("ProdID") + EXT_TYPE;
const comment_URL =
  PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("ProdID") + EXT_TYPE;
let info = [];
let pictures = [];

let opinion = [];
let related = [];
let thought = document.getElementById("floatingTextarea2");

function showInfo(products) {
  let infoInsideHtml = "";
  let button = "";

  infoInsideHtml += `<div  class="text-center p-4">
        <h1>${products.name}</h1><h3 class="text-muted">${products.currency} ${products.cost}</h3>

        <br />
        <br/>
        <medium class="text-muted"
          >${products.description}<br/><br/> <span class="fst-italic">Cantidad vendidos ${products.soldCount}</span></medium
        >
      </div>
      
     `;
  button += `<button onclick ="buyMeID()" type="button" class="btn btn-success btn-lg mb-4" id="comprar">Comprar</button>
`;

  let title = "";
  title += `<h4 class="mx-auto">Descubre otros productos de la categoría <a href="products.html">${products.category}</a></h4>`;

  document.getElementById("info-container").innerHTML = infoInsideHtml;
  document.getElementById("related-title").innerHTML = title;
  document.getElementById("comprar").innerHTML = button;
}

function buyMeID() {
  listaVacia = JSON.parse(localStorage.getItem("compra"));

  if (listaVacia === null) {
    listaVacia = [];
  }
  listaVacia.push({
    id: products.id,
    name: products.name,
    cost: products.cost,
    currency: products.currency,
    images: products.images[0],
  });
  localStorage.setItem("compra", JSON.stringify(listaVacia));
  location.href = "cart.html";
}
function showInfoPictures(products) {
  let pictureInsideHtml = "";

  pictureInsideHtml += `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  
    
  <div class="carousel-indicators">
    <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${products.images[0]}" class="d-block" alt="...">
    </div>
    
     <div class="carousel-item">
      <img src="${products.images[1]}" class="d-block" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${products.images[2]}" class="d-block" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${products.images[3]}" class="d-block" alt="...">
    </div>
  </div>
    <button class="carousel-control-prev slide" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon grey"></span>
    <span class="grey"> < </span>
  </button>
  <button class="carousel-control-next slide" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon grey"></span>
    <span class="grey"> > </span>
  </button>
 
</div>
 
 
`;
  // `<div class="cards"><div class="card"><img src="${products.images[i]}" class="rounded"></div></div>`;

  document.getElementById("picture-container").innerHTML = pictureInsideHtml;
  // }
}
function showComment(comments) {
  let commentInsideHtml = "";

  for (let i = 0; i < comments.length; i++) {
    let com = comments[i];
    commentInsideHtml += `<ul class="list-group">
      <li class="list-group-item">
        <p style="font-weight: 600">${
          com.user
        } <span class="star" id="stars">${showScore(
      com.score
    )}</><span class = "text-muted"id="date">${com.dateTime}</span></p>
         <span>${com.description}</span>
      </li>
    </ul>`;

    document.getElementById("comment-container").innerHTML = commentInsideHtml;
  }
}

function showScore(score) {
  let scoreInsideHtml = "";

  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      scoreInsideHtml += '<i class="fas fa-star checked" ></i>';
    } else {
      scoreInsideHtml += '<i class="far fa-star checked"></i>';
    }
  }
  return scoreInsideHtml;
}
function commentContainer() {
  let giveAnOpinion = "";

  giveAnOpinion += `
        <h3>Deja tu comentario</h3> 
        <br/>    
  
  <textarea
        class="form-control"
        placeholder="Tu opinión importa!"
        id="floatingTextarea2"
        style="height: 200px"
      ></textarea>
      
    </div>
  <div> Tu puntuación 
        <select class="my-3"id="puntaje">
        <option value=1>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
        </select></div>
        <button type="submit" class="btn btn-dark my-3" style="width:100px; float:right" id="enviar">Enviar</button></div>
         
  `;

  document.getElementById("comment-maker").innerHTML = giveAnOpinion;
}
function addComment(opinion) {
  let thought = document.getElementById("floatingTextarea2");
  opinion.push(thought.value);
  thought.value = "";
  showMyComment(opinion);
}
function showMyComment(opinion) {
  let lista = "";
  let customer = localStorage.getItem("nombre");
  let today = showTimeAndDate();

  let points = document.getElementById("puntaje").value;

  lista += `<li class="list-group-item rounded">
        <p style="font-weight: 600">${customer} <span class="star" id="stars">${showScore(
    points
  )}</> <span class="text-muted">${today}</span></p>
         <span>${opinion}</span>
      </li>`;

  document.getElementById("new-comment-container").innerHTML = lista;
}

function showTimeAndDate() {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds
  );
}
//FUNCIÓN QUE MUESTRA LOS PRODUCTOS RELACIONADOS
function showRelated() {
  let relatedInsideHtml = "";

  for (let i = 0; i < relatedProducts.length; i++) {
    let similar = relatedProducts[i];

    relatedInsideHtml += `
           <div onclick="setInfoID(${similar.id})" class="cards md-mx-auto"><div class="card"><img src="${similar.image}" class="rounded"></div><p class="mx-auto related-text">${similar.name}</p></div>`;

    document.getElementById("related-container").innerHTML = relatedInsideHtml;
  }
}
function setInfoID(id) {
  localStorage.setItem("ProdID", id);
  getRelated();
}
function getRelated() {
  localStorage.getItem("infoID");
  document.location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(url).then(function (resultObj) {
    if (resultObj.status === "ok") {
      info = resultObj.data;

      showInfo(info);

      pictures = resultObj.data;

      showInfoPictures(pictures);

      commentContainer();

      relatedProducts = resultObj.data.relatedProducts;

      showRelated(related);
      products = resultObj.data;
    }
  });

  getJSONData(comment_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comments = resultObj.data;

      showComment(comments);

      score = resultObj.data;

      showScore(score);
    }

    document.getElementById("enviar").addEventListener("click", () => {
      if (localStorage.getItem("nombre") === null) {
        swal("Espera", "Debes iniciar sesión primero!", "error");
      } else if (opinion != "") {
        swal("Lo siento", "Sólo puedes realizar un comentario!", "error");
      } else {
        addComment(opinion);
      }
    });
  });
});
