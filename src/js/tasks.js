import { isValid, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export default function createTask(
  tTitle = '',
  tDesc = '',
  tPriority = '',
  tDueDate = new Date(),
  tProjectId = '1'
) {
  // Validate and format input parameters
  let title = typeof tTitle === 'string' ? tTitle.trim() : '';
  let desc = typeof tDesc === 'string' ? tDesc.trim() : '';
  let priority = typeof tPriority === 'string' ? tPriority.trim() : '';
  let dueDate = isValid(tDueDate) ? tDueDate : new Date();
  let projectId = typeof tProjectId === 'string' ? tProjectId.trim() : '';

  // Generate unique task ID
  const id = uuidv4();

  // Define updateTask method
  const updateTask = (
    newTitle,
    newDesc,
    newPriority,
    newDueDate,
    newProjectId
  ) => {
    // Validate and format input parameters
    const updatedTitle = typeof newTitle === 'string' ? newTitle.trim() : title;
    const updatedDesc = typeof newDesc === 'string' ? newDesc.trim() : desc;
    const updatedPriority =
      typeof newPriority === 'string' ? newPriority.trim() : priority;
    const updatedDueDate = isValid(newDueDate) ? newDueDate : dueDate;
    const updateProjectId =
      typeof newProjectId === 'string' ? newProjectId : projectId;

    // Update task properties
    title = updatedTitle;
    desc = updatedDesc;
    priority = updatedPriority;
    dueDate = updatedDueDate;
    projectId = updateProjectId;
  };

  const toggleTaskStatus = () => (isCompleted ? !isCompleted : isCompleted);

  // Define task object
  let isCompleted = false;
  const task = {
    get title() {
      return title;
    },
    get desc() {
      return desc;
    },
    get priority() {
      return priority;
    },
    get dueDate() {
      return dueDate;
    },
    get isCompleted() {
      return isCompleted;
    },
    get id() {
      return id;
    },
    get projectId() {
      return projectId;
    },
    updateTask,
    toggleTaskStatus,
  };

  return task;
}
