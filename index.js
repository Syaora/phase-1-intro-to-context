// Your code here
function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees){
    const record = []
    employees.map(employee => record.push(createEmployeeRecord(employee)))
    return record
}

function createTimeInEvent(employeeRecord, date){
    const dates = date.split(" ")
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dates[1]),
        date: dates[0]
    }

    employeeRecord.timeInEvents.push(timeIn)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, date){
    const dates = date.split(" ")
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dates[1]),
        date: dates[0]
    }

    employeeRecord.timeOutEvents.push(timeOut)
    return employeeRecord
}

function hoursWorkedOnDate(employee, date){
    const timeIn = employee.timeInEvents.find(day => day.date === date)
    const timeOut = employee.timeOutEvents.find(day => day.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

function allWagesFor(employee){
    const dates = employee.timeInEvents.map(day => wagesEarnedOnDate(employee, day.date))
    return dates.reduce((current, initial) => current + initial)
}

function calculatePayroll(employeeRecords){
    const employeesPay = employeeRecords.map(employee => allWagesFor(employee))
    return employeesPay.reduce((current, initial) => current + initial)
}