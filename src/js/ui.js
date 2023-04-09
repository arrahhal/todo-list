import { format, parseISO } from 'date-fns';
import createTask from './tasks';
import todoController from './todo';

export const uiController = (() => {
  const projectItemsList = document.getElementById('project-items-list');
  const allProjects = document.querySelectorAll('.project');
  const allLists = document.querySelectorAll('.task-list');
  const currentProjectTitle = document.querySelector('#current-project-title');
  const today = document.getElementById('today-list');
  const week = document.getElementById('week-list');
  const completed = document.getElementById('completed-list');
  let currentProjectId = '1';
  const addTaskBtn = document.getElementById('add-task-button');

  const clearCurrentFocus = () => {
    allProjects.forEach((project) => project.classList.remove('current-focus'));
    allLists.forEach((list) => list.classList.remove('current-focus'));
  };
  const setCurrentProjectFocus = (projectsItem) => {
    clearCurrentFocus();
    projectsItem.classList.add('current-focus');
  };

  const createSvg = (shape) => {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.classList.add('task-option', `task-${shape.toLowerCase()}`);
    icon.setAttribute('viewBox', '0 0 24 24');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    if (shape.toLowerCase() === 'edit') {
      path.setAttribute(
        'd',
        'M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z'
      );
    } else if (shape.toLowerCase() === 'remove') {
      path.setAttribute(
        'd',
        'M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V6H17H19C19.5523 6 20 6.44772 20 7C20 7.55228 19.5523 8 19 8H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V8H5C4.44772 8 4 7.55228 4 7C4 6.44772 4.44772 6 5 6H7H9V5ZM10 8H8V18C8 18.5523 8.44772 19 9 19H15C15.5523 19 16 18.5523 16 18V8H14H10ZM13 6H11V5H13V6ZM10 9C10.5523 9 11 9.44772 11 10V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V10C9 9.44772 9.44772 9 10 9ZM14 9C14.5523 9 15 9.44772 15 10V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V10C13 9.44772 13.4477 9 14 9Z'
      );
    } else {
      throw new Error(`Invalid shape: ${shape}`);
    }
    icon.appendChild(path);
    return icon;
  };

  const createCheckbox = (id, label) => {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('task-checkbox-container');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    checkbox.classList.add('task-checkbox');
    const checkboxLabel = document.createElement('label');
    checkboxLabel.classList.add('task-text');
    checkboxLabel.setAttribute('for', id);
    checkboxLabel.textContent = label;
    checkboxContainer.append(checkbox, checkboxLabel);
    return checkboxContainer;
  };

  /**
   * Creates a task list item element.
   * @param {string} title - The title of the task.
   * @param {Date} dueDate - The due date of the task.
   * @param {number} id - The ID of the task.
   * @returns {HTMLElement} The task list item element.
   */
  const createTaskListItem = (title, dueDate, id) => {
    const taskListItem = document.createElement('li');
    taskListItem.classList.add('task');
    const checkboxContainer = createCheckbox(id, title);

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('flex');
    const optionsContainer = document.createElement('div');
    const editIcon = createSvg('edit');
    const removeIcon = createSvg('remove');
    editIcon.dataset.taskId = id;
    removeIcon.dataset.taskId = id;
    optionsContainer.append(editIcon, removeIcon);

    const dateParagraph = document.createElement('div');
    const taskDate = document.createElement('p');
    taskDate.classList.add('task-date');
    const formattedDate = format(dueDate, 'yyyy/MM/dd');
    taskDate.textContent = formattedDate;
    dateParagraph.appendChild(taskDate);
    rightContainer.append(dateParagraph, optionsContainer);

    taskListItem.append(checkboxContainer, rightContainer);

    return taskListItem;
  };
  const displayCurrentProject = (projectId) => {
    const projectTasks = todoController.getProjectTasks(projectId);
    appendTasksList(projectTasks);
  };

  const appendTasksList = (tasksList) => {
    projectItemsList.textContent = '';
    tasksList.forEach((task) =>
      projectItemsList.append(
        createTaskListItem(task.title, task.dueDate, task.id)
      )
    );
  };

  const displayTodayTasks = () => {
    const todayTasks = todoController.getTodayTasks();
    appendTasksList(todayTasks);
  };
  today.addEventListener('click', displayTodayTasks);

  const displayWeekTasks = () => {
    const weekTasks = todoController.getThisWeekTasks();
    appendTasksList(weekTasks);
  };
  week.addEventListener('click', displayWeekTasks);

  const displayCompletedTasks = () => {
    const completedTasks = todoController.getCompletedTasks();
    appendTasksList(completedTasks);
  };
  completed.addEventListener('click', displayCompletedTasks);

  const setCurrentProjectTitle = (project) => {
    currentProjectTitle.textContent = project.textContent.trim();
  };

  const setCurrentProject = (project) => {
    setCurrentProjectFocus(project);
    setCurrentProjectTitle(project);
    displayCurrentProject(project.dataset.id);
  };
  const setCurrentList = (list) => {
    setCurrentProjectFocus(list);
    setCurrentProjectTitle(list);
  };

  const removeTask = (taskId) => {
    todoController.removeTaskFromProject(taskId);
    appendTasksList(todoController.getProjectTasks(currentProjectId));
  };

  const reloadCurrentProject = () => {
    displayCurrentProject(currentProjectId);
  };

  projectItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-remove'))
      removeTask(e.target.dataset.taskId);
  });

  allLists.forEach((list) =>
    list.addEventListener('click', () => setCurrentList(list))
  );
  allProjects.forEach((project) =>
    project.addEventListener('click', () => setCurrentProject(project))
  );

  return {
    reloadCurrentProject,
  };
})();

