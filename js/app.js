/**
 * Todolist
 */
const app = {
  init: function() {
    // eslint-disable-next-line no-undef
    task.init();
  },
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
