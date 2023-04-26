import { v4 as uuidv4 } from 'uuid';
import { isValid } from 'date-fns';

class Storage {
  static getProjects() {
    console.log(
      JSON.parse(localStorage.getItem('projects')).map(Project.fromJSON)
    );
    return localStorage.getItem('projects')
      ? JSON.parse(localStorage.getItem('projects')).map(Project.fromJSON)
      : [];
  }

  static updateProjects(projects) {
    localStorage.setItem(
      'projects',
      JSON.stringify(projects.map((project) => project.toJSON()))
    );
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
  toJSON() {
    return {
      title: this.title,
      desc: this.desc,
      priority: this.priority,
      dueDate: this.dueDate.toISOString(),
      projectId: this.projectId,
      id: this.id,
      isCompleted: this.isCompleted,
    };
  }

  static fromJSON(json) {
    const task = new Task(
      json.title,
      json.desc,
      json.priority,
      Date.parse(json.dueDate),
      json.projectId
    );
    task.id = json.id;
    task.isCompleted = json.isCompleted;
    return task;
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
  toJSON() {
    return {
      title: this.title,
      id: this.id,
      tasks: this.tasks.map((task) => task.toJSON()),
    };
  }

  static fromJSON(json) {
    const project = new Project(json.title);
    project.id = json.id;
    project.tasks = json.tasks.map(Task.fromJSON);
    return project;
  }
}

export { Storage, Task, Project };
