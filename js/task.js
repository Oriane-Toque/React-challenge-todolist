/* eslint-disable no-unused-vars */
const task = {
  /**
   * Initialisation du module task
   */
  init: function() {

    const formTask = document.querySelector('.formTask');
    // je mets le focus sur l'input
    formTask.querySelector('input').focus();
    formTask.addEventListener('submit', task.handleAddTask);

    // création d'une méthode qui applique des écouteurs d'évènements sur toutes les tâches
    task.bindAllEventsListeners();
  },

  /**
   * Ajout d'une nouvelle tâche
   * @param {*} evt 
   */
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

    // Méthode qui affiche la tâche dans le DOM
    task.displayNewTask(newTaskElement);

    // création d'une méthode qui applique des écouteurs d'évènements sur toutes les tâches
    task.bindAllEventsListeners();
  },

  /**
   * Marquer une tâche comme complète
   * @param {*} evt 
   */
  handleCompletedTask: function(evt) {
    // je veux changer le style si completed task
    const inputTask = evt.currentTarget;
    const taskElement = inputTask.closest('.todo__tasks-task');

    taskElement.classList.add('task-checked');

    // je veux l'afficher en fin de liste
    task.displayCompletedTask(taskElement);
  },

  /**
   * Méthode pour appliquer tous les écouteurs d'évènements
   * sur toutes les tâches nouvelles ou non
   */
  bindAllEventsListeners: function() {
    // Récupération de toutes les tâches
    const tasks = document.querySelectorAll('.todo__tasks-task');
    
    tasks.forEach(taskValue => {
      // j'applique un écouteur d'évènement au changement d'état de l'input
      const inputTask = taskValue.querySelector('input');
      inputTask.addEventListener('change', task.handleCompletedTask);
    });
  },

  /**
   * Création d'une nouvelle tâche
   * @param {*} elementValue 
   * @returns taskElement
   */
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

  /**
   * Affiche une nouvelle tâche dans le DOM
   * @param {*} newElement 
   */
  displayNewTask: function(newElement) {

    // récupération du conteneur .todo
    const todolistContent = document.querySelector('.todo__tasks');
    
    // insertion du nouveau élément
    todolistContent.prepend(newElement);
  },

  /**
   * Affiche une tâche complétée dans le DOM
   * @param {*} completedElement 
   */
  displayCompletedTask: function(completedElement) {
    // je veux afficher la tache complete en fin de liste
    const todolistContent = completedElement.closest('.todo__tasks');
    todolistContent.append(completedElement);
  },

  /**
   * Réinitialise le formulaire
   * et remets en place le curseur dedans
   * @param {*} formElement 
   */
  clearFormTask: function(formElement) {

    formElement.reset();
    formElement.querySelector('input').focus();
  }
};