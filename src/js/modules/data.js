import { v4 as uuidv4 } from 'uuid';
import { isValid } from 'date-fns';

class Storage {
  static getProjects() {
    return localStorage.getItem('projects')
      ? JSON.parse(localStorage.getItem('projects'))
      : [];
  }

  static updateProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

class Task {
  constructor(title, desc, priority, dueDate, projectId) {
    this.title = typeof title === 'string' ? title.trim() : '';
    this.desc = typeof desc === 'string' ? desc.trim() : '';
    this.priority = typeof priority === 'string' ? priority.trim() : '';
    this.dueDate = isValid(dueDate) ? dueDate : new Date();
    this.projectId = typeof projectId === 'string' ? projectId.trim() : '';
    this.id = uuidv4();
    this.isCompleted = false;
  }

  update(title, desc, priority, dueDate, projectId) {
    this.title = typeof title === 'string' ? title.trim() : this.title;
    this.desc = typeof desc === 'string' ? desc.trim() : this.desc;
    this.priority =
      typeof priority === 'string' ? priority.trim() : this.priority;
    this.dueDate = isValid(dueDate) ? dueDate : this.dueDate;
    this.projectId = typeof projectId === 'string' ? projectId : this.projectId;
  }

  toggleStatus() {
    this.isCompleted = !this.isCompleted;
  }
}

class Project {
  constructor(title) {
    this.title = title;
    this.id = uuidv4();
    this.tasks = [];
  }

  update(title) {
    this.title = title;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  getTasks() {
    return this.tasks;
  }
}

export { Storage, Task, Project };
