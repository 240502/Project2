
const  inputUsName = $(".userName");
const inputPassword = $(".password");
const btnLogin = $(".btnLogin");




const listRole_item = document.querySelectorAll(".role__item");



listRole_item.forEach(item=>{
    item.onclick =()=>{
        if(document.querySelector("li.role__item.active"))
        {
            document.querySelector("li.role__item.active").classList.remove("active");
        }
        item.classList.add("active");
       
    }
})


function handleLogin(){
    if( document.querySelector("li.role__item.active").dataset.id === "1"){
        console.log(inputPassword.val())

        if(inputPassword.val() === "123456" && inputUsName.val() === "sinhvien"){
            window.location = "./ChonBaiThi.html";
            console.log("opge")
        }
    }
    if( document.querySelector("li.role__item.active").dataset.id === "2"){
        window.location = "./TaiKhoan.html";
    }
    if( document.querySelector("li.role__item.active").dataset.id === "3"){

        console.log("3")
    }
};

btnLogin.on("click", ()=>{
    handleLogin();

});