/********** logout function **********/
function logoutUser()
{
	sessionStorage.removeItem("loggedInUser");
}
/********** adding item's in todo-function **********/
function addToDoItem()
{	
	var userId =  sessionStorage.getItem("loggedInUser");
	var userArray = JSON.parse(localStorage.getItem("userrecordarray"));
	var userToDoArray = userArray[userId].toDoUser;
	var myInput = document.getElementById("Input").value;
	var sDate = document.getElementById("startdate").value;
	var dDate = document.getElementById("duedate").value;
	var Public = document.getElementById("public").checked;
	var categories = document.querySelector('input[name="categories"]').value;
	var description = document.getElementById("description").value;
	var newStartDate = new Date(sDate);
	var newDueDate = new Date(dDate);
	if(myInput == "")
	{
		alert("Title of the form is blank")
		return;
	}
	if(sDate == "")
	{
		alert("Please set the start date");
		return;
	}
	if(dDate == "")
	{
		alert("Please set the end date");
		return;
	}
	if(newDueDate.getTime() < newStartDate.getTime())
	{
		alert("Due date should come after the start date");
		return;
	}
	if(description == "")
	{
		alert("Please enter the description");
		return;
	}
	Public = Public === true ? "Yes" : "No";
	var toDoObj = {
		'toDoName' : myInput,
		'startDate' : sDate,
		'endDate' : dDate,
		'Public' : Public,
		'categories' : categories,
		'description' : description,
		'status' : 'pending',
		'id' : new Date().getTime()
	}
	userArray[userId].toDoUser.push(toDoObj);
	localStorage.setItem("localStorageArray",JSON.stringify(userArray));
	if(userToDoArray.length > 0)
	{
		document.getElementById("todotable").style.display = "inline-table";
		document.getElementById("nodatafound").style.display = "none";
	}
	clearTable();
	printTable(userArray[userId].toDoUser);
	document.getElementById("add_todo").reset();
}
/********** user's todo pagefunction **********/
function showUsersToDoOnPageLoad()
{
	if((localStorage.getItem('localStorageArray') === null) || (sessionStorage.getItem('loggedInUser') === null))
	{
		//window.open = "todo.html";
		return;
	}
	var userId =  sessionStorage.getItem("loggedInUser");
	var userArray = JSON.parse(localStorage.getItem("userrecordarray"));
	var userToDoArray = userArray[userId].toDoUser;
	if(userToDoArray.length == 0)
	{
		document.getElementById("todotable").style.display = "none";
		document.getElementById("nodatafound").style.display = "inline-block";
	}
	var currentDate = new Date();
	var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
	var date = ('0' + currentDate.getDate()).slice(-2);
	var year = currentDate.getFullYear();
	currentDate = year + '-' + month + '-' + date;
	document.getElementById("startdate").min = currentDate;
	document.getElementById("duedate").min = currentDate;
	printTable(userToDoArray);
}
/********** deleting item's in todo-function **********/
function deleteToDoItem()
{
	var confirmDelete = confirm("Do you want to delete?");
	if(confirmDelete == true)
	{
		var userArray = JSON.parse(localStorage.getItem("localStorageArray"));	
		var userId = sessionStorage.getItem("loggedInUser");		
		var userToDoArray = userArray[userId].toDoUser;	
		var checkboxItemsArray = document.getElementsByName("selectedCheckbox");	
		var checkedArray = [];
		var toDoString;
		var toDoId;
		for(var i = 0; i < (checkboxItemsArray.length); i++)	
		{
			toDoString = checkboxItemsArray[i].id;
			toDoId = toDoString.split("-");

			if(document.getElementById("checkbox-"+toDoId[1]).checked == true)
			{
				checkedArray.push(toDoId[1]);
			}
		}
		for(var j = checkedArray.length-1; j >= 0 ;j--)
		{
			for(var k = 0; k < userToDoArray.length; k++)
			{
				if(checkedArray[j] == userToDoArray[k].id)
				{
					userArray[userId].toDoUser.splice(k,1);//The splice() method adds/removes items to/from an array, and returns the removed item(s) and the method changes the original array.	
					document.getElementById("row-"+checkedArray[j]).remove();
				}
			}
		}
		localStorage.setItem("localStorageArray",JSON.stringify(userArray));	
		clearTable();
		printTable(userToDoArray);
		if(userToDoArray.length == 0)
		{
			document.getElementById("todotable").style.display = "none";
			document.getElementById("nodatafound").style.display = "inline-block";
		}
	}
}
/********** editing item's in todo-function **********/
function editToDoItem()
{
	var userArray = JSON.parse(localStorage.getItem("localStorageArray"));
	var userId = sessionStorage.getItem("loggedInUser");	
	var userToDoArray = userArray[userId].toDoUser;
	var checkboxItemsArray = document.getElementsByName("selectedCheckbox");
	var flag = 0;
	var i = 0;
	var edit_item = 0;
    for(i = (userArray[userId].toDoUser.length-1); i >= 0; i--)	
    {
    	if(checkboxItemsArray[i].checked === true)	
        {
			flag++;
			edit_item = i;
        }
	}
	if(flag == 1)
	{	
		if(checkboxItemsArray[edit_item].checked === true)	
		{
			document.getElementById("Input").value = userArray[userId].toDoUser[edit_item].toDoName;
			document.getElementById("startdate").value = userArray[userId].toDoUser[edit_item].startDate;
			document.getElementById("duedate").value = userArray[userId].toDoUser[edit_item].endDate;
			if((userArray[userId].toDoUser[edit_item].Public) == "No")	
			{
				document.getElementById("Public").checked = false;
			}
			else	
			{
				document.getElementById("Public").checked = true;		
			}
			if((userArray[userId].toDoUser[edit_item].categories) == "Home")
			{
				document.getElementsByName("categories")[0].checked = true;
			}
			else if((userArray[userId].toDoUser[edit_item].categories) == "Personal")
			{
				document.getElementsByName("categories")[1].checked = true;
			}
			else
			{
				document.getElementsByName("categories")[2].checked = true;
			}
			document.getElementById("description").value = userArray[userId].toDoUser[edit_item].description;
			document.getElementById("add").style.display = "none";
			document.getElementById("delete").disabled = true;
			document.getElementById("save").style.display = "inline-block";
			sessionStorage.setItem("toDoArrayIndex",edit_item);
		}
	}
	else if(flag == 0)
	{
		alert("Select item's to edit");
	}
	else
	{
		alert("Only one item at a time can be edited");
	}
}
/********** saving the changes of item's in todo-function **********/
function saveChanges()
{
	var index = sessionStorage.getItem("toDoArrayIndex");
	var userArray = JSON.parse(localStorage.getItem("localStorageArray"));
	var userId = sessionStorage.getItem("loggedInUser");
	userArray[userId].toDoUser[index].toDoName = document.getElementById("Input").value;
	userArray[userId].toDoUser[index].startDate = document.getElementById("startdate").value;
	userArray[userId].toDoUser[index].endDate = document.getElementById("duedate").value;
	if(document.getElementById("public").checked == true)
	{
		userArray[userId].toDoUser[index].Public = "Yes";
	}
	else
	{
		userArray[userId].toDoUser[index].Public = "No";
	}
	if(document.getElementsByName("categories")[0].checked == true)
	{
		userArray[userId].toDoUser[index].categories = "Home";
	}
	else if(document.getElementsByName("categories")[1].checked == true)
	{
		userArray[userId].toDoUser[index].categories = "Personal";
	}
	else
	{
		userArray[userId].toDoUser[index].categories = "Company";
	}
	userArray[userId].toDoUser[index].description = document.getElementById("description").value;
	localStorage.setItem("localStorageArray",JSON.stringify(userArray));
	sessionStorage.removeItem("toDoArrayIndex");
}
/********** mark done function **********/
function markDone()
{
	var userArray = JSON.parse(localStorage.getItem("localStorageArray"));
	var userId = sessionStorage.getItem("loggedInUser");
	var checkboxItemsArray = document.getElementsByName("selectedCheckbox");
	var flag = 0;
	for(i = 0; i <= (checkboxItemsArray.length-1); i++)	
    {
    	if(checkboxItemsArray[i].checked === true)
        {
			flag++;
			userArray[userId].toDoUser[i].status = "done";
        }
	}
	if(flag == 0)
	{
		alert("Select the item's to mark as done")
	}
	else
	{
		localStorage.setItem("localStorageArray",JSON.stringify(userArray));
		clearTable();
		printTable(userArray[userId].toDoUser);
	}
}
/********** filter's in todo-function **********/
function filterToDo()
{
	filterValue = document.getElementById("filterby").value;

	if(filterValue == "categories")
	{
		setFilteredValues("none","inline-block","none");
	}
	else if(filterValue == "status")
	{
		setFilteredValues("inline-block","none","none");
	}
	else if(filterValue == "date")
	{
		setFilteredValues("none","none","inline-block");
	}
	else
	{
		var userArray = JSON.parse(localStorage.getItem("localStorageArray"));
		var userId = sessionStorage.getItem("loggedInUser");
		var userToDoArray = userArray[userId].toDoUser;		
		setFilteredValues("none","none","none");
		clearTable();
		printTable(userToDoArray);
	}
}
/********** filter's of categories in todo-function **********/
function filterToDoByCategories()
{
	var userArray = JSON.parse(localStorage.getItem("localStorageArray"));
	var userId = sessionStorage.getItem("loggedInUser");
	var userToDoArray = userArray[userId].toDoUser;
	var filterValueCategories = document.getElementById("categoriesfilter").value;
	if(filterValueCategories == "Home")
	{
		var homeUserArray = userToDoArray.filter(function(categoryHome){
		return(categoryHome.categories === "Home")
		})
		if(homeUserArray.length == 0)
		{
			document.getElementById("todotable").style.display = "none";
			document.getElementById("nodatafound").style.display = "inline-block";
		}
		else
		{
			document.getElementById("nodatafound").style.display = "none";
			document.getElementById("todotable").style.display = "inline-table";
			clearTable();
			printTable(homeUserArray);
			return homeUserArray;
		}
	}
	else if(filterValueCategories == "Personal")
	{
		var personalUserArray = userToDoArray.filter(function(categoryPersonal){
		return(categoryPersonal.categories === "Personal")
		})

		if(personalUserArray.length == 0)
		{
			document.getElementById("todotable").style.display = "none";
			document.getElementById("nodatafound").style.display = "inline-block";
		}
		else
		{
			document.getElementById("nodatafound").style.display = "none";
			document.getElementById("todotable").style.display = "inline-table";
			clearTable();
			printTable(personalUserArray);
			return personalUserArray;
		}
	}
	else if(filterValueCategories == "Company")
	{
		var CompanyUserArray = userToDoArray.filter(function(categoryCompany){
		return(categoryCompany.categories === "Company")
		})
		if(CompanyUserArray.length == 0)
		{
			document.getElementById("todotable").style.display = "none";
			document.getElementById("nodatafound").style.display = "inline-block";
		}
		else
		{
			document.getElementById("nodatafound").style.display = "none";
			document.getElementById("todotable").style.display = "inline-table";
			clearTable();
			printTable(CompanyUserArray);
			return CompanyUserArray;
		}
	}
	else
	{
		if(userToDoArray.length == 0)
		{
			document.getElementById("todotable").style.display = "none";
			document.getElementById("nodatafound").style.display = "inline-block";
		}
		else
		{
			document.getElementById("nodatafound").style.display = "none";
			document.getElementById("todotable").style.display = "inline-table";
			clearTable();
			printTable(userToDoArray);
			return userToDoArray;
		}
	}
}
/********** filter's of status in todo-function **********/
function filterToDoByStatus()
{
	var userArray = JSON.parse(localStorage.getItem("localStorageArray"));
	var userId = sessionStorage.getItem("loggedInUser");
	var userToDoArray = userArray[userId].toDoUser;
	var filterValueStatus = document.getElementById("statusfilter").value;
	if(filterValueStatus == "done")
	{
		var statusDoneArray = userToDoArray.filter(function(doneStatus){
		return(doneStatus.status === "done")
		})
		if(statusDoneArray.length == 0)
		{
			document.getElementById("todotable").style.display = "none";
			document.getElementById("nodatafound").style.display = "inline-block";
		}
		else
		{
			document.getElementById("nodatafound").style.display = "none";
			document.getElementById("todotable").style.display = "inline-table";
			clearTable();
			printTable(statusDoneArray);
			return statusDoneArray;
		}
	}
	else if(filterValueStatus == "pending")
	{
		var pendingDoneArray = userToDoArray.filter(function(pendingStatus){
			return(pendingStatus.status === "pending")
			})
		if(pendingDoneArray.length == 0)
		{
			document.getElementById("todotable").style.display = "none";
			document.getElementById("nodatafound").style.display = "inline-block";
		}
		else
		{
			document.getElementById("nodatafound").style.display = "none";
			document.getElementById("todotable").style.display = "inline-table";
			clearTable();
	
			printTable(pendingDoneArray);
			return pendingDoneArray;
		}
	}
	else
	{
		if(userToDoArray.length == 0)
		{
			document.getElementById("todotable").style.display = "none";
			document.getElementById("nodatafound").style.display = "inline-block";
		}
		else
		{
			document.getElementById("nodatafound").style.display = "none";
			document.getElementById("todotable").style.display = "inline-table";
			clearTable();
	
			printTable(userToDoArray);
			return userToDoArray;
		}
	}
}
/********** filter's of date in todo-function **********/
function filterToDoByDate()
{
	if(document.getElementById("StartDatefilter") == "")
	{
		alert("Select the start date");
		return;
	}
	else if(document.getElementById("DueDatefilter") == "")
	{
		alert("Select the end date");
		return;
	}
	else
	{
		var userArray = JSON.parse(localStorage.getItem("localStorageArray"));
		var userId = sessionStorage.getItem("loggedInUser");
		var userToDoArray = userArray[userId].toDoUser;
		var sDate = document.getElementById("StartDatefilter").value;
		var dDate = document.getElementById("DueDatefilter").value;
		var newStartDate = new Date(sDate);
		var newDueDate = new Date(dDate);
		if(newStartDate.getTime() > newDueDate.getTime())
		{
			alert("'From' date should come before 'to' date");
			return;
		}
		var dateArray = userToDoArray.filter(function(date1){//self invoking function
			
			return((new Date(date1.startDate).getTime() >= newStartDate.getTime()) && (new Date(date1.startDate).getTime() <= newDueDate.getTime()))
			})

		clearTable();
		printTable(dateArray);
		return(dateArray);
	}
}

