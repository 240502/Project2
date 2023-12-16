const btnActiveFormHandicraft = $(".btnInputHandicraft");
const btnActivFormInputFile = $(".btnInputFile")
let btn = document.querySelector("#btn");

let sidebar = document.querySelector(".sidebar");

btn.onclick = function() {
    sidebar.classList.toggle("active");
};


function run(){
  activeFormInputHandicraft();

}

run();

function modalConfirm(title = ""){
    $(".modal-confirm-title").html(title);
    $(".modal-confirm-close").on('click', ()=>{
        closeModalCofirm();
    });
};
  
function openModalCofirm(title){
  modalConfirm(title);
  $("#modal-confirm").addClass("opened");
};

function closeModalCofirm(){

    $("#modal-confirm").removeClass("opened");
};
  




$(".modal-confirm-content").on('click', (e)=>{
    e.stopPropagation();
});
  
$("#modal-confirm").on('click', ()=>{
    closeModalCofirm();
});
  


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
  