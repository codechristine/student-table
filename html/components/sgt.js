class SGT_template {
	constructor(elementConfig) {
		this.domElements = {
			row: null,
			name: null,
			course: null,
			grade: null,
			operation: null,
			deleteButton: null
		};
		this.elementConfig = elementConfig;
		this.data = {};
		this.darkModeActive = false;
		// this.render = this.render.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		// this.createStudent = this.createStudent.bind(this);
		// this.deleteStudent = this.deleteStudent.bind(this);
		this.retrieveStudentData = this.retrieveStudentData.bind(this);
		this.addNewStudentToServer = this.addNewStudentToServer.bind(this);
		this.deleteStudentFromServer = this.deleteStudentFromServer.bind(this);
		this.toggleDarkMode = this.toggleDarkMode.bind(this);
	}
	// render() {
// 		this.domElements.row = $('<tr>');

// 		this.domElements.name	=	$('<td>').addClass('name col-xs-4.col-md-4').text(this.data.name);
// 		this.domElements.course = $('<td>').addClass('course col-xs-4.col-md-4').text(this.data.course);
// 		this.domElements.grade = $('<td>').addClass('grade col-xs-4.col-md-4').text(this.data.grade);
// 		this.domElements.operation = $('<td>').addClass('operation col-xs-4.col-md-4');

// 		this.domElements.deleteButton = $('<button>').on('click', this.handleDelete).text('Delete').addClass('delete btn btn-danger m-2');
// 		this.domElements.operation.append(this.domElements.deleteButton);
// 		this.domElements.row.append(this.domElements.name);
// 		this.domElements.row.append(this.domElements.course);
// 		this.domElements.row.append(this.domElements.grade);
// 		this.domElements.row.append(this.domElements.operation)

// 		return this.domElements.row;
	// }
	addEventHandlers() {
		this.elementConfig.addButton.click(this.handleAdd);
		this.elementConfig.cancelButton.click(this.handleCancel);
		$('#retrieveButton').click(this.retrieveStudentData);
		$('.slider').click(this.toggleDarkMode);
	}
	clearInputs() {
		this.elementConfig.courseInput.val('');
		this.elementConfig.gradeInput.val('');
		this.elementConfig.nameInput.val('');
	}
	handleCancel() {
		this.clearInputs();
	}
	// createStudent(name, course, grade) {
	// 	var studentID = Object.keys(this.data);
	// 	console.log(studentID);
	// 	if (this.doesStudentExist(id)) {
	// 		return false;
	// 	}
	// 	// if (id === undefined) {
	// 	// 	for (var i = 1; i <= studentID.length + 1; i++) {
	// 	// 		if (!this.doesStudentExist(i)) {
	// 	// 			this.data[i] = new Student(i, name, course, grade, this.deleteStudentFromServer);
	// 	// 			return true;
	// 	// 		}
	// 	// 	}
	// 	// }
	// 	this.data[id] = new Student(id, name, course, grade, this.deleteStudentFromServer);
	// 	return true;
	// }
	// doesStudentExist(id) {
	// 	if (this.data.hasOwnProperty(id)) {
	// 		console.log(id)
	// 		console.log(this.data)
	// 		//this is also index
	// 		return true;
	// 	}
	// 	return false;
	// }
	handleAdd() {
		var nameValue = this.elementConfig.nameInput.val();
		var gradeValue = this.elementConfig.gradeInput.val();
		var courseValue = this.elementConfig.courseInput.val();

		this.addNewStudentToServer(nameValue, courseValue, gradeValue);
		this.clearInputs();
	}
	// readStudent(id) {
	// 	if (!id) {
	// 		console.log(id);
	// 		console.log(Object.values(this.data))
	// 		return Object.values(this.data);
	// 	}
	// 	if (!this.doesStudentExist(id)) {
	// 		return false;
	// 	}
	// 	return this.data[id];
	// }
	// displayAllStudents() {
	// 	this.elementConfig.displayArea.empty();

	// 	for (var student in this.data) {
	// 		console.log(student)
	// 		//student here is also index
	// 		this.elementConfig.displayArea.append(this.data[student].render());
	// 	}
	// 	this.data = {};
	// 	this.displayAverage();
	// }
	displayAverage() {
		var total = 0
		for (var student in this.data) {
			total += this.data[student].data.grade;
		}
		var average = total / Object.keys(this.data).length;

		this.elementConfig.averageArea.text(average.toFixed(2));
	}
	// deleteStudent(id) {
	// 	this.deleteStudentFromServer(id);
	// 	console.log(id);
	// 	//this is actually index
	// }
	retrieveStudentData() {
		var ajaxConfigObject = {
			url: '/api/get-student/',
			type: 'GET',
			dataType: 'json',
			data: {
				api_key: 'Vjx3RodsrfTG'
			},
			success: function (data, status) {
				if(data.data.length === 0){
					alert('no data to retrieve');
				}
				var dataArray = data.data;
				for (var i = 0; i < dataArray.length; i++) {
					var studentDataResult = dataArray[i];
					console.log(studentDataResult);

					// var domElements = {
					// 			row: null,
					// 			name: null,
					// 			course: null,
					// 			grade: null,
					// 			operation: null,
					// 			deleteButton: null
					// }

					// domElements.row = $('<tr>');

					// domElements.name = $('<td>').addClass('name col-xs-4.col-md-4').text(studentDataResult.name);
					// domElements.course = $('<td>').addClass('course col-xs-4.col-md-4').text(studentDataResult.course);
					// domElements.grade = $('<td>').addClass('grade col-xs-4.col-md-4').text(studentDataResult.grade);
					// domElements.operation = $('<td>').addClass('operation col-xs-4.col-md-4');

					// domElements.deleteButton = $('<button>').on('click', this.deleteStudentFromServer).text('Delete').addClass('delete btn btn-danger m-2');
					// domElements.operation.append(domElements.deleteButton);
					// domElements.row.append(domElements.name);
					// domElements.row.append(domElements.course);
					// domElements.row.append(domElements.grade);
					// domElements.row.append(domElements.operation)

					// return domElements.row;

					// $('.name').append(studentDataResult.name);
					// $('.course').append(studentDataResult.grade);
					// $('.grade').append(studentDataResult.grade);

					// this.elementConfig = $('#displayArea');
					console.log(this.elementConfig)
					// this.elementConfig.displayArea.append(studentDataResult.name, studentDataResult.course, studentDataResult.grade);
					// var newStudentFromRecievedData = this.createStudent(studentDataResult.name, studentDataResult.course, studentDataResult.grade);
				}
				console.log(this.elementConfig)
				// $('#displayArea').empty();
				// $('#displayArea').append(studentDataResult.name, studentDataResult.course, studentDataResult.grade);
				// this.elementConfig.displayArea.append(studentDataResult);
				// this.displayAverage();
			},
			// 	this.displayAllStudents();
			// }.bind(this),
			error: function (status, err) {
				alert(err + ': retrieved student data failed');
			}
		}
		$.ajax(ajaxConfigObject);
	}
	addNewStudentToServer(studentName, studentCourse, studentGrade) {
		var ajaxConfigObject = {
			url: '/api/add-student/',
			type: 'POST',
			dataType: 'json',
			data: {
				api_key: 'Vjx3RodsrfTG',
				name: studentName,
				course: studentCourse,
				grade: studentGrade,
			},
			success: this.retrieveStudentData,
			error: function (status, err) {
				alert(err + ': input fields can\'t be empty');
			},
		}
		$.ajax(ajaxConfigObject);
	}
	deleteStudentFromServer(studentID) {
		var ajaxConfigObject = {
			url: `/api/delete-student/${studentID}`,
			type: 'DELETE',
			dataType: 'json',
			data: {
				api_key: 'Vjx3RodsrfTG',
			},
			success: function (status, err) {
				alert('click "OK" to confirm deleting student');
				this.retrieveStudentData
		},
			error: function (status, err) {
				alert(err + ': delete student failed');
			},
		}
		$.ajax(ajaxConfigObject);
	}
	toggleDarkMode() {
		this.darkModeActive = !this.darkModeActive;
		$('body').removeClass()

		if(this.darkModeActive){
			$('body').addClass('darkModeActive');
		} else {
			$('body').addClass('lightModeActive');
		}
	}
}
