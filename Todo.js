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
		
		// add todo to the list
		list.push(item);
		
		// crear text field
		document.getElementById("namein").value = "";
		document.getElementById("descin").value = "";
		document.getElementById("datein").value = "";
		document.getElementById("remindin").value = "";
		document.getElementById("ratingin").value = "";
		
		// give notification
		alert("item added to list!");
	}
			
	function delItem(index) {
		list.pop(index);
		var div = document.getElementById("viewdiv" + index);
		document.getElementById("viewer").removeChild(div);
		
	}
			
	function view() {
		console.log(list.toString());
		for(var i = 0; i < list.length; i++) {
			var content = "Name: " + list[i].name + 
			"<br>Description: " + list[i].desc +
			"<br>Date: " + list[i].Date +
			"<br>Reminder: " + list[i].remind +
			"<br>Rating: " + list[i].rating +
			"<br> <button class=\"delete\" id=\"delete" + i + "\" onclick=\"delItem(" + i + ")\"> Delete</button>" +
				"<button class=\"edit\">Edit</button>" +
				"<button class=\"done\">Done</button>";
			//if(true) {
				var newDiv = document.createElement("div");
				newDiv.id = "viewdiv" + i;
				newDiv.className = "viewclass";
				var br = document.createElement("br");
				document.getElementById("viewer").appendChild(newDiv);
				document.getElementById("viewer").appendChild(br);
				document.getElementById("viewdiv" + i).innerHTML = content;
			//}
		}	
	}
			