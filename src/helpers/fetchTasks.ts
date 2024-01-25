import { Task } from "../types/Task";

const BASE_URL = 'http://localhost:3000';

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);

    if (!response.ok) {
      throw new Error('Error: Unable to get tasks');
    }

    const data: Task[] = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching tasks');
    throw error;
  }
};

export const addTask = async (task: Task): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Error: Unable to add task.');
    }

    return response;
  } catch (error) {
    console.error('Error adding task');
    throw error;
  }
};

export const removeTask = async (id: string): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error: Unable to remove task');
    }

    return response;
  } catch (error) {
    console.error('Error removing task');
    throw error;
  }
};

export const updateTask = async (task: Task, id: string): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error('Error: Unable to update task');
    }

    return response;
  } catch (error) {
    console.error('Error updating task');
    throw error;
  }
};