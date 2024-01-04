const inputMaLop = document.querySelector("#malop");
const inputTenLop = document.querySelector("#tenlop");
const inputSiSo = document.querySelector("#siso");
const makhoa = document.querySelector("#makhoa");
const gvcm = document.querySelector("#gvcm");

const btnCreate = $('.btnSave')
const btnDelete = $('.btnDelete');
const inputSearch = $("#input__search");
const btnLogin =$(".btnLogOut");
const btnSearch = $("#btnSearch")
const form = $(".form__handicraft")
const navItem = document.querySelectorAll(".list-nav .nav-item")
let isCreate =true;
let isContent = true;
let ListClass = JSON.parse(localStorage.getItem("ListClass")) || []
function start(){
  renderListKhoa()
  handleTextBtnSave();
  handleGetListLop();
}
start();
function handleReadOnLyInput(){
  if(isCreate){
    inputMaLop.readOnly =false;
  }
  else{
    inputMaLop.readOnly =true;
  }
} 
function showError (input,message){
  let parent = input.parentElement;
  let error__message = parent.querySelector(".error_message");
  parent.classList.add("error");
  error__message.textContent=message;
}

$(".btnLogoff").on("click", ()=>{
  openModalCofirmDelete("Bạn chắc chứn muốn đăng xuất!");
  $(".btnNo").on("click", ()=>{
      closeModalCofirmDelete();
  })
  $(".btnYes").on("click", ()=>{
      localStorage.setItem("account",null)
      window.location = "DangNhap.html";
  });
})


function showSuccess(input){
  let parent = input.parentElement;
  let error__message = parent.querySelector(".error_message");
  parent.classList.remove("error");
  error__message.textContent="";

}


function checkEmptyError(listInput){
  let isEmptyError = false;
  listInput.forEach(input => {
      input.value = input.value.trim();
      if(!input.value )
      {
          isEmptyError = true;
          showError(input,"Không được để trống ô này!");
      }
      else{
          showSuccess(input);
      }
      
  });

  return isEmptyError
}


document.querySelectorAll(".form__handicraft input").forEach((item) => {
  item.onfocus= ()=>{
    showSuccess(item);
  }

})



function checkSiSo(input){
  if(input.value.trim() !=="" ){
      const siso = input.value.trim();
      for(var i=0; i<siso.length; i++){
          let number = parseInt(siso[i]);
          if(isNaN(number)){
              showError(input,"Sĩ số không chứa kí tự chữ!")
              return true;
          }
      }
  }
  return false;
}

function checkTenLop(input,makhoa){
  if(input.value !=""){
    var lop = ListClass.find(item =>{
      return item.tenLop == input.value && item.maKhoa === makhoa;
    }) 
    if(lop)
    {
     showError( input,"Tên lớp đã tồn tại !");
     return true;
    }
     else{
      showSuccess(input);
     }
  }
  return false;
}

function checkMaLop(input,makhoa){
  if(ListClass.length > 0){
    if(input.value !=""){
      var lop = ListClass.find(item =>{
        return item.maLop == input.value  && item.maKhoa == makhoa;
      }) 
      if(lop){
      
       showError( input,"Mã lớp đã tồn tại !");
       return true;
      
      
      } 
      else{
        showSuccess(input);
      }
    }
  }
  return false;
}

form.on("submit",(e)=>{
  e.preventDefault();
  const isEmpty = checkEmptyError([inputMaLop,inputTenLop,inputSiSo])
  const isSiSoError = checkSiSo(inputSiSo);
 
  if(isEmpty || isSiSoError){

  }
  else{
    if(isCreate){
      const isMaLopError = checkMaLop(inputMaLop,makhoa.value.trim());
      const isTenLopError = checkTenLop(inputTenLop,makhoa.value.trim());
      if(isMaLopError || isTenLopError ){
        showErrorToast("Có lỗi!")
      }
      else{
        handleCreate();
      }
    }
    else{
      handleUpdate();
    }
  }
});


function handleTextBtnSave(){
  if(isCreate)
    {
      btnCreate.html("");
      btnCreate.html("Thêm mới");

    }
    else{
      btnCreate.html("");
      btnCreate.html("Lưu"); 
    }
}

