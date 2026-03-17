import React from 'react'
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react'
import { Task, useTaskStore } from '../store/useTaskStore'

interface TaskCardProps {
  task: Task
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const moveTask = useTaskStore((state) => state.moveTask)
  const deleteTask = useTaskStore((state) => state.deleteTask)

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-zinc-200 hover:shadow-md transition-shadow relative group">
      <button
        onClick={() => deleteTask(task.id)}
        className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
        title="Delete task"
      >
        <Trash2 size={16} />
      </button>

      <h3 className="font-semibold text-zinc-900 mb-1 pr-6">{task.title}</h3>
      <p className="text-sm text-zinc-600 mb-4">{task.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {task.status !== 'todo' && (
            <button
              onClick={() => moveTask(task.id, task.status === 'done' ? 'progress' : 'todo')}
              className="p-1 hover:bg-zinc-100 rounded text-zinc-500"
              title="Move left"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          {task.status !== 'done' && (
            <button
              onClick={() => moveTask(task.id, task.status === 'todo' ? 'progress' : 'done')}
              className="p-1 hover:bg-zinc-100 rounded text-zinc-500"
              title="Move right"
            >
              <ArrowRight size={16} />
            </button>
          )}
        </div>
        
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
          ID: {task.id}
        </span>
      </div>
    </div>
  )
}
