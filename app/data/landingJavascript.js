//friendfinder home

//prototype for truncating long names so they don't break layout
String.prototype.trunc = String.prototype.trunc ||
	function(n){
		return (this.length > n) ? this.substr(0, n-1) + '...' : this;
	};

function testFunction () {
	$.get("api/friends").then(data => {
		var chosen = Math.floor(Math.random() * data.length);
		var featured = data[chosen];

		if (featured.name.length > 15) {
			var temp = featured.name.trunc(15);
			featured.name = temp
		}

	$("#modalPhoto").html("<img src='" + featured.picture + "' />");
	$("#modalStats").html("<h3>Featured user:</h3><h1>" + featured.name + '</h1><h2>"' + featured.motto + '"</h2>');

	})
}

testFunction()