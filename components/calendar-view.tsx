"use client"

import { useTasks } from "@/hooks/use-tasks"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { format } from "date-fns"
import { Task } from "@/types/task"

export function CalendarView() {
  const { tasks } = useTasks()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getTasksForDate = (date: Date | undefined): Task[] => {
    if (!date || !tasks) return []
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate)
      return format(taskDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    })
  }

  const selectedTasks = getTasksForDate(selectedDate)

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md"
          modifiers={{
            booked: (date) => getTasksForDate(date).length > 0
          }}
          modifiersStyles={{
            booked: { fontWeight: "bold", backgroundColor: "rgba(59, 130, 246, 0.1)" }
          }}
        />
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Tasks for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
          </h2>
          {selectedTasks.length === 0 ? (
            <p className="text-sm text-gray-500">No tasks scheduled for this date</p>
          ) : (
            <div className="space-y-3">
              {selectedTasks.map(task => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border ${
                    task.status === 'completed' 
                      ? 'bg-green-50 border-green-100' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-sm font-medium ${
                        task.status === 'completed' ? 'text-green-700 line-through' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      <p className={`text-xs mt-1 ${
                        task.status === 'completed' ? 'text-green-600/70' : 'text-gray-500'
                      }`}>
                        {task.description}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
