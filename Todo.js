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
	var item = new TodoItem("", "");
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
	
	// give notification
	//alert("item added to list!");
		
	console.log(list.toString());
	
	var content = "Name: " + list[counter].name + 
	"<br>Description: " + list[counter].desc +
	"<br>Date: " + list[counter].Date +
	"<br>Reminder: " + list[counter].remind +
	"<br>Rating: " + list[counter].rating +
	"<br> <button class=\"delete\" id=\"delete" + counter + "\" onclick=\"delItem(" + counter + ");\"> Delete</button>" +
	"<button class=\"edit\">Edit</button>" +
	"<button class=\"done\">Done</button>";
	
	var newDiv = document.createElement("div");
	newDiv.id = "viewdiv" + counter;
	newDiv.className = "viewclass";
	
	var br = document.createElement("br");
	br.id = "divBreak" + counter;
	
	document.getElementById("viewer").appendChild(newDiv);
	document.getElementById("viewer").appendChild(br);
	document.getElementById("viewdiv" + counter).innerHTML = content;
	counter++;
}
			
function delItem(index) {
	//splice removes a specific index, pop removes the latest. syntax: splice("index", "howmanyelements")
	list.splice(index, 1);
	
	var div = document.getElementById("viewdiv" + index);
	document.getElementById("viewer").removeChild(div);
	
	var br = document.getElementById("divBreak" + index);
	document.getElementById("viewer").removeChild(br);
	
	counter--;
	cleanup(index);
}
			
//resets the id's to match their new position
function cleanup(index) {
	for(var i = index + 1; i<list.length + 1; i++) {
		//changes the onclick function parameter to match its position
		document.getElementById("delete" + i).setAttribute( "onClick", "delItem(" + (i-1) + ");" );
		document.getElementById("delete" + i).id = "delete" + (i-1);
		document.getElementById("viewdiv" + i).id = "viewdiv" + (i-1);
		document.getElementById("divBreak" + i).id = "divBreak" + (i-1);
			
	}
}
			