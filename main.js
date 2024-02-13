// Employee class
class Employee {
  constructor(id, name, address, designation) {
    this.name = name;
    this.address = address;
    this.id = id;
    this.designation = designation;
  }
  editDetails(name, address, designation) {
    this.name = name;
    this.address = address;
    this.designation = designation;
  }
}

// Variables
let employees = [];
let isNewEmployee = true;

// Function to add a new employee
function addEmployee(employee) {
  employees.push(employee);
}

// Function to update an existing employee
function updateEmployee(id, name, address, designation) {
  const index = employeeIndex(id);
  if (index !== -1) {
    employees[index].editDetails(name, address, designation);
  }
}

// Function to return index of employee with given ID
function employeeIndex(id) {
  return employees.findIndex((emp) => emp.id == id);
}

// Function to check if an employee with the given ID exists
function employeeExists(id) {
  return employees.some((emp) => emp.id == id);
}

// Add or Edit employee based on form input
function addOrEditEmployee() {
  const [id, name, address, designation] = getEmployeeFormData();

  if (!validateEmployeeData(id, name, address, designation)) {
    return;
  }

  if (employeeExists(id) == true) {
    isNewEmployee
      ? alert("Employee with same id exists.")
      : updateEmployee(id, name, address, designation);
  } else {
    addEmployee(new Employee(id, name, address, designation));
  }

  //helpers
  isNewEmployee = true;
  setReadOnly(false);
  clearInputFields();
  displayEmployeeList();
  hideForms();
}

// Edit employee form
function editEmployeeForm(id) {
  const employee = employees[employeeIndex(id)];
  if (employee) {
    setReadOnly(true);
    isNewEmployee = false;
    setEmployeeFormData(employee);
    showEmployeeForm();
  } else {
    console.error("Employee does not exist.");
  }
}

// Delete employee from list
function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id != id);
  displayEmployeeList();
}

// Display employee list in table
function displayEmployeeList() {
  const employeeListContainer = document.getElementById("employeeList");
  employeeListContainer.innerHTML = "";
  employees.forEach((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      <td>${employee.address}</td>
      <td>${employee.designation}</td>
      <td><button onclick="editEmployeeForm(${employee.id})">Edit</button></td>
      <td><button onclick="deleteEmployee(${employee.id})">Delete</button></td>
    `;
    employeeListContainer.appendChild(row);
  });
}

// Fetch data from input fields
function getEmployeeFormData() {
  const name = document.getElementById("nameInput").value;
  const address = document.getElementById("addressInput").value;
  const id = document.getElementById("idInput").value;
  const designation = document.getElementById("designationInput").value;
  return [id, name, address, designation];
}

// Set form data for editing
function setEmployeeFormData(employee) {
  document.getElementById("idInput").value = employee.id;
  document.getElementById("nameInput").value = employee.name;
  document.getElementById("addressInput").value = employee.address;
  document.getElementById("designationInput").value = employee.designation;
}

// Set input field's readonly value
function setReadOnly(value) {
  document.getElementById("idInput").readOnly = value;
}

// Clear input fields
// function clearInputFields() {
//   document.getElementById("nameInput").value = "";
//   document.getElementById("addressInput").value = "";
//   document.getElementById("idInput").value = "";
//   document.getElementById("designationInput").value = "";
// }
function clearInputFields() {
  const inputs = document.querySelectorAll("input[type='text']");
  inputs.forEach((input) => (input.value = ""));
}

// Validate employee data
function validateEmployeeData(id, name, address, designation) {
  if (!id || !name || !address || !designation) {
    console.error("Please fill in all fields.");
    return false;
  }
  return true;
}

// Show employee form
function showEmployeeForm() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("addEditFormContainer").style.display = "block";
}

// Hide overlay and employee form
function hideForms() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("addEditFormContainer").style.display = "none";
}

// Initial display of employee list
document.addEventListener("DOMContentLoaded", () => {
  //local storage or cache can used here to store offline data
  displayEmployeeList();
});
