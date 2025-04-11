"use client"

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://67f97747094de2fe6ea1a4e7.mockapi.io/tasks');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('https://67f97747094de2fe6ea1a4e7.mockapi.io/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTask, createdAt: Date.now() }),
      });
      if (!response.ok) throw new Error('Failed to add task');
      await fetchTasks();
    } catch (error) {
      setError(error as Error);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const response = await fetch(`https://67f97747094de2fe6ea1a4e7.mockapi.io/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update task');
      await fetchTasks();
    } catch (error) {
      setError(error as Error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`https://67f97747094de2fe6ea1a4e7.mockapi.io/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      await fetchTasks();
    } catch (error) {
      setError(error as Error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks,
  };
}