/*
Programmation impérative : on stocke les données directement dans le DOM. Pas très pratique pour ajouter des fonctionnalités

Programmation déclarative : 
  - une seule source de vérité : les données
  - les données pilotent l'affichage
  - quand on veut changer quelque chose sur l'affichage : on modifie les données, pas directement le DOM, 
  et on reconstruit complètement l'affichage à partir des données (=> pas d'état d'intermédiaire à gérer)
  - rechargement du DOM : pertes au niveau de la performance
*/

const app = {

  tasks: [
    {
      id: 1,
      label: 'Coder une todolist en version impérative',
      done: true,
    },
    {
      id: 2,
      label: 'Coder une todolist en version déclarative',
      done: false,
    },
  ],

  init: function () {
    // console.log('coucou mes tâches : ', ...app.tasks);

    app.container = document.getElementById('todo');

    // on vide le container
    app.container.innerHTML = '';

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
    title.textContent = ' tâche(s) en cours';

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

    // si des tâches, génère les tâches dans app.tasks
    app.tasks ? app.tasks.forEach((task) => {
      app.generateTask(task);
    }) : false;

    app.container.append(app.list);
  },

  /* ================== FONCTIONNALITES - HANDLES ================== */

  /**
   * Gestion soumission formulaire
   * @param {*} evt 
   */
  handleFormSubmit: function (evt) {
    evt.preventDefault();

    const inputNewTask = evt.currentTarget.firstChild;
    const newTaskId = app.tasks.length + 1;

    const newTask = {
      id: newTaskId,
      label: inputNewTask.value,
      done: false,
    };

    // je pousse dans mon tableau
    app.tasks.push(newTask);
    // on reconstruit l'affichage
    app.init();
  },

  /**
   * Changement de statut de tache
   * @param {*} evt 
   */
  handleTaskChange: function (evt) {
    const item = evt.currentTarget.closest('.todo__tasks-task');
    item.classList.toggle('task-completed');

    const itemId = evt.currentTarget.id;
    const taskId = itemId[itemId.search('[\\d+]')];

    // je change le statut de la tache
    const taskDone = app.tasks.find(task => task.id === parseInt(taskId));
    taskDone.done = taskDone.done === true ? false : true;

    // mise à jour du tableau
    app.tasks.splice(taskId - 1, 1, taskDone);

    app.init();
  },

  /* ================== FONCTIONNALITES - METHODS ================== */

  /**
   * Set le compteur de tâche en cours
   */
  setCounterValue: function () {
    // Filtrer les tâches non terminées qui vont être stockées dans un nouveau tableau
    // Récupérer la longueur du tableau
    const tasksNotDone = app.tasks.filter((task) => task.done === false).length;
    app.counter.textContent = tasksNotDone > 0 ? tasksNotDone : 'Aucunes';
  },

  /**
   * Ajout d'une tâche
   */
  generateTask: function ({
    id: taskId, 
    label: taskLabel, 
    done: taskDone
  }) {
    const item = document.createElement('li');
    item.className = taskDone ? 
      'todo__tasks-task task-completed' : 
      'todo__tasks-task'
    ;

    const idTask = `task-${taskId}`;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = idTask;
    input.checked = taskDone ? true : false;

    const label = document.createElement('label');
    label.textContent = taskLabel;
    label.setAttribute('for', idTask);

    // evenement change
    input.addEventListener('change', app.handleTaskChange);

    item.append(input);
    item.append(label);
    // si tache complete en bas de liste
    // sinon en haut de liste
    input.checked ? app.list.append(item) : app.list.prepend(item);

    app.setCounterValue();
  },
};

document.addEventListener('DOMContentLoaded', app.init);