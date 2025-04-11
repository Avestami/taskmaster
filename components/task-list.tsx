"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaskItem } from "@/components/task-item"
import { useTasks } from "@/hooks/use-tasks"
import { Card } from "@/components/ui/card"
import { format } from "date-fns"
import { Trash2, RotateCcw } from "lucide-react"

// Make sure to use default export since that's how it's imported in dashboard/page.tsx
export default function TaskList() {
  const { tasks, deletedTasks, loading, error, updateTask, deleteTask, restoreTask } = useTasks()

  if (loading) return <div className="flex justify-center p-4">Loading tasks...</div>
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>

  const stats = {
    total: tasks?.length || 0,
    completed: tasks?.filter(task => task.status === 'completed').length || 0,
    highPriority: tasks?.filter(task => task.priority === 'high').length || 0,
    dueThisWeek: tasks?.filter(task => {
      const taskDate = new Date(task.dueDate)
      const today = new Date()
      const weekEnd = new Date(today.setDate(today.getDate() + 7))
      return taskDate <= weekEnd && task.status !== 'completed'
    }).length || 0
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="all">All Tasks</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
        <TabsTrigger value="deleted">Deleted ({deletedTasks.length})</TabsTrigger>
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

      <TabsContent value="upcoming" className="space-y-4">
        {tasks
          ?.filter(task => {
            const taskDate = new Date(task.dueDate)
            const today = new Date()
            const weekEnd = new Date(today.setDate(today.getDate() + 7))
            return taskDate <= weekEnd && task.status !== 'completed'
          })
          .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
              onUpdate={(updates) => updateTask(task.id, updates)}
            />
          ))}
      </TabsContent>

      <TabsContent value="analysis" className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Task Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Tasks</span>
                <span className="font-medium">{stats.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium text-green-600">{stats.completed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High Priority</span>
                <span className="font-medium text-red-600">{stats.highPriority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due This Week</span>
                <span className="font-medium text-yellow-600">{stats.dueThisWeek}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {tasks
                ?.sort((a, b) => b.dueDate - a.dueDate)
                .slice(0, 5)
                .map(task => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due {format(new Date(task.dueDate), 'MMM d')}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-700' 
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="deleted" className="space-y-4">
        {deletedTasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No deleted tasks</p>
        ) : (
          deletedTasks.map(task => (
            <Card key={task.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Deleted on {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <button
                  onClick={() => restoreTask(task.id)}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restore
                </button>
              </div>
            </Card>
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}
