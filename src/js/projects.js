export const createProject = (pTitle) => {
  let title = pTitle;
  let tasks = [];
  const id = Math.floor(Math.random() * Date.now()).toString();

  function updateProject(newTitle) {
    title = newTitle;
  }
  function addTask(newTask) {
    tasks.push(newTask);
  }
  function removeTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
  }
  const listTasks = () => tasks;
  return {
    title,
    id,
    updateProject,
    addTask,
    removeTask,
    listTasks,
  };
};

export const Inbox = (() => {
  const title = 'Inbox';
  const id = '1';
  let tasks = [];

  const addTask = (newTask) => {
    tasks.push(newTask);
  };

  const removeTask = (taskId) => {
    tasks = tasks.filter((task) => task.id !== taskId);
  };

  return {
    title,
    id,
    tasks,
    addTask,
    removeTask,
  };
})();
