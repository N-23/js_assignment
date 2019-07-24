/******** Local Storage ********/
// var myObj = {email:"mickey.mouse@gmail.com",firstname:"Mickey",lastname:"Mouse",gender:"Male",address:"Pune"}
// if (typeof(Storage) !== "undefined") {
//       // Store
//       localStorage.setItem("lastname", JSON.stringify(myObj));
//       // Retrieve
//       document.getElementById("demo").innerHTML = localStorage.getItem("lastname",JSON.stringify(myObj));
//       window.location = "demo_json.php?x=" +JSON;
//     } else {
//       document.getElementById("demo").innerHTML = "Sorry, your browser does not support Web Storage...";
//     }
var myObj, myJSON, text, obj;

// Storing data:
myObj = { email:"mickey.mouse@gmail.com",firstname:"Mickey",lastname:"Mouse",gender:"Male",address:"Pune" };
myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);

// Retrieving data:
// text = localStorage.getItem("testJSON");
// obj = JSON.parse(text);
// document.getElementById("demo").innerHTML = obj;

/******** Email Id ********/
var Email;
 document.getElementById("email").innerHTML = Email;
  function Email(email) {
    var email = "^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$";
    if(email.value.match(email)) {
      return true;
    }
    else {
      alert('Email must match with the pattern');
      email.focus();
      return false;
    }
  }
/******** First name ********/ 
var allLetter;
    document.getElementById("firstname").innerHTML = allLetter;
    function allLetter(firstname) { 
      var letters = /^[A-Za-z]+$/;
      if(firstname.value.match(letters)) {
      return true;
      }
      else {
      alert('Firstname must have alphabet characters only');
      firstname.focus();
      return false;
      }
    }
/******** Last name ********/
var allLetters;
document.getElementById("lastname").innerHTML = allLetters;
 function allLetters(lastname) { 
  var letters = /^[A-Za-z]+$/;
  if(lastname.value.match(letters)) {
  return true;
  }
  else {
  alert('Lastname must have alphabet characters only');
  lastname.focus();
  return false;
  }
}
/******** Button properties ********/
function myFunction() {
      var email = document.getElementById("email").value;
      var firstname = document.getElementById("firstname").value;
      var lastname = document.getElementById("lastname").value;
      var gender = document.getElementsByClassName("mclass").value;
      var gender = document.getElementsByClassName("fclass").value;
      var gender = document.getElementsByClassName("oclass").value; 
      var address = document.getElementById("address").value;
      // document.getElementsById("demo").innerHTML = "Succesfully Registered";
     // if (validation()) {//Calling validation function
        document.getElementsById("demo").submit();//form submission
        alert("EmailId:"+email+"n Firstname:"+firstname+"n Lastname:"+lastname+"n Gender:"+gender+"Adress:"+address+document.getElementById("demo").getAttribute("id")+"nn Form Registered Successfully");  
      
    }
function myFunction1() {
      document.getElementsById("demo").innerHTML = "Clearing the record from Registered";
    }
