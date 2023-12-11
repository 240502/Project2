
const  inputUsName = $(".userName");
const inputPassword = $(".password");
const btnLogin = $(".btnLogin");


function handleLogin (){
    if( inputPassword.val() !=="" && inputUsName.val() !==""){
        console.log("Login")
        window.location = "./QLLop.html";
    }
};

btnLogin.on("click", ()=>{
    console.log(inputPassword.val() !=="" && inputUsName.val() !=="")
    handleLogin();

});