const navLopHp = $("#btnLopHP");
const navLopHc = $("#btnLopHC");
const inputMaLop = $("#malop");
const inputTenLop = $("#tenlop");
const inputSiSo = $("#siSo");
const makhoa = $("#makhoa");
const btnCreate = $('.btnSave')
const btnDelete = $('.btnDelete');
const btnYes=  $('#yesBtn');
const btnNo=  $('#noBtn');
const inputSearch = $(".search-input");
const navItem = document.querySelectorAll(".list-nav .nav-item")
let isCreate =true;
let isUpdate = false;
let isContent = false;
let isSearch = false;
let thisPage = 1;
let pageSize = 10;
function start(){
    isContent = true;
    GetKhoa();
    handleGetLop();
    $("h2.title").html("")
    $("h2.title").html("Quản lý lớp hành chính")
    handleTextBtnSave();
}
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

navItem.forEach(item => {
  
  item.onclick = ()=>{
    if(document.querySelector(".list-nav .nav-item.active")!==null){
      document.querySelector(".list-nav .nav-item.active").classList.remove("active")
      item.classList.add("active")
      
    }
  
  }
})
function GetKhoa(){
  $.get("https://localhost:7217/api/Khoa/GetListKhoa")
  .done(res=>{
    console.log(res);
    renderListKhoa(res);
  })
  .fail(err=>{
    console.log(err);
  })
}
function renderListKhoa(khoas){
  var html = khoas.map(khoa=>{
    return `
      
      <option value="${khoa["maKhoa"]}">${khoa["tenKhoa"]}</option>
    `
  })
  $("#makhoa").html(html)
}
function handleGetLop(){
    const data = {
        pageSize : pageSize,
        pageIndex:thisPage
    }
    getLop(data)
}
function getLop(data){
    $.post({
        url:"https://localhost:7217/api/Lop/Get_Lop",
        contentType:"application/json",
        data :JSON.stringify(data)
    }).done((res) => {
        console.log(res)
        renderLop(res)
    })
}
start()
function clearData(){
    inputMaLop.val("");
    inputTenLop.val("");
    inputSiSo.val("");
}
btnCreate.click(()=>{
    
    var data = {
        maLop: inputMaLop.val(),
        maKhoa: makhoa.val(),
        tenLop: inputMaLop.val(),
        siSo: inputSiSo.val()
    }
    if(isCreate){
      CreateLop(data);
    }
    else{
      console.log(data);
      UpdateLop(data);
    }
})
  
function CreateLop(data) {
    $.post({
        url:"https://localhost:7217/api/Lop/Create_Lop",
        data:JSON.stringify(data),
        contentType:"application/json"
    }).done((res)=>{
        if(res >=1)
        {
         alert("Thêm thành công")
         handleGetLop();
         clearData();
        }
        
    })
    .fail(err=>{
      alert(err.responseText);
      clearData();
    })
}


navLopHc.click(()=>{
    $(".title").html("")
    $(".title").html("Quản lý lớp hành chính")

});
navLopHp.click(()=>{
    $(".title").html("")
    $(".title").html("Quản lý lớp học phần")

});


