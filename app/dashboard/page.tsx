import { DashboardStats } from "@/components/dashboard-stats"
import TaskList from "@/components/task-list"
import { AddTaskButton } from "@/components/add-task-button"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <DashboardStats />
        <div className="mt-8">
          <TaskList />
        </div>
      </div>
      <AddTaskButton />
    </main>
  )
}
