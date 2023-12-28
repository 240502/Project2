const inputHoTen = $("#fullname");
const username = $("#username");
const password = $("#password");
const workplace = $("#workplace");
const email = $("#email");
const phoneNumber = $("#phoneNumber");
const address = $("#address");
const btnSave= $(".btnSave");

const roleNav =$(".user div p:last-child");

const btnShowPass = $(".btnShowPass");

const Account = JSON.parse(localStorage.getItem("account"));



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
function start() {
    renderInfo()

}
start();

btnShowPass.on("click", ()=>{
    console.log(document.querySelector("button.show"))
    if(document.querySelector("button.show")){
        btnShowPass.removeClass("show");
        $("#password").prop("type", "password");

    }
    else{
        btnShowPass.addClass("show");
        $("input[type=password]").prop("type", "text");
    }
       
   
});




function renderInfo(){
    if(RoleId == 1)
    {

        inputHoTen.val("Super Admin")
        email.val("admin@gmail.com")

    }
    else{
        inputHoTen.val("Giảng viên coi thi")
        email.val("giangvien@gmail.com")

    }
    username.val(Account.username)
    password.val(Account.password)
    workplace.val("Đại học SPKT Hưng Yên")
    phoneNumber.val("098909898798")
    address.val("Hưng Yên")
   
}



