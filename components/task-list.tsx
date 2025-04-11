"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskItem } from "@/components/task-item"
import { useTasks } from "@/hooks/use-tasks"

// Make sure to use default export since that's how it's imported in dashboard/page.tsx
export default function TaskList() {
  const { tasks, loading, error, updateTask, deleteTask } = useTasks();

  if (loading) {
    return <div className="flex justify-center p-4">Loading tasks...</div>
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error.message}</div>
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
        <TabsTrigger value="important">Important</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {tasks?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => deleteTask(task.id)}
            onUpdate={(updates) => updateTask(task.id, updates)}
          />
        ))}
      </TabsContent>

      <TabsContent value="pending" className="space-y-4">
        {tasks?.filter(task => task.status !== 'completed')
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
              onUpdate={(updates) => updateTask(task.id, updates)}
            />
          ))}
      </TabsContent>

      <TabsContent value="completed" className="space-y-4">
        {tasks?.filter(task => task.status === 'completed')
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
              onUpdate={(updates) => updateTask(task.id, updates)}
            />
          ))}
      </TabsContent>

      <TabsContent value="important" className="space-y-4">
        {tasks?.filter(task => task.priority === 'high')
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
              onUpdate={(updates) => updateTask(task.id, updates)}
            />
          ))}
      </TabsContent>
    </Tabs>
  )
}
