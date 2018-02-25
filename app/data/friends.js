//friendFINDer app//

//user array//
var users = [];

function surveyResults () {
	var newUser = {
		routeName : $("#name").val().trim().replace(/\s+/g, "").toLowerCase(),
		name : $("#name").val().trim(),
		picture : $("#userPicture").val().trim(),
		scores : []
	}

	for (i = 1; i <= 10; i++) {
		var x = $("#q" + i).val().trim()
		newUser.scores.push(x);
	}

	users.push(newUser);
	console.log(users);
}

$("#submit").on("click", function () {
	event.preventDefault()
	surveyResults()
})