function renderLop(lops){
    const countPage = Math.ceil(lops["totalItems"]/pageSize)
    renderListPage(countPage)
    var html = lops["data"].map(lop=>{
      getKhoaByID(lop["maKhoa"])
      var khoa = JSON.parse(localStorage.getItem("KhoaUpdate"));
        return `
        <tr class="tb-content" data-id = "${lop["maLop"]}">
          <td class="maKhoa" data-id="${khoa["maKhoa"]}">
            ${khoa["tenKhoa"]}
          </td>
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
                       <button type="button" class="btnDelete btn">Xóa</button>
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
    $(".btnDelete").on("click", ()=>{
      localStorage.setItem("maLopDelete",JSON.stringify(document.querySelector(".btnDelete").parentElement.parentElement.parentElement.parentElement.dataset.id));
      openModal();
    });
    
}

function renderListPage(count){
    $(".list-page div").html("")
    var html = ""

    if(count > 1){
      if(thisPage<count )
      {
        if(thisPage>=2)
        {
          for(var i=thisPage-1; i<=thisPage+1; i++){
            html+= `
              <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
            `
          }
        }
        else{
          for(var i=1; i<=thisPage+1; i++){
            html+= `
              <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
            `
          }
        }
      }
      else{
        if(thisPage>2)
        {
            for(var i=thisPage-2; i<=thisPage; i++){
                html+= `
                  <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
                `
              }
        }
        else{
            for(var i=1; i<=thisPage; i++){
                html+= `
                  <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
                `
              }
        }
      
      }
      $(".list-page div").html(html);
      $(".page-next").toggleClass("active-button",true)

    }
    else{
      $(".page-next").toggleClass("active-button",false)
      $(".page-prev").toggleClass("active-button",false)
    }
};
function changePage(index){
    thisPage = index;
    if(isContent){

      handleGetLop();
    }
    if(isSearch){
        handleSearchLop();
    }
    if(thisPage !=1){
        $(".page-prev").toggleClass("active-button",true)
    }
    else{
        $(".page-prev").toggleClass("active-button",false)
    }
   
};
function openModal(){
  $(".model").addClass("modal-open");
}
function hiddeModal(){
  $(".model").removeClass("modal-open");
}
btnNo.on("click", ()=>{
  console.log("oge")
  hiddeModal();
});
btnYes.on("click", ()=>{
  const malop = JSON.parse(localStorage.getItem("maLopDelete"));
  $.ajax({
    url: "https://localhost:7217/api/Lop/Delete_Lop"+'?malop='+malop,
    type: 'DELETE',
    contentType:"application/json;"
  }).done(res=>{
      hiddeModal();
      alert("Xóa thành công")
      handleGetLop();
  }).fail(err=>{
    console.log(err);
  })
});

function getKhoaByID(id){
  $.get("https://localhost:7217/api/Khoa/GetKhoaByID"+"?id="+id)
  .done(res=>{
    localStorage.setItem("KhoaUpdate",JSON.stringify(res));
  }).fail(err=>{
    console.log(err)
  });
};

function fillToInput(index){
  isCreate=false;
  isUpdate = true;
  handleTextBtnSave();
  var tb_content = [...document.querySelectorAll('.tb-content')].find((item)=>{
    if( Number(item.dataset.id) == index)
    return item;
});
  getKhoaByID(tb_content.querySelector(".maKhoa").dataset.id);
  var khoa =JSON.parse( localStorage.getItem("KhoaUpdate"));
    $("#makhoa").val(khoa["maKhoa"])
    $("#malop").val(tb_content.querySelector(".malop").textContent.trim());
    $("#tenlop").val(tb_content.querySelector(".tenlop").textContent.trim());
    $("#siSo").val(tb_content.querySelector(".siSo").textContent.trim());

};

inputSearch.keypress(e=>{
  if(e.keyCode === 13){
    if(inputSearch.val() !=="")
    {
      isSearch = true;
      isContent = false;
      localStorage.setItem("valueSearch", JSON.stringify(inputSearch.val()));
      handleSearchLop();
    }
    else{
      isSearch = false;
      isContent = true;
    }
}
})
function handleSearchLop(){
  if(inputSearch.val() ===""){
    var valueSearch = JSON.parse(localStorage.getItem("valueSearch"));
    var data = {
      pageIndex: thisPage,
      pageSize: pageSize,
      value:valueSearch
    };
    SearchLop(data);
  }
  else{
    var data = {
      pageIndex: thisPage,
      pageSize: pageSize,
      value:inputSearch.val()
    };
    SearchLop(data);

  }
  
}

function SearchLop(data){
  $.post({
    url:"https://localhost:7217/api/Lop/Search_Lop",
    data : JSON.stringify(data),
    contentType : "application/json"
  
  })
  .done(res=>{
    renderLop(res)
  })
  .fail(err=>{
    console.log(err);
  })

}
  
