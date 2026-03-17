import React, { useState } from 'react'
import { Plus, LayoutGrid, History, Users, MessageSquare } from 'lucide-react'
import { useTaskStore } from '../store/useTaskStore'
import { Column } from './Column'
import { HistoryPanel } from './HistoryPanel'
import { EmployeePanel } from './EmployeePanel'
import { RemarksPanel } from './RemarksPanel'

export const Board: React.FC = () => {
  const { tasks, addTask, projects, activeProjectId, setActiveProject } = useTaskStore()
  const [isAdding, setIsAdding] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false)
  const [isRemarksOpen, setIsRemarksOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    addTask({ title: newTitle, description: newDesc, status: 'todo' })
    setNewTitle('')
    setNewDesc('')
    setIsAdding(false)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-6 bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
            <LayoutGrid size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] leading-none mb-1">
              Nexus Systems
            </span>
            <select
              value={activeProjectId}
              onChange={(e) => setActiveProject(e.target.value)}
              className="font-extrabold text-xl text-zinc-900 tracking-tight leading-none bg-transparent border-none outline-none cursor-pointer hover:text-indigo-600 transition-colors"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsEmployeeOpen(!isEmployeeOpen)
              setIsHistoryOpen(false)
              setIsRemarksOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
              isEmployeeOpen 
                ? 'bg-zinc-100 text-zinc-900 ring-1 ring-zinc-200' 
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <Users size={18} />
            Employees
          </button>

          <button
            onClick={() => {
              setIsHistoryOpen(!isHistoryOpen)
              setIsEmployeeOpen(false)
              setIsRemarksOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
              isHistoryOpen 
                ? 'bg-zinc-100 text-zinc-900 ring-1 ring-zinc-200' 
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <History size={18} />
            History
          </button>

          <button
            onClick={() => {
              setIsRemarksOpen(!isRemarksOpen)
              setIsEmployeeOpen(false)
              setIsHistoryOpen(false)
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm ${
              isRemarksOpen 
                ? 'bg-zinc-100 text-zinc-900 ring-1 ring-zinc-200' 
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50'
            }`}
          >
            <MessageSquare size={18} />
            Remarks
          </button>
          
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 overflow-x-auto flex gap-6 p-6">
          <Column
            title="To-Do"
            status="todo"
            tasks={tasks.filter((t) => t.status === 'todo')}
          />
          <Column
            title="In Progress"
            status="progress"
            tasks={tasks.filter((t) => t.status === 'progress')}
          />
          <Column
            title="Done"
            status="done"
            tasks={tasks.filter((t) => t.status === 'done')}
          />
        </div>
        
        {isHistoryOpen && <HistoryPanel onClose={() => setIsHistoryOpen(false)} />}
        {isEmployeeOpen && <EmployeePanel onClose={() => setIsEmployeeOpen(false)} />}
        {isRemarksOpen && <RemarksPanel onClose={() => setIsRemarksOpen(false)} />}
      </main>

      {/* Add Task Modal Prototype */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">Create New Task</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1">Title</label>
                  <input
                    autoFocus
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="What needs to be done?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-1">Description</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                    placeholder="Add some details..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-semibold hover:bg-zinc-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
