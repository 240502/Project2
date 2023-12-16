const exam = JSON.parse(localStorage.getItem("exam"));
const subject = JSON.parse(localStorage.getItem("subject"));
const listinputQuestion = [...document.querySelectorAll("input[name=answer]")];
const btnPrevToFirst = $(".btnPrevToFirst");
const btnPrev = $(".btnPrev");
const btnNext = $(".btnNext");
const btnNextToEnd = $(".btnNextToEnd");
const btnSubmit = $("#btnSubmit");
let socauhoanthanh = 0;
function start() {
    renderInfo();
    renderListQuestion();
}
start();


var listquestionchecked = [];
let time = exam.time -1 ;
let second = 60;
function countDown(countdownElement){
    var x =  setInterval(() => {
        second = second - 1;
        if(second ==0){
            second = 60
            time = time - 1;
        }
        countdownElement.html(`${time}:${second} phút`)
    }, 1000);
}


function renderListQuestion (){
    var html = "";
    for(var i = 1; i <=exam.numberQuestion; i++) {
        if(i == 1){
            var question = `
                <span class="number__question">Câu số ${1}:</span>
                <span class="question__content">Nội dung câu hỏi số ${1}</span>
            ` 
            $(".question").html(question);

        }
        html+= `
            <li class="${i===1 ?"active":""}" data-id="${i}">
                <a href="#">
                Câu ${i}  <i class="fa-solid fa-check" style="display:none" ></i>
                </a>
            </li>
        `

    }
  
    $(".question__list").html(html);
    ischeckedQuestion(document.querySelector(".question__list li.active"));
    document.querySelectorAll(".question__list li").forEach(item=>{
        item.onclick = ()=>{
          
                var questionactive = document.querySelector(".question__list li.active");
                if( questionactive){
                    questionactive.classList.remove("active");
                }
                if(listquestionchecked.length > 0){
                    handleCheckInput(item);
                }
             
            item.classList.add("active");
            renderContentQuestion(item.dataset.id)
            ischeckedQuestion(item);
            checkedQuestion();
        }
        
    });
}

function handleCheckInput(question__item){
    var question = listquestionchecked.find(question__checked=>{
        return question__checked.id === question__item.dataset.id;
    })
    if(question){
        question__item.classList.remove("checked");
        listinputQuestion.forEach(input=>{
            if(question.answer === input.dataset.id){

                input.checked = true;
            }
            else{
                input.checked = false;
            }
        })
    }
    else
    {
        listinputQuestion.forEach(input=>{
    
            if(input.checked){
                input.checked =false;
                
            }
        })
    }

}
btnPrev.on("click", ()=>{
    var questionactive = document.querySelector(".question__list li.active");
    let vitri =Number( questionactive.dataset.id);
  
    if(questionactive.dataset.id >"1")
    {
        if(questionactive)  
        {
            questionactive.classList.remove("active")
        }
        vitri = Number(vitri)-1;
        [...document.querySelectorAll(".question__list li")].forEach(item =>{
            if(item.dataset.id === `${vitri}`)
            {
                item.classList.add("active"); 
                const offset =  item.offsetTop -$(".form__left").height();
                $(".form__left").animate({scrollTop:offset}, '500');
                ischeckedQuestion(item);
                checkedQuestion();
                if(listquestionchecked.length > 0){
                    handleCheckInput(item);
                }
            }
        })
        renderContentQuestion(vitri);
    }

});
btnNext.on("click",()=>{
    var questionactive = document.querySelector(".question__list li.active");
    let vitri =Number( questionactive.dataset.id);
  
    if(Number(questionactive.dataset.id ) < exam.numberQuestion)
    {
        if(questionactive)  
        {
            questionactive.classList.remove("active")
        }
        vitri = Number(vitri)+1;
        [...document.querySelectorAll(".question__list li")].forEach(item =>{
            if(item.dataset.id === `${vitri}`)
            {
                item.classList.add("active");
                const offset =  item.offsetTop -$(".form__left").height();
                $(".form__left").animate({scrollTop:offset}, '500');
                ischeckedQuestion(item);
                checkedQuestion();
                if(listquestionchecked.length > 0){
                    handleCheckInput(item);
                }
            }
        })
        renderContentQuestion(vitri);

    }
});

