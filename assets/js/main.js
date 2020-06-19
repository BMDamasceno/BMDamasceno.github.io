// Todo Class: Representa uma atividade
class Todo {
  constructor(atividade, hora) {
    this.atividade = atividade;
    this.hora = hora;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayAtividades() {
    const atividades = Store.getAtividades();

    atividades.forEach((todo) => UI.addTodoToList(todo));
  }

  static addTodoToList(todo) {
    const list = document.querySelector('#todo-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="texto-corpo alinhar">${todo.atividade}</td>
      <td class="texto-corpo alinhar">${todo.hora}</td>
      <td class="texto-corpo alinhar"><a href="#" class="btn1 btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static deleteTodo(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#todo-form');
    container.insertBefore(div, form);
    // Vanish in 1.4 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 1400);
  }

  static clearFields() {
    document.querySelector('#atividade').value = '';
    document.querySelector('#hora').value = '';
  }
}
// Store Class: Handles Storage
class Store {
  static getAtividades() {
    let atividades;
    if(localStorage.getItem('atividades') === null) {
      atividades = [];
    } else {
      atividades = JSON.parse(localStorage.getItem('atividades'));
    }
    return atividades;
  }

  static addTodo(todo) {
    const atividades = Store.getAtividades();
    atividades.push(todo);
    localStorage.setItem('atividadesbug', JSON.stringify(atividades));
  }

  static removeTodo(atividade) {
    const atividades = Store.getAtividades();
    atividades.forEach((todo, index) => {
      if(todo.atividade === atividade) {
        atividades.splice(index, 1);
      }
    });

    localStorage.setItem('atividades', JSON.stringify(atividades));
  }
}

// Event: Display Atividades
document.addEventListener('DOMContentLoaded', UI.displayAtividades);

// Event: Add a Todo
document.querySelector('#todo-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const atividade = document.querySelector('#atividade').value;
  const hora = document.querySelector('#hora').value;

  // Validate
  if(atividade === '' || hora === '') {
    UI.showAlert('Por favor preencha todos os campos!', 'danger');
  } else {
    // Instatiate todo
    const todo = new Todo(atividade, hora);

    // Add Todo to UI
    UI.addTodoToList(todo);

    // Add todo to store
    Store.addTodo(todo);

    // Show success message
    UI.showAlert('Atividade Adicionada', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Todo
document.querySelector('#todo-list').addEventListener('click', (e) => {
  // Remove todo from UI
  UI.deleteTodo(e.target);

  // Remove todo from storage
  Store.removeTodo(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Atividade Removida', 'success');
});