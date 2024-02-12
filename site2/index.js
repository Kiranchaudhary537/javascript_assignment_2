let selectRow = null;

function onFormSubmit() {
  let formData = readFormData();
  if (selectRow == null) insertNewRecord(formData);
  else updateRecord(formData);
  resetForm();
}
// Getting value from User-----------------------------------------------------
function readFormData() {
  var formData = {};
  formData["id"] = document.getElementById("id").value;
  formData["name"] = document.getElementById("name").value;
  formData["address"] = document.getElementById("address").value;
  formData["designation"] = document.getElementById("designation").value;
  return formData;
}

// Inserting & Showing Record in Another Table-----------------------------------------------
function insertNewRecord(data) {
  let table = document
    .getElementById("empList")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.id;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.name;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.address;
  cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.designation;
  cell5 = newRow.insertCell(4);
  cell5.innerHTML = `<a onclick="onEdit(this)">Edit</a>`;
  cell6 = newRow.insertCell(5);
  cell6.innerHTML = `<a onclick="onDelete(this)">Delete</a>`;
}

// Reseting Form---------------------------------------------------------------------------
function resetForm() {
  document.getElementById("id").value = "";
  document.getElementById("name").value = "";
  document.getElementById("address").value = "";
  document.getElementById("designation").value = "";
  selectRow = null;
}
// Editing Record ----------------------------------------------------------------------------

function onEdit(td) {
  selectRow = td.parentElement.parentElement;
  document.getElementById("id").value = selectRow.cells[0].innerHTML;
  document.getElementById("name").value = selectRow.cells[1].innerHTML;
  document.getElementById("address").value = selectRow.cells[2].innerHTML;
  document.getElementById("designation").value = selectRow.cells[3].innerHTML;
}

// Update Record-----------------------------------------------------------------------------
function updateRecord(formData) {
  selectRow.cells[0].innerHTML = formData.id;
  selectRow.cells[1].innerHTML = formData.name;
  selectRow.cells[2].innerHTML = formData.address;
  selectRow.cells[2].innerHTML = formData.designation;
}

// Dleteing Record--------------------------------------------------------------------------
function onDelete(td) {
  if (confirm("Are you want to delete this record ?")) {
    row = td.parentElement.parentElement;
    document.getElementById("empList").deleteRow(row.rowIndex);
    resetForm();
  }
}