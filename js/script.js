const container = document.querySelector('.container');
const newTaskForm = document.forms.newTask;
const invForm = document.forms.invisibleForm;

document.addEventListener('click', newTaskWindow);

function newTaskWindow (event) {
    if(event.target.closest('.new-task_bnt')){
        invForm.classList.toggle('active');
        invisibleInput.focus();
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
    invisibleInput.value = "";
};

// let currentTaskList = document.forms.currentTaskList;
const currentTaskList = document.querySelector('.current-task__list');

function createNewTask(){
    if(inputValue){
        currentTaskList.insertAdjacentHTML(
            'beforeend',
            `<div class="list-item" draggable="true">
                <h3>${inputValue}</h3>
                <div class="item__create_date">Created:${creatDate}</div>
                <button type="button" class="item__status">
                    <span>Start</span>
                    <span>In Process</span>
                </button>
                <button type="button" class="item__comlite">Complited</button>
            </div>`
        );
        addEventFun()
    }
};

function addEventFun(){
    let drag = currentTaskList.lastChild;
    drag.addEventListener('dragstart', () => {
        drag.classList.add('dragging')
    })
    drag.addEventListener('dragend', () => {
        drag.classList.remove('dragging')
    })  
}


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
    complitedElement.removeAttribute("draggable");
    // add return element
    complitedElement.insertAdjacentHTML(
        'beforeend',
        `<button type="button" class="return-btn">Return</button>`
    );
    // event.parentElement.remove();
    complitedElement.classList.add('removed');
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
    let colectionArr = Array.from(colection);
    for (let item of colectionArr){
        item.removeAttribute("draggable");
        item.classList.add('removed');
        doneTaskList.append(item);};
    
    console.log(colectionArr);
    // doneTaskList.append(colection);
};


const complitedTask = document.querySelector('.done-task');

let complitedColection = complitedTask.getElementsByClassName('list-item');
let returnedElement;

complitedTask.addEventListener('click', deliteAllComp);

function deliteAllComp(event){
    let returnBtn = event.target.closest('.return-btn')
    
    if (event.target.closest('.delete-All')){
        let conmplitedArr = Array.from(complitedColection);
        for (let items of conmplitedArr){
            console.log(items);
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
    event.setAttribute("draggable", "true");
    event.classList.remove('removed')
    currentTaskList.append(event);
}



const counter = document.querySelector('h1>span');
const progressValue = document.querySelector('progress');



document.addEventListener('click', () => {
    counter.innerHTML = colection.length;
    checkListFn();
    progress();
});

function progress(){
    let proc; 
    if (complitedColection.length > 0 && colection.length > 0){
        proc = (complitedColection.length * 100) / (complitedColection.length + colection.length);
    } 
    
    if (complitedColection.length == 0){
        proc = 0;
    }
    // console.log(colection.length);
    progressValue.setAttribute('value', proc);
    // return proc;
}




const draggables = document.getElementsByClassName('list-item');
const liveContainer = document.getElementsByClassName('current-task__list');
const dropContainer = liveContainer[0];

// console.log(dropContainer)

// document.addEventListener('click', () => {
//     for (let drag of draggables){
    
//         drag.addEventListener('dragstart', () => {
//             drag.classList.add('dragging')
//         })
//         drag.addEventListener('dragend', () => {
//             drag.classList.remove('dragging')
//         })  
//     }
// })



// draggables.forEach(drag => {
//     drag.addEventListener('dragstart', () => {
//         drag.classList.add('dragging')
//     })
//     drag.addEventListener('dragend', () => {
//         drag.classList.remove('dragging')
//     })
// });

dropContainer.addEventListener('dragover', e => {
    e.preventDefault();
    // console.log('drag over')
    const afterElement = getDragAfterElement(dropContainer, e.clientY);
    // console.log(afterElement);
    const drag = document.querySelector('.dragging');
    dropContainer.insertBefore(drag, afterElement);
    // dropContainer.appendChild(drag);
})

function getDragAfterElement(dropContainer, y){
    const draggableElement = [...dropContainer.querySelectorAll('.list-item:not(.dragging)')];

    return draggableElement.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    
    if (offset < 0 &&  offset > closest.offset){
        return { offset: offset, element: child }      
    } else {
        return closest
    }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}




// const itemsArrey = [];
const allItems = document.getElementsByClassName('list-item');

window.addEventListener("unload", local);

function local(){
    
    const itemsArrey = [];
    for (let i of allItems) {
        let value = i.querySelector('h3')
        let created = i.querySelector('.item__create_date')
        let itemStatus = i.querySelector('.item__status')
        let itemClass = i.className

        itemsArrey.push({
            task: value.textContent,
            created: created.textContent,
            itemStatus: itemStatus.className,
            itemClass: itemClass,
        })
        
    }
    toStorege(itemsArrey)
    // console.log(itemsArrey);

}

function toStorege(arr){
    localStorage.setItem( 'colectionAr' , JSON.stringify(arr));
}




const fromStorage = localStorage.getItem('colectionAr');
const parseColection = JSON.parse(fromStorage)
if (parseColection) {
    for (let item of parseColection){
        currentTaskList.insertAdjacentHTML(
            'beforeend',
            `<div class="${item.itemClass}" draggable="true">
                <h3>${item.task}</h3>
                <div class="item__create_date">${item.created}</div>
                <button type="button" class="${item.itemStatus}">
                    <span>Start</span>
                    <span>In Process</span>
                </button>
                <button type="button" class="item__comlite">Complited</button>
            </div>`
        );
        addEventFun();
    }
}
console.log(parseColection)
localStorage.clear()


const checkComplitedTask = document.querySelectorAll('.list-item')
for (let item of checkComplitedTask){
    if (item.classList.contains('removed')){
        item.classList.remove('removed')
        removeTask(item.lastChild)
    }
}



const currentTitle = document.querySelector('.current-task');
const progressBlock = document.querySelector('.progress');


function checkListFn() {
    if (draggables.length == 0) {
        currentTitle.classList.add('nothing');
        complitedTask.classList.add('nothing');
        progressBlock.classList.add('nothing');
    }
    if (draggables.length > 0) {
        currentTitle.classList.remove('nothing');
        complitedTask.classList.remove('nothing');
        progressBlock.classList.remove('nothing');
    }
}

checkListFn();
progress();
counter.innerHTML = colection.length;