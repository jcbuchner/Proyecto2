// Obtener referencias a los elementos HTML
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Array para almacenar las tareas
let tasks = [];

// Función para agregar una tarea
function addTask(event) {
  event.preventDefault(); // Evitar el envío del formulario

  const taskText = taskInput.value.trim(); // Obtener el valor del input

  if (taskText !== '') {
    const task = { id: Date.now(), text: taskText }; // Crear un objeto de tarea , toma la hora como identificador para cada tarea...
    tasks.push(task); // Agregar la tarea al array

    // Crear el elemento de la lista de tareas
    const taskItem = createTaskElement(task);
    taskList.appendChild(taskItem); // Agregar el elemento a la lista

    saveTasksToLocalStorage(); // Guardar las tareas en el almacenamiento local

    taskInput.value = ''; // Limpiar el input
  }
}

// Función para crear un elemento de tarea
function createTaskElement(task) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.innerHTML = `
    <span>${task.text}</span>
    <button onclick="editTask(${task.id})">Editar</button>
    <button onclick="deleteTask(${task.id})">Eliminar</button>
  `;
  taskItem.dataset.id = task.id; // Establecer el atributo data-id con el ID de la tarea
  return taskItem;
}

// Función para editar una tarea
function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId); // Buscar la tarea en el array por el ID
  if (task) {
    const newTaskText = prompt('Editar tarea:', task.text); // Mostrar un cuadro de diálogo para editar el texto de la tarea
    if (newTaskText !== null && newTaskText.trim() !== '') {
      task.text = newTaskText.trim(); // Actualizar el texto de la tarea

      const taskItem = document.querySelector(`[data-id="${taskId}"]`); // Buscar el elemento de la tarea por el atributo data-id
      taskItem.querySelector('span').textContent = task.text; // Actualizar el texto mostrado en el elemento de la lista

      saveTasksToLocalStorage(); // Guardar las tareas actualizadas en el almacenamiento local
    }
  }
}

// Función para eliminar una tarea
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId); // Filtrar las tareas y eliminar la que coincida con el ID

  const taskItem = document.querySelector(`[data-id="${taskId}"]`); // Buscar el elemento de la tarea por el atributo data-id
  taskList.removeChild(taskItem); // Eliminar el elemento de la lista

  saveTasksToLocalStorage(); // Guardar las tareas actualizadas en el almacenamiento local
}

// Función para guardar las tareas en el almacenamiento local
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar las tareas del almacenamiento local
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(task => {
      const taskItem = createTaskElement(task);
      taskList.appendChild(taskItem);
    });
  }
}

// Asignar el evento submit al formulario
taskForm.addEventListener('submit', addTask);

// Cargar las tareas del almacenamiento local al cargar la página
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);



// TODO, AGREGAR NUMERO AL ITEM DE LA LISTA, INCREMENTANDO O POR ARRAY QUIZAS?