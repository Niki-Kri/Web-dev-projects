let todoList=JSON.parse(localStorage.getItem("todoList")) || [];

displayitems();

function addTodo(){
    let inputElement=document.querySelector('#todo_input');
    let dateElement=document.querySelector('#todo_date')
    let todoItem=inputElement.value;
    let todoDate=dateElement.value;
    todoList.push({task: todoItem,duedate:todoDate});
    localStorage.setItem("todoList",JSON.stringify(todoList));
    inputElement.value='';
    dateElement.value='';

    displayitems();
}

function displayitems(){
    let containerElement=document.querySelector
    ('.todo_container');

    let newhtml = '';

    for(let i=0;i<todoList.length;i++){
        let task=todoList[i].task;
        let duedate=todoList[i].duedate;
        newhtml+=`
    
            <span>${task}</span>
            <span>${duedate}</span>
            <button id="delbutton" onclick="deleteItem(${i})"> DELETE </button>
        
        `;
    }
    containerElement.innerHTML = newhtml;
}
function deleteItem(index){
    todoList.splice(index,1);
    localStorage.setItem("todoList",JSON.stringify(todoList));
    displayitems();
}

