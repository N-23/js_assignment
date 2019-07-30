/******** validation ********/ 
function Validation() 
{   
    var emailId = document.getElementById("email").value;
    var passwd = document.getElementById("password").value;

    var RegexEmailId = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var RegexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if((emailId.match(RegexEmailId)) && (passwd.match(RegexPasswd)))
    {  
            // window.location= "todo.html";
            FetchItems(emailId,passwd);
    } 
    else {
        return false;
    }  
   
}
function FetchItems(emailId,passwd)
{   
    var userArray = JSON.parse(localStorage.getItem("userrecordarray"));
    if(userArray == null)
    {
        alert("No records found");
        return false;
    }
    else
    {
        var flag = true;
        var index = 0;
        for(index=0; index<userArray.length; index++)   
        {
            if(userArray[index].email === emailId) 
            {
                sessionStorage.setItem("loggedInUser",index);     
                flag = true; 
                window.open("todo.html");
                break;
            }
            else
            {
                flag == false;
            }
        }
    }
}
        
(function (){
    document.addEventListener('keypress',function(event){
     if(event.keyCode == 8) {
      Validation();
     }
    })
})();