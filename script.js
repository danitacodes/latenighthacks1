//TIMER
const el = document.querySelector('.clock');
const bell = document.querySelector('audio');

const mindiv = document.querySelector('.mins');
const secdiv = document.querySelector('.secs');

const startBtn = document.querySelector('.start');
localStorage.setItem('btn', 'focus');

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener('click', () => {
    let btn = localStorage.getItem('btn');

    if (btn === 'focus') {
        mins = +localStorage.getItem('focusTime');
    } else {
        mins = +localStorage.getItem('breakTime');
    }

    seconds = mins * 60;
    totalsecs = mins * 60;
    setTimeout(decremenT(), 60);
    startBtn.style.transform = "scale(0)";
    paused = false;
});

function decremenT() {
    mindiv.textContent = Math.floor(seconds / 60);
    secdiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
    if (circle.classList.contains('danger')){
        circle.classList.remove('danger')
    }

    if (seconds > 0) {
        perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
        setProgress(perc)
        seconds--;
        initial = window.setTimeout("decremenT()", 1000);
        if (seconds < 10) {
            circle.classList.add('danger');
        }
    } else {
        mins = 0;
        seconds = 0;
        bell.play();
        let btn = localStorage.getItem('btn');

        if (btn === 'focus') {
            startBtn.textContent = 'start break';
            startBtn.classList.add('break');
            localStorage.setItem('btn', 'break');
        } else {
            startBtn.classList.remove('break');
            startBtn.textContent = 'start focus';
            localStorage.setItem('btn', 'focus');
        }
        startBtn.style.transform = 'scale(1)';
    }
}

//PROGRESS JS
const circle = document.querySelector('.progress-ring-circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

//SETTINGS
const focusTimeInput = document.querySelector('#focusTime');
const breakTimeInput = document.querySelector('#breakTime');
const pauseBtn = document.querySelector('.pause')

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.setItem('focusTime', focusTimeInput.value);
    localStorage.setItem('breakTime', breakTimeInput.value);
});

document.querySelector('.reset').addEventListener('click', () => {
    startBtn.style.transform = 'scale(1)';
    clearTimeout(initial);
    setProgress(0);
    mindiv.textContent = 0;
    secdiv.textContent = 0;
});

pauseBtn.addEventListener('click', () => {
    if (paused === undefined) {
        return;
    }
    if (paused) {
        paused = false;
        initial = setTimeout('decremenT()', 60);
        pauseBtn.textContent = 'pause';
        pauseBtn.classList.remove('resume');
    } else {
        clearTimeout(initial);
        pauseBtn.textContent = 'resume';
        pauseBtn.classList.add('resume');
        paused = true;
    }
});

//QUOTE GENERATOR

const textQuote = document.getElementById('quotes');
const authorQuote = document.getElementById('author');
const createBtn = document.getElementById('create');

//Creates function for the button to generate quotes

function getQuote(){
//gets data from api
fetch('https://api.quotable.io/random')
.then(response => response.json())
.then(data => {
    textQuote.textContent = data.content;
    authorQuote.textContent = data.author;
})
}

getQuote();
createBtn.addEventListener('click', () => {
    getQuote();
})

//TODO JS
//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIv
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add Todo to local storage
    saveLocalTodos(todoInput.value);
    //Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Delete Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear input value
    todoInput.value = "";
}
    function deleteCheck(e) {
        const item = e.target;
        //Delete Todo
        if(item.classList[0] === 'trash-btn') {
            const todo = item.parentElement;
            removeLocalTodos(todo);
            todo.remove();
        }

        //Checkmark
        if(item.classList[0] === 'complete-btn'){
            const todo = item.parentElement;
            todo.classList.toggle('completed');
        }
    }
    
   function filterTodo(e) {
       const todos = todoList.childNodes;
       todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                 }else{
                     todo.style.display = "none";
                 }
                 break;
        }
       });
   }

   //Storage
   function saveLocalTodos(todo) {
       //check for local storage
       let todos;
       if(localStorage.getItem('todos') === null){
           todos = [];
       } else {
           todos = JSON.parse(localStorage.getItem('todos'));
       }
       todos.push(todo);
       localStorage.setItem('todos', JSON.stringify(todos));
   }

   function getTodos(){
       let todos;
       //Check local storage
       if (localStorage.getItem("todos") === null){
           todos = [];
       } else {
           todos = JSON.parse(localStorage.getItem("todos"));
       }
       todos.forEach(function(todo){
         //Todo DIv
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            //Create Li
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
        
            //Completed Button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            //Delete Button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);
            //Append to list
            todoList.appendChild(todoDiv);   
       });
   }

   function removeLocalTodos(todo) {
    if (localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
   }