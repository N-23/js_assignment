/******** userrecord ********/
function myfunction() {
userArray=new Array();
var myObj, myJSON;
myObj = { };
myObj.email=document.getElementById("email").value;
myObj.password=document.getElementById("password").value;
myObj.firstname=document.getElementById("firstname").value;
myObj.lastname=document.getElementById("lastname").value;
myObj.gender=document.getElementsByClassName("mclass").value;
myObj.gender=document.getElementsByClassName("fclass").value;
myObj.gender=document.getElementsByClassName("oclass").value;
myObj.address=document.getElementById("address").value;


var userArray=JSON.parse(localStorage.getItem("userrecordarray"));
if(userArray== null)
{
 userArray=new Array();
}

 userTodoArray=new Array();

console.log(typeof(userArray));
console.log(typeof(userTodoArray));

userArray.push(myObj);
myJSON = JSON.stringify(userArray);
// Storing data in local storage
localStorage.setItem("userrecordarray", myJSON);
alert("Record Successfully Saved");
}
/******** validation ********/
function Validation()
{
    var emailId = document.getElementById("email").value;
    var passwd = document.getElementById("password").value; 
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var address = document.getElementById("address").value;
    var genderType = document.querySelector('input[name="gender"]').value;

    var regexFirstName = /^([a-zA-Z]{3,})$/;
    var regexLastName = /^[a-zA-Z]{3,}$/;
    var regexEmailid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var regexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if((firstName.match(regexFirstName)) && (lastName.match(regexLastName)) && (emailId.match(regexEmailid)) && (passwd.match(regexPasswd))) {  
        var bRet = StoreItems(firstName,lastName,address,emailId,passwd,genderType)
        if(bRet == true)
        {
            alert("Registeration successfully");
            sessionStorage.removeItem("displayPicture");
            window.location = 'login.html';
        }
    }
    else if(!firstName.match(regexFirstName))
    {
        alert("First Name must have alphabet charaters only");
    }
    else if(!lastName.match(regexLastName))
    {
        alert("Last Name must have alphabet charaters only");
    }
    else if(!emailId.match(regexEmailid))
    {
        alert("Email Id should be entered properly");
    }
    else if(!passwd.match(regexPasswd))
    {
        alert("Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol");
    }
}
function StoreItems(firstName,lastName,address,emailId,passwd,genderType)
{   
    let ToDoList = new Array();
    if(sessionStorage.getItem('displayPicture') === null)
    {
        alert("Please upload your profile picture");
        return false;
    }
    // var encryptedPassword = btoa(passwd);
    var profilePicture = sessionStorage.displayPicture;
    var userInfo = {
        'firstNameUser' : firstName,
        'lastNameUser' : lastName,
        'addressUser' : address,
        'emailUser' : emailId,
        'passwordUser' : encryptedPassword,
        'genderUser': genderType,
        'toDoUser' : ToDoList,
        'displayPicture' : profilePicture,
        'userTodoArray': []
    }
    var userArray = JSON.parse(localStorage.getItem("userrecordarray"));
    if(userArray == null)
    {
        userArray = [];
        userArray.push(userInfo);
        localStorage.setItem("localStorageArray",JSON.stringify(userArray));
        return true;
    }
    else
    {
        var i=0;
        for(i=0; i<userArray.length;i++)
        {
            if((userArray[i].emailUser) == emailId)
            {
                break;
            }
        }
        if(i == userArray.length)
        {   
            userArray.push(userInfo);
            localStorage.setItem("localStorageArray",JSON.stringify(userArray));
            return true;
        }
        else
        {
            alert("Email ID already exists");
            return false;
        }
    }
}
/******** profile photo ********/
function UploadProfilePhoto()
{
    var Image = document.getElementById("profilePicture").files[0];
    var imagereader = new FileReader();
    imagereader.readAsDataURL(Image);
    imagereader.onload = function()
    {
      var imgdata = imagereader.result;
      sessionStorage.setItem("displayPicture",imgdata);
      document.getElementById("UserImage").src = sessionStorage.displayPicture;
    };
    imagereader.onerror = function (error) {
    };
}
/******** clear button ********/
function myFunction() {
  document.getElementById("demo").reset();
}