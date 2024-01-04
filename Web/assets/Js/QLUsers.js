
const fullname = document.querySelector("#fullname");
const address = document.querySelector("#address");
const workplace = document.querySelector("#workplace");
const phoneNumber = document.querySelector("#phoneNumber");
const email = document.querySelector("#email");
const user_id = document.querySelector("#user_id");

const listInput =document.querySelectorAll(".form__group input[type= text] ,input[type=date]");
const inputSearch = $("#input__search");
const btnSave = $(".btnSave");
const btnSearch = $("#btnSearch")
const form = $(".form__handicraft");
const btnCreate = $('.btnSave')

let isCreate = true;
let ListUser = JSON.parse(localStorage.getItem("ListUser") ) || []; 
function start(){
    renderListUser(ListUser)
    handleTextBtnSave()
}

start();

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

function handleReadOnLyInput(){
    if(isCreate){
        user_id.readOnly =false;
    }
    else{
        user_id.readOnly =true;
    }
} 

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

function checkFullName(input){
    if(input.value.trim() !=="" ){
        const fullname = input.value.trim();
        for(var i=0; i<fullname.length; i++){
            let number = parseInt(fullname[i]);
            console.log(parseInt(fullname[i] == NaN))
            if(!isNaN(number)){

                showError(input,"Tên thí sinh không chứa kí tự số !")
                return true;
            }
        }
    }
    return false;
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

function checkEmail(input) {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    if(input.value.trim() !== "")
    {
       if(pattern.test(input.value.trim())){
            showSuccess(input);
            return  false;

       }
       else{
        showError(input,"Email không hợp lệ");
        return true;
       }
    }
    
}

function checkSDT(input){
    if(input.value.trim() !=="" ){
        const siso = input.value.trim();
        for(var i=0; i<siso.length; i++){
            let number = parseInt(siso[i]);
            if(isNaN(number)){
                showError(input,"Số điện thoại không chứa kí tự chữ!")
                return true;
            }
        }
    }
    return false;
}

function checkUserIdError(input) {
    if(input.value !== "")
    {
        if(ListUser !== null){
            var user = ListUser.find(us=>{
                console.log( us.id === user_id.value.trim())
                return us.id === user_id.value.trim();
            })
            if(user === undefined){
                showSuccess(input)
            }
            else{
                showError(input,"Mã người dùng đã tồn tại !")
                return true
            }
        }
    }
    return false
   
}
listInput.forEach(item=>{
    item.onfocus= ()=>{
        showSuccess(item);
    }
})

form.on("submit",(e) => {
    e.preventDefault();
    const isEmptyError = checkEmptyError([fullname,address,workplace,phoneNumber,email,user_id]);
    const isEmailError = checkEmail(email);
    const isSDTError = checkSDT(phoneNumber);
    if(isEmptyError || isEmailError || isSDTError)
    {
        showErrorToast("Có lỗi !")
    }else{
         if(isCreate){
            const isUserIdError = checkUserIdError(user_id);
            if(!isUserIdError)
                handleCreate();
            else{
                showErrorToast("Có lỗi !")

            }
         }
         else{
            handleUpdate();
         }
    }

});

function renderListUser(ListUser){
    if(ListUser.length > 0){
        var html =  ListUser.map((item)=>{
            return `
            <tr data-id= "${item.id}">
                <td class="user_id">${item.id}</td>
                <td class="fullname">
                   ${item.fullname}
                </td>
                <td class="address">
                    ${item.address}
                </td>
                <td class="workplace">
                    ${item.workplace}
                </td>
                <td class="phoneNumber">
                   ${item.phoneNumber}
                </td>
                <td class="Email">
                    ${item.email}
                </td>
                <td>
                    <button class="btn btnDelete btn-outline-danger" onclick = activeFormConfirm(${"'"+item.id+"'"})>
                        Xóa
                    </button>
                    <button class="btn btnUpdate btn-outline-success" onclick = fillDataToInput(${"'"+item.id+"'"})>
                        Sửa
                    </button>
                </td>
            </tr>
            `
        })
        $(".table__data tbody").html(html.join(""));
    }
    else{
        $(".form__listdata tbody").html("Không có user nào!")
    }
}

function handleCreate(){

    const data = {
            "id": user_id.value.trim(),
            "fullname": fullname.value.trim(),
            "workplace": workplace.value.trim(),
            "email": email.value.trim(),
            "phoneNumber": phoneNumber.value.trim(),
            "address": address.value.trim()
    }
    ListUser.push(data)
    localStorage.setItem("ListUser",JSON.stringify(ListUser))
    showSuccessToast("Thêm thành công !")
    renderListUser(ListUser);
    clearData();
   

}


inputSearch.keypress( (e) => {
    if(e.keyCode === 13){
        if(inputSearch.val().trim() === ""){
            showErrorToast("Vui lòng nhập thông tin tìm kiếm!")
        }
        else{
            SearchUser();
        }
    }
})

btnSearch.on("click", (e) => {
    if(inputSearch.val().trim() === ""){
        showErrorToast("Vui lòng nhập thông tin tìm kiếm!")
    }
    else{

        SearchUser();
    }
})

function SearchUser(){
    if(ListUser.length > 0){
        const us =  ListUser.filter(us =>{
            return (us.id === inputSearch.val().trim()) 
                    || (us.fullname === inputSearch.val().trim()) 
                    || (us.address === inputSearch.val().trim()) 
        })
        if(us.length > 0 ){
            renderListUser(us)
        }
        else{
            $(".form__listdata tbody").html("Không có user nào!")
        }
        $("#input__search").val("")

    }

}

function activeFormConfirm(usid){
    openModalCofirmDelete("Bạn chắc chắn muốn xóa người dùng này?");
    $(".btnNo").on("click", ()=>{
        closeModalCofirmDelete();
    })
    $(".btnYes").on("click", ()=>{
        
        Delete(usid);
    });
}
function Delete(usid) {
    const newArray = ListUser.filter(user =>{
        return user.id !== usid;
    })
    localStorage.setItem("ListUser",JSON.stringify(newArray))

    closeModalCofirmDelete();
    
    showSuccessToast("Xóa thành công !")
    if(newArray.length > 0 ){
        ListUser = JSON.parse(localStorage.getItem("ListUser"));
    }
    else{
        $(".form__listdata tbody").html("Không có user nào!")
    }
    renderListUser(ListUser);
}


function fillDataToInput(usid) {
    const listTr =[... document.querySelectorAll("tbody tr")]
    const user = listTr.find(tr=>{
        return tr.dataset.id === usid
    })
     fullname.value = user.querySelector(".fullname").textContent.trim()
     address.value =user.querySelector(".address").textContent.trim()
     workplace.value =user.querySelector(".workplace").textContent.trim()
     phoneNumber.value =user.querySelector(".phoneNumber").textContent.trim()
     email.value =user.querySelector(".Email").textContent.trim()
     user_id.value =user.querySelector(".user_id").textContent.trim()
     isCreate = false
     handleTextBtnSave();
     handleReadOnLyInput()
}

function handleUpdate(){
    const data = {
        "id": user_id.value.trim(),
        "fullname": fullname.value.trim(),
        "workplace": workplace.value.trim(),
        "email": email.value.trim(),
        "phoneNumber": phoneNumber.value.trim(),
        "address": address.value.trim()
    }
    var user =  ListUser.map((us,index)=>{

        if( us.id === user_id.value.trim()){
            ListUser[index] = data
        }
        return;
    })
    localStorage.setItem("ListUser",JSON.stringify(ListUser))
    renderListUser(ListUser);
    isCreate = true
     handleTextBtnSave();
     showSuccessToast("Sửa thành công !")
     clearData();
     handleReadOnLyInput()
}


function clearData() {
    fullname.value=""
    address.value=""
    workplace.value=""
    phoneNumber.value=""
    email.value=""
    user_id.value = ""

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


