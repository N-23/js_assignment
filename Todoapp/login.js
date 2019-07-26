/******** Submit properties ********/
function myFunction() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var userArray=JSON.parse(localStorage.getItem("userrecordarray"));

    console.log(typeof(userArray));

    userArray.pop();
    myJSON = JSON.stringify(userArray);
    localStorage.getItem("userrecordarray", myJSON);

    if (!userArray) {
        alert("Nothing stored!");
        return;
    }
    for (var i = 0; i < userArray.length; i++) {
        var entry = userArray[i];
        var em = entry.email;
        var pass = entry.password;
        if (em == email && pass == password) {
         alert("Successfully logged in using credentials!");
         sessionStorage.setItem("userid",i);
         return;
         }
        else {
        alert('Invalid Username or Password! Please try again.');
        window.location="Html/login.html";
        }
    }
}    