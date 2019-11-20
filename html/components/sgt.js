class SGT_template {
	constructor(elementConfig) {
		this.elementConfig = elementConfig;
		this.data = {};
		this.darkModeActive = false;
		this.handleAdd = this.handleAdd.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.deleteStudent = this.deleteStudent.bind(this);
		this.retrieveStudentData = this.retrieveStudentData.bind(this);
		this.addNewStudentToServer = this.addNewStudentToServer.bind(this);
		this.deleteStudentFromServer = this.deleteStudentFromServer.bind(this);
		this.toggleDarkMode = this.toggleDarkMode.bind(this);
	}
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
	createStudent(name, course, grade, id) {
		var studentID = Object.keys(this.data);

		if (this.doesStudentExist(id)) {
			return false;
		}
		if (id === undefined) {
			for (var i = 1; i <= studentID.length + 1; i++) {
				if (!this.doesStudentExist(i)) {

					this.data[i] = new Student(i, name, course, grade, this.deleteStudent);
					return true;
				}
			}
		}
		this.data[id] = new Student(id, name, course, grade, this.deleteStudent);
		return true;
	}
	doesStudentExist(id) {
		if (this.data.hasOwnProperty(id)) {
			return true;
		}
		return false;
	}
	handleAdd() {
		var nameValue = this.elementConfig.nameInput.val();
		var gradeValue = this.elementConfig.gradeInput.val();
		var courseValue = this.elementConfig.courseInput.val();

		this.addNewStudentToServer(nameValue, courseValue, gradeValue);
		this.clearInputs();
	}
	readStudent(id) {
		if (!id) {
			return Object.values(this.data);
		}
		if (!this.doesStudentExist(id)) {
			return false;
		}
		return this.data[id];
	}
	displayAllStudents() {
		this.elementConfig.displayArea.empty();
		for (var student in this.data) {
			this.elementConfig.displayArea.append(this.data[student].render());
		}
		this.displayAverage();
	}
	displayAverage() {
		var total = 0
		for (var student in this.data) {
			total += this.data[student].data.grade;
		}
		var average = total / Object.keys(this.data).length;

		this.elementConfig.averageArea.text(average.toFixed(2));
	}
	deleteStudent(id) {
		if (id in this.deleteStudentFromServer) {
			delete this.data[id];
			return true;
		} else {
			return false;
		}
		// this.deleteStudentFromServer(id);
	}
	retrieveStudentData() {
		var ajaxConfigObject = {
			url: '/api/get-student/',
			type: 'GET',
			dataType: 'json',
			data: {
				api_key: 'Vjx3RodsrfTG'
			},
			success: function (data, status) {
				alert('Success callback');
				var dataArray = data.data;
				for (var i = 0; i < dataArray.length; i++) {
					var studentDataResult = dataArray[i];
					var newStudentFromRecievedData = this.createStudent(studentDataResult.name, studentDataResult.course, studentDataResult.grade);
				}
				this.displayAllStudents();
			}.bind(this),
			error: function (status, err) {
				alert('Fail callback');
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
				alert('Fail callback');
			},
		}
		$.ajax(ajaxConfigObject);
	}

	deleteStudentFromServer(studentID) {
		var ajaxConfigObject = {
			url: '/api/delete-student/',
			type: 'DELETE',
			dataType: 'json',
			data: {
				api_key: 'Vjx3RodsrfTG',
				student_id: studentID,
			},
			success: this.retrieveStudentData,
			error: function (status, err) {
				alert('Fail callback');
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
