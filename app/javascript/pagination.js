let currentPage = 1;
const itemsPerPage = 10;
let data = []

function createRow(user, table) {
  const cellClasses = "px-6 py-4"

  // Create the table row
  const row = document.createElement("tr");
  row.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";

  // Create the id cell
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


function paginate(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return data.slice(start, end);
}

function setActiveButton() {
  const activeClasses = ["bg-stone-500", "text-gray-100", "cursor-default"];
  const defaultClasses = ["hover:bg-gray-100", "hover:text-gray-700"];

  const previousActive = document.getElementsByClassName(activeClasses.join(" "))[0];
  previousActive.classList.remove(...activeClasses);
  previousActive.classList.add(...defaultClasses);

  const currentActive = document.querySelector(`[data-page-number='${currentPage}']`);
  currentActive.classList.add(...activeClasses);
  currentActive.classList.remove(...defaultClasses);
}

function renderPage(users) {
  if (users.length === 0) return;

  const list = document.querySelector("[data-table-users='list']");
  list.innerHTML = "";

  for (let i = 0; i < users.length; i++) {
    createRow(users[i], list);
  }

  setActiveButton()
}

function nextPage() {
  currentPage += 1;
  renderPage(paginate(currentPage));
}

function previousPage() {
  currentPage -= 1;
  renderPage(paginate(currentPage));
}

function goToPage(e) {
  const { pageNumber } = e.target.dataset;
  const nextPage = Number(pageNumber);

  if (currentPage === nextPage) return;
  currentPage = nextPage;
  renderPage(paginate(currentPage));
}

async function fetchUsers() {
  try {
    const response = await fetch("/", {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    data = [...users];
  } catch (error) {
    console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();

  document.getElementById("next").addEventListener("click", nextPage);
  document.getElementById("prev").addEventListener("click", previousPage);

  const pageButtons = [...document.querySelectorAll("[data-page-number]")];

  pageButtons.forEach(button => {
    button.addEventListener("click", goToPage);
  });
});
