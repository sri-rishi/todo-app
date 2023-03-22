const inputBox = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("add-todo-btn");

let newTodo; 

// reading new todo value 
inputBox.addEventListener("input", (e) => {
    newTodo = e.target.value
});


let todoArray = [
    {
        id: 1,
        name: "work on project",
        isCompleted: false
    },
    {
        id: 2,
        name: "go on walk",
        isCompleted: false
    }
];

// delete todo function
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

// edit todo function
const editTodo = (el, id, todoItemCard) => {
    todoArray = [...todoArray].map(todo => todo.id === id ? {...todo, name: todoItemCard.value} :  {...todo})
    if(el.innerText.toLowerCase() === "edit") {
        todoItemCard.removeAttribute("readonly");
        todoItemCard.focus();
        el.innerText = "Save";
        todoItemCard.style.textDecoration = "none"
    } else {
        el.innerText = "Edit";
        todoItemCard.setAttribute("readonly",  "readonly")
    }
}

const checkTodo = (el, id, todoItemCard) => {
    todoArray = [...todoArray].map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : {...todo});
    console.log(todoArray)

    if(el.checked) {
        todoItemCard.style.textDecoration = "line-through"
    }else {
        todoItemCard.style.textDecoration = "none"
    }

    console.log(el.parentNode)
}


// creating todo div
const createTodoDiv = (todo) => {

    // created main todo div
    const todoCard = document.createElement("LI");
    todoCard.classList.add("todo-item")
    todoCard.dataset.id = todo.id; // set id as dataset for identifying todo Div 


    // input box for todo value
    const todoItemCard = document.createElement("INPUT");
    todoItemCard.type = "text"
    
    todoItemCard.setAttribute("readonly", "readonly") // added readonly attribute in input box so user cannot change todo vaue without clicking edit button
    todoItemCard.value = todo.name;

    const checkBox = document.createElement("INPUT")
    checkBox.type = "checkbox";
    checkBox.checked = todo.isCompleted || false
    checkBox.addEventListener("click", (event) => {
        checkTodo(event.target, todo.id, todoItemCard)
    })
    

    // created delete todo button element
    const crossBtn = document.createElement("BUTTON");
    crossBtn.classList.add("delete-todo-btn");
    crossBtn.innerText = "Delete"
    crossBtn.addEventListener("click", () => {
        deleteTodo(todo.id)
    })

    // created edit todo button element
    const editTodoBtn = document.createElement("BUTTON");
    editTodoBtn.disabled = todo.isCompleted? true : false

    editTodoBtn.innerText = "Edit"
    editTodoBtn.addEventListener("click", (event) => {
        editTodo(event.target, todo.id, todoItemCard);
    });


    // appended todo value, edit button, delete button as child in todoCard
    todoCard.appendChild(checkBox)
    todoCard.appendChild(todoItemCard)
    todoCard.appendChild(editTodoBtn)
    todoCard.appendChild(crossBtn)

    return todoCard
}

// for initial rendering of todo list
todoArray.forEach((item) => {
    const todoItem =  createTodoDiv(item)
    todoList.appendChild(todoItem);
})

// rendering todo item on clicking add todo button
const renderTodo = (todo) => {
    const todoItem = createTodoDiv(todo)
    todoList.appendChild(todoItem);
    console.log(todoArray)
};

 
// add todo button onclick
addTodoBtn.addEventListener("click", () => {
    let updatedItem = {id: 4, name: newTodo, isCompleted: false}
    todoArray = [...todoArray, updatedItem]
    renderTodo(updatedItem)
});

