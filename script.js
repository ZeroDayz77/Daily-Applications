//all code for the calendar page starts here:
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const firstDatIndex = date.getDay();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = date.toDateString();

  let days = "";

  for (let x = firstDatIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
  }
  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

//all code for the calendar page ends here:

//all code for the tasks page starts here:
let todos = ["Get groceries", "Clean yard", "Workout"];

renderTodo();

function addTodo() {
  let textBox = document.getElementById("todo-Title");
  let title = textBox.value;
  todos.push(title);

  renderTodo();
}

function renderTodo() {
  /* hey first comment.. anyway, this will only add an item but reuse the ones before it instead of resetting so we will now reset it*/
  document.getElementById("todo-List").innerHTML = "";

  todos.forEach(function (todoName) {
    let element = document.createElement("div");
    element.innerText = todoName;
    let todoList = document.getElementById("todo-List");
    todoList.appendChild(element);
  });
}
//all code for the tasks page ends here:
