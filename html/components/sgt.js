class SGT_template {
	constructor(elementConfig) {
		this.elementConfig = elementConfig;
		this.domElements = {
			row: null,
			name: null,
			course: null,
			grade: null,
			operation: null,
			deleteButton: null
		}
		this.data = {};
		this.darkModeActive = false;
		this.handleCancel = this.handleCancel.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.displayAverage = this.displayAverage.bind(this);
		// this.createStudent = this.createStudent.bind(this);
		// this.deleteStudent = this.deleteStudent.bind(this);
		// this.displayAllStudents = this.displayAllStudents.bind(this);
		this.successStudentCallback = this.successStudentCallback.bind(this);
		this.retrieveStudentData = this.retrieveStudentData.bind(this);
		this.addNewStudentToServer = this.addNewStudentToServer.bind(this);
		this.deleteStudentFromServer = this.deleteStudentFromServer.bind(this);
		this.toggleDarkMode = this.toggleDarkMode.bind(this);
	}
	addEventHandlers() {
		this.elementConfig.cancelButton.click(this.handleCancel);
		this.elementConfig.addButton.click(this.handleAdd);
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

		this.elementConfig.displayArea.empty();
		this.addNewStudentToServer(nameValue, courseValue, gradeValue);
		this.clearInputs();
	}
	handleDelete(studentID) {
		var deletedStudentID = $(event.currentTarget).attr('studentID');
		var deleteStudentTwo = $(this).attr('studentID');
		console.log(event.currentTarget);
		console.log(event.target)
		console.log(deleteStudentTwo)
		console.log(deletedStudentID);
		console.log(this.elementConfig)
		console.log(studentID);
		this.deleteStudentFromServer(studentID);
		// this.elementConfig.displayArea.row.deletedStudentID.remove();
		// this.deleteStudentFromServer(id);
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
	// 	this.elementConfig = $('#displayArea');
	// 	this.elementConfig.empty();
	// 	this.data = {};
	// 	this.displayAverage();
	// }
	displayAverage() {
		var gradeTotal = 0;

		for (var i = 0; i < this.data.data.length; i++) {
			var studentGrade = this.data.data[i].grade;
			gradeTotal += studentGrade;
		}

		var gradeAverage = gradeTotal / Object.keys(this.data.data).length;
		this.elementConfig.averageArea.text(gradeAverage.toFixed(2));
	}
	// deleteStudent(id) {
	// 	this.deleteStudentFromServer(id);
	// 	console.log(id);
	// 	//this is actually index
	// }
	successStudentCallback(data, status) {
		this.elementConfig.displayArea.empty();

		if (data.data.length === 0) {
			alert('no data to retrieve');
		}
		console.log(data)

		var dataArray = data.data;
		for (var i = 0; i < dataArray.length; i++) {
			var studentDataResult = dataArray[i];

			this.domElements.row = $('<tr>').attr('studentID', studentDataResult.id);
			this.domElements.name = $('<td>').addClass('name col-xs-4.col-md-4').text(studentDataResult.name);
			this.domElements.course = $('<td>').addClass('course col-xs-4.col-md-4').text(studentDataResult.course);
			this.domElements.grade = $('<td>').addClass('grade col-xs-4.col-md-4').text(studentDataResult.grade);
			this.domElements.operation = $('<td>').addClass('operation col-xs-4.col-md-4');
			this.domElements.deleteButton = $('<button>').on('click', this.handleDelete).text('Delete').addClass('delete btn btn-danger m-2');
			this.domElements.operation.append(this.domElements.deleteButton);
			this.domElements.row.append(this.domElements.name);
			this.domElements.row.append(this.domElements.course);
			this.domElements.row.append(this.domElements.grade);
			this.domElements.row.append(this.domElements.operation);
			this.elementConfig.displayArea.append(this.domElements.row);
		}
		this.data = data;
		this.displayAverage();
		console.log(this.data);
	}
	retrieveStudentData() {
		var ajaxConfigObject = {
			url: '/api/get-student/',
			type: 'GET',
			dataType: 'json',
			data: {
				api_key: 'Vjx3RodsrfTG'
			},
			success: this.successStudentCallback,
			// this.displayAverage()
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
				this.retrieveStudentData();
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

		if (this.darkModeActive) {
			$('body').addClass('darkModeActive');
		} else {
			$('body').addClass('lightModeActive');
		}
	}
}
