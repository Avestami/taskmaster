"use client"

import { useState } from 'react'
import { useTasks } from '@/hooks/use-tasks'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function AddTaskButton() {
  const { addTask } = useTasks()
  const [open, setOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'low',
    status: 'pending',
    dueDate: new Date().getTime(),
    name: '',
    avatar: '',
    category: []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addTask(newTask)
    setOpen(false)
    setNewTask({
      title: '',
      description: '',
      priority: 'low',
      status: 'pending',
      dueDate: new Date().getTime(),
      name: '',
      avatar: '',
      category: []
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6" size="lg">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <Textarea
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            required
          />
          <Select
            value={newTask.priority}
            onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={new Date(newTask.dueDate).toISOString().split('T')[0]}
            onChange={(e) => setNewTask({ ...newTask, dueDate: new Date(e.target.value).getTime() })}
            required
          />
          <Button type="submit" className="w-full">
            Create Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
