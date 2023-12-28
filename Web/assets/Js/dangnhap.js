
const  inputUsName = document.querySelector(".userName");
const inputPassword =  document.querySelector(".password");
const btnLogin = $(".btnLogin");


const listRole_item = [...document.querySelectorAll(".role__item")];



listRole_item.forEach(item=>{
    item.onclick =()=>{
        if(document.querySelector("li.role__item.active"))
        {
            document.querySelector("li.role__item.active").classList.remove("active");
        }
        item.classList.add("active");
        clearAllData();
       
    }
})
function showError (input,message){
    let parent = input.parentElement;
    let error__message = parent.querySelector(".error_message");
    parent.classList.add("error");
    error__message.textContent=message;
}

function showSuccess(input){
    let parent = input.parentElement;
    let error__message = parent.querySelector(".error_message");
    parent.classList.remove("error");
    error__message.textContent="";
  
}
document.querySelectorAll("input").forEach(item=>{
    item.onfocus = ()=>{
        showSuccess(item);
    }
})
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
btnLogin.on("click", ()=>{
    handleLogin();

});
function handleLogin(){
    const isEmptyError = checkEmptyError([inputUsName,inputPassword]);
    if(!isEmptyError){
        const data = {
            username : inputUsName.value.trim(),
            password : inputPassword.value.trim()
        }
        Login(data);
    }
};
function Login(data) {
    let role_id = 0;
    var role__item__active = listRole_item.find(item=>{
        return item.classList.contains("active");
    })
    if(Number(role__item__active.dataset.id)  == 3 && (data.username =="thisinh" && data.password ==="123456") ){
            window.location = "./ChonBaiThi.html";
            role_id = 3;

    }
    else if(Number(role__item__active.dataset.id)  == 2 && (data.username =="giangvien" && data.password ==="123456") ){
        window.location = "./TaiKhoan.html";
        role_id = 2;
        
    }
    else if(Number(role__item__active.dataset.id)  == 1 && (data.username =="admin" && data.password ==="123456") ){
        window.location = "./TaiKhoan.html";
        role_id = 1;
    }
    else{
        showErrorToast("Thông tin đăng nhập không đúng!");
        clearPass();
    }
    localStorage.setItem("account", JSON.stringify(data));

    localStorage.setItem("role_id", JSON.stringify(role_id));
}




function clearPass(){
    inputPassword.value = "";
}
function clearAllData(){
    inputPassword.value = "";
    inputUsName.value = "";

}