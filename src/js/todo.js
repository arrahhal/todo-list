import { isThisWeek, isToday } from 'date-fns';
import { Inbox, createProject } from './projects';

export default function todoController() {
  const todoProjects = [];

  const setDefaultProjects = () => {
    todoProjects.push(Inbox);
  };

  setDefaultProjects();

  const addProject = (title) => todoProjects.push(createProject(title));

  const getProjectIndex = (projectId) =>
    todoProjects.findIndex((project) => project.id === projectId);

  const removeProject = (projectId) => {
    const projectIndex = getProjectIndex(projectId);
    if (projectIndex > -1) todoProjects.splice(projectIndex, 1);
  };

  const updateProject = (newTitle, projectId) => {
    const projectIndex = getProjectIndex(projectId);
    if (projectIndex > -1) todoProjects[projectIndex].title = newTitle;
  };

  const addTaskToProject = (task, projectId) => {
    const projectIndex = getProjectIndex(projectId);
    todoProjects[projectIndex].addTask(task);
  };

  const getAllTasks = () => {
    const tasks = [];
    for (let i = 0; i < todoProjects.length; i += 1) {
      const projectTasks = todoProjects[i].getTasks;
      for (let j = 0; j < projectTasks.length; i += 1) {
        tasks.push(projectTasks[j]);
      }
    }
    return tasks;
  };

  const removeTaskFromProject = (targetTaskId) => {
    const allTasks = getAllTasks();
    const targetTaskIndex = allTasks.findIndex(
      (task) => task.id === targetTaskId
    );
    const targetTaskProjectId = allTasks[targetTaskIndex].projectId;
    const targetTaskProject =
      todoProjects[getProjectIndex(targetTaskProjectId)];
    targetTaskProject.removeTask(targetTaskId);
  };

  const getTodayTasks = () =>
    getAllTasks().filter((task) => isToday(task.dueDate));
  const getThisWeekTasks = () =>
    getAllTasks().filter((task) => isThisWeek(task.dueDate));
  const getCompletedTasks = () =>
    getAllTasks().filter((task) => task.isCompleted);
  const getProjectTasks = (projectId) =>
    todoProjects.find((project) => project.projectId === projectId);

  return {
    todoProjects,
    getProjectIndex,
    addProject,
    removeProject,
    updateProject,
    addTaskToProject,
    getAllTasks,
    removeTaskFromProject,
    getTodayTasks,
    getThisWeekTasks,
    getCompletedTasks,
    getProjectTasks,
  };
}
