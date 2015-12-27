function  TodoItem(name, date, desc, remind, rating) {
	this.name = name;
	this.date = date;
	this.desc = desc;
	this.remind = remind;
	this.rating = rating;
	this.toString = function() {return ("[Name: " + this.name
			+ ", Description: " + this.desc
			+ ", Due date: " + this.date
			+ ", Reminder: " + this.remind
			+ ", Importance rating: " + this.rating
			+ "] \n")};
	}
			
var list = [];
var copy = [];
var counter = 0;
		
TodoItem.prototype.setName = function(name) {this.name = name;};
TodoItem.prototype.setDate = function(date) {this.date = date;};
TodoItem.prototype.getName = function() {return this.name;};
TodoItem.prototype.getDate = function() {return this.date;};
TodoItem.prototype.setDesc = function(desc) {this.desc = desc;};
TodoItem.prototype.getDesc = function() {return this.desc;};
TodoItem.prototype.setRemind = function(remind) {this.remind = remind;};
TodoItem.prototype.getRemind = function() {return this.remind;};
TodoItem.prototype.setRating = function(rating) {this.rating = rating;};
TodoItem.prototype.getRating = function() {return this.rating;};
			
			
function addItem() {
	var item = new TodoItem();
	item.setName(document.getElementById("namein").value);
	item.setDesc(document.getElementById("descin").value);
	if(document.getElementById("dayin").value != "" && document.getElementById("monthin").value != "" && document.getElementById("yearin").value != "") {
		item.setDate(new Date(document.getElementById("yearin").value, document.getElementById("monthin").value - 1, document.getElementById("dayin").value).toDateString());
	}
	else
		item.setDate("");
	if(document.getElementById("remindday").value != "" && document.getElementById("remindmonth").value != "" && document.getElementById("remindyear").value != "") {
		item.setRemind(new Date(document.getElementById("remindyear").value, document.getElementById("remindmonth").value - 1, document.getElementById("remindday").value).toDateString());
	}
	else
		item.setRemind("");
	item.setRating(document.getElementById("ratingin").value);
		
	// add todo to the list
	list.push(item);
		
	// clear text field
	document.getElementById("namein").value = "";
	document.getElementById("descin").value = "";
	document.getElementById("dayin").value = "";
	document.getElementById("monthin").value = "";
	document.getElementById("yearin").value = "";
	document.getElementById("remindday").value = "";
	document.getElementById("remindmonth").value = "";
	document.getElementById("remindyear").value = "";
	document.getElementById("ratingin").value = "";
		
	console.log(list.toString());
	sendItems();
	addHTML();
}
	
function addHTML() {
	var content = "<div class=\"viewclass\" id=\"toggler" + counter + "\" onClick=\"toggleText(" + counter + ")\">" +
		"Name: " + list[counter].name + 
		"<br><div id=\"toggle" + counter + "\" class=\"toggle\">" +
		"Description: " + list[counter].desc +
		"<br>Date: " + list[counter].date +
		"<br>Reminder: " + list[counter].remind +
		"<br>Rating: " + list[counter].rating +
		"<br></div></div>" +
		"<div id=\"buttons" + counter + "\">" +
		"<button class=\"delete\" id=\"delete" + counter + "\" onclick=\"delItem(" + counter + ");\"> Delete</button>" +
		"<button class=\"edit\" id=\"edit" + counter + "\" onclick=\"editItem(" + counter + ");\">Edit</button>" +
		"<button class=\"done\" id=\"done" + counter + "\" onclick=\"doneItem(" + counter + ");\">Done</button></div>";
	
	var newDiv = document.createElement("div");
	newDiv.id = "viewdiv" + counter;
	newDiv.className = "itemclass";
	
	document.getElementById("viewer").appendChild(newDiv);
	document.getElementById("viewdiv" + counter).innerHTML = content;
	
	counter++;
	document.getElementById("counter").innerHTML = "Items in list: " + counter;
}
			
function delItem(index) {
	//splice removes a specific index, pop removes the latest. syntax: splice("index", "howmanyelements")
	list.splice(index, 1);
	
	var div = document.getElementById("viewdiv" + index);
	document.getElementById("viewer").removeChild(div);
	counter--;
	document.getElementById("counter").innerHTML = "Items in list: " + counter;
	sendItems();
	cleanup(index);
}
			
//resets the id's to match their new position
function cleanup(index) {
	for(var i = index + 1; i<list.length + 1; i++) {
		//changes the onclick function parameter to match its position
		document.getElementById("delete" + i).setAttribute("onClick", "delItem(" + (i-1) + ");" );
		document.getElementById("delete" + i).id = "delete" + (i-1);
		document.getElementById("toggler" + i).setAttribute("onClick", "toggleText(" + (i-1) + ");" );
		document.getElementById("toggler" + i).id = "toggler" + (i-1);
		document.getElementById("toggle" + i).id = "toggle" + (i-1);
		document.getElementById("buttons" + i).id = "buttons" + (i-1);
		//for done items, this is not necessary
		if(document.getElementById("edit" + i) != null) {
			document.getElementById("edit" + i).setAttribute("onClick", "editItem(" + (i-1) + ");" );
			document.getElementById("edit" + i).id = "edit" + (i-1);
			document.getElementById("done" + i).setAttribute("onClick", "doneItem(" + (i-1) + ");" );
			document.getElementById("done" + i).id = "done" + (i-1);
		}
		document.getElementById("viewdiv" + i).id = "viewdiv" + (i-1);
	}
}

