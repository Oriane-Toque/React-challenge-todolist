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
    title.textContent = 'tâches en cours';

    const counter = document.createElement('span');
    counter.className = 'todo__title-nbrtasks';

    title.prepend(counter);
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

  /* ================== FONCTIONNALITES - METHODS ================== */

  /**
   * Ajout d'une tâche
   */
  addTask: function (taskLabel) {
    const item = document.createElement('li');
    item.className = 'todo__tasks-task';

    // TODO gérer l'id de tâche pour qu'il soit unique
    const nbTasks = document.querySelectorAll('ul li.todo__tasks-task').length;
    const idTask = `task-${nbTasks+1}`;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = idTask;

    const label = document.createElement('label');
    // TODO utiliser le contenu de l'input
    label.textContent = taskLabel;
    label.setAttribute('for', idTask);

    item.append(input);
    item.append(label);
    app.list.append(item);
  },
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
