let currentPage = 1;
const itemsPerPage = 10;
let data = []

function createRow(user, table) {
  const cellClasses = "px-6 py-4"

  // Create the table row
  const row = document.createElement("tr");
  row.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";

  // Create the name cell
  const idCell = document.createElement("td");
  idCell.className = cellClasses;
  idCell.textContent = user.id;
  row.appendChild(idCell);

  // Create the name cell
  const nameCell = document.createElement("td");
  nameCell.className = cellClasses;
  nameCell.textContent = user.name;
  row.appendChild(nameCell);

  // Create the age cell
  const ageCell = document.createElement("td");
  ageCell.className = cellClasses;
  ageCell.textContent = user.age;
  row.appendChild(ageCell);

  // Create the email cell
  const emailCell = document.createElement("td");
  emailCell.className = cellClasses;
  emailCell.textContent = user.email;
  row.appendChild(emailCell);

  table.appendChild(row)
}


function paginate(data, page, itemsPerPage) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
}

function renderPage(users) {
  const list = document.querySelector("[data-table-users='list']");
  list.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    createRow(users[i], list);
  }
}

function nextPage() {
  currentPage++;
  renderPage(paginate(data, currentPage, itemsPerPage));
}

function previousPage() {
  currentPage--;
  renderPage(paginate(data, currentPage, itemsPerPage));
}


const fetchUsers = () => {
  fetch("/", {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(users => {
      data = [...users]
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
  fetchUsers()
  document.getElementById("next").addEventListener("click", nextPage);
  document.getElementById("prev").addEventListener("click", previousPage);
});
