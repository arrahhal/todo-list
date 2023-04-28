import { isThisWeek, isToday } from 'date-fns';
import { Task, Project, Storage } from './data';

let projects = Storage.getProjects();

const addDefaultProjectIfNone = () => {
  if (!projects.length) {
    const inbox = new Project('Inbox');
    const todayTask = new Task(
      'default task',
      'default description',
      'low',
      new Date(2023, 3, 28),
      inbox.id
    );
    projects.push(inbox);
    inbox.addTask(todayTask);
    _commit();
  }
};

const findProjectById = (projectId) =>
  projects.find((project) => project.id === projectId);

const removeProject = (projectId) => {
  const projectIndex = projects.findIndex(
    (project) => project.id === projectId
  );
  if (projectIndex > -1) {
    projects.splice(projectIndex, 1);
    _commit();
  }
};

const updateProject = (newTitle, projectId) => {
  const project = findProjectById(projectId);
  if (project) {
    project.title = newTitle;
    _commit();
  }
};

const createTask = (title, desc, priority, dueDate, projectId) => {
  const task = new Task(title, desc, priority, dueDate, projectId);
  const project = findProjectById(projectId);
  if (project) {
    project.addTask(task);
    _commit();
  }
};

const getAllTasks = () => projects.flatMap((project) => project.getTasks());

const findTaskIndex = (taskId) =>
  getAllTasks().findIndex((task) => task.id === taskId);

const removeTask = (taskId) => {
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex > -1) {
    const task = getAllTasks()[taskIndex];
    const project = findProjectById(task.projectId);
    if (project) {
      project.removeTask(taskId);
      _commit();
    }
  }
};

const toggleTaskStatus = (taskId) => {
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex > -1) {
    const task = getAllTasks()[taskIndex];
    task.toggleStatus();
    _commit();
  }
};

const getTask = (taskId) => {
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex > -1) {
    return getAllTasks()[taskIndex];
  }
  return null;
};

const updateTask = (
  newTitle,
  newDesc,
  newPriority,
  newDate,
  newProjectId,
  taskId
) => {
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex > -1) {
    const task = getAllTasks()[taskIndex];
    task.update(newTitle, newDesc, newPriority, newDate, newProjectId);
    _commit();
  }
};

const getTodayTasks = () =>
  getAllTasks().filter((task) => isToday(task.dueDate));

const getThisWeekTasks = () =>
  getAllTasks().filter((task) => isThisWeek(task.dueDate));

const getCompletedTasks = () =>
  getAllTasks().filter((task) => task.isCompleted);

const getProjectTasks = (projectId) => {
  const project = findProjectById(projectId);
  if (project) {
    return project.getTasks();
  }
  return [];
};

const getProjects = () => projects;

const createTaskFunc = (title, desc, priority, dueDate, projectId) => {
  createTask(title, desc, priority, dueDate, projectId);
};

const updateTaskFunc = (
  newTitle,
  newDesc,
  newPriority,
  newDate,
  newProjectId,
  taskId
) => {
  updateTask(newTitle, newDesc, newPriority, newDate, newProjectId, taskId);
};

const removeTaskFunc = (taskId) => {
  removeTask(taskId);
};

const toggleTaskStatusFunc = (taskId) => {
  toggleTaskStatus(taskId);
};

const getTaskFunc = (taskId) => {
  return getTask(taskId);
};

const getAllTasksFunc = () => {
  return getAllTasks();
};

const getTodayTasksFunc = () => {
  return getTodayTasks();
};

const getThisWeekTasksFunc = () => {
  return getThisWeekTasks();
};

const getCompletedTasksFunc = () => {
  return getCompletedTasks();
};

const getProjectTasksFunc = (projectId) => {
  return getProjectTasks(projectId);
};

const addProject = (title) => {
  const project = new Project(title);
  projects.push(project);
  _commit();
};

const createNewTask = (title, desc, priority, dueDate, projectId) =>
  new Task(title, desc, priority, dueDate, projectId);

const addNewTaskToProject = (title, projectId, dueDate, desc, priority) => {
  const newTask = createNewTask(title, desc, priority, dueDate, projectId);
  findProjectById(projectId).addTask(newTask);
  _commit();
};

const _commit = () => {
  Storage.updateProjects(projects);
};

addDefaultProjectIfNone();

export const taskManager = {
  createTaskFunc,
  updateTaskFunc,
  removeTaskFunc,
  toggleTaskStatusFunc,
  getTaskFunc,
  getAllTasksFunc,
  getTodayTasksFunc,
  getThisWeekTasksFunc,
  getCompletedTasksFunc,
  getProjectTasksFunc,
  addProject,
  addNewTaskToProject,
  removeProject,
  updateProject,
  getProjects,
};
