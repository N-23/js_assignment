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
        event.preventDefault();
        return;
    }
    for (var i = 0; i < userArray.length; i++) {
        var entry = userArray[i];
        var email = entry.email;
        var password = entry.password;
        if (email == email && password == password) {
         alert("Successfully logged in using credentials!");
         return;
    }
    alert('Invalid Username or Password! Please try again.');
    event.preventDefault();
    window.location="Login.html";
    }
}    