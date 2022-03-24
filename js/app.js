/**
 * Todolist
 */
const app = {
  /**
   * Initialisation de l'application todolist
   */
  init: function () {
    app.container = document.getElementById('todo');

    // création des blocks de la todolist
    app.createForm();
    app.createCounter();
    app.createTaksList();
  },

  /* ================== CREATION DES BLOCKS ET ITEMS ================== */

  /**
   * Création du formulaire
   */
  createForm: function () {
    const form = document.createElement('form');
    form.className = 'formTask';

    form.addEventListener('submit', app.handleFormSubmit);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'task';
    input.setAttribute('required', 'required');
    input.setAttribute('name', 'task');

    const label = document.createElement('label');
    label.setAttribute('for', 'task');
    label.textContent = 'Ajouter une tâche';

    form.appendChild(input);
    form.appendChild(label);
    app.container.append(form);
  },

  /**
   * Création du compteur
   */
  createCounter: function () {
    const title = document.createElement('div');
    title.className = 'todo__title';
    title.textContent = ' tâches en cours';

    app.counter = document.createElement('span');
    app.counter.className = 'todo__title-nbrtasks';

    app.setCounterValue();

    title.prepend(app.counter);
    app.container.append(title);
  },

  /**
   * Création de la liste
   */
  createTaksList: function () {
    app.list = document.createElement('ul');
    app.list.className = 'todo__tasks';

    app.container.append(app.list);
  },

  /* ================== FONCTIONNALITES - HANDLES ================== */

  /**
   * Gestion de la soumission du formulaire
   * @param {*} evt 
   */
  handleFormSubmit: function (evt) {
    // je stoppe le comportement par défaut
    evt.preventDefault();

    const form = evt.currentTarget;

    const taskValue = form.querySelector('input').value;
    app.addTask(taskValue);

    // réinitialise le formulaire
    form.reset();
  },

  /**
   * Changement d'état de la checkbox
   * @param {*} evt 
   */
  handleTaskChange: function (evt) {

    const input = evt.currentTarget;
    if(input.checked) {
      input.closest('.todo__tasks-task').classList.add('task-completed');
      // positionne en bas de liste la tache complétée
      app.list.append(input.closest('.todo__tasks-task'));
    } else {
      input.closest('.todo__tasks-task').classList.remove('task-completed');
      // repositionne en tête de liste la tache
      app.list.prepend(input.closest('.todo__tasks-task'));
    }

    app.setCounterValue();
  },

  /* ================== FONCTIONNALITES - METHODS ================== */

  /**
   * Ajout d'une tâche
   */
  addTask: function (taskLabel) {
    const item = document.createElement('li');
    item.className = 'todo__tasks-task';

    const nbTasks = document.querySelectorAll('ul li.todo__tasks-task').length;
    const idTask = `task-${nbTasks+1}`;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = idTask;

    const label = document.createElement('label');
    label.textContent = taskLabel;
    label.setAttribute('for', idTask);

    // evenement change
    input.addEventListener('change', app.handleTaskChange);

    item.append(input);
    item.append(label);
    app.list.append(item);

    app.setCounterValue();
  },

  /**
   * Set le compteur de tâche en cours
   */
  setCounterValue: function() {
    const nbTasksNotDone = document.querySelectorAll('ul li.todo__tasks-task:not(.task-completed)').length;
    app.counter.textContent = nbTasksNotDone > 0 ? nbTasksNotDone : 'Aucunes';
  }
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
