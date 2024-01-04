

const malop = document.querySelector(".select__malop");
const hoten = document.querySelector("#fullname");
const sbd = document.querySelector("#sbd");
const birthday = document.querySelector("#birthday");
const male = document.querySelector("#radio__male");
const female = document.querySelector("#radio__female"); 
const address = document.querySelector("#address");
const group_exam = document.querySelector("#group_exam");
const btnSave = document.querySelector(".btnSave");
const inputSearch = $("#input__search");
const listInput =document.querySelectorAll(".form__group input[type= text] ,input[type=date]");
const seletMaLopListData = $(".listdata__select__malop");
const form = $(".form__handicraft")
const btnCreate = $('.btnSave')
const btnSearch = $("#btnSearch")

let isCreate = true;
let ListClass = JSON.parse(localStorage.getItem("ListClass")) || [];
let ListStudent = JSON.parse(localStorage.getItem("ListStudent")) || []
function start (){
    renderListLop()
    $("tbody").html("Vui lòng chọn lớp!")
    handleReadOnLyInput();
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
        sbd.readOnly =false;
    }
    else{
        sbd.readOnly =true;
    }
}  

function renderListLop() {
    var html = "<option selected  value='0'>Mã lớp...</option>"
    html +=ListClass.map(item =>{
        return `
        <option value="${item.maLop}">${item.maLop}</option>
        `
    })
    $(".listdata__select__malop").html(html);
    $(".select__malop").html(html);
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

function checkLengthError (input,min,max){
    if(input.value.trim()!=="")
    {
        if(input.value.length < min){
            showError(input, `Phai co it nhat ${min} ki tu`)
            return true;
        }
        if(input.value.length > max){
            showError(input, `Khong duoc qua ${max} ki tu`)
            return true;
    
        }
    }
    return false;
}

function checkMaLop(input){
    if(input.value.trim() =="0")
    {
        showError(input, "Vui lòng chọn mã lớp !")
        return true;
    }
    else showSuccess(input)
    return false;
}

function checkBirthDay(input, min, max){
   if(input.value.trim() !==""){
    const yearNow = new Date().getFullYear();
    let year = input.value.slice(0, 4);
    let distance = yearNow - Number(year);
    if( distance < min ){
        showError(input, `Ngày sinh không hợp lệ!`)
        return true;
    }
    if( distance > max ){
        showError(input, `Ngày sinh không hợp lệ!`)
        return true;

    }
   }
    return false;

}

function checkGender(){
    var parent =  document.querySelector(".group__radio").parentElement;
    var error__message = parent.querySelector((".error_message"))
    if(female.checked == false && male.checked == false){
        parent.classList.add("error");
        error__message.textContent = "Vui lòng chọn giới tính thí sinh";
        return true;
    }
    else {
       
        parent.classList.remove("error");
        error__message.textContent = "";
    }
    return false;
}

function checkMaThiSinh(input){
    if(input.value !=="")
    {
        var thisinh = ListStudent.find(item => 
        {
            return item.maThiSinh === sbd.value
        })
        if(thisinh){
            showError( input,"Mã thí sinh đã tồn tại !");
            return true;
        }
        else{
            showSuccess(input)
        }
    }
    return false;
}

document.querySelectorAll("input[type=radio").forEach(item=>{item.onclick = ()=>{
    if(item.checked){
        showSuccess(document.querySelector(".group__radio ~ .error_message"));
    }
}})

malop.onchange = ()=>{
    if(malop.value !=="0"){
        showSuccess(malop);
    }
}

listInput.forEach(item=>{
    item.onfocus= ()=>{
        showSuccess(item);
    }
})

form.on("submit",(e)=>{
    e.preventDefault();
    let isEmptyError =  checkEmptyError([hoten,sbd,birthday,address,group_exam])
    let isSBDLengthError = checkLengthError(sbd,3,8)
    let isCheckMaThiSinhError=true;
  
    let isBirhtDayError = checkBirthDay(birthday,18,50);
    let isFullNameError = checkFullName(hoten);
    let isGenderError = checkGender();
    let isMaLopError = checkMaLop(malop); 
    if(isEmptyError || isSBDLengthError || isBirhtDayError || isFullNameError || isMaLopError ||isGenderError){
        showErrorToast("Có lỗi!");

    }
    else{
        
        if(isCreate){
            if(!isSBDLengthError){
                var isError = checkMaThiSinh(sbd);
                isCheckMaThiSinhError = isError;
            }
            
            if(!isCheckMaThiSinhError)
            {
                console.log(isCreate);

                handleCreate();
            }
            else{
                showErrorToast("Có lỗi!");
            }
        }
        else{
            handleUpdate();
        }
    }
  
});



seletMaLopListData.on("change",()=>{
    if(seletMaLopListData.val() ==="0"){
        $("tbody").html("Vui lòng chọn mã lớp !");
    }
    else{
        var list =  ListStudent.filter(st=>{
            return st.maLop === seletMaLopListData.val()
        })
        renderListThiSinh(list)
    }
});
function renderListThiSinh(data){
    var html = data.map(item=>{
        return `

         <tr data-id="${item.maThiSinh}">
                               
             <td class="hoten">
                ${item.hoten}
             </td>
             <td class="maThiSinh">
                 ${item.maThiSinh}
             </td>
             <td class="ngaySinh">
                 ${item.ngaySinh.slice(0,10)}
             </td>
             <td class="gioitinh">
                 ${item.Gioitinh}
             </td>
             <td class="diaChi">
                ${item.diaChi}
             </td>
             <td class="password">
                 ${item.password}
             </td>
            <td class="nhomThi">
                ${item.nhomThi}
            </td>
            <td class="maLop">
                ${item.maLop}
            
            </td>
             <td>
                 <button class="btn btnDelete btn-outline-danger" onclick = activeModalConfirm(${"'"+item.maThiSinh+"'"})>
                     Xóa
                 </button>
                 <button class="btn btnUpdate btn-outline-success" onclick = fillDataToInput(${"'"+item.maThiSinh+"'"}) >
                     Sửa
                 </button>
             </td>
        </tr>
        
        `
    })
    $("table tbody").html(html);
}

function handleCreate(){
    let gender="";
    if(female.checked){
        gender="Nữ";
    }
    if(male.checked){
        gender="Nam";
    }
    const data= {
            maThiSinh: sbd.value,
            maLop: malop.value,
            hoten: hoten.value,
            Gioitinh:gender,
            password:"123456",
            ngaySinh: birthday.value,
            diaChi: address.value,
            nhomThi: group_exam.value,
    }
    ListStudent.push(data);
    localStorage.setItem("ListStudent",JSON.stringify(ListStudent))
    $(".listdata__select__malop").val(malop.value)
    renderListThiSinh(ListStudent)
    showSuccessToast("Thêm thành công!")
    clearData()
    seletMaLopListData.val(malop.value)

}
function fillDataToInput(id){
    isCreate =false;
    handleTextBtnSave();
    handleReadOnLyInput();
    handleTextBtnSave()
    var tr = [...document.querySelectorAll("tbody tr")].find(item=>{
        return item.dataset.id === id;
    })
    var gender = tr.querySelector(".gioitinh").textContent.trim();
    if(gender.toLowerCase() ==="nữ"){
        female.checked = true;
    }
    else{
        male.checked =true;
    }
    malop.value = tr.querySelector(".maLop").textContent.trim();
    hoten.value = tr.querySelector(".hoten").textContent.trim();
    sbd.value = tr.querySelector(".maThiSinh").textContent.trim();
    birthday.value = tr.querySelector(".ngaySinh").textContent.trim();
    address.value = tr.querySelector(".diaChi").textContent.trim();
    group_exam.value = tr.querySelector(".nhomThi").textContent.trim();
    localStorage.setItem("passwordUpdate", JSON.stringify(tr.querySelector(".password").textContent.trim()));
}

function handleUpdate(){
    let gender="";
    if(female.checked){
        gender="Nữ";
    }
    if(male.checked){
        gender="Nam";
    }
    const data= {
        maThiSinh: sbd.value,
        maLop: malop.value,
        hoten: hoten.value,
        Gioitinh:gender,
        password:JSON.parse(localStorage.getItem("passwordUpdate")),
        ngaySinh: birthday.value,
        diaChi: address.value,
        nhomThi: group_exam.value,
    }
    ListStudent.map((st,index) =>{
        if(st.maThiSinh === sbd.value )
        {
            ListStudent[index] = data
        }
        return
    })
    localStorage.setItem("ListStudent",JSON.stringify(ListStudent))
    showSuccessToast("Sửa thành công!")
    renderListThiSinh(ListStudent)
    isCreate = true;
    clearData();
    handleTextBtnSave();
    handleReadOnLyInput();
    seletMaLopListData.val(malop.value)
}

function activeModalConfirm(id){
    openModalCofirmDelete("bạn chắn chắn muốn xóa thí sinh này?");
    $(".btnNo").on("click", () => {
        closeModalCofirmDelete();

    })
    $(".btnYes").on("click", () => {
        Delete(id);
    })
    clearData();
}

function Delete(id){
   const newArray = ListStudent.filter(st =>{
    return st.maThiSinh !==id
   })
   localStorage.setItem("ListStudent",JSON.stringify(newArray));
   closeModalCofirmDelete();
   showSuccessToast("Xóa thành công !")
   if(newArray.length>0){

       ListStudent = JSON.parse(localStorage.getItem("ListStudent"));
        renderListThiSinh(ListStudent);    
    }
};

inputSearch.keypress((e)=>{
    if(e.key === "Enter"){
        handleSearch();
    }
})
btnSearch.on("click",()=>{
    handleSearch();
})
function handleSearch(){
    if(ListStudent.length > 0){
        const student =  ListStudent.filter(st =>{
            return (st.maThiSinh === inputSearch.val().trim()) 
                    || (st.diaChi === inputSearch.val().trim()) 
                    || (st.hoten === inputSearch.val().trim()) 
        })
        console.log(student)
        if(student.length > 0){
            renderListThiSinh(student)
        }
        else{
            $(".form__listdata tbody").html("Không có thí sinh nào!")
        }
        $("#input__search").val("")
    
      }
}

function clearData (){
    hoten.value="";
    sbd.value="";
    birthday.value="";
    male.checked = false;
    female.checked=false;
    address.value="";
    group_exam.value="";
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


