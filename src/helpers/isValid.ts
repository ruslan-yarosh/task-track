import { Task } from "../types/Task";

export const isValid = (data: Task) => {
  if (!data.title) {
    return false;
  }

  if (new Date(data.start) > new Date(data.end)) {
    return false;
  }

  return true;
}
