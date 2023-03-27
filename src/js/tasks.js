const createTask = (
  tTitle = '',
  tDesc = '',
  tPriority = '',
  tDueDate = '',
  tCompleted = false,
  tProjectId = 0
) => {
  let title = tTitle;
  let desc = tDesc;
  let priority = tPriority;
  let dueDate = tDueDate;
  let completed = tCompleted;
  const projectId = tProjectId;
  const id = Date.now().toString();
  console.log(id);

  const updateTask = (
    newTitle,
    newDesc,
    newPriority,
    newDueDate,
    newCompleted
  ) => {
    title = newTitle;
    desc = newDesc;
    priority = newPriority;
    dueDate = newDueDate;
    completed = newCompleted;
  };
  return {
    title,
    desc,
    priority,
    dueDate,
    completed,
    id,
    projectId,
    updateTask,
  };
};

export default createTask;
