import { DOM } from './dom';
import { taskManager } from './app';

export const initializeListeners = () => {
  DOM.selectors.filterButtons.forEach((filterBtn) =>
    filterBtn.addEventListener('click', () => {
      DOM.clearCurrentFocus();
      DOM.setCurrentFocus(filterBtn);
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
  DOM.selectors.showAddTaskModalButton.addEventListener('click', () => {
    DOM.appendProjectOptionsForSelect(taskManager.getProjects());
    DOM.toggleAddTaskModal();
  });
  DOM.selectors.closeButtons.forEach((btn) =>
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.close;
      DOM.closeModalById(modalId);
    })
  );
  DOM.selectors.showAddProjectModalButton.addEventListener('click', () => {
    DOM.toggleAddProjectModal();
  });
  DOM.selectors.addTaskButton.addEventListener('click', () => {
    const modalSelector = DOM.selectors.addTaskButton.dataset.modalSelector;
    if (DOM.checkModalValidation(modalSelector)) {
      const name = DOM.selectors.addTaskModalNameInput.value;
      const desc = DOM.selectors.addTaskModalDescTextarea.value;
      const priority = DOM.selectors.addTaskModalPrioritySelect.value;
      const projectId = DOM.selectors.addTaskModalProjectSelect.value;
      const dueDate = DOM.selectors.addTaskModalDateInput.value;
      taskManager.addNewTaskToProject(name, projectId, dueDate, desc, priority);
      DOM.resetModal(modalSelector);
      DOM.toggleAddTaskModal();
    }
  });
};
