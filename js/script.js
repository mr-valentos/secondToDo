const container = document.querySelector('.container');
const newTaskForm = document.forms.newTask;
const invForm = document.forms.invisibleForm;

document.addEventListener('click', newTaskWindow);

function newTaskWindow (event) {
    if(event.target.closest('.new-task_bnt')){
        invForm.classList.toggle('active');
    }
    if(!event.target.closest('.new-task') && !event.target.closest('.invisible-form')){
        invForm.classList.remove('active');
    }
};




const invisibleBtn = invForm.invisibleBtn;
const invisibleInput = invForm.invisibleInput;
let inputValue;
let creatDate;
invisibleBtn.addEventListener('click', copyValue);

function copyValue(event){
    let date = new Date();

    creatDate = date.toLocaleDateString();
    inputValue = invisibleInput.value;

    invForm.classList.remove('active');
    createNewTask();
};

let currentTaskList = document.forms.currentTaskList;

function createNewTask(){
    if(inputValue){
        currentTaskList.insertAdjacentHTML(
            'beforeend',
            `<div class="list-item">
                <label for="">${inputValue}</label>
                <div class="item__create_date">Created:${creatDate}</div>
                <button type="button" class="item__status">
                    <span>Start</span>
                    <span>In Process</span>
                </button>
                <button type="button" class="item__comlite">Complited</button>
            </div>`
        );
    }
};




let complitedElement;
let doneTaskList = document.forms.doneTaskList;
let currentTask = document.querySelector('.current-task');



currentTask.addEventListener('click', taskEvent);

// let taskStatus; 
// let remove ;
// let removeAll;

function taskEvent(event){
    taskStatus = event.target.closest('.item__status');
    remove = event.target.closest('.item__comlite');
    removeAll = event.target.closest('.auto-complit_batton');
    if(taskStatus){
        changeStatus(taskStatus)
    }
    if(remove){
        removeTask(remove)
    }
    if(removeAll){
        removeAllTask()
    }
};


function changeStatus(event){
    event.classList.toggle('active');
}

function removeTask(event){
    complitedElement = event.parentElement;
    // add return element
    complitedElement.insertAdjacentHTML(
        'beforeend',
        `<button type="button" class="return-btn">Return</button>`
    );
    // event.parentElement.remove();
    doneTaskList.append(complitedElement);
}

let allCurentTask = document.getElementsByClassName('current-task__list');

let colection = currentTask.getElementsByClassName('list-item');



function removeAllTask(){
    // console.log(colection);
    // let taskItems = allCurentTask.children;
    // console.log(taskItems);
    // let dot;
    for (let items of colection){
        // doneTaskList.append(items);
        items.insertAdjacentHTML(
            'beforeend',
            `<button type="button" class="return-btn">Return</button>`
        );
        
    //     // items.insertAdjacentHTML(
    //     //     'beforeend',
    //     //     `<button type="button" class="return-btn">Return</button>`
    //     // );
        // dot = items.lastElementChild;
        // items.remove();
        // removeTask(dot);
        // console.log(items);
    }
    removeAllTask2();
    // allCurentTask.forEach(item => {
    //     console.log(item);
    // });
};
function removeAllTask2(){
    // for (let item of colection){
        // doneTaskList.append(item);};
    console.log(colection);
    // doneTaskList.append(colection);
};


const complitedTask = document.querySelector('.done-task');
let complitedTaskItems = document.getElementsByClassName('done-task__list');
let returnedElement;

complitedTask.addEventListener('click', deliteAllComp);

function deliteAllComp(event){
    let returnBtn = event.target.closest('.return-btn')
    
    if (event.target.closest('.delete-All')){
        for (let items of complitedTaskItems){
            items.remove();
        }
    }
    if (returnBtn){
        returnedElement = returnBtn.parentElement;
        returnBtn.remove()
        returnTask(returnedElement);
    }
};

function returnTask(event){
    currentTaskList.append(event)
}