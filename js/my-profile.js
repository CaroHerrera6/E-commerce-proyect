let userName = document.getElementById("userName");
let userLastName = document.getElementById("userLastName");
let userEmail = document.getElementById("userEmail");
let profileForm = document.getElementById("profile-form");
let defaultImg =
  "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa.png";

document.getElementById("profile-btn").addEventListener("click", () => {
  userName.value === "" || userLastName.value === "" || userEmail.value === ""
    ? profileForm.classList.add("was-validated")
    : (swal("Excelente", "Tus datos han sido guardados!", "success"),
      localStorage.setItem("userName", userName.value),
      localStorage.setItem("userLastName", userLastName.value));
});

function loadMyImg() {
  let filesSelected = document.getElementById("inputImgLoad").files;
  if (filesSelected.length > 0) {
    let fileToLoad = filesSelected[0];

    let fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      let srcData = fileLoadedEvent.target.result;
      document.getElementById("image").src = srcData;
      localStorage.setItem("userPic", JSON.stringify(srcData));
    };

    fileReader.readAsDataURL(fileToLoad);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  usuario === null
    ? (window.location.href = "login.html")
    : ((userEmail.value = localStorage.getItem("email")),
      (userName.value = localStorage.getItem("userName")),
      (userLastName.value = localStorage.getItem("userLastName")));
  let profilePic = localStorage.getItem("userPic");
  if (profilePic != null) {
    document.getElementById("image").src = JSON.parse(
      localStorage.getItem("userPic")
    );
  } else {
    document.getElementById("image").src = defaultImg;
  }
});
