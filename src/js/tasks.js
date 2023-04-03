import { isValid, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export default function createTask(
  tTitle = '',
  tDesc = '',
  tPriority = '',
  tDueDate = new Date().toISOString(),
  tProjectId = '1'
) {
  // Validate and format input parameters
  const title = typeof tTitle === 'string' ? tTitle.trim() : '';
  const desc = typeof tDesc === 'string' ? tDesc.trim() : '';
  const priority = typeof tPriority === 'string' ? tPriority.trim() : '';
  const dueDate = isValid(tDueDate) ? tDueDate : new Date().now();
  const projectId = typeof tProjectId === 'string' ? tProjectId.trim() : '';

  // Generate unique task ID
  const id = uuidv4();

  // Define updateTask method
  const updateTask = (
    newTitle,
    newDesc,
    newPriority,
    newDueDate,
    newCompleted
  ) => {
    // Validate and format input parameters
    const updatedTitle = typeof newTitle === 'string' ? newTitle.trim() : title;
    const updatedDesc = typeof newDesc === 'string' ? newDesc.trim() : desc;
    const updatedPriority =
      typeof newPriority === 'string' ? newPriority.trim() : priority;
    const updatedDueDate = isValid(parseISO(newDueDate)) ? newDueDate : dueDate;
    const updatedCompleted =
      typeof newCompleted === 'boolean' ? newCompleted : isCompleted;

    // Update task properties
    title = updatedTitle;
    desc = updatedDesc;
    priority = updatedPriority;
    dueDate = updatedDueDate;
    isCompleted = updatedCompleted;
  };

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
  };

  return task;
}
