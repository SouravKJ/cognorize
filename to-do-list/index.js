let task = [];

const addTask = () => {
    const taskInput = document.getElementById('task-input').value.trim();
    if (taskInput) {
        task.push({ text: taskInput, completed: false });
        document.getElementById('task-input').value = ''; 
        updateTaskList();
        updateStats(); 
    }
}
const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; 
    task.forEach((taskItem, index) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
            <div class="taskItem">
                <div class="task ${taskItem.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${taskItem.completed ? 'checked' : ''} />
                    <p>${taskItem.text}</p>
                </div>
                <div class="icons">
                    <i class='bx bxs-trash' onclick="deleteTask(${index})"></i>
                    <i class='bx bx-edit' onclick="editTask(${index})"></i>
                </div>
            </div>
        `;
        
        taskElement.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));

        taskList.append(taskElement);
    });
}

const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    updateTaskList();
    updateStats(); 
}

const deleteTask = (index) => {
    task.splice(index, 1); 
    updateTaskList();
    updateStats(); 
}

const editTask = (index) => {
    const newTaskText = prompt('Edit your task:', task[index].text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        task[index].text = newTaskText.trim();
        updateTaskList();
        updateStats();
    }
}

const updateStats = () => {
    const completedTasks = task.filter((taskItem) => taskItem.completed).length;
    const totalTasks = task.length;
    
    
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    const progressbar = document.getElementById('progress');
    progressbar.style.width = `${progress}%`;
    
    const numbersDisplay = document.getElementById('numbers');
    numbersDisplay.textContent = `${completedTasks}/${totalTasks}`;
     
    if(task.length && completedTasks === totalTasks){
        blaskConfetti();
        document.getElementById('congrate').innerHTML = `
            <div id="cong">Congratulations!
            <br> You have completed all tasks!</div>
        `;
    }
}

document.getElementById('newtask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
 
const blaskConfetti=()=>{
    const duration = 150 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}