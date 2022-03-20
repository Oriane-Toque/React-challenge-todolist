/* eslint-disable no-unused-vars */
const task = {
  init: function() {
    console.log('ceci est le module task');

    // step 1 - récupérer le formulaire
    // step 2 - écouter l'évènement sur le formulaire
    // step 3 - méthode qui crée une tâche
    // step 4 - méthode qui affiche la tâche
    // step 5 - méthode qui réinitialise le form + remet le curseur

    const formTask = document.querySelector('.formTask');
    // je mets le focus sur l'input
    formTask.querySelector('input').focus();
    formTask.addEventListener('submit', task.handleAddTask);
  },

  handleAddTask: function(evt) {

    evt.preventDefault();

    // Récupération du formulaire
    const formTask = evt.currentTarget;
    // Récupération des données du formulaire
    const taskValue = formTask.querySelector('#task').value;

    // Clear form
    task.clearFormTask(formTask);
    
    // Méthode pour créer une tâche
    const newTaskElement = task.createNewTask(taskValue);
    // console.log(newTaskElement);

    // Méthode qui affiche la tâche dans le DOM
    task.displayTask(newTaskElement);
  },

  createNewTask: function(elementValue) {
    
    // Récupération du template
    const taskTemplate = document.getElementById('taskTemplate');
    // Clonage du template
    const taskCloneTemplate = taskTemplate.content.cloneNode(true);
    const newTaskElement = taskCloneTemplate.querySelector('.todo__tasks-task');

    // Modifier name, id (input)
    const newTaskInput = newTaskElement.querySelector('input');
    newTaskInput.id = elementValue;
    newTaskInput.name = elementValue;

    // Modifier for, et contenu (label)
    const newTaskLabel = newTaskElement.querySelector('label');
    newTaskLabel.setAttribute('for', elementValue);
    newTaskLabel.textContent = elementValue;

    return newTaskElement;
  },

  displayTask: function(newElement) {

    // récupération du conteneur .todo
    const todolistContent = document.querySelector('.todo__tasks');
    
    // insertion du nouveau élément
    todolistContent.prepend(newElement);
  },

  clearFormTask: function(formElement) {

    formElement.reset();
    formElement.querySelector('input').focus();
  }
};