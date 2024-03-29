const form = document.querySelector('.form')
const inputForm = document.querySelector('input')
const taskList = document.querySelector('.list_task')
const nameForm = document.querySelector('.name_form');
const filter = document.querySelector('.filtr')
const filtr_no_ready = document.querySelector('.filtr_no_ready')
const all = document.querySelector('.all')
const pagination_but_all = document.querySelector('.pagination_but_all')
const all_ready = document.querySelector('.all_ready')
const remove_all = document.querySelector('.remove_all')

form.addEventListener('submit', addTask);
filter.addEventListener('click',filtr);
filtr_no_ready.addEventListener('click',filtr_noReady);
all.addEventListener('click',take_is_LC);
all_ready.addEventListener('click', readyALL);
remove_all.addEventListener('click', removeALL);

let task = [];
let index = 0;
let mode = 'all'

function take_is_LC(){
    all.style.backgroundColor = 'red'
    filter.style.backgroundColor = 'rgb(111, 111, 235)'
    filtr_no_ready.style.backgroundColor = 'rgb(111, 111, 235)'
    mode = 'all'
    taskList.querySelectorAll('.task').forEach((element) => element.remove())
    if(localStorage.getItem('tasks')){
        task = JSON.parse(localStorage.getItem('tasks'))
    }
    task.forEach(function(element){
    addToTask(element)
    })
    chekTask();
    all.innerHTML = `Все(${task.length})`
    const task_filtr = task.filter((element) => element.ready == true)
    filter.innerHTML = `Выполнены(${task_filtr.length})`
    filtr_no_ready.innerHTML = `Не Выполнены(${task.length - task_filtr.length})`
    pagination_button(task)
    
}
function addTask(event){
    event.preventDefault();
    let validation = inputForm.value.split('')
    let validation_finish = []
    validation.forEach(function(element){
         switch(element){
             case '"':
                 element = '&#34;';
                 break;
             case '№':
                 element = '&#8470;';
                 break;
             case ';':
                 element = '&#59;';
                 break;
             case '%':
                 element = '&#37;';
                 break;
             case ':':
                 element = '&#58;';
                 break;
             case '?':
                 element = '&#63;';
                 break;
             case '*':
                 element = '&#8727;';
                 break;
             case '<':
                 element = '&lt;';
                 break;
             case '>':
                 element = '&gt;';
                 break;    
         }
         validation_finish.push(element)
    })

    if(validation_finish.length > 35){
        for(let i = 0; i <validation_finish.length;i++){
            if((i % 35) == 0)
            validation_finish.splice(i,0,' ')
        }
    }
    if(validation_finish.find(function(element){
        if(element != ' ')
            return true
    })){}
    else validation_finish = []
    validation_finish = validation_finish.join('')
    // validation = escapeHtml(validation)
    const newTask = {
        id: Date.now(),
        text: validation_finish,
        ready: false
    }
    if(newTask.text != '' && newTask.text != ' ')
        task.push(newTask)

    inputForm.value = '';
    inputForm.focus();
    saveINlocalStoradge();
    take_is_LC();
    chekTask();
    
}

// function escapeHtml(unsafe)
// {
//     return unsafe
//          .replace(/&/g, "&amp;")
//          .replace(/</g, "&lt;")
//          .replace(/>/g, "&gt;")
//          .replace(/"/g, "&quot;")
//          .replace(/'/g, "&#039;");
//  }

function ready_task(event){
    const ready = event.target.closest('.task')
    if(ready.classList.toggle('ready')){
        task.forEach(function(element){
            if(element.id == ready.id){
                element.ready = true
            }
        })
    }
    else{
        task.forEach(function(element){
            if(element.id == ready.id){
                element.ready = false
            }
        })
    }
    saveINlocalStoradge();
    // хуйня не робит
    if(mode == 'filtr'){
        const ready_task = taskList.querySelectorAll('.task')
        ready_task.forEach(function(element, index){
            if(element.classList == 'task'){
                element.remove()
                if(ready_task[index + 5])
                ready_task[index + 5].classList.remove('none')
                else filtr()
            }
        })
    }
        
    if(mode === 'filtr_noReady'){
        const noready_task = taskList.querySelectorAll('.task')
        noready_task.forEach(function(element, index){
            if(element.classList == 'task ready'){
                element.remove()
                if(noready_task[index + 5])
                    noready_task[index + 5].classList.remove('none')
                else filtr_noReady()
            }
        })
    }
    
}

function delete_task(event){
    const delet = event.target.closest('.task')
    delet.remove();
    task = task.filter((element) => element.id != delet.id)
    chekTask();
    saveINlocalStoradge();
    take_is_LC();
}

function chekTask(){
    const noTask = document.querySelector('.notask')
    if(noTask){
        if(task.length == 0){
            noTask.classList.remove('none')
        }
        if(task.length > 0){
            noTask.classList.add('none')
        }
    }
    else{
        if(task.length == 0){
            const notask = `<div class="notask">
            <h3>Список дел пуст</h3>
            <img src="hz.png" alt="hz">
            </div>`
            taskList.insertAdjacentHTML('beforeend', notask)
        }
    }
}
function saveINlocalStoradge(){
    all.innerHTML = `Все(${task.length})`
    const task_filtr = task.filter((element) => element.ready == true)
    filtr_no_ready.innerHTML = `Не Выполнены(${task.length - task_filtr.length})`
    filter.innerHTML = `Выполнены(${task_filtr.length})`
    localStorage.setItem('tasks', JSON.stringify(task))
}

