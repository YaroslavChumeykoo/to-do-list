const form = document.querySelector('.form')
const inputForm = document.querySelector('input')
const taskList = document.querySelector('.list_task')

form.addEventListener('submit', addTask);

let task = [];

if(localStorage.getItem('tasks')){
    task = JSON.parse(localStorage.getItem('tasks'))
}
task.forEach(function(element){
    addToTask(element)
})
chekTask();

function addTask(event){
    event.preventDefault();
    let helper = ''
    if(inputForm.value.length > 35){
        helper = inputForm.value.split('')
        helper.splice(34, 0, ' ')
        helper = helper.join('')
        inputForm.value = helper
    }

    const newTask = {
        id: Date.now(),
        text: inputForm.value,
        ready: false
    }
    if(newTask.text != '')
        task.push(newTask)

    addToTask(newTask)
    inputForm.value = '';
    inputForm.focus();
    chekTask();
    saveINlocalStoradge();
}

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
                element.ready = fa
            }
        })
    }
    saveINlocalStoradge();
}

function delete_task(event){
    console.log('удалить')
    const delet = event.target.closest('.task')
    delet.remove();
    task = task.filter((element) => element.id != delet.id)
    chekTask();
    saveINlocalStoradge();
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
    localStorage.setItem('tasks', JSON.stringify(task))
}

function addToTask(task_el){
    if(task_el.text != ''){
        if(task_el.ready == false)
            ready_new = 'task'
        else
            ready_new = 'task ready'
        
        const taskText = `<div class="${ready_new}" id ='${task_el.id}'>
        <span class="text_task">${task_el.text}</span>
        <div class="but_in_task">
            <button class="task_ready">
                <img src="ready.png" alt="ready">
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
        for (item of task_ready){
            item.addEventListener('click', ready_task)
        }
        for (item of task_delete){
            item.addEventListener('click', delete_task)
        }
    }
}