const taskPanel = (() => {
  const addTaskScreen = document.getElementById('add-task-screen');
  const addTaskPanel = document.getElementById('add-task-panel');
  const closeButton = document.getElementById('close-task-button');
  const addTaskContentButton = document.getElementById(
    'content-add-task-button'
  );
  const addTaskBtn = document.getElementById('add-task-button');
  const updateTaskBtn = document.getElementById('update-task-button');
  const taskTitle = document.getElementById('task-title-input');
  const taskDate = document.getElementById('task-date-input');
  const taskProject = document.getElementById('task-projects-select');
  const taskPriority = document.getElementById('task-priority-select');
  const taskDescription = document.getElementById('task-desc-textarea');
  const projectItemsList = document.getElementById('project-items-list');

  let currentUpdateTaskId = '';

  const checkValidation = () => {
    const inputs = document.querySelectorAll(
      '.add-task-panel input, .add-task-panel select'
    );
    let isValid = true;
    inputs.forEach((input) => {
      if (input.value === '') {
        input.parentElement.classList.add('invalid');
        isValid = false;
      } else input.parentElement.classList.remove('invalid');
    });
    return isValid;
  };

  const addTaskToProject = () => {
    const task = createTask(
      taskTitle.value,
      taskDescription.value,
      taskPriority.value,
      taskDate.value
    );
    todoController.addTaskToProject(task, taskProject.value);
    uiController.reloadCurrentProject();
  };
  const updateTask = (taskId) => {
    todoController.updateTask(
      taskTitle.value,
      taskDescription.value,
      taskPriority.value,
      parseISO(taskDate.value),
      taskProject.value,
      taskId
    );
    uiController.reloadCurrentProject();
  };

  const addProjectsOptions = () => {
    const projects = todoController.getProjects();

    projects.forEach((project) => {
      const opt = document.createElement('option');
      opt.value = project.id;
      opt.textContent = project.title;
      taskProject.appendChild(opt);
    });
  };
  addProjectsOptions();

  const resetPanel = () => {
    taskTitle.value = '';
    taskDescription.value = '';
  };

  const displayPanel = () => {
    addTaskScreen.classList.remove('display-none');
  };
  const hidePanel = () => {
    addTaskScreen.classList.add('display-none');
  };

  const displayAddPanel = () => {
    resetPanel();
    updateTaskBtn.classList.add('display-none');
    addTaskBtn.classList.remove('display-none');
    displayPanel();
  };
  const fillWithTaskInfo = (task) => {
    taskTitle.value = task.title;

    // turn task date to string then slice everything other then date(like time) out
    taskDate.value = task.dueDate.toISOString().substring(0, 10);
    taskProject.value = task.projectId;
    taskPriority.value = task.priority;
    taskDescription.value = task.desc;
  };
  const displayUpdatePanel = (taskId) => {
    updateTaskBtn.classList.remove('display-none');
    addTaskBtn.classList.add('display-none');
    displayPanel();
    fillWithTaskInfo(todoController.getTask(taskId));
  };

  updateTaskBtn.addEventListener('click', (e) => {
    updateTask(currentUpdateTaskId);
    hidePanel();
    e.preventDefault();
  });
  addTaskBtn.addEventListener('click', (e) => {
    if (checkValidation()) {
      addTaskToProject();
      resetPanel();
      hidePanel();
    }
    e.preventDefault();
  });

  addTaskContentButton.addEventListener('click', displayAddPanel);

  closeButton.addEventListener('click', (e) => {
    hidePanel();
    e.preventDefault();
  });
  projectItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-edit')) {
      currentUpdateTaskId = e.target.dataset.taskId;
      displayUpdatePanel(e.target.dataset.taskId);
    }
  });
})();
