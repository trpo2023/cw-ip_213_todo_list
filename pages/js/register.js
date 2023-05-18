
let login,pass_1,pass_2,err,remember_me
let button = document.querySelector(".login-card-form")

function check_pass_diff(pass_1,pass_2){

    return pass_1.toString() == pass_2.toString();
}
function init(){
    login = document.getElementById("login").value
    pass_1 = document.getElementById("pass_1").value
    pass_2 = document.getElementById("pass_2").value
    err = document.querySelector(".login-card-error")
}
function check_data(){
    if(err.textContent != ""){
        $(".login-card-error").hide()
    }
    if(login.length < 5 ){
        err.textContent = "Логин не может состоять меньше чем из 5 символов";
        $(".login-card-error").fadeIn(1000);
        return 0;
    }
    if(pass_1 != pass_2){
        err.textContent = "Пароли не совпадают попробуйте снова";
        $(".login-card-error").fadeIn(1000);
        return 0;
    }
    if(pass_1.length < 5 ){
        err.textContent = "Пароль должен состоять из более чем 6 символов";
        $(".login-card-error").fadeIn(1000);
        return 0;
    }
    return 1;
}
button.addEventListener("submit",function (event){
    event.preventDefault()
    init()
    // check_data()
    if(check_data() === 1){
        if ($('#rememberMeCheckBox').is(':checked')){
            remember_me = true
        } else {
            remember_me = false
        }
        $.ajax({
            // Изменить путь и настроить передаваемые данные
            url: '../server/user/register',
            type: 'POST',
            dataType: 'json',
            data: {
                login: login,
                password : pass_1,
            }, success: function(data){
                try {
                    console.log(data);
                    window.location.replace("../pages/todo.html");
                } catch (e) {
                    alert("User already exist.");
                }
             },error: function(XMLHttpRequest, textStatus, errorThrown) {
                 console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
            }
        });
        return false

    }

})

