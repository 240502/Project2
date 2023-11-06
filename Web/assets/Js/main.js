const navLopHp = $("#btnLopHP");
const navLopHc = $("#btnLopHC");
const inputMaLop = $("#malop");
const inputTenLop = $("#tenlop");
const inputSiSo = $("#siSo");
const makhoa = $("#makhoa");
const btnCreate = $('.btnSave')

isCreate =true;
isUpdate = false;

let thisPage = 1;
let pageSize = 10;
function start(){
    GetKhoa();
    handleGetLop();
    $(".title").html("")
    $(".title").html("Quản lý lớp hành chính")
}



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
      CreateLop(data)
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
        else alert("Thêm thất bại")
    })
}

function DeleteLop(malop){
  $.ajax({
      url: "https://localhost:7217/api/Lop/Delete_Lop"+'?malop='+malop,
      type: 'DELETE',
      contentType:"application/json;"
  }).done(res=>{
      alert("Xóa thành công")
      handleGetLop();

  });
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
        return `
        <tr class="tb-content" data-id = "${lop["maLop"]}">
          <td class="maKhoa" >
            ${lop["maKhoa"]}
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
                       <button type="button" class="btnDelete btn" onclick = "DeleteLop(${"'"+(lop["maLop"])+"'"})">Xóa</button>
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
      $(".page-prev").toggleClass("active-button",true)
    }
};
function changePage(index){
    thisPage = index;
    handleGetLop();
    if(thisPage !=1){
        $(".page-prev").toggleClass("active-button",true)
    }
    else{
        $(".page-prev").toggleClass("active-button",false)
    }
   
  };