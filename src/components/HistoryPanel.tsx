import React from 'react'
import { Undo2, Redo2, History, X } from 'lucide-react'
import { useTaskStore } from '../store/useTaskStore'

interface HistoryPanelProps {
  onClose: () => void
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onClose }) => {
  const { undoStack, redoStack, undo, redo } = useTaskStore()

  return (
    <div className="w-80 border-l border-zinc-200 bg-white flex flex-col h-full absolute right-0 top-0 shadow-2xl animate-in slide-in-from-right duration-300 z-30">
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
        <div className="flex items-center gap-2">
          <History size={18} className="text-zinc-600" />
          <h2 className="font-bold text-zinc-900">History</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="p-2 hover:bg-zinc-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Undo"
          >
            <Undo2 size={18} />
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="p-2 hover:bg-zinc-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Redo"
          >
            <Redo2 size={18} />
          </button>
          <div className="w-px h-4 bg-zinc-200 mx-1" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {undoStack.length === 0 && (
          <div className="text-center py-10 text-zinc-400">
            <p className="text-sm">No recent actions</p>
          </div>
        )}
        
        {[...undoStack].reverse().map((command, idx) => (
          <div key={command.id} className="flex gap-3 p-3 bg-zinc-50 rounded-lg border border-zinc-100">
            <div className="mt-0.5">
              <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-indigo-600 mb-1 font-mono uppercase">
                {command.id}
              </p>
              <p className="text-sm font-medium text-zinc-900 leading-tight">
                {command.description}
              </p>
              <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
                {new Intl.DateTimeFormat('en-US', { 
                  hour: 'numeric', 
                  minute: 'numeric', 
                  second: 'numeric',
                  hour12: true 
                }).format(command.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
