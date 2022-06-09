// created a separate js file for this page and subsequent other pages that are drastically different, same for css.
//all code for the tasks page starts here:
let todos = [
  {
    title: "Get groceries",
    dueDate: "2022-17-06",
    id: "id1",
  },
  {
    title: "Clean yard",
    dueDate: "2022-15-06",
    id: "id2",
  },
  {
    title: "Workout",
    dueDate: "2022-12-06",
    id: "id3",
  },
];

renderTodo();

function addTodo() {
  const textBox = document.getElementById("todo-Title");
  const title = textBox.value;

  const datePicker = document.getElementById("date-picker");
  const dueDate = datePicker.value;
  /* cool trick to add a basic automatic id by using the time pressed in milliseconds which will be unique,
 but not full-proof as i can already see if happens on 2 separate dates but at the same time*/
  //adding and empty string helps to change the type to a string and allow for the if statement in delete function to work
  const id = "" + new Date().getTime();

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
  });

  renderTodo();
}

function deleteTodo(event) {
  const deleteButton = event.target;
  const idToDeleteButton = deleteButton.id;

  todos = todos.filter(function (todo) {
    if (todo.id === idToDeleteButton) {
      return false;
    } else {
      return true;
    }
  });

  renderTodo();
}

function renderTodo() {
  /* hey first comment.. anyway, this will only add an item but reuse the ones before it instead of resetting so we will now reset it, so basically a re-render*/
  document.getElementById("todo-List").innerHTML = "";

  todos.forEach(function (todo) {
    const element = document.createElement("div");
    element.innerText = todo.title + " " + todo.dueDate;

    //added a remove button to remove items from the list.
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Remove";
    element.appendChild(deleteButton);
    deleteButton.id = todo.id;
    deleteButton.className = "remove-button";
    //practising using the DOM ever so often to prepare myself for frameworks like react
    deleteButton.onclick = deleteTodo;

    const todoList = document.getElementById("todo-List");
    todoList.appendChild(element);
  });
}
//all code for the tasks page ends here:
