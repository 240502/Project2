const navLopHp = $("#btnLopHP")
const navLopHc = $("#btnLopHC")

navLopHc.click(()=>{
    $(".title").html("")
    $(".title").html("Quản lý lớp hành chính")

});
navLopHp.click(()=>{
    $(".title").html("")
    $(".title").html("Quản lý lớp học phầm")

    console.log("ok")
});