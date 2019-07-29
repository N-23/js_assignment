/******** validation ********/ 
function Validation() 
{   
    var emailId = document.getElementById("email").value;
    var passwd = document.getElementById("password").value;

    var RegexEmailId = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var RegexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if((emailId.match(RegexEmailId)) &&
       (passwd.match(RegexPasswd)))
    {  
        var bRet = FetchItems(emailId,passwd)
        if(bRet == true)
        {
            window.location = 'todo.html';
        }
        else
        {
            return;
        }
    }   
    else if(!emailId.match(RegexEmailId))   
    {
        alert("Invalid Email");
    }
    else if(!passwd.match(RegexPasswd))    
    {
        alert("Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol");
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
            if((userArray[index].emailUser) === emailId) 
            {
                var decryptedPassword = atob(CodeArray[index].passwordUser);
                if(decryptedPassword == passwd)
                {
                    sessionStorage.setItem("loggedInUser",index);     
                    flag = true;
                    break;
                }
                else if(decryptedPassword != passwd)   
                {
                    alert("Wrong Password");
                    flag = false;
                    break;
                }        
            }
            else
            {
                flag == false;
            }
        }
        if((index == userArray.length) && (flag == false)) 
        {   
            alert("No records found!!!");
            return false;
        }
        else if(flag == false)  
        {
            return false;
        }
        else    
        {
            return true;
        }
    }
}
(function (){
    document.addEventListener('keypress',function(event){
        if(event.keyCode == 13)
        {
            Validity();
        }
    })
})();