function editItem(index) {
	//get values from array
	var name = list[index].name;
	var desc = list[index].desc;
	var date = list[index].date;
	var remind = list[index].remind;
	var rating = list[index].rating;
	
	//create content string with values from old item
	var content = "<div class=\"viewclass\">" +
			"Name: <input type=\"text\" id=\"nameEdit\" value=\"" + name + "\"> <br>" +
			"Description: <input type=\"text\" class=\"description-in\" id=\"descEdit\" value=\"" + desc + "\"> <br>" +
			"Date: <input class=\"daymoin\" type=\"text\" id=\"dayEdit\" placeholder=\"dd\" value=\"" + desc + "\" maxlength=\"2\">" + 
			"<input class=\"daymoin\" type=\"text\" id=\"monthEdit\" placeholder=\"mm\" maxlength=\"2\">" + 
			"<input class=\"yearin\" type=\"text\" id=\"yearEdit\" placeholder=\"yyyy\" maxlength=\"4\"><br>" +
			"reminder: <input type=\"text\" class=\"reminder-in\" id=\"remindEdit\" value=\"" + remind + "\"> <br>" +
			"Importance rating: <input type=\"text\" class=\"rating-in\" id=\"ratingEdit\" value=\"" + rating + "\"></div>" +
			"<div class=\"buttons\"><button class=\"add-reminder\" onclick=\"saveItem(" + index + ");\">Save</button></div>";
	//update html
	document.getElementById("viewdiv" + index).innerHTML = content;
}

function saveItem(index) {
	//get values from input fields
	var name = document.getElementById("nameEdit").value;
	var desc = document.getElementById("descEdit").value;
	var day = document.getElementById("dayEdit").value;
	var month = document.getElementById("monthEdit").value;
	var year = document.getElementById("yearEdit").value;
	//check if date is inserted, otherwise put empty
	if(day != "" && month != "" && year != "") {
		var date = new Date(year, month, day).toDateString();
	}
	else {
		var date = "";
	}
	var remind = document.getElementById("remindEdit").value;
	var rating = document.getElementById("ratingEdit").value;
	
	//update array
	list[index].name = name;
	list[index].desc = desc;
	list[index].date = date;
	list[index].remind = remind;
	list[index].rating = rating;
	
	//create updated content string
	var content = "<div class=\"viewclass\" id=\"toggler" + index + "\" onClick=\"toggleText(" + index + ");\">" +
	"Name: " + name + 
	"<br><div id=\"toggle" + index + "\" class=\"toggle\">" +
	"Description: " + desc +
	"<br>Date: " + date +
	"<br>Reminder: " + remind +
	"<br>Rating: " + rating +
	"<br></div></div>" +
	"<div id=\"buttons" + index + "\">" +
	"<button class=\"delete\" id=\"delete" + index + "\" onclick=\"delItem(" + index + ");\"> Delete</button>" +
	"<button class=\"edit\" id=\"edit" + index + "\" onclick=\"editItem(" + index + ");\">Edit</button>" +
	"<button class=\"done\" id=\"done" + index + "\" onclick=\"doneItem(" + index + ")\";\>Done</button></div>";
	
	//update html
	document.getElementById("viewdiv" + index).innerHTML = content;

	sendItems();
}

//toggles the viewdiv between showing only name and showing all
function toggleText(id) {
    var theText = document.getElementById("toggle" + id);
	console.log(theText.style.display);
	(theText.style.display=='block') ? theText.style.display='none' : theText.style.display='block' ;  
}

function toggleOn(id) {
	console.log(id);
	var theText = document.getElementById("toggle" + id);
	theText.style.display='block';
}

function toggleOff(id) {
	var theText = document.getElementById("toggle" + id);
	theText.style.display='none';
}

function doneItem(index) {
	document.getElementById("toggler" + index).style.textDecoration = "line-through";
	document.getElementById("buttons" + index).innerHTML = "<button class=\"delete\" id=\"delete" + index + "\" onclick=\"delItem(" + index + ");\"> Delete</button>";
	
}

function sortDate() {
	if(list.length > 1) {
		copy = list.slice(0);
		list.sort(function(a, b){
			return new Date(a.date) - new Date(b.date);
		});
		counter = 0;
		for(var i = 0; i < list.length; i++) {
			addHTML();
		}
	}
	else
		console.log("not enough items");
}

function sendItems() {
	$.ajax({
		url: "http://localhost:3000/read",
		type: "POST",
		data: JSON.stringify(list),
		contentType: "application/json",
		success: function(data) {console.log(data);}
	});
}

function fetch() {
	$.get(
		"http://localhost:3000/get",
		function(data) {
				console.log(data);
				list = data;
				for(var i = 0; i < list.length; i++) {
					addHTML();
				}
		}
	);
}

function checkList(data) {
	list = data;
	console.log(list.toString());
	addHTML();
}
			