function renderListKhoa(){
  const ListKhoa = [
    {
      makhoa:"CNTT",
      tenKhoa:"Công Nghệ Thông Tin"
    },
    {
      makhoa:"Đ-ĐT",
      tenKhoa:"Điện - Điện tử"
    },
    {
      makhoa:"CK",
      tenKhoa:"Cơ Khí"
    }
    
  ]
  var html = ListKhoa.map(khoa=>{
    return `
      
      <option value="${khoa["makhoa"]}">${khoa["tenKhoa"]}</option>
    `
  })
  $("#makhoa").html(html);
  $(".listdata__select__makhoa").html(html);
}
function handleGetListLop(){
  const newArray = ListClass.filter(lop=>{
    return lop.maKhoa === $("#makhoa").val()
  })
  renderLop(newArray)
}
function renderLop(listlop){
  if(listlop.length > 0){
    var html = listlop.map(lop=>{
      return `
      <tr class="tb-content" data-id = "${lop["maLop"]}">
        <td class="malop" >
            ${lop["maLop"]}
        </td>
        <td class="tenlop">
            ${lop["tenLop"]}
        </td>
        <td class="siSo">
           ${lop["siSo"]}
        </td>
        <td>
             <div class="group-btn">
                 <div class="group-delete">
                     <button type="button" class="btnDelete btn" onclick = acitveFormConfirm(${"'"+lop["maLop"]+"'"})>Xóa</button>
                 </div>

                 <div class="group-update">
                     <button type="button" class="btnUpdate btn" onclick = "fillToInput(${lop["maLop"]})">Sửa</button>
                 </div>
             </div>
        </td>
     </tr>
      `
    })
    $("tbody").html(html.join(''))
  }
  else{
    $("tbody").html("Không có lớp nào!")
  }
  
}
$(".listdata__select__makhoa").on("change", ()=>{
  const newArray = ListClass.filter(lop=>{
    return lop.maKhoa === $(".listdata__select__makhoa").val()
  })
  renderLop(newArray)
})
function clearData(){
    inputMaLop.value =""
    inputTenLop.value = "";
    inputSiSo.value = "";
}

function handleCreate(){
  const data=
  {
    "maLop": inputMaLop.value.trim(),
    "maKhoa": makhoa.value.trim(),
    "tenLop": inputTenLop.value.trim(),
    "siSo": inputSiSo.value.trim()
  
  }
  ListClass.push(data);
  localStorage.setItem("ListClass",JSON.stringify(ListClass));
  showSuccessToast("Thêm thành công !")
  renderLop(ListClass);
  clearData();
}



function acitveFormConfirm(id){
  openModalCofirmDelete("Bạn chắc chắn muốn xóa lớp này");
  const btnYes = $(".btnYes");
  const btnNo = $(".btnNo");
  btnNo.on("click", ()=>{
    closeModalCofirmDelete();
  });
  btnYes.on("click", ()=>{
    Delete(id)
  });
}
function Delete(malop){
  const newArray = ListClass.filter(lop =>{
    return lop.maLop !== malop;
  })
  localStorage.setItem("ListClass",JSON.stringify(newArray))
  closeModalCofirmDelete();
  showSuccessToast("Xóa thành công !")
  if(newArray.length > 0 ){
      ListClass = JSON.parse(localStorage.getItem("ListClass"));
  }
  else{
      $(".form__listdata tbody").html("Không có lớp nào!")
  }
  renderLop(ListClass);
}


function fillToInput(index){
  isCreate=false;
  handleTextBtnSave();
  handleReadOnLyInput()
  var tb_content = [...document.querySelectorAll('.tb-content')].find((item)=>{
    if( Number(item.dataset.id) == index)
    return item;
});
    $("#makhoa").val($(".listdata__select__makhoa").val())
    $("#malop").val(tb_content.querySelector(".malop").textContent.trim());
    $("#tenlop").val(tb_content.querySelector(".tenlop").textContent.trim());
    $("#siso").val(tb_content.querySelector(".siSo").textContent.trim());
    isCreate =false;
};
function handleUpdate(){
  var data = {
      "maLop": inputMaLop.value.trim(),
      "maKhoa": makhoa.value.trim(),
      "tenLop": inputTenLop.value.trim(),
      "siSo": inputSiSo.value.trim()
  }
  ListClass.map((lop,index) =>{
    if(lop.maLop ===inputMaLop.value.trim() )
    {
      ListClass[index] = data
    }
    return
  })
  localStorage.setItem("ListClass",JSON.stringify(ListClass))
  showSuccessToast("Sửa thành công!")
  renderLop(ListClass)
  isCreate = true;
  clearData();
  handleTextBtnSave();
  handleReadOnLyInput()
}

inputSearch.keypress(e=>{
  if(e.keyCode === 13){
    if(inputSearch.val() !=="")
    {
      isContent = false;
      localStorage.setItem("valueSearch", JSON.stringify(inputSearch.val()));
      handleSearchLop();
    }
  
  }
})
btnSearch.on("click",()=>{
  if(inputSearch.val() !=="")
  {
    handleSearchLop();
  }
})
function handleSearchLop(){
  if(ListClass.length > 0){
    const lop =  ListClass.filter(l =>{
        return (l.maLop === inputSearch.val().trim()) 
                || (l.tenLop === inputSearch.val().trim()) 
                || (l.siSo === inputSearch.val().trim()) 
    })
    if(lop.length > 0){
        renderLop(lop)
    }
    else{
        $(".form__listdata tbody").html("Không có lớp nào!")
    }
    $("#input__search").val("")

  }

}
  





