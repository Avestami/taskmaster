"use client"

import { useTasks } from "@/hooks/use-tasks"
import { Card } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Clock, ListChecks } from "lucide-react"

export function DashboardStats() {
  const { tasks } = useTasks()

  const stats = {
    completed: tasks?.filter(task => task.status === 'completed').length || 0,
    remaining: tasks?.filter(task => task.status !== 'completed').length || 0,
    hoursWorked: 42.5,
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm">+5 from last month</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Hours Worked</p>
            <p className="text-2xl font-bold">{stats.hoursWorked}h</p>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm">+2.5h from last month</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Remaining Tasks</p>
            <p className="text-2xl font-bold">{stats.remaining}</p>
          </div>
          <div className="flex items-center text-red-500">
            <ArrowDown className="h-4 w-4" />
            <span className="text-sm">-3 from last week</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
