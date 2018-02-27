//friend finder logic

var userId = 2; //var increment to make unique route names
var imageReady = false; //making sure user has uploaded and cropped image is ready to go
var userSubmit = false; //checking to see if user has already submitted profile
var tempImageString; //holding base64 image string

//initalizing croppie
var basic = $('#imageCrop').croppie({
	viewport: { width: 300, height: 300, type: 'circle' },
	boundary: { width: 350, height: 350 },
	showZoomer: true,
	url: "../images/blackpanthercroppie.png"
});

//function bank///////////////////////////////////////////////

//taking user uploaded photo and sending it to croppie
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#imageCrop').croppie('bind', {
				url: e.target.result
			});
		}

		reader.readAsDataURL(input.files[0]);
	}
}

//Saving results to database
function surveyResults () {
	//if image crop hasn't been finalized do not accept input
	if (!imageReady) {
		return $("form").append("<h6>Image crop not finalized. Please press 'finished cropping image'. If you already have, give it a moment to upload.</h6>");
	}

	if (userSubmit) {
		return $("form").append("<h6>You've already submitted your form and found true love. Now get out of here!</h6>");
	}

	$("#imageCrop").hide();

	var newUser = {
			routeName : $("#name").val().trim().replace(/\s+/g, "").toLowerCase() + userId,
			name : $("#name").val().trim(),
			picture : tempImageString,
			motto : $("#userMotto").val().trim(),
			scores : []
		}

	userSubmit = true;
	userId++;

	for (i = 1; i <= 10; i++) {
		var x = $("#q" + i).val().trim();
		newUser.scores.push(x);
	}

	$.post("/api/friends", newUser)
	.then(function(data) {
		userMatch(data);
	})
}

//Matching with all possible users
function userMatch(entry) {
	$.get("api/friends")
	.then(function(data) {
		var users = data;
		console.log(entry);
		for (i=0; i < users.length-1; i++) {
			//looping through answers to compare user with potential match
			var totalVal = 0;
			for (x = 0; x <= 9; x++) {
				var tempVal = Math.abs(parseInt(entry.scores[x]) - parseInt(users[i].scores[x]))
				var totalVal = totalVal + tempVal;
			}
			users[i].matchTotal = totalVal;
		}

		console.log(users);
		bestMatch(users);
	});
};

//Selecting best match
function bestMatch (potentialMatch) {
	var selectedMatch = potentialMatch[0];
	//looping through database to find "closest" match
	for (i = 0; i<=potentialMatch.length - 2; i++) {
		if (selectedMatch.matchTotal > potentialMatch[i + 1].matchTotal) {
			var selectedMatch = potentialMatch[i + 1];
		}
	}
	
	$("#modalPhoto, #modalStats").empty();
	$("#modalPhoto").html("<img src='" + selectedMatch.picture + "' /> <h3>" + (100 - selectedMatch.matchTotal) + "% match</h3>");
	$("#modalStats").html("<h1>" + selectedMatch.name + '</h1><h2>"' + selectedMatch.motto + '"</h2>');
	$(".modal").show()
};

//user experience pathways/////////////////////////////////

//getting rid of modal
$(".modalBackground, #modalClose").on("click", function () {
	$(".modal").hide();
});

//initializing match functions
$("#userForm").on("submit", function () {
	surveyResults()
});

//invoking initial photo upload
$("#userPicture").change(function(){
	readURL(this);
});

//Making sure image is cropped and ready to go
$("#imageDone").on("click", function() {
	event.preventDefault();
	basic.croppie('result').then(croppieData => {
		tempImageString = croppieData;
		imageReady = true;
	});
});

//test area
