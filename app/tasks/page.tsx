import TaskList from "@/components/task-list"
import { AddTaskButton } from "@/components/add-task-button"

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <AddTaskButton />
        </div>
        <TaskList />
      </div>
    </main>
  )
} 