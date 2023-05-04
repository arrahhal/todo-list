import { DOM } from './dom';
import selectors from './selectors';
import { taskManager } from './app';

let currentEditTaskId = '';

const reloadCurrentFocusedProject = () => {
  const currentProject = document.querySelector(
    '.sidebar__project-item > .is-focused'
  );
  if (currentProject.id === 'sidebar__inbox-btn')
    DOM.appendTasksList(taskManager.getInbox().getTasks());
  else if (currentProject.id === 'sidebar__today-btn')
    DOM.appendTasksList(taskManager.getTodayTasksFunc());
  else if (currentProject.id === 'sidebar__week-btn')
    DOM.appendTasksList(taskManager.getThisWeekTasksFunc());
  else if (currentProject.id === 'sidebar__completed-btn')
    DOM.appendTasksList(taskManager.getCompletedTasksFunc());
  else if (currentProject.classList.contains('sidebar__project-btn'))
    DOM.appendTasksList(taskManager.getProjectTasksFunc(currentProject.id));
};

export const initializeListeners = () => {
  document.addEventListener('DOMContentLoaded', () => {
    DOM.appendProjectsList(taskManager.getUserProjects());
    reloadCurrentFocusedProject();
    DOM.setTodoTitle(
      document.querySelector('.sidebar__project-item > .is-focused').textContent
    );
  });
  selectors.filterButtons.forEach((filterBtn) =>
    filterBtn.addEventListener('click', () => {
      DOM.clearCurrentFocus();
      DOM.setCurrentFocus(filterBtn);
      DOM.setTodoTitle(filterBtn.textContent);
      if (filterBtn.id === 'sidebar__today-btn') {
        const todayTasks = taskManager.getTodayTasksFunc();
        DOM.appendTasksList(todayTasks);
      } else if (filterBtn.id === 'sidebar__week-btn') {
        const weekTasks = taskManager.getThisWeekTasksFunc();
        DOM.appendTasksList(weekTasks);
      } else if (filterBtn.id === 'sidebar__completed-btn') {
        const completedTasks = taskManager.getCompletedTasksFunc();
        DOM.appendTasksList(completedTasks);
      }
    })
  );
  selectors.showAddTaskModalButton.addEventListener('click', () => {
    DOM.appendProjectOptionsForSelect(taskManager.getProjects());
    DOM.toggleAddTaskModal();
  });
  selectors.closeButtons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.close;
      DOM.closeModalById(modalId);
    })
  );
  selectors.showAddProjectModalButton.addEventListener('click', () => {
    DOM.toggleAddProjectModal();
  });
  selectors.addTaskButton.addEventListener('click', () => {
    const modalSelector = selectors.addTaskButton.dataset.modalSelector;
    if (DOM.checkModalValidation(modalSelector)) {
      const name = selectors.addTaskModalNameInput.value;
      const desc = selectors.addTaskModalDescTextarea.value;
      const priority = selectors.addTaskModalPrioritySelect.value;
      const projectId = selectors.addTaskModalProjectSelect.value;
      const dueDate = selectors.addTaskModalDateInput.value;
      taskManager.addNewTaskToProject(
        name,
        projectId,
        new Date(dueDate),
        desc,
        priority
      );
      DOM.resetModal(modalSelector);
      DOM.toggleAddTaskModal();
      reloadCurrentFocusedProject();
    }
  });
  selectors.addProjectButton.addEventListener('click', () => {
    const modalSelector = selectors.addProjectButton.dataset.modalSelector;
    if (DOM.checkModalValidation(modalSelector)) {
      taskManager.addNewProject(selectors.addProjectModalNameInput.value);
      DOM.resetModal(modalSelector);
      DOM.appendProjectsList(taskManager.getUserProjects());
      DOM.toggleAddProjectModal();
    }
  });
  selectors.sidebarToggle.addEventListener('click', () => {
    DOM.toggleSidebar();
  });
  selectors.projectsToggle.addEventListener('click', () => {
    DOM.toggleProjectsList();
  });
  selectors.tasksList.addEventListener('click', (e) => {
    if (e.target.classList.contains('task__remove-icon')) {
      if (confirm('Are you sure you want to remove this task?')) {
        taskManager.removeTaskFunc(e.target.parentElement.dataset.taskId);
        reloadCurrentFocusedProject();
      }
    } else if (e.target.classList.contains('task__edit-icon')) {
      const taskId = e.target.parentElement.dataset.taskId;
      currentEditTaskId = taskId;
      DOM.toggleUpdateTaskModal();
      DOM.appendProjectOptionsForSelect(taskManager.getProjects());
      DOM.updateTaskFormValues(taskManager.getTaskFunc(taskId));
    }
  });
  selectors.updateTaskButton.addEventListener('click', () => {
    const newName = selectors.updateTaskModalNameInput.value;
    const newDesc = selectors.updateTaskModalDescTextarea.value;
    const newPriority = selectors.updateTaskModalPrioritySelect.value;
    const newProjectId = selectors.updateTaskModalProjectSelect.value;
    const newDueDate = selectors.updateTaskModalDateInput.value;
    taskManager.updateTaskFunc(
      newName,
      newDesc,
      newPriority,
      new Date(newDueDate),
      newProjectId,
      currentEditTaskId
    );
    DOM.toggleUpdateTaskModal();
    reloadCurrentFocusedProject();
  });
  selectors.sidebar.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('sidebar__project-btn') &&
      e.target.id !== 'sidebar__inbox-btn'
    ) {
      DOM.clearCurrentFocus();
      DOM.setCurrentFocus(e.target);
      DOM.setTodoTitle(e.target.textContent);
      DOM.appendTasksList(taskManager.getProjectTasksFunc(e.target.id));
    } else if (e.target.id === 'sidebar__inbox-btn') {
      DOM.clearCurrentFocus();
      DOM.setCurrentFocus(e.target);
      DOM.setTodoTitle(e.target.textContent);
      DOM.appendTasksList(taskManager.getInbox().getTasks());
    }
  });
  selectors.tasksList.addEventListener('change', (e) => {
    if (e.target.classList.contains('task__checkbox'))
      taskManager.toggleTaskStatusFunc(e.target.id);
  });
};
