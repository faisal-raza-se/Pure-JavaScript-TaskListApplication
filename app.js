// All UI Variables
const form = document.querySelector(`#task-form`);
const taskList = document.querySelector(`.collection`);
const clearBtn = document.querySelector(`.clear-tasks`);
const filter = document.querySelector(`#filter`);
const taskInput = document.querySelector(`#task`);

// All Event Listners
loadEventListners();

//function load event listner
function loadEventListners() {
  // DOM Load Events
  document.addEventListener('DOMContentLoaded', getTasks);

  //Add task event
  form.addEventListener('submit', addTask);
  // Remove Task event 
  taskList.addEventListener(`click`, removeTask);
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks Event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

// Add Taks
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a Task')
  }
  // Create li elements
  const li = document.createElement('li');
  li.className = 'collection-item';
  //Creaete text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);
  //Clear Input
  taskInput.value = ''
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove Task Using event Delegation
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You sure')){
      e.target.parentElement.parentElement.remove();
      //Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
    
  }
}
// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent===task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear All Tasks
function clearTasks(){
  // One way
  //taskList.innerHTML = '';
  // Other Way
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
  // Clear Tasks from Local Storage
  clearTasksFromLocalStorage();
}

//Clear Tasks for Local Storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}


// Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  // Query selector return nodelist
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display ='block';
    } else {
      task.style.display = 'none';
    }
    console.log(item.indexOf(text));
    console.log(item);    
  });
}