function modalConfirmDelete(title = ""){
    let html = `
    <div class="modal-confirm-header">
      <h3>Thông báo</h3>
      <div class="modal-confirm-close">
          <i class="fa-solid fa-xmark" style="color: #000000;"></i>
      </div>
      <h4 class="modal-confirm-title">
          ${title}
      </h4>
    </div>
    <div class="modal-confirm-action">
      <button type="button" class="btn btnNo">
          Hủy
      </button>
      <button type="button" class="btn btnYes" >Đồng ý</button>
    </div>
    
    ` 
    $(".modal-confirm-content").html(html);
    $(".modal-confirm-close").on('click', ()=>{
      closeModalCofirmDelete();
    });
  };
  
  function openModalCofirmDelete(title){
    modalConfirmDelete(title);
    $("#modal-confirm-delete").addClass("opened");
  };
  
  function closeModalCofirmDelete(){
  
    $("#modal-confirm-delete").removeClass("opened");
  };
  

  
$(".modal-confirm-content").on('click', (e)=>{
    e.stopPropagation();
  });
  
  $("#modal-confirm-delete").on('click', ()=>{
    closeModalCofirmDelete();
  });