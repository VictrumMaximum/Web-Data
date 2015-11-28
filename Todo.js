alert("fuck");
function  TodoItem(name, Date, desc, remind, rating) {
	this.name = name;
	this.Date = Date;
	this.desc = desc;
	this.remind = remind;
	this.rating = rating;
	this.toString = function() {return ("[Name: " + this.name
			+ ", Description: " + this.desc
			+ ", Due date: " + this.Date
			+ ", Reminder: " + this.remind
			+ ", Importance rating: " + this.rating
			+ "] ")};
	}
			
var list = [];
var counter = 0;

TodoItem.prototype.setName = function(name) {this.name = name;};
TodoItem.prototype.setDate = function(Date) {this.Date = Date;};
TodoItem.prototype.getName = function() {return this.name;};
TodoItem.prototype.getDate = function() {return this.Date;};
TodoItem.prototype.setDesc = function(desc) {this.desc = desc;};
TodoItem.prototype.getDesc = function() {return this.desc;};
TodoItem.prototype.setRemind = function(remind) {this.remind = remind;};
TodoItem.prototype.getRemind = function() {return this.remind;};
TodoItem.prototype.setRating = function(rating) {this.rating = rating;};
TodoItem.prototype.getRating = function() {return this.rating;};
			
			
function addItem() {
	console.log("2: " + counter);
	
	var item = new TodoItem();
	item.setName(document.getElementById("namein").value);
	item.setDesc(document.getElementById("descin").value);
	item.setDate(document.getElementById("datein").value);
	item.setRemind(document.getElementById("remindin").value);
	item.setRating(document.getElementById("ratingin").value);
		
	// add todo to the list
	list.push(item);
		
	// crear text field
	document.getElementById("namein").value = "";
	document.getElementById("descin").value = "";
	document.getElementById("datein").value = "";
	document.getElementById("remindin").value = "";
	document.getElementById("ratingin").value = "";
		
	//print list
	console.log(list.toString());
	var content = "Name: " 	+ list[counter].name + 
	"<br>Description: " + list[counter].desc +
	"<br>Date: " 		+ list[counter].Date +
	"<br>Reminder: " 	+ list[counter].remind +
	"<br>Rating: " 		+ list[counter].rating +
	"<br> <button class=\"delete\" id=\"delete\" onclick=\"delItem()\"> Delete</button>" +
	"<button class=\"edit\">Edit</button>" +
	"<button class=\"done\">Done</button>";
			
	//create div variable
	var newDiv = document.createElement("div");
	//newDiv.id = "viewdiv";
	newDiv.className = "viewclass";
	newDiv.innerHTML = content;
	console.log("newDiv: ");
	console.log(newDiv);
	
	//create br variable
	var br = document.createElement("br");
	
	//insert div
	document.getElementById("viewer").appendChild(newDiv);
	//insert br
	document.getElementById("viewer").appendChild(br);
	//add content to html div
	//document.getElementById("viewdiv").innerHTML = content;
	counter++;
	console.log("content: " + content);
	var body = document.body;
	console.log("body after add: ");
	console.log(body);
	
	
	// give notification
	//alert("item added to list!");
}
		
function delItem(index) {
	for(var i = 0; i < list.length; i++) {
		console.log(i + " 1= " + list[i]);
	}
	list.splice(index, 1);
	for(var i = 0; i < list.length; i++) {
		console.log(i + " 2= " + list[i]);
	}
	var div = document.getElementById("viewer");
	console.log("divToDelete: ");
	console.log(div);
	document.getElementById("viewer").removeChild(document.getElementById("viewer").children[index]);
	var body = document.body;
	console.log(body);
	//cleanup();
	for(var i = 0; i < list.length; i++) {
		console.log(i + " 3= " + list[i]);
	}
	counter--;
	console.log("1: " + counter);
}

function cleanup() {
	for(var i = 0; i < list.length; i++) {
		if(list[i] == "" || list[i] == null) {
			list[i] = list[i + 1];
			list[i + 1] = null;
		}
	}
	counter--;
}
			