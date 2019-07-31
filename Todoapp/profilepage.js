/******** disabled field ********/
function enableFields()
{
  document.getElementById("firstname").disabled = false;
  document.getElementById("lastname").disabled = false;
  document.getElementById("address").disabled = false;
  document.getElementById("password").disabled = false;
  document.getElementById("submit").disabled = false;
  document.getElementById("ProfileImage").disabled = false;

    for(let i=0;i<(document.getElementsByName("gender").length);i++)
    {
      document.getElementsByName("gender")[i].disabled = false;
    }
}
/******** validation ********/
function Validations()
{
    let emailId = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let genderType = document.querySelector('input[name="gender"]:checked').value;
    let address = document.getElementById("address").value;
     
    let regexFirstName = /^([a-zA-Z]{3,})$/;
    let regexLastName = /^[a-zA-Z]{3,}$/;
    let regexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if((firstName.match(regexFirstName)) &&
       (lastName.match(regexLastName)) &&
       (passwd.match(regexPasswd)))
    {   
        StoreItems(firstName,lastName,address,emailId,passwd,genderType)
        alert("Changes has been saved successfully");
        sessionStorage.removeItem("displayPicture");
        window.location.reload();
    }
    else if(!firstName.match(regexFirstName))
    {
        alert("First Name must have alphabet charaters only");
    }
    else if(!lastName.match(regexLastName))
    {
        alert("Last Name must have alphabet charaters only");
    }
    else if(!passwd.match(regexPasswd))
    {
        alert("Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol");
    }
    else
    {
        alert("Invalid Credentials");
        sessionStorage.removeItem("displayPicture");
    }
}
function StoreItems(firstName,lastName,address,emailId,passwd,genderType)
{   
    var userArray = JSON.parse(localStorage.getItem("localStorageArray"));
    var userId = sessionStorage.getItem("loggedInUser");
    var userToDoArray = userArray[userId].toDoUser;

    userArray[userId].firstNameUser = firstName;
    userArray[userId].lastNameUser = lastName;
    userArray[userId].addressUser = address;
    userArray[userId].emailUser = emailId;
    userArray[userId].passwordUser = btoa(passwd);
    userArray[userId].toDoUser = codeToDoArray;
    usrtArray[userId].genderUser = genderType;

    if(sessionStorage.getItem('displayPicture') === null)
    {
    }
    else
    {
      userArray[userId].displayPicture = sessionStorage.displayPicture;
    }
    localStorage.setItem("localStorageArray",JSON.stringify(userArray));
}
function setLoggedInUserValues()
{
    if((localStorage.getItem('localStorageArray') === null) || (sessionStorage.getItem('loggedInUser') === null))
	{
		window.location = "homepage.html";
		return;
	} 
    var codeArray = JSON.parse(localStorage.getItem("localStorageArray"));
    var userId =  sessionStorage.getItem("loggedInUser");
    document.getElementById("welcomeUser").innerHTML = "Hi, " + userArray[userId].firstNameUser;
    
    document.getElementById("firstname").value = userArray[userId].firstNameUser;
    document.getElementById("lastname").value = userArray[userId].lastNameUser;
    document.getElementById("address").value = userArray[userId].addressUser;
    document.getElementById("email").value = userArray[userId].emailUser;
    document.getElementById("password").value = atob(userArray[userId].passwordUser);
    document.getElementById("UserImage").src = userArray[userId].displayPicture;

    if(userArray[userId].genderUser == "male")
    {
        document.getElementsByName("gender")[0].checked = true;
    }
    else if(userArray[userId].genderUser == "female")
    {
        document.getElementsByName("gender")[1].checked = true;
    }
    else
    {
        document.getElementsByName("gender")[2].checked = true;
    }
}
// function uploadProfilePhoto()
// {
//     var Image = document.getElementById("ProfileImage").files[0];
//     var imageReader = new FileReader();
//     imageReader.readAsDataURL(Image);
//     imageReader.onload = function () {
//         var imgData = imageReader.result;
//         sessionStorage.setItem("displayPicture",imgData);
//         document.getElementById("ProfileImage").src = sessionStorage.displayPicture;
//     };
//     imageReader.onerror = function (error) {
//     };
// }
var UploadProfilePhoto = function(file) {
    var input = file.target;

    var reader = new FileReader();
    reader.onload = function() {
      var dataURL = reader.result;
      var output = document.getElementById("ProfileImage");
      output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
}
(function (){
    document.addEventListener('keypress',function(event){
        if((event.keyCode == 13) && (document.getElementById("submit").disabled == false))
        {
            Validations();
        }
    })
})();
// /******** userrecord ********/
// function myfunction() {
//     userArray=new Array();
//     var myObj, myJSON;
//     myObj = { };
//     myObj.email=document.getElementById("email").value;
//     myObj.password=document.getElementById("password").value;
//     myObj.firstname=document.getElementById("firstname").value;
//     myObj.lastname=document.getElementById("lastname").value;
//     myObj.gender=document.getElementsByClassName("mclass").value;
//     myObj.gender=document.getElementsByClassName("fclass").value;
//     myObj.gender=document.getElementsByClassName("oclass").value;
//     myObj.address=document.getElementById("address").value;
//     var userArray=JSON.parse(localStorage.getItem("userrecordarray"));
//     if(userArray== null)
//     {
//      userArray=new Array();
//     }
    
//     console.log(typeof(userArray));
    
//     userArray.push(myObj);
//     myJSON = JSON.stringify(userArray);
//     // Storing data in local storage
//     localStorage.setItem("userrecordarray", myJSON);
//     alert("Record Successfully Saved");
//     }
    
//     /******** Button properties ********/
//     function myFunction() {
//           var email = document.getElementById("email").value;
//           var pass = document.getElementById("password").value;
//           var firstname = document.getElementById("firstname").value;
//           var lastname = document.getElementById("lastname").value;
//           var gender = document.getElementsByClassName("mclass").value;
//           var gender = document.getElementsByClassName("fclass").value;
//           var gender = document.getElementsByClassName("oclass").value; 
//           var address = document.getElementById("address").value;
//           // document.getElementsById("demo").innerHTML = "Succesfully Registered";
//          // if (validation()) {//Calling validation function
//            // document.getElementsById("demo").submit();//form submission
            
//               //Email Id
//               var Email;
//               document.getElementById("email").innerHTML = Email;
            
//               var email = "^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$";
//               if(email.value.match(email)) {
//                 alert('EmaliId matched with the pattern');
//                 return true;
//               }
//               else {
//                 alert('EmailId must match with the pattern');
//                 email.focus();
//                 return false;
//               }
//               //Password
//               var Pass;
//               document.getElementById("password").innerHTML = Pass;
    
//               var pass = "/^[A-Za-z]\w{7,14}$/";
//               if(password.value.match(pass)) {
//                 alert('Password matched with the pattern');
//                 return true;
//               }
//               else {
//                 alert('Password must match with the pattern');
//                 password.focus();
//                 return false;
//               }
//               //First name
//               var allLetter;
//               document.getElementById("firstname").innerHTML = allLetter;
              
//                 var letters = /^[a-zA-Z0-9]+$/;
//                 if(firstname.value.match(letters)) {
//                   alert('Firstname matched with the pattern');
//                   return true;
//                 }
//                 else {
//                 alert('Firstname must have alphabet characters only');
//                 firstname.focus();
//                 return false;
//                 }
//                 //Last name 
//                 var allLetters;
//                 document.getElementById("lastname").innerHTML = allLetters;
                
//                   var letters = /^[a-zA-Z0-9]+$/;
//                   if(lastname.value.match(letters)) {
//                     alert('Lastname matched with the pattern');
//                     return true;
//                   }
//                   else {
//                   alert('Lastname must have alphabet characters only');
//                   lastname.focus();
//                   return false;
//                   }
                
//         }
//         function myFunction1() {
//           document.getElementById("demo").reset();
//           //document.getElementsById("demo").innerHTML = "Clearing the record from Registered";
//         }    