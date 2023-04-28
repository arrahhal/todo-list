const selectors = {
  main: document.querySelector('.content'),
  projectsContainer: document.getElementById('sidebar__projects-container'),
  filterButtons: document.querySelectorAll('.sidebar__filter-btn'),
  todayButton: document.getElementById('sidebar__today-btn'),
  weekButton: document.getElementById('sidebar__week-btn'),
  completedButton: document.getElementById('sidebar__completed-btn'),
  showAddProjectModalButton: document.getElementById(
    'sidebar__add-project-modal-btn'
  ),
  projectsToggle: document.getElementById('sidebar__projects-toggle'),
  projectsList: document.getElementById('sidebar__projects-list'),
  tasksList: document.getElementById('todo__tasks-list'),
  todoTitle: document.getElementById('todo__title'),
  sidebarToggle: document.getElementById('header__sidebar-toggle'),
  sidebar: document.getElementById('sidebar'),
  showAddTaskModalButton: document.getElementById('todo__add-task-modal-btn'),
  addTaskModal: document.getElementById('add-task-modal'),
  updateTaskModal: document.getElementById('update-task-modal'),
  addProjectModal: document.getElementById('add-project-modal'),
  updateProjectModal: document.getElementById('update-project-modal'),
  closeButtons: document.querySelectorAll('button[data-close]'),
  addTaskButton: document.getElementById('addTaskBtn'),
  updateTaskButton: document.getElementById('updateTaskBtn'),
  addProjectButton: document.getElementById('addProjectBtn'),
  updateProjectButton: document.getElementById('updateProjectBtn'),
  addTaskModalNameInput: document.getElementById('add-task__name-input'),
  addTaskModalProjectSelect: document.getElementById(
    'add-task__project-select'
  ),
  addTaskModalDateInput: document.getElementById('add-task__duedate-input'),
  addTaskModalPrioritySelect: document.getElementById(
    'add-task__priority-select'
  ),
  addTaskModalDescTextarea: document.getElementById('add-task__desc-textarea'),
  updateTaskModalNameInput: document.getElementById('update-task__name-input'),
  updateTaskModalProjectSelect: document.getElementById(
    'update-task__project-select'
  ),
  updateTaskModalDateInput: document.getElementById(
    'update-task__duedate-input'
  ),
  updateTaskModalPrioritySelect: document.getElementById(
    'update-task__priority-select'
  ),
  updateTaskModalDescTextarea: document.getElementById(
    'update-task__desc-textarea'
  ),
  addProjectModalNameInput: document.getElementById('add-project__name-input'),
  updateProjectModalNameInput: document.getElementById(
    'update-project__name-input'
  ),
};

export default selectors;
