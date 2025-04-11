"use client"

import { useTasks } from "@/hooks/use-tasks"
import { Card } from "@/components/ui/card"
import { startOfMonth, endOfMonth, format } from "date-fns"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts"

export function MonthlySummary() {
  const { tasks } = useTasks()
  const currentDate = new Date()
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)

  const stats = {
    total: tasks?.length || 0,
    completed: tasks?.filter(task => task.status === 'completed').length || 0,
    high: tasks?.filter(task => task.priority === 'high').length || 0,
    medium: tasks?.filter(task => task.priority === 'medium').length || 0,
    low: tasks?.filter(task => task.priority === 'low').length || 0,
  }

  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0

  const monthlyTasks = tasks?.filter(task => {
    const taskDate = new Date(task.dueDate)
    return taskDate >= monthStart && taskDate <= monthEnd
  }) || []

  const priorityChartData = [
    { name: 'High', value: stats.high, color: '#ef4444' },
    { name: 'Medium', value: stats.medium, color: '#f59e0b' },
    { name: 'Low', value: stats.low, color: '#3b82f6' },
  ]

  const statusChartData = [
    { name: 'Completed', value: stats.completed, color: '#22c55e' },
    { name: 'Pending', value: stats.total - stats.completed, color: '#94a3b8' },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{stats.total}</span>
            <span className="text-sm text-gray-500">tasks</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{completionRate}%</span>
            <span className="text-sm text-green-500">completed</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-500">High Priority</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{stats.high}</span>
            <span className="text-sm text-red-500">tasks</span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-500">This Month</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{monthlyTasks.length}</span>
            <span className="text-sm text-gray-500">tasks</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 md:col-span-2">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Priority Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={priorityChartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip 
              formatter={(value) => [`${value} tasks`, 'Count']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar dataKey="value">
              {priorityChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 md:col-span-2">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Task Status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={statusChartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip 
              formatter={(value) => [`${value} tasks`, 'Count']}
              labelStyle={{ color: '#374151' }}
            />
            <Bar dataKey="value">
              {statusChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 md:col-span-2 lg:col-span-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-500">Recent Tasks</h3>
          <span className="text-sm text-gray-500">{format(currentDate, 'MMMM yyyy')}</span>
        </div>
        {monthlyTasks.length === 0 ? (
          <p className="text-sm text-gray-500">No tasks for this month</p>
        ) : (
          <div className="space-y-4">
            {monthlyTasks
              .sort((a, b) => b.dueDate - a.dueDate)
              .slice(0, 5)
              .map(task => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      task.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-gray-500">
                        Due {format(new Date(task.dueDate), 'MMM d')}
                      </p>
                    </div>
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
        )}
      </Card>
    </div>
  )
}
