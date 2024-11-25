var setNameInput = document.getElementById("Name");
var setUrlInput = document.getElementById("URL");
submit.addEventListener("click", function () {
  addData();
});
var dataList;
if (localStorage.getItem("data") == null) {
  dataList = [];
} else {
  dataList = JSON.parse(localStorage.getItem("data"));
  display();
}

function addData() {
  if (
    setNameInput.classList.contains("is-valid") &&
    setUrlInput.classList.contains("is-valid")
  ) {
    var data = {
      name: setNameInput.value,
      url: setUrlInput.value,
    };

    dataList.push(data);
    localStorage.setItem("data", JSON.stringify(dataList));
    display();
    clear();
  } else {
    console.log("hello");
    var cartona = "";
    cartona += `<div class="light-box-container ">
         <div class="light-box">
          <i class="fa-regular fa-circle-xmark exit " onclick="closeing()"></i>
          <div class="round"></div>
         <p class="p-light">Site Name or Url is not valid, Please follow the rules below :</p> 
          <p><i class="fa-regular fa-circle-right" style="color: #b81919;"></i>Site name must contain at least 3 characters Site URL must be a valid one</p> 
          <p><i class="fa-regular fa-circle-right" style="color: #b81919;"></i>Site URL must be a valid one</p>
          
        </div> 
      </div> `;
    document.getElementById("cartona").innerHTML = cartona;
  }
}
function closeing() {
  document.getElementById("cartona").innerHTML = "";
}

function display() {
  var cartona = "";

  for (var i = 0; i < dataList.length; i++) {
    cartona += `<tr>
            <td>${i+1}</td>
            <td>${dataList[i].name}</td>
            <td><button   id="visit"  class="visit" onclick="visit('${dataList[i].url}')"><i class="fa-solid fa-eye pe-2"></i>visit</button> </td>
            <td> <button onclick="deleteData(${i})" class="delete" id="deleted"><i class="fa-solid fa-trash"></i>Delete</button></td>
           
          </tr>`;
  }
  document.getElementById("t-body").innerHTML = cartona;
}

function clear() {
  setNameInput.value = null;
  setUrlInput.value = null;
}

function deleteData(deletedIndex) {
  dataList.splice(deletedIndex, 1);
  display();
  localStorage.setItem("data", JSON.stringify(dataList));
}

function validation(element) {
  var regex = {
    Name: /^\w{3,}$/,
    URL: /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-z]{2,})$/,
  };
  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function visit(url) {
  if (url && url.startsWith("http")) {
    window.open(url, "_blank");
  } else {
    alert("Invalid URL!");
  }
}