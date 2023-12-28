

const inputPassword =$(".input__pass");
const btnEnterExam = $(".btnEnterExam");

const listSubject = [
    {
        id:1,
        name:"Kiến trúc máy tính",

    },
    {
        id:2,
        name:"Thiết kế hướng đối tượng UML",
       

    },
    {
        id:3,
        name:"Phát triển phần mềm hướng dịch vụ",
       

    },
    {
        id:4,
        name:"Tư tưởng Hồ Chí Minh",
       
    },

];

const listExam = [
    {
        id:1,
        name:"Bài thi kết thúc học phần KTML 125211",
        subject_id : 1,
        time:60,
        numberQuestion:30
    },
    {
        id:2,
        name:"Bài thi kết thúc học phần UML 125211",
        subject_id : 2,
        time:70,
        numberQuestion:40
    },
    {
        id:3,
        name:"Bài thi kết thúc học phần PTPM 125211",
        subject_id : 3,
        time:80,
        numberQuestion:50
    },
    {
        id:4,
        name:"Bài thi kết thúc học phần HCM 125211",
        subject_id : 4,
        time:60,
        numberQuestion:50
    },
]
function start(){
    remderListSubject();
    renderListExam();
}
start();

function remderListSubject(){
    var html = listSubject.map(item=>{
       
        return `
            <option value="${item.id}">${item.name}</option>
        `
    });
    $("#select__subject_test").html(html);
}
$("#select__subject_test").on("change",()=>{
    let exmamOption= [...document.querySelectorAll("#select__exam__paper option")].find(item=>{
        return item.value.trim()  ===$("#select__subject_test").val().trim();

    });
    exmamOption.selected = true;
    let exam = listExam.find(item =>{
        return item.id === Number(exmamOption.value);
    });
    $(".number__question").html(
        `
            <label for="">Tổng số câu hỏi:</label>
            <input type="text" value="${exam.numberQuestion}" readonly>
        `
    )

    $(".time").html(
        `
        <label for="">Thời gian:</label>
        <input type="text" value="${exam.time}" readonly>
        `
    )
})


function renderListExam(){
    var html = listExam.map(item=>{
        if(item.id ===1){
            $(".number__question").html(
                `
                    <label for="">Tổng số câu hỏi:</label>
                    <input type="text" value="${item.numberQuestion}" readonly>
                `
            )
        
            $(".time").html(
                `
                <label for="">Thời gian:</label>
                <input type="text" value="${item.time}" readonly>
                `
            )
        }
        return `
     
            <option  value="${item.id}">${item.name}</option>
        
        `
    });
    $("#select__exam__paper").html(html);

};

btnEnterExam.on("click",()=>{
    if(inputPassword.val() === "123456")
    {
        let subject = listSubject.find(item=>{
            return item.id === Number($("#select__subject_test").val())
        })
        let exam = listExam.find(item =>{
            return item.id === Number( $("#select__exam__paper").val());
        });
        localStorage.setItem("exam",JSON.stringify(exam));
        localStorage.setItem("subject", JSON.stringify(subject));
        window.location ="./GiaoDienThi.html";
    }
    if( inputPassword.val() !=="" && inputPassword.val() !== "123456")
    {
        showErrorToast("Mật khẩu đề thi không đúng !");
    }
    if(inputPassword.val() ==="")
    {
        showErrorToast("Vui lòng nhập mật khẩu đề thi !");

    }
});

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
  };
  function showSuccessToast(message) {
    toast({
      title: "Thành công!",
      message: message,
      type: "success",
      duration: 3000
    });
  }
  
  function showErrorToast(message) {
    toast({
      title: "Thất bại!",
      message: message,
      type: "error",
      duration: 3000
    });
  };