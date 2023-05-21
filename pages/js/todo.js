let todoItems = []; // Тут наши Тудушки
let newTodoItems = []; //Новые тудушки
const todoInput = document.querySelector(".todo-input");
const completedTodosDiv = document.querySelector(".completed-todos");
const uncompletedTodosDiv = document.querySelector(".uncompleted-todos");

window.onload = () => {
  let userId = localStorage.getItem("id");
  $.ajax({
    url: "../server/task/initial",
    type: "POST",
    dataType: "json",
    data: {
      id: userId,
    },
    success: function (data) {
        todoItems = data;  
        console.log(todoItems);
        render();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown,data) {
      console.log(data);
      console.log("Status: " + textStatus);
      console.log("Error: " + errorThrown);
    },
  }); 
};

// Получаем контент из нашего поля
todoInput.onkeyup = (e) => {
  // (e) - объект события, почитай
  let value = e.target.value.replace(/^\s+/, "");
  if (value && e.keyCode === 13) {
    //enter
    addTodo(value);

    todoInput.value = "";
    todoInput.focus();
  }
};

// Add todo
function addTodo(text) {
  newTodoItems.push({
    id_user: localStorage.getItem("id"),
    text: text,
    completed: false,
  });


   // Проверяем, что в массив поступили значения

  saveAndRender();
}

function removeTodo(id) {
  
  $.ajax({
    url: "../server/task/delete",
    type: "POST",
    dataType: "json",
    data: {
      delete_id:id
    },
    success: function (data) {
      todoItems = todoItems.filter((todo) => todo.id !== (data));
      console.log(typeof(data));
      render();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown,data) {
      console.log(data);
      console.log("Status: " + textStatus);
      console.log("Error: " + errorThrown);
    },
  });
}

function markAsCompleted(id) {
  $.ajax({
    url: "../server/task/update",
    type: "POST",
    dataType: "json",
    data: {
      update_id:id,
      status: 0,
    },
    success: function (data) {
      todoItems = todoItems.filter((todo) => {
        if (todo.id === (data)) {
          todo.done = 0;
        }
        return todo;
      });
      console.log(typeof(data));
      render();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown,data) {
      console.log(data);
      console.log("Status: " + textStatus);
      console.log("Error: " + errorThrown);
    },
  });
}

function markAsUncompleted(id) {
  $.ajax({
    url: "../server/task/update",
    type: "POST",
    dataType: "json",
    data: {
      update_id:id,
      status: 1,
    },
    success: function (data) {
      todoItems = todoItems.filter((todo) => {
        if (todo.id === Number(data)) {
          todo.done = 1;

        }
        return todo;
      });
      console.log(typeof(data));
      render();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown,data) {
      console.log(data);
      console.log("Status: " + textStatus);
      console.log("Error: " + errorThrown);
    },
  });
}

function save() {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  let id;
  $.ajax({
    url: "../server/task/add",
    type: "POST",
    dataType: "json",
    data: {
      user_id : localStorage.getItem("id"),
      text : newTodoItems[0].text, 
    },
    success: function (data) {
      todoItems.push({
        id_user: localStorage.getItem("id"),
        id_task:data.id,
        id: data.id,
        text:data.text,
        date:data.date,
        done : data.done
      });
      render();
    },
    error: function (XMLHttpRequest, textStatus, errorThrown,data) {
      console.log(data);
      console.log("Status: " + textStatus);
      console.log("Error: " + errorThrown);
    },
  });

  newTodoItems.pop()
}

function render() {
  let unCompletedTodos = todoItems.filter((item) => item.done == "0");
  let completedTodos = todoItems.filter((item) => item.done == "1");
  console.log(todoItems);
  completedTodosDiv.innerHTML = "";
  uncompletedTodosDiv.innerHTML = "";

  if (unCompletedTodos.length > 0) {
    unCompletedTodos.forEach((todo) => {
      uncompletedTodosDiv.append(createTodoElement(todo));
    });
  } else {
    uncompletedTodosDiv.innerHTML = '<div class="empty">NO MISSION</div>';
  }

  if (completedTodos.length > 0) {
    completedTodosDiv.innerHTML = `<div class='completed-title'>Completed (${completedTodos.length} / ${todoItems.length}) </div>`;

    completedTodos.forEach((todo) => {
      completedTodosDiv.append(createTodoElement(todo));
    });
  }
}

function saveAndRender() {
  save();
  render();
}
function createTodoElement(todo) {
  const todoDiv = document.createElement("div");
  todoDiv.setAttribute("data-id", todo.id_task);
  todoDiv.className = "todo-item";

  //CreaTTe todo item text
  const todoTextSpan = document.createElement("span");
  todoTextSpan.innerHTML = todo.text;

  //CHECKbox forr list
  const todoInputCheckbox = document.createElement("input");
  todoInputCheckbox.type = "checkbox";
  todoInputCheckbox.checked = todo.done;
  todoInputCheckbox.onclick = (e) => {
    let id = e.target.closest(".todo-item").dataset.id;
    e.target.checked ? markAsCompleted(id) : markAsUncompleted(id);
  };

  //delete button list

  const todoRemoveButton = document.createElement("a");
  todoRemoveButton.href = "#";
  todoRemoveButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path></svg>';
  todoRemoveButton.onclick = (e) => {
    let id = e.target.closest(".todo-item").dataset.id;
    removeTodo(id);
  };
  todoTextSpan.prepend(todoInputCheckbox);
  todoDiv.appendChild(todoTextSpan);
  todoDiv.appendChild(todoRemoveButton);

  return todoDiv;
}
