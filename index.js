function createEmployeeRecords(arr) {
	return arr.map((emp) => createEmployeeRecord(emp));
}
function createEmployeeRecord(arr) {
	const newEmp = {
		firstName: arr[0],
		familyName: arr[1],
		title: arr[2],
		payPerHour: arr[3],
		timeInEvents: [],
		timeOutEvents: [],
	};
	return newEmp;
}
function createTimeInEvent(newEmp, hours) {
	let date = hours.split(" ");
	newEmp.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(date[1]),
		date: date[0],
	});
	return newEmp;
}
function createTimeOutEvent(newEmp, hours) {
	let date = hours.split(" ");
	newEmp.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(date[1]),
		date: date[0],
	});
	return newEmp;
}
function hoursWorkedOnDate(emp, date) {
	let y = emp.timeInEvents.find((time) => time.date === date);
	let x = emp.timeOutEvents.find((time) => time.date === date);
	return (x.hour - y.hour) / 100;
}
function wagesEarnedOnDate(emp, date) {
	return emp.payPerHour * hoursWorkedOnDate(emp, date);
}
function allWagesFor(emp) {
	let dates = emp.timeInEvents.map((time) => time.date);
	let allPayments = dates.reduce((acc, curr) => {
		return acc + wagesEarnedOnDate(emp, curr);
	}, 0);
	return allPayments;
}
function calculatePayroll(arr) {
	return arr.reduce((acc, curr) => acc + allWagesFor(curr), 0);
}
function findEmployeeByFirstName(emp, firstName) {
	return emp.find((emp) => emp.firstName === firstName);
}
