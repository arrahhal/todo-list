export default function createTask(
  tTitle = '',
  tDesc = '',
  tPriority = '',
  tDueDate = Date.now(),
  tProjectId = ''
) {
  let title = tTitle;
  let desc = tDesc;
  let priority = tPriority;
  let dueDate = tDueDate;
  let isCompleted = false;
  const projectId = tProjectId;
  const id = Math.floor(Math.random() * Date.now()).toString();

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
    isCompleted = newCompleted;
  };
  return {
    title,
    desc,
    priority,
    dueDate,
    isCompleted,
    id,
    projectId,
    updateTask,
  };
}
