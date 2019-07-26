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
    
    console.log(typeof(userArray));
    
    userArray.push(myObj);
    myJSON = JSON.stringify(userArray);
    // Storing data in local storage
    localStorage.setItem("userrecordarray", myJSON);
    alert("Record Successfully Saved");
    }
    
    /******** Button properties ********/
    function myFunction() {
          var email = document.getElementById("email").value;
          var pass = document.getElementById("password").value;
          var firstname = document.getElementById("firstname").value;
          var lastname = document.getElementById("lastname").value;
          var gender = document.getElementsByClassName("mclass").value;
          var gender = document.getElementsByClassName("fclass").value;
          var gender = document.getElementsByClassName("oclass").value; 
          var address = document.getElementById("address").value;
          // document.getElementsById("demo").innerHTML = "Succesfully Registered";
         // if (validation()) {//Calling validation function
           // document.getElementsById("demo").submit();//form submission
            
              //Email Id
              var Email;
              document.getElementById("email").innerHTML = Email;
            
              var email = "^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$";
              if(email.value.match(email)) {
                alert('EmaliId matched with the pattern');
                return true;
              }
              else {
                alert('EmailId must match with the pattern');
                email.focus();
                return false;
              }
              //Password
              var Pass;
              document.getElementById("password").innerHTML = Pass;
    
              var pass = "/^[A-Za-z]\w{7,14}$/";
              if(password.value.match(pass)) {
                alert('Password matched with the pattern');
                return true;
              }
              else {
                alert('Password must match with the pattern');
                password.focus();
                return false;
              }
              //First name
              var allLetter;
              document.getElementById("firstname").innerHTML = allLetter;
              
                var letters = /^[a-zA-Z0-9]+$/;
                if(firstname.value.match(letters)) {
                  alert('Firstname matched with the pattern');
                  return true;
                }
                else {
                alert('Firstname must have alphabet characters only');
                firstname.focus();
                return false;
                }
                //Last name 
                var allLetters;
                document.getElementById("lastname").innerHTML = allLetters;
                
                  var letters = /^[a-zA-Z0-9]+$/;
                  if(lastname.value.match(letters)) {
                    alert('Lastname matched with the pattern');
                    return true;
                  }
                  else {
                  alert('Lastname must have alphabet characters only');
                  lastname.focus();
                  return false;
                  }
                
        }
        function myFunction1() {
          document.getElementById("demo").reset();
          //document.getElementsById("demo").innerHTML = "Clearing the record from Registered";
        }    