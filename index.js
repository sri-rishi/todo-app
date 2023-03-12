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

window.onload= () => {
    todoArray.forEach((item) => {
        const todoItemCard = document.createElement("li");
        const crossBtn = document.createElement("button")
        crossBtn.innerText = "Delete"
    
        todoItemCard.innerHTML = item.name;
        todoItemCard.appendChild(crossBtn)
    
        todoList.appendChild(todoItemCard);
    })
};

inputBox.addEventListener("input", (e) => {
    console.log(e.target.value)
    newTodo = e.target.value
});

const renderTodo = (todo) => {
    const todoItemCard = document.createElement("li");
    
    const crossBtn = document.createElement("button")
    crossBtn.innerText = "Delete"
    todoItemCard.innerHTML = todo.name;

    todoItemCard.appendChild(crossBtn)
    
    todoList.appendChild(todoItemCard);
};
 
addTodoBtn.addEventListener("click", () => {
    console.log(newTodo);
    let updatedItem = {id: 4, name: newTodo}
    todoArray.push(updatedItem);
    renderTodo(updatedItem)
});