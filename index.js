const inputBox = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("add-todo-btn");


let newTodo; 

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

const createNewTodoItem = (todo) => {
    const todoItemCard = document.createElement("LI");
    todoItemCard.classList.add("todo-item")
    todoItemCard.dataset.id = todo.id
    const crossBtn = document.createElement("BUTTON");
    crossBtn.classList.add("delete-todo-btn");
    crossBtn.innerText = "Delete"
    crossBtn.onclick = () => {
        deleteTodo(todo.id)
    }
    todoItemCard.innerHTML = todo.name;
    todoItemCard.appendChild(crossBtn)

    return todoItemCard
}

todoArray.forEach((item) => {
    const todoItem =  createNewTodoItem(item)

    todoList.appendChild(todoItem);
})



inputBox.addEventListener("input", (e) => {
    newTodo = e.target.value
});

const renderTodo = (todo) => {
    const todoItem = createNewTodoItem(todo)
    todoList.appendChild(todoItem);
};

 
addTodoBtn.addEventListener("click", () => {
    let updatedItem = {id: 4, name: newTodo}
    todoArray.push(updatedItem);
    renderTodo(updatedItem)
});

