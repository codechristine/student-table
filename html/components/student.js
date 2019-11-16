class Student {
	/* constructor - take in params for the student and save them,
		create storage for student dom elements
		store the deletion callback from the SGT_template class
		bind event handlers
	params:
		(number) id - the id of this student
		(string) name - the name of the student
		(string) course - the course of the student
		(number) grade - the grade of the student
		(function) deleteCallback - the student removal method passed in as a callback
		from the SGT_template to call when this student wants to be removed from the SGT_templates's list
	return: undefined (don't return undefined, it will screw it up a constructor, ***don't put a return***)
	ESTIMATED TIME: 30 minutes to understand
	*/
	constructor(id, name, course, grade, deleteCallback = () => { }) {
		//this method has been built out to help you understand the general structure better
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
			operations: null,
			deleteButton: null
		};
		this.handleDelete = this.handleDelete.bind(this);
		this.render = this.render.bind(this);
	}

	/* getData - get all the student data as a simple object
	params: none
	return: (object) an object with the following data
		(number): id
		(string): name
		(string): course
		(number): grade
	ESTIMATED TIME: 30 minutes
	*/
	getData() {
		return this.data;
	}

	/* render - create and return a table row (TR) with 4 table cells (TD) in them:
		name : the student's name
		course : the student's course
		grade: the student's grade
		operations: holds any buttons for the student - will hold a delete button
	purpose:
		- create the TR and 4 TDs,
		- put the 4 TDs inside the TR.
		- Add the button to the operation TD
		- add the StudentRecord's handleDelete method to the delete button's click handler
		- store all of the element references as properties in the this.domElements object
			for any DOM updates (see this.domElements in the constructor)
		- return the TR
	params: none
	return: (jquery dom element) the row that contains the student dom elements
	ESTIMATED TIME: 2 hours
	*/
	render() {
		this.domElements.row = $('<tr>')

//create the elements to append to tr
		this.domElements.name	=	$('<td>').addClass('col-xs-4.col-md-4').text(this.data.name);
		this.domElements.course = $('<td>').addClass('col-xs-4.col-md-4').text(this.data.course);
		this.domElements.grade = $('<td>').addClass('col-xs-4.col-md-4').text(this.data.grade);
		this.domElements.operations = $('<td>').addClass('col-xs-4.col-md-4')
//create another element button with an event handler to handle clicks and use a callback function. Then append the button to the operations.
		this.domElements.deleteButton = $('<button>').on('click', this.handleDelete).text('Delete');
		this.domElements.operations.append(this.domElements.deleteButton);

//append each td into the tr
		this.domElements.row.append(this.domElements.name);
		this.domElements.row.append(this.domElements.course);
		this.domElements.row.append(this.domElements.grade);
		this.domElements.row.append(this.domElements.operations)

		return this.domElements.row;
	}

	/* handleDelete - call the SGT_template delete callback, and remove this student's dom element
	purpose:
		- call the callback that was passed into the constructor - give it this object's id as an argument
		- remove this object's dom element row to erase the entire dom element (should be the element
		reference you stored in this.domElements)
	ESTIMATED TIME: 15 minutes
	*/
	handleDelete() {
		this.deleteCallback(this.data.id);
		this.domElements.row.remove();
	}

	/* update - change a value in the student record
	purpose:
		- ensure that the field is one that can be changed (either id, name, course, or grade)
			- if not one of these properties, return false
			- otherwise,
				- update the value of the associated field
				- save the value into the properties stored in the constructor (see this.data)
				- go to the dom element of the appropriate field and change the text (see this.domElements)
					(for example, if name was changed, go to the student's name TD and change the name as well)
				- return true
	params:
		(string) field - the field in the object to change
		(multiple) value - the value to change the field to
	return: (boolean) true if it was changed, false if it was not
	ESTIMATED TIME: 1.5 hours
	*/
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