document.write("Registration");
function allLetter(firstname)
      { 
      var letters = /^[A-Za-z]+$/;
      if(firstname.value.match(letters))
      {
      return true;
      }
      else
      {
      alert('Username must have alphabet characters only');
      uname.focus();
      return false;
      }
      }
