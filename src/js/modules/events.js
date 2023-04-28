import { DOM } from './dom';
import selectors from './selectors';
import { taskManager } from './app';

export const initializeListeners = () => {
  selectors.filterButtons.forEach((filterBtn) =>
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
      taskManager.addNewTaskToProject(name, projectId, dueDate, desc, priority);
      DOM.resetModal(modalSelector);
      DOM.toggleAddTaskModal();
    }
  });
};
