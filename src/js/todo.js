import { isThisWeek, isToday } from 'date-fns';
import { Inbox, createProject } from './projects';
import createTask from './tasks';

const todoController = (() => {
  const projects = [];

  // Set up the default projects
  const setDefaultProjects = () => {
    projects.push(Inbox);
  };
  setDefaultProjects();

  // Add a new project with the given title
  const addProject = (title) => projects.push(createProject(title));

  // Find the index of a project with the given ID
  const findProjectIndex = (projectId) =>
    projects.findIndex((project) => project.id === projectId);

  // Find the index of a project with the given ID
  const findTaskIndex = (taskId) =>
    getAllTasks().findIndex((task) => task.id === taskId);

  // Remove a project with the given ID
  const removeProject = (projectId) => {
    const projectIndex = findProjectIndex(projectId);
    if (projectIndex > -1) projects.splice(projectIndex, 1);
  };

  // Update the title of a project with the given ID
  const updateProject = (newTitle, projectId) => {
    const projectIndex = findProjectIndex(projectId);
    if (projectIndex > -1) projects[projectIndex].title = newTitle;
  };

  // Add a task to a project with the given ID
  const addTaskToProject = (task, projectId) => {
    const projectIndex = findProjectIndex(projectId);
    projects[projectIndex].addTask(task);
  };

  // Get all tasks from all projects
  const getAllTasks = () => projects.flatMap((project) => project.getTasks());

  // Remove a task with the given ID from its project
  const removeTaskFromProject = (targetTaskId) => {
    const allTasks = getAllTasks();
    const targetTaskIndex = allTasks.findIndex(
      (task) => task.id === targetTaskId
    );
    const targetTaskProjectId = allTasks[targetTaskIndex].projectId;
    const targetTaskProject = projects[findProjectIndex(targetTaskProjectId)];
    targetTaskProject.removeTask(targetTaskId);
  };

  const loadDefaultInbox = () => {
    Inbox.addTask(
      createTask('task title', 'task desc', 'low', new Date(2023, 3, 6))
    );
    Inbox.addTask(
      createTask('task title', 'task desc', 'low', new Date(2023, 3, 6))
    );
  };
  loadDefaultInbox();

  const toggleTaskStatus = (taskId) => {
    getAllTasks()[findTaskIndex(taskId)].toggleStatus();
  };

  // return task object that correspond to given ID
  const getTask = (taskId) => getAllTasks()[findTaskIndex(taskId)];

  const updateTask = (
    newTitle,
    newDesc,
    newPriority,
    newDate,
    newProjectId,
    taskId
  ) => {
    getAllTasks()[findTaskIndex(taskId)].updateTask(
      newTitle,
      newDesc,
      newPriority,
      newDate,
      newProjectId
    );
  };

  // Get all tasks due today
  const getTodayTasks = () =>
    getAllTasks().filter((task) => isToday(task.dueDate));

  // Get all tasks due this week
  const getThisWeekTasks = () =>
    getAllTasks().filter((task) => isThisWeek(task.dueDate));

  // Get all completed tasks
  const getCompletedTasks = () =>
    getAllTasks().filter((task) => task.isCompleted);

  // Get all tasks in the project with the given ID
  const getProjectTasks = (projectId) =>
    projects[findProjectIndex(projectId)].getTasks();

  // Get all projects
  const getProjects = () => projects;

  return {
    getProjects,
    addProject,
    removeProject,
    updateProject,
    addTaskToProject,
    removeTaskFromProject,
    getTodayTasks,
    getThisWeekTasks,
    getCompletedTasks,
    getProjectTasks,
    getTask,
    toggleTaskStatus,
    updateTask,
  };
})();

export default todoController;
