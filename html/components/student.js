class Student {

	constructor(id, name, course, grade, deleteCallback = () => { }) {
		this.data = {
			id: id,
			name: name,
			course: course,
			grade: parseInt(grade)
		};
		this.deleteCallback = deleteCallback;
		this.domElements = {
			row: null,
			name: null,
			course: null,
			grade: null,
			operation: null,
			deleteButton: null
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.render = this.render.bind(this);
	}
	getData() {
		return this.data;
	}
	render() {
		this.domElements.row = $('<tr>');

		this.domElements.name	=	$('<td>').addClass('name col-xs-4.col-md-4').text(this.data.name);
		this.domElements.course = $('<td>').addClass('course col-xs-4.col-md-4').text(this.data.course);
		this.domElements.grade = $('<td>').addClass('grade col-xs-4.col-md-4').text(this.data.grade);
		this.domElements.operation = $('<td>').addClass('operation col-xs-4.col-md-4');

		this.domElements.deleteButton = $('<button>').on('click', this.handleDelete).text('Delete').addClass('delete btn btn-danger m-2');
		this.domElements.operation.append(this.domElements.deleteButton);
		this.domElements.row.append(this.domElements.name);
		this.domElements.row.append(this.domElements.course);
		this.domElements.row.append(this.domElements.grade);
		this.domElements.row.append(this.domElements.operation)

		return this.domElements.row;
	}
	handleDelete() {
		// this.deleteCallback(this.data.id);
		console.log(this.data.id)
		//this is also index
		this.domElements.row.remove();
	}
	update(updateField, updateValue) {

		if(updateField === 'id' || updateField === 'name' || updateField === 'course' || updateField === 'grade'){
			if(typeof this.data[updateField] === 'number'){
				this.data[updateField] = parseInt(updateValue);
			} else {
				this.data[updateField] = updateValue;
			}
			this.domElements[updateField].text(updateValue);
			return true;
		}
		return false;
	}
}
