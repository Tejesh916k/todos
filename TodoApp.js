let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton=document.getElementById("addTodoButton");
let SaveTodoButton=document.getElementById("SaveTodoButton");


function getTodoListFromLocalStorage()
{
  let stringifiedTodoList=localStorage.getItem("todoList");
  let parsedTodoList=JSON.parse(stringifiedTodoList);
  if(parsedTodoList === null)
  {
    return [];
  }
  else{
    return parsedTodoList;
  }
}

let todoList = getTodoListFromLocalStorage();


function createAndAppendTodo(todo) {
  let checkboxId="checkbox"+todo.uniqeId;
  let labelId="label"+todo.uniqeId;
  let todoId="todo"+todo.uniqeId;

  let todoElement = document.createElement("li");
  todoElement.id=todoId;
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked=todo.isChecked;
  inputElement.onclick=function()
  {
    todochange(checkboxId,labelId,todoId)
  }
  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id=labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if(todo.isChecked===true)
  {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick=function()
  {
    ondelete(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
function todochange(checkboxId,labelId,todoId)
{
  let checkboxelement=document.getElementById(checkboxId);
  let labelelement=document.getElementById(labelId);

  labelelement.classList.toggle("checked");

let todoObjectIndex=todoList.findIndex(function(eachTodo)
{
  let eachTodoId ="todo"+eachTodo.uniqeId;
  if (eachTodoId===todoId)
  {
    return true;
  }
  else{
    return false;
  }

});

let todoObject=todoList[todoObjectIndex];

if (todoObject.isChecked=== true)
{
  todoObject.isChecked=false;
}
else
{
  todoObject.isChecked=true;
}

}


function ondelete(todoId)
{ 
  let todoElement=document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  
let deleteIndex=todoList.findIndex(function(eachTodo)
  {
    let eachTodoId="todo"+eachTodo.uniqeId;
    if(eachTodoId===todoId)
    {
      return true;
    }
    else{
      return false;
    }
    
  }
  );
  todoList.splice(deleteIndex,1);

}
addTodoButton.onclick=function()
{
  onAddTodo();
}     
function onAddTodo()
{
  let todosCount=todoList.length+1;
  
  let userInputElement=document.getElementById("todoUserInput");
  let userInputValue=userInputElement.value;

  if (userInputValue==="")
  {
    alert("Enter A Valid Text");
    return;
  }
  let newTodo= {
    text: userInputValue,
    uniqeId: todosCount,
    isChecked: false
  };
  
  todoList.push(newTodo);

  createAndAppendTodo(newTodo);
  userInputElement.value="";

}

SaveTodoButton.onclick=function()
{
  localStorage.setItem("todoList",JSON.stringify(todoList))
}


