/**
 * Todolist
 */
const app = {
  /**
   * Initialisation de l'application todolist
   */
  init: function() {
    // task.init();
    app.container = document.getElementById('todo');

    app.createForm();
    app.createCounter();
  },
  /**
   * Création du formulaire
   */
  createForm: function() {
    const form = document.createElement('form');
    form.className = 'formTask';

    const input = document.createElement('input');
    input.type = 'text';
    input.setAttribute('id', 'task');
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
  createCounter: function() {    
    const title = document.createElement('div');
    title.className = 'todo__title';
    title.textContent = 'tâches en cours';

    const counter = document.createElement('span');
    counter.className = 'todo__title-nbrtasks';

    title.prepend(counter);
    app.container.append(title);
  }
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