function readDesc(i)
{
	var filteredArray =  filterToDoByCategories();
	if( !filteredArray )
	{
		filteredArray = filterToDoByStatus();
		
		if(!filteredArray) 
		{
			filteredArray = filterToDoByDate();
		}
	}
	alert(filteredArray[i].description);
}
/********** clearing table function **********/
function clearTable()
{
	var tableBody = document.getElementById("todotable_body");
	var deleteRow = tableBody.lastElementChild;
	while(deleteRow)
	{
		tableBody.removeChild(deleteRow);
		deleteRow = tableBody.lastElementChild;
	}
}
/********** print table function **********/
function printTable(arr)
{
	for(var i=0; i<arr.length; i++)
	{
		var newRow = document.createElement("tr");
		newRow.setAttribute("id", "row-" + arr[i].id);
		newRow.innerHTML = "<td>" + "<input name='selectedCheckbox' type='checkbox' value='yes' id='checkbox-" + arr[i].id + "' </td>" + "<td>" + arr[i].toDoName + "</td>" + "<td>" + arr[i].startDate + "</td>" +"<td>" + arr[i].endDate + "</td>" +"<td>" + arr[i].Public + "</td>" +"<td>" + arr[i].categories + "</td>" +"<td>" + "<button class='read_todo' id='view-" + arr[i].id + "' onclick='readDesc(" + i + ")'>View</button" + "</td>" +"<td>" + arr[i].status + "</td>";
		document.getElementById("todo_table_body").appendChild(newRow);
	}
}
/********** seting filter's value's in todo-function **********/
function setFilteredValues(status,categories,date)
{
	document.getElementById("statusfilter").style.display = status;
	document.getElementById("categoriesfilter").style.display = categories;
	document.getElementById("datefilter").style.display = date;
}
/********** self invoking function **********/
(function (){
    document.addEventListener('keypress',function(event){
        if(event.keyCode == 13)
        {
            addToDoItem();
        }
    })
})();