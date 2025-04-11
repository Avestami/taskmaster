"use client"

import { Task } from '@/types/task';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onUpdate: (updates: Partial<Task>) => void;
}

export function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  return (
    <div className={cn(
      "border rounded-lg p-4 shadow-sm transition-all",
      task.status === 'completed' ? "bg-green-50 border-green-100" : "bg-white"
    )}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={cn(
            "font-semibold",
            task.status === 'completed' ? "text-green-700 line-through" : ""
          )}>{task.title}</h3>
          <p className={cn(
            "text-sm",
            task.status === 'completed' ? "text-green-600/70" : "text-gray-600"
          )}>{task.description}</p>
          <div className="mt-2 space-x-2">
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              task.priority === 'high' ? "bg-red-100 text-red-700" :
              task.priority === 'medium' ? "bg-yellow-100 text-yellow-700" :
              "bg-blue-100 text-blue-700"
            )}>
              {task.priority}
            </span>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              task.status === 'completed' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
            )}>
              {task.status}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onUpdate({ status: task.status === 'completed' ? 'pending' : 'completed' })}
            className={cn(
              "text-sm px-2 py-1 rounded-md",
              task.status === 'completed' ? "text-green-600 hover:text-green-700" : "text-blue-600 hover:text-blue-700"
            )}
          >
            {task.status === 'completed' ? 'Mark Incomplete' : 'Complete'}
          </button>
          <button
            onClick={() => onUpdate({ priority: task.priority === 'high' ? 'low' : 'high' })}
            className="text-sm px-2 py-1 rounded-md text-yellow-600 hover:text-yellow-700"
          >
            Priority
          </button>
          <button
            onClick={onDelete}
            className="text-sm px-2 py-1 rounded-md text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </div>
    </div>
  );
}