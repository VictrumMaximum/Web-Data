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
		list.push(item);
		alert("item added to list!");
	}
			
	function delItem(index) {
		list.pop(index);
	}
			
	function view() {
		console.log(list.toString());
		var content = "";
		for(var i = 0; i < list.length; i++) {
			content = "Name: " + list[i].name + 
			"<br>Description: " + list[i].desc +
			"<br>Date: " + list[i].Date +
			"<br>Reminder: " + list[i].remind +
			"<br>Rating: " + list[i].rating;
			
			var newDiv = document.createElement("div");
			newDiv.id = "viewdiv" + i;
			document.getElementById.appendChild(newDiv);
			document.getElementById("viewdiv" + i).innerHTML = content;
			
		}	
	}
			