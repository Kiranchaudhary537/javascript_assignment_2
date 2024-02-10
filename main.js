// Employee class 
class Employee {
  constructor(name, address, id, designation) {
    this.name = name;
    this.address = address;
    this.id = id;
    this.designation = designation;
  }
  editEmployeeDetails(id, name, address, designation) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.designation = designation;
  }
}

let employees = [];

// Add or Edit employee based on form input
function addOrEditEmployee() {
  const [id, name, address, designation] = getEmployeeFormData();
  
  if (!validateEmployeeData(id, name, address, designation)) {
    return;
  }

  const index = employees.findIndex((emp) => emp.id == id);
  if (index !== -1) {
    employees[index].editEmployeeDetails(id, name, address, designation);
  } else {
    employees.push(new Employee(name, address, id, designation));
  }

  //helpers
  setReadOnly(false);
  clearInputFields();
  displayEmployeeList();
  hideForms();
}

// Edit employee form
function editEmployeeForm(id) {
  const employee = employees.find((emp) => emp.id == id);
  if (employee) {
    setReadOnly(true);
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


//set input field's readonly value
function setReadOnly(value){
  document.getElementById("idInput").readOnly = value;
}

// Clear input fields
function clearInputFields() {
  document.getElementById("nameInput").value = "";
  document.getElementById("addressInput").value = "";
  document.getElementById("idInput").value = "";
  document.getElementById("designationInput").value = "";
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
