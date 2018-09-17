/*Samantha Kostelni
*smk5tk@virginia.edu
*ClickTime Intern Challenge
*/


// initialize array to call api
var arr = ["shells", "baselayers", "mixins", "condiments"];
//initialize counts the number of tacos the user has created
var tacos = 1;
var shellCount = 0;
var baseCount = 0;
var mixinCount = 0;
var condimentCount = 0;

//initialize holder for ingredients
var condiment;
var mix;
var base;
var shell;

for(var i = 0; i < 4; i++){
	setUp(arr[i]);
}

//calls API to get taco ingredients... boring stuff
// I used an unordered list to keep track of ingredients
function setUp(type){

	var request = new XMLHttpRequest();
	request.open("GET", "https://tacos-ocecwkpxeq.now.sh/" + type, true);

	request.onload = function () {
		var data = JSON.parse(this.response);
  		var ul = document.getElementById(type);
  		var i = 0;
  		for(var obj in data){
  			var str = data[i].name;
  			var li = document.createElement("li");
  			var button = document.createElement("button");
  			button.id = data[i].slug;
  			button.class = type;
			button.innerHTML = str;
			button.addEventListener("click", addIngredient);
			li.appendChild(button);
    		ul.appendChild(li);
    		i++;
  		}
	}
	request.send();
}

//adds ingredients to current taco
function addIngredient(){
	var type = this.class;
	switch(type){
		case "shells":
			shellCount++;
			if(shellCount > 1)
				return;
			shell = this.innerHTML;
			break;
		case "baselayers":
			baseCount++;
			if(baseCount > 1)
				return;
			base = this.innerHTML;
			break;
		case "mixins":
			mixinCount++;
			mix = this.innerHTML;
			break;
		case "condiments":
			condimentCount++;
			condiment = this.innerHTML;
			break;
	}
	var str = this.innerHTML;
	document.getElementById("description").innerHTML += " " + str;
}

//creates taco and adds it to list at bottom
function createTaco(){
	document.getElementById("gen-warning").innerHTML = "";
	if(shellCount==0 || baseCount == 0 || mixinCount == 0 || condimentCount == 0){
		document.getElementById("gen-warning").innerHTML = "You haven't chosen enough ingredients yet!!! (please choose one of each)";
		return;
	}
	
	var str ="Taco " + tacos + ": " + "You have chosen a delicious " + base + " taco with " + mix + " and " + condiment + " on " + shell + "!";
	tacos++;
	document.getElementById("description").innerHTML = "Taco " + tacos + ":";
	var ul = document.getElementById("myTacos");
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(str));
    ul.appendChild(li);
    shellCount = 0;
    baseCount = 0;
    mixinCount = 0;
    condimentCount = 0;
}