btnPrevToFirst.on("click",()=>{
    var questionactive = document.querySelector(".question__list li.active");
    if(questionactive)  
    {
        questionactive.classList.remove("active")
    }
    [...document.querySelectorAll(".question__list li")].forEach(item=>{

        if(item.dataset.id === "1"){
            item.classList.add("active");
            $(".form__left").animate({scrollTop:0}, '500');
            ischeckedQuestion(item);
            checkedQuestion();
            if(listquestionchecked.length > 0){
                handleCheckInput(item);
            }
        }
    });
});

btnNextToEnd.on("click",()=>{
    var questionactive = document.querySelector(".question__list li.active");
    if(questionactive)  
    {
        questionactive.classList.remove("active")
    }
    [...document.querySelectorAll(".question__list li")].forEach(item=>{

        if(Number(item.dataset.id) === exam.numberQuestion){
            item.classList.add("active");
            const offset =  item.offsetTop -$(".form__left").height();
            $(".form__left").animate({scrollTop:offset}, '500');
            ischeckedQuestion(item);
            checkedQuestion();
            if(listquestionchecked.length > 0){
                handleCheckInput(item);
            }
        }
    });
});

btnSubmit.on("click",()=>{
    if(listquestionchecked.length  === exam.numberQuestion){
        alert("Nop bai thanh cong!")
    }
});
function ischeckedQuestion(questionactive){
    listinputQuestion.forEach(input=>{
        input.onclick = ()=>{
            if(input.checked){
                var question_cheked__item = {
                    id: questionactive.dataset.id,
                    answer: input.dataset.id
                }
                if(listquestionchecked.length ===0){

                    listquestionchecked.push(question_cheked__item)
                } 
                else{
                    var question =  listquestionchecked.find((item,index)=>{
                        return item.id === questionactive.dataset.id
                        
                    })
                    if(question === undefined){
                        listquestionchecked.push(question_cheked__item)
                    }
                    else{
                        if(question.answer !== input.dataset.id){
                            question.answer = input.dataset.id;
                        }
                    }
                   
                }
                $(".question__complete span span").html(listquestionchecked !== undefined ? listquestionchecked.length: 0);
            }
        }

    })
}

function checkedQuestion(){

    listquestionchecked.forEach(item=>{
        var question = [...document.querySelectorAll(".question__list li")].find(questionElement=>{
            return item.id === questionElement.dataset.id
        })
        question.classList.add("checked")
    })
  

}


function renderContentQuestion(number){
    var question = `
        <span class="number__question">Câu số ${number}:</span>
        <span class="question__content">Nội dung câu hỏi số ${number}</span>
    `
    $(".question").html(question);
}

function renderInfo() {
    const date = new Date();    
    var html = `
    <div class="col-4">
        <div class="info_item">
            <h6>Kỳ thi</h6>
            <span> KTHP</span>
        </div>
         <div class="info_item">
            <h6>Môn học:</h6>
            <span>${subject.name}</span>
        </div>
        <div class="info_item">
            <h6>Năm học:</h6>
            <span>2023-2024</span>
        </div>

    </div>
    <div class="col-4">
        <div class="info_item">
            <h6>Ngày thi:</h6>
            <span>${date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}</span>
        </div>
         <div class="info_item">
            <h6>Mã đề:</h6>
            <span>DT1</span>
        </div>
        <div class="info_item">
            <h6>Thời gian:</h6>
            <span>${exam.time} phút </span>
        </div>

    </div>
    <div class="col-4">
        <div class="info_item">
            <h6>Thí sinh:</h6>
            <span> Nguyễn Văn Sang</span>
        </div>
        <div class="info_item">
            <h6>SBD:</h6>
            <span>1220143</span>
        </div>

        <div class="info_item">
            <h6>Lớp:</h6>
            <span>125211</span>
        </div>
    </div>
    <div class="col-4">
        <div class="info_item">
            <h6>Số câu hỏi:</h6>
            <span>${exam.numberQuestion}</span>

        </div>
        <div class="info_item count__down">
            <h6>Thời gian còn lại:</h6>
            <span></span>

        </div>
        <div class="info_item question__complete">
            <h6>Số câu hoàn thành:</h6>
            <span> <span>${socauhoanthanh}</span>/ ${exam.numberQuestion}</span>

        </div>
    </div>
    
    `
    $(".student__infomation .row").html(html);
    countDown($(".count__down span"));
   

}



