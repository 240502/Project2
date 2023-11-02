const navLopHp = $("#btnLopHP");
const navLopHc = $("#btnLopHC");
const inputMaLop = $("#ma_lop");
const inputTenLop = $("#ten_lop");
const inputSiSo = $("#si_so");
const listKhoa = $("#listKhoa");
const btnCreate = $('.btnCreate')

let thisPage = 1;
let pageSize = 10;
function start(){
    handleCreateLop();
    handleGetLop();
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
function handleCreateLop(){
    btnCreate.click(()=>{
        
        var data = {
            maLop: inputMaLop.val(),
            maKhoa: listKhoa.val(),
            tenLop: inputMaLop.val(),
            siSo: inputSiSo.val()
        }
        CreateLop(data)
     })
  
}
function CreateLop(data) {
    $.post({
        url:"https://localhost:7217/api/Lop/Create_Lop",
        data:JSON.stringify(data),
        contentType:"application/json"
    }).done((res)=>{
        if(res >=1)
        {
         alert("Thêm thành công")
         handleCreateLop();
         clearData();
        }
        else alert("Thêm thất bại")
    })
}

navLopHc.click(()=>{
    $(".title").html("")
    $(".title").html("Quản lý lớp hành chính")

});
navLopHp.click(()=>{
    $(".title").html("")
    $(".title").html("Quản lý lớp học phầm")

});


function renderLop(lops){
    const countPage = Math.ceil(lops["totalItems"]/pageSize)
    renderListPage(countPage)
    var html = lops["data"].map(lop=>{
        return `
            <div class="list-item">
                <p class="ma_lop">${lop["maLop"]}</p>
                <p class="ten_lop">${lop["tenLop"]}</p>
                <p class="Si_so">${lop["siSo"]}</p>
                <div class="group-btn">
                    <div class="group-delete">
                        <button type="button" class="btnDelete btn">Xóa</button>
                    </div>

                    <div class="group-delete">
                        <button type="button" class="btnUpdate btn">Sửa</button>
                    </div>
                </div>
            </div>
        `
    })
    $(".container").html(html.join(''))
}

function renderListPage(count){
    $(".list-page div").html("")
    var html = ""
    console.log(count)
    console.log(thisPage)

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