import { isThisWeek, isToday } from 'date-fns';
import { Task, Project, Storage } from './data';

function addDefaultProjectIfNone() {
  if (!Storage.getProjects()?.length) {
    const inbox = new Project('Inbox');
    Storage.updateProjects([inbox]);
  }
}

class TaskManager {
  constructor() {
    addDefaultProjectIfNone();

    this.projects = Storage.getProjects();
    this.commit = () => Storage.updateProjects(this.projects);
  }

  findProjectById(projectId) {
    return this.projects.find((project) => project.id === projectId);
  }

  removeProject(projectId) {
    const projectIndex = this.projects.findIndex(
      (project) => project.id === projectId
    );
    if (projectIndex > -1) {
      this.projects.splice(projectIndex, 1);
      this.commit();
    }
  }

  updateProject(newTitle, projectId) {
    const project = this.findProjectById(projectId);
    if (project) {
      project.title = newTitle;
      this.commit();
    }
  }

  createTask(title, desc, priority, dueDate, projectId) {
    const task = new Task(title, desc, priority, dueDate, projectId);
    const project = this.findProjectById(projectId);
    if (project) {
      project.addTask(task);
      this.commit();
    }
  }

  getAllTasks() {
    return this.projects.flatMap((project) => project.getTasks());
  }

  findTaskIndex(taskId) {
    return this.getAllTasks().findIndex((task) => task.id === taskId);
  }

  removeTask(taskId) {
    const taskIndex = this.findTaskIndex(taskId);
    if (taskIndex > -1) {
      const task = this.getAllTasks()[taskIndex];
      const project = this.findProjectById(task.projectId);
      if (project) {
        project.removeTask(taskId);
        this.commit();
      }
    }
  }

  toggleTaskStatus(taskId) {
    const taskIndex = this.findTaskIndex(taskId);
    if (taskIndex > -1) {
      const task = this.getAllTasks()[taskIndex];
      task.toggleStatus();
      this.commit();
    }
  }

  getTask(taskId) {
    const taskIndex = this.findTaskIndex(taskId);
    if (taskIndex > -1) {
      return this.getAllTasks()[taskIndex];
    }
    return null;
  }

  updateTask(newTitle, newDesc, newPriority, newDate, newProjectId, taskId) {
    const taskIndex = this.findTaskIndex(taskId);
    if (taskIndex > -1) {
      const task = this.getAllTasks()[taskIndex];
      task.updateTask(newTitle, newDesc, newPriority, newDate, newProjectId);
      this.commit();
    }
  }

  getTodayTasks() {
    return this.getAllTasks().filter((task) => isToday(task.dueDate));
  }

  getThisWeekTasks() {
    return this.getAllTasks().filter((task) => isThisWeek(task.dueDate));
  }

  getCompletedTasks() {
    return this.getAllTasks().filter((task) => task.isCompleted);
  }

  getProjectTasks(projectId) {
    const project = this.findProjectById(projectId);
    if (project) {
      return project.getTasks();
    }
    return [];
  }

  getProjects() {
    return this.projects;
  }
}

export default TaskManager;
