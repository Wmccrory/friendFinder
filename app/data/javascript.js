function surveyResults () {
	var newUser = {
			routeName : $("#name").val().trim().replace(/\s+/g, "").toLowerCase(),
			name : $("#name").val().trim(),
			picture : $("#userPicture").val().trim(),
			motto : $("#userMotto").val().trim(),
			scores : []
		}

	for (i = 1; i <= 10; i++) {
		var x = $("#q" + i).val().trim();
		newUser.scores.push(x);
	}

	$.post("/api/friends", newUser)
	.then(function(data) {
		console.log(data);
	})
}

$("#userForm").on("submit", function () {
	surveyResults()
})