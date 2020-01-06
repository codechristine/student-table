
$(document).ready( startApp );

var SGT;
function startApp(){

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
