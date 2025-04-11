"use client"

import { Task } from '@/types/task';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
  onUpdate: (updates: Partial<Task>) => void;
}

export function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
  return (
    <div className={cn(
      "border rounded-lg p-4 shadow-sm transition-all",
      task.status === 'completed' ? "bg-green-50/50 border-green-100" : "bg-white"
    )}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "font-medium text-sm truncate",
            task.status === 'completed' ? "text-green-700 line-through" : "text-gray-900"
          )}>{task.title}</h3>
          <p className={cn(
            "text-sm truncate mt-1",
            task.status === 'completed' ? "text-green-600/70" : "text-gray-500"
          )}>{task.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full border",
              task.priority === 'high' ? "bg-red-50 text-red-700 border-red-200" :
              task.priority === 'medium' ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
              "bg-blue-50 text-blue-700 border-blue-200"
            )}>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">
              Due {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onUpdate({ status: task.status === 'completed' ? 'pending' : 'completed' })}
            className={cn(
              "text-xs px-2 py-1 rounded-md border",
              task.status === 'completed' 
                ? "border-green-200 text-green-700 hover:bg-green-50" 
                : "border-blue-200 text-blue-700 hover:bg-blue-50"
            )}
          >
            {task.status === 'completed' ? '↩ Undo' : '✓ Done'}
          </button>
          <button
            onClick={() => onUpdate({ priority: task.priority === 'high' ? 'low' : 'high' })}
            className="text-xs px-2 py-1 rounded-md border border-yellow-200 text-yellow-700 hover:bg-yellow-50"
          >
            {task.priority === 'high' ? '↓ Priority' : '↑ Priority'}
          </button>
          <button
            onClick={onDelete}
            className="text-xs px-2 py-1 rounded-md border border-red-200 text-red-700 hover:bg-red-50"
          >
            ✕ Delete
          </button>
        </div>
      </div>
    </div>
  );
}