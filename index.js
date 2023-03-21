const inputBox = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("add-todo-btn");

let newTodo; 

inputBox.addEventListener("input", (e) => {
    newTodo = e.target.value
});


let todoArray = [
    {
        id: 1,
        name: "work on project"
    },
    {
        id: 2,
        name: "go on walk"
    }
];

const deleteTodo = (id) =>  {
    todoArray = [...todoArray].filter(todo => todo.id !== id)
    console.log(todoArray)
    const todoItemList = document.querySelectorAll(".todo-item");
    todoItemList.forEach((item) => {
        if(parseInt(item.dataset.id) === id ) {
            item.style.display = parseInt(item.dataset.id) === id && "none" 
        }
    }
    )
}

const editTodo = (el, id, todoItemCard) => {
    todoArray = [...todoArray].map(todo => todo.id === id ? {...todo, name: todoItemCard.value} :  {...todo})
    if(el.innerText.toLowerCase() === "edit") {
        todoItemCard.removeAttribute("readonly");
        todoItemCard.focus();
        el.innerText = "Save";
    } else {
        el.innerText = "Edit";
        todoItemCard.setAttribute("readonly", "readonly")
        
    }
}

const createNewTodoItem = (todo) => {
    const todoCard = document.createElement("LI");
    todoCard.classList.add("todo-item")

    const todoItemCard = document.createElement("INPUT");
    todoItemCard.type = "text"
    todoItemCard.setAttribute("readonly", "readonly")
    todoItemCard.value = todo.name;
    todoCard.dataset.id = todo.id;

    const crossBtn = document.createElement("BUTTON");
    crossBtn.classList.add("delete-todo-btn");
    crossBtn.innerText = "Delete"
    crossBtn.addEventListener("click", () => {
        deleteTodo(todo.id)
    })

    const editTodoBtn = document.createElement("BUTTON");
    editTodoBtn.innerText = "Edit"
    editTodoBtn.addEventListener("click", (event) => {
        editTodo(event.target, todo.id, todoItemCard);
    })

    todoCard.appendChild(todoItemCard)
    todoCard.appendChild(editTodoBtn)
    todoCard.appendChild(crossBtn)

    return todoCard
}

todoArray.forEach((item) => {
    const todoItem =  createNewTodoItem(item)
    todoList.appendChild(todoItem);
})

const renderTodo = (todo) => {
    const todoItem = createNewTodoItem(todo)
    todoList.appendChild(todoItem);
};

 
addTodoBtn.addEventListener("click", () => {
    let updatedItem = {id: 4, name: newTodo}
    todoArray = [...todoArray, updatedItem]
    renderTodo(updatedItem)
});

