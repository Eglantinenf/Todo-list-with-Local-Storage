let todosArray = []  

const inputElem = document.getElementById('itemInput')  
const addButton = document.getElementById('addButton')  
const clearButton = document.getElementById('clearButton')  
const todoListElem = document.getElementById('todoList')  

function addNewTodo() {  
    let newTodoTitle = inputElem.value  

    let newTodoObj = {  
        id: todosArray.length + 1,  
        title: newTodoTitle,  
        complete: false  
    }  

    inputElem.value = ''  

    todosArray.push(newTodoObj)  
    setLocalStorage(todosArray)  
    todosGenerator(todosArray)  

    inputElem.focus()  
}  

function setLocalStorage(todosList) {  
    localStorage.setItem('todos', JSON.stringify(todosList))  
}  

function todosGenerator(todosList) {  
    todoListElem.innerHTML = ''  

    todosList.forEach(function (todo, index) {  
        let newTodoLiElem = document.createElement('li')  
        newTodoLiElem.className = todo.complete ? 'uncompleted well' : 'completed well'  

        let newTodoLabelElem = document.createElement('label')  
        newTodoLabelElem.innerHTML = todo.title  

        let newTodoCompleteBtn = document.createElement('button')   
        newTodoCompleteBtn.className = 'btn btn-success'   
        newTodoCompleteBtn.innerHTML = todo.complete ? 'Complete' : 'UnComplete'  
        newTodoCompleteBtn.addEventListener('click', function() {  
            todo.complete = !todo.complete  
            setLocalStorage(todosList)  
            todosGenerator(todosList)  
        })  

        let newTodoDeleteBtn = document.createElement('button')   
        newTodoDeleteBtn.className = 'btn btn-danger'  
        newTodoDeleteBtn.innerHTML = 'Delete'  
        newTodoDeleteBtn.addEventListener('click', function() {  
            todosArray = todosArray.filter(item => item.id !== todo.id)  
            setLocalStorage(todosArray)  
            todosGenerator(todosArray)  
        })  

        newTodoLiElem.appendChild(newTodoLabelElem)  
        newTodoLiElem.appendChild(newTodoCompleteBtn)  
        newTodoLiElem.appendChild(newTodoDeleteBtn)  

        todoListElem.appendChild(newTodoLiElem)  
    })  
}  

function getLocalStorage() {  
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))  

    if (localStorageTodos) {  
        todosArray = localStorageTodos  
    } else {  
        todosArray = []  
    }  

    todosGenerator(todosArray)  
}  

function clearTodos() {  
    todosArray = []  
    setLocalStorage(todosArray)  
    todosGenerator(todosArray)  
}  

window.addEventListener('load', getLocalStorage)  
addButton.addEventListener('click', addNewTodo)  
clearButton.addEventListener('click', clearTodos)  
inputElem.addEventListener('keydown', function (event) {  
    if (event.code === 'Enter') {  
        addNewTodo()  
    }  
})