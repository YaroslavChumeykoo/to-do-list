const form = document.querySelector('.form')
const inputForm = document.querySelector('input')
const taskList = document.querySelector('.list_task')
const noTask = document.querySelector('.notask')

form.addEventListener('submit', addTask);

function addTask(event){
    event.preventDefault();
    let helper = ''
    if(inputForm.value.length > 35){
        helper = inputForm.value.split('')
        helper.splice(34, 0, ' ')
        helper = helper.join('')
        inputForm.value = helper
    }
    const taskText = `<div class="task">
    <span class="text_task">${inputForm.value}</span>
    <div class="but_in_task">
        <button class="task_ready">
            <img src="ready.png" alt="ready">
        </button>
        <button class="task_delete">
            <img src="delete.png" alt="ready">
        </button>
    </div>
    </div>`
    if(inputForm.value !== '')
        taskList.insertAdjacentHTML('beforeend', taskText);
    inputForm.value = '';
    inputForm.focus();
    
    if(taskList.children.length > 1){
        noTask.classList.add('none')
    }
    if(taskList.children.length == 2){
        taskList.children[1].style.border = 0
    }

    const task_ready = document.querySelectorAll('.task_ready');
    const task_delete = document.querySelectorAll('.task_delete');
    for (item of task_ready){
        item.addEventListener('click', ready_task)
    }
    for (item of task_delete){
        item.addEventListener('click', delete_task)
    }
}

function ready_task(event){
    const ready = event.target.closest('.task')
    ready.classList.toggle('ready')
}

function delete_task(event){
    const delet = event.target.closest('.task')
    delet.remove();
    if(taskList.children.length == 1){
        noTask.classList.remove('none')
    }
}
