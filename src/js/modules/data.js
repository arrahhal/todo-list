import { v4 as uuidv4 } from 'uuid';
import { isValid } from 'date-fns';

const Storage = (() => {
  const getProjects = () =>
    localStorage.getItem('projects')
      ? JSON.parse(localStorage.getItem('projects')).map(Project.fromJSON)
      : [];

  const updateProjects = (projects) =>
    localStorage.setItem(
      'projects',
      JSON.stringify(projects.map((project) => project.toJSON()))
    );

  return {
    getProjects,
    updateProjects,
  };
})();

const Task = (title, desc, priority, dueDate, projectId) => {
  const task = {
    title: typeof title === 'string' ? title.trim() : '',
    desc: typeof desc === 'string' ? desc.trim() : '',
    priority: typeof priority === 'string' ? priority.trim() : '',
    dueDate: isValid(dueDate) ? dueDate : new Date(),
    projectId: typeof projectId === 'string' ? projectId.trim() : '',
    id: uuidv4(),
    isCompleted: false,
  };

  const update = (title, desc, priority, dueDate, projectId) => {
    task.title = typeof title === 'string' ? title.trim() : task.title;
    task.desc = typeof desc === 'string' ? desc.trim() : task.desc;
    task.priority =
      typeof priority === 'string' ? priority.trim() : task.priority;
    task.dueDate = isValid(dueDate) ? dueDate : task.dueDate;
    task.projectId = typeof projectId === 'string' ? projectId : task.projectId;
  };

  const toggleStatus = () => {
    task.isCompleted = !task.isCompleted;
  };

  const toJSON = () => ({
    title: task.title,
    desc: task.desc,
    priority: task.priority,
    dueDate: task.dueDate.toISOString(),
    projectId: task.projectId,
    id: task.id,
    isCompleted: task.isCompleted,
  });

  return {
    ...task,
    update,
    toggleStatus,
    toJSON,
  };
};

Task.fromJSON = (json) => {
  const task = Task(
    json.title,
    json.desc,
    json.priority,
    Date.parse(json.dueDate),
    json.projectId
  );
  task.id = json.id;
  task.isCompleted = json.isCompleted;
  return task;
};

const Project = (title) => {
  const project = {
    title,
    id: uuidv4(),
    tasks: [],
  };

  const update = (title) => {
    project.title = title;
  };

  const addTask = (task) => {
    project.tasks.push(task);
    console.log('Project tasks:', project.tasks);
  };

  const removeTask = (taskId) => {
    project.tasks = project.tasks.filter((task) => task.id !== taskId);
  };

  const getTasks = () => project.tasks;

  const toJSON = () => ({
    title: project.title,
    id: project.id,
    tasks: project.tasks.map((task) => task.toJSON()),
  });

  return {
    ...project,
    update,
    addTask,
    removeTask,
    getTasks,
    toJSON,
  };
};

Project.fromJSON = (json) => {
  const project = Project(json.title);
  project.id = json.id;
  project.tasks = json.tasks.map(Task.fromJSON);
  return project;
};

export { Storage, Task, Project };
