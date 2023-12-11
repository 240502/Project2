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
  