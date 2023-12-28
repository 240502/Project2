const btnActiveFormHandicraft = $(".btnInputHandicraft");
const btnActivFormInputFile = $(".btnInputFile");
const listSideBar = [...document.querySelectorAll(".sidebar li")]; 
const fullnameNav =$(".bole");
let btn = document.querySelector("#btn");

let sidebar = document.querySelector(".sidebar");
const account = JSON.parse(localStorage.getItem("account"));
const user = JSON.parse(localStorage.getItem("user_info"));
const RoleId = JSON.parse(localStorage.getItem("role_id"));
btn.onclick = function() {
    sidebar.classList.toggle("active");
};


function run(){
  activeFormInputHandicraft();
  handleNav();
  renderInfoNav()
}


run();
function renderInfoNav(){
  let roleName = ""

  if(RoleId ==1)
  {
    fullnameNav.html( "Admin");
    roleName = "Administrator"  
  }
  if(RoleId == 2){
    fullnameNav.html( "Giảng Viên");
      roleName = "Giảng viên coi thi"
  }
  $(".user div p:last-child").html(roleName)
}


function handleNav(){
  if(RoleId === 2) 
  {
    listSideBar.forEach(element => {
      console.log(element.classList.contains("giangvien"));
      if(element.classList.contains("giangvien")){
        element.classList.add("acitve");
      }

    });

  }
  else{
    listSideBar.forEach(element => {
      if(element.classList.contains("admin")){
        element.classList.add("acitve");
      }

    });
  }
}


btnActiveFormHandicraft.on("click", ()=>{
    if($(".option__input .active")){
      $(".option__input .active").removeClass("active");
    }
    btnActiveFormHandicraft.addClass("active");
    CloseFormInputFile();
    activeFormInputHandicraft();
  });
  
  btnActivFormInputFile.on("click", ()=>{
    if($(".option__input .active")){
      $(".option__input .active").removeClass("active");
    }
    btnActivFormInputFile.addClass("active");
    CloseFormInputHandicraft();
    activeFormInputFile();
  })
  
function activeFormInputHandicraft (){
  $(".form__handicraft").addClass("open");
}
function activeFormInputFile (){
  $(".form_inputFile").addClass("open");
}

function CloseFormInputHandicraft() { 
  $(".form__handicraft").removeClass("open");


}
function CloseFormInputFile() { 
  $(".form_inputFile").removeClass("open");


}
  



function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle"
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
};
function showSuccessToast(message) {
  toast({
    title: "Thành công!",
    message: message,
    type: "success",
    duration: 3000
  });
}

function showErrorToast(message) {
  toast({
    title: "Thất bại!",
    message: message,
    type: "error",
    duration: 3000
  });
};