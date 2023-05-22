
let login,pass
let button = document.querySelector(".login-card-form")

function init(){
    login = document.getElementById("login").value
    pass = document.getElementById("pass").value
}


button.addEventListener("submit",function (event){
    event.preventDefault()
    init()
        $.ajax({
            // Изменить путь и настроить передаваемые данные
            url: '../server/user/login',
            type: 'POST',
            dataType: 'json',
            data: {
                login: login,
                password : pass,
            }, success: function(data){
                try {
                    localStorage.setItem('id', data.id);

                    console.log(data);
                    window.location.replace("../pages/todo.html");
                } catch (e) {
                    console.log("Account doesn't exist");
                }
             },error: function(XMLHttpRequest, textStatus, errorThrown) {
                 console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
            }
        });
        return false
})

