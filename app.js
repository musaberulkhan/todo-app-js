//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
todoButton.addEventListener('click', addTodoButton);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodoButton(event) {
    //Prevent Form from Submitting
    event.preventDefault();

    //Call Add Todo Fuction
    addTodoFunction(todoInput.value);

    //Add to Local Storage
    addItemtoLocalStorage(todoInput.value);

    //Reset Value
    todoInput.value = "";
}


function addTodoFunction(todoValue, status="Unchecked") {
    //TodoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
   
    if(status == "Checked"){
        todoDiv.classList.add('completed');
    }

    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoValue;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    //Create check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton);

    //Create delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton);

    //Append to List
    todoList.appendChild(todoDiv);

    assignIdtoList();
}



function deleteCheck(e) {
    const item = e.target;
    console.log(item.parentElement.getAttribute('id'));

    //Delete Todo
    if (item.classList[0] == 'trash-btn') {
        deleteItemfromLocalStorage(item.parentElement.getAttribute('id'));
        

        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function () {
            todo.remove();
            assignIdtoList(); 
        });      
         
    }
    
    //Check Mark
    if (item.classList[0] == 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

        updateUncheckedProperty(item.parentElement.getAttribute('id'));
    }
}



//***********************************************************************************
//                          Filter Function
function filterTodo(e) {
    const todos = document.getElementById('todo-list');
    const todosLenght = todos.childNodes.length;
    for (let i = 1; i < todosLenght; i++) {
        const todo = todos.childNodes[i]
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
        }
    }
}





//************************************************************************************************
//                                Save Local Storage Functions
// Checking for Previously Added Todos
window.onload = function () {
    //Check Data Object is Stored or Not
    var retrievedObject = JSON.parse(localStorage.getItem('storedData'));
    if (retrievedObject != null) {
        for (let i = 0; i < retrievedObject.data.length; i++) {
            if(retrievedObject.data[i].status == "Checked"){
                addTodoFunction(retrievedObject.data[i].text, "Checked");    
            }
            else{
                addTodoFunction(retrievedObject.data[i].text);    
            }     
        }
        assignIdtoList();
    }
};


function assignIdtoList() {
    //Variables
    let generatedTodoId = 0;

    const todos = document.getElementById('todo-list');
    const todosLength = todos.childNodes.length;
    for (let i = 1; i < todosLength; i++) {
        const todo = todos.childNodes[i];
        todo.setAttribute('id', generatedTodoId);
        generatedTodoId++;        
    }   
}


// Add Todo Item to Local Storage
function addItemtoLocalStorage(itemText) {
    //Add Item to an Object
    let itemObject = {
        text: itemText,
        status: "Unchecked"
    }

    //Check Data Object is Stored or Not
    var retrievedObject = JSON.parse(localStorage.getItem('storedData'));

    if (retrievedObject == null) {
        let dataObject = {
            data: [itemObject]
        }
        localStorage.setItem('storedData', JSON.stringify(dataObject));
    }
    else {
        retrievedObject.data.push(itemObject);
        localStorage.setItem('storedData', JSON.stringify(retrievedObject));
    }
}



// Delete Todo Item to Local Storage
function deleteItemfromLocalStorage(itemId) {
    //Check Data Object is Stored or Not
    var retrievedObject = JSON.parse(localStorage.getItem('storedData'));

    if (retrievedObject != null) {
        retrievedObject.data.splice(itemId, 1);
        localStorage.setItem('storedData', JSON.stringify(retrievedObject));       
    }
}


// Update Todo Item to Local Storage
function updateUncheckedProperty(itemId){
    var retrievedObject = JSON.parse(localStorage.getItem('storedData'));
    if (retrievedObject != null) {
        if(retrievedObject.data[itemId].status == "Unchecked"){
            retrievedObject.data[itemId].status = "Checked";
        }
        else{
            retrievedObject.data[itemId].status = "Unchecked";
        }        
        localStorage.setItem('storedData', JSON.stringify(retrievedObject));       
    }
}