function addToTask(task_el){
    if(task_el.text != '' && task_el.text != ' '){
        if(task_el.ready == false)
            ready_new = 'task'
        else
            ready_new = 'task ready'
        
        const taskText = `<div class="${ready_new}" id ='${task_el.id}' >
        <div class="ready_text">
            <button class="task_ready">
                <img src="ready.png" alt="ready">
            </button>
            <span class="text_task">${task_el.text}</span>
        </div>
        <div class="but_in_task">
            <button class="task_edit">
                <img src="edit.png" alt="edit">
            </button>
            <button class="task_delete">
                <img src="delete.png" alt="ready">
            </button>
        </div>
        </div>`
        taskList.insertAdjacentHTML('beforeend', taskText);
        taskList.querySelector('.task').style.border = 0
        const task_ready = document.querySelectorAll('.task_ready');
        const task_delete = document.querySelectorAll('.task_delete');
        const task_edit = document.querySelectorAll('.task_edit');
        for (item of task_ready){
            item.addEventListener('click', ready_task)
        }
        for (item of task_delete){
            item.addEventListener('click', delete_task)
        }
        for (item of task_edit){
            item.addEventListener('click', edit_task)
        }
    }
    
    
}
function edit_task(event){
    const edit = event.target.closest('.task')
    nameForm.innerHTML = 'Редактирование задачи'
    inputForm.focus();
    index = task.findIndex((element) => element.id == edit.id)
    inputForm.value = task[index].text
    form.removeEventListener('submit', addTask);
    form.addEventListener('submit', addTask_edit);
    
}

function addTask_edit(event){
    event.preventDefault();
    if(inputForm.value != ''){
        task[index].text = inputForm.value;
        const tasks = taskList.querySelectorAll(".task")
        tasks.forEach(function(element){
            if(element.id == task[index].id){
                const span = element.querySelector('span')
                span.innerHTML = inputForm.value
            }
        })
    }
    inputForm.value = ''
    nameForm.innerHTML = 'Добавить новую задачу'
    form.removeEventListener('submit', addTask_edit);
    form.addEventListener('submit', addTask);
    saveINlocalStoradge();
}

function filtr(){
    all.style.backgroundColor = 'rgb(111, 111, 235)'
    filter.style.backgroundColor = 'red'
    filtr_no_ready.style.backgroundColor = 'rgb(111, 111, 235)'
    mode = 'filtr'
    const task_filtr = task.filter((element) => element.ready == true)
    const away_task = taskList.querySelectorAll('.task')
    away_task.forEach((element) => element.remove())
    task_filtr.forEach(function(element){
        addToTask(element)
    })
    pagination_button(task_filtr)
}
function filtr_noReady(){
    all.style.backgroundColor = 'rgb(111, 111, 235)'
    filter.style.backgroundColor = 'rgb(111, 111, 235)'
    filtr_no_ready.style.backgroundColor = 'red'
    mode = 'filtr_noReady'
    const task_filtr_noRead = task.filter((element) => element.ready == false)
    const away_task = taskList.querySelectorAll('.task')
    away_task.forEach((element) => element.remove())
    task_filtr_noRead.forEach(function(element){
        addToTask(element)
    })
    pagination_button(task_filtr_noRead)
}
function pagination(number_padges){
    const pagination_but = pagination_but_all.querySelectorAll('.pagination_but')
    pagination_but.forEach(function(element){
        if(element.innerHTML == number_padges)
            element.style.backgroundColor = 'red'
        else element.style.backgroundColor = 'rgb(111, 111, 235)'
    })
    const all_task = taskList.querySelectorAll('.task')
    all_task.forEach(function(item){
        item.classList.add('none')
    })
    if(number_padges == 0){}
    else if(number_padges == 1){
        for(let i = 0; i < 5; i++){
            if(all_task[i])
                all_task[i].classList.remove('none')
        }    
    }
    else{
        for(let i = (5 * (number_padges - 1)); i < (5 * number_padges); i++){
            if(all_task[i])
                all_task[i].classList.remove('none')
        }
    }
}
function pagination_button(task_for_pag){
    pagination_but_all.innerHTML = ''
    let new_button = ''
    let all_number_padges = Math.ceil(task_for_pag.length / 5)
    for(let i = 1; i <= all_number_padges; i++){
        new_button = `<button class="pagination_but">${i}</button>`
        pagination_but_all.insertAdjacentHTML('beforeend', new_button);
    }
    if(all_number_padges == 0)
        pagination(0);
    else pagination(all_number_padges)
    const pagination_but = pagination_but_all.querySelectorAll('.pagination_but')
    for(item of pagination_but){
        item.addEventListener('click', (event) => pagination(event.target.innerHTML));
    }

}
function readyALL(){
    const all_task = taskList.querySelectorAll('.task')
    all_task.forEach(function(item){
    item.classList.add('ready')
        task.forEach(function(element){
            if(element.id == item.id){
                element.ready = true
            }
        })
    
    })
    saveINlocalStoradge();
    take_is_LC()
}

function removeALL(){
    task = []
    saveINlocalStoradge();
    take_is_LC()
}

take_is_LC();
