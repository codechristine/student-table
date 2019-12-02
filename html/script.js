
$(document).ready( startApp );

var SGT;
function startApp(){
	/*
	startTests will test your code.  Once it works,
	delete startTests and uncomment the code below to run code and test it
	*/
	// intiateTestDisplay();
	// startTests();

	SGT = new SGT_template({
		addButton: $("#addButton"),
		cancelButton: $("#cancelButton"),
		nameInput: $("#studentName"),
		courseInput: $("#studentCourse"),
		gradeInput: $("#studentGrade"),
		displayArea: $("#displayArea"),
		averageArea: $(".avgGrade")
	});
	SGT.addEventHandlers();
}
