import React from 'react'
import { Task, TaskStatus } from '../store/useTaskStore'
import { TaskCard } from './TaskCard'

interface ColumnProps {
  title: string
  status: TaskStatus
  tasks: Task[]
}

export const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="flex flex-col h-full bg-zinc-50 rounded-xl border border-zinc-200 p-4 min-w-[300px] flex-1">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="font-bold text-zinc-900 flex items-center gap-2">
          {title}
          <span className="bg-zinc-200 text-zinc-600 text-xs px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </h2>
      </div>
      
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-hide">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-zinc-200 rounded-lg text-zinc-400">
            <p className="text-sm">No tasks here</p>
          </div>
        )}
      </div>
    </div>
  )
}
