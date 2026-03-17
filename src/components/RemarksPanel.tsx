import React from 'react'
import { MessageSquare, X, Info, CheckCircle2, Globe, Rocket, Clock } from 'lucide-react'
import { useTaskStore, ProjectStatus } from '../store/useTaskStore'

interface RemarksPanelProps {
  onClose: () => void
}

export const RemarksPanel: React.FC<RemarksPanelProps> = ({ onClose }) => {
  const { projectStatus, setProjectStatus } = useTaskStore()

  const statusOptions: { id: ProjectStatus; label: string; icon: any; color: string; bgColor: string; borderColor: string }[] = [
    { 
      id: 'under_process', 
      label: 'Under Process', 
      icon: Clock, 
      color: 'text-amber-600', 
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    { 
      id: 'live', 
      label: 'Live', 
      icon: Globe, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      icon: CheckCircle2, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ]

  return (
    <div className="w-80 border-l border-zinc-200 bg-white flex flex-col h-full absolute right-0 top-0 shadow-2xl animate-in slide-in-from-right duration-300 z-30">
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-zinc-600" />
          <h2 className="font-bold text-zinc-900">Remarks & Status</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-zinc-200 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors"
          title="Close"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto">
        {/* Project Status Section */}
        <section>
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Rocket size={14} />
            Project Status
          </h3>
          
          <div className="grid gap-3">
            {statusOptions.map((option) => {
              const Icon = option.icon
              const isActive = projectStatus === option.id
              
              return (
                <button
                  key={option.id}
                  onClick={() => setProjectStatus(option.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    isActive 
                      ? `${option.bgColor} ${option.borderColor} ${option.color} ring-4 ring-zinc-50` 
                      : 'bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white shadow-sm' : 'bg-zinc-50'}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${isActive ? option.color : 'text-zinc-700'}`}>
                      {option.label}
                    </p>
                    {isActive && (
                      <p className="text-[10px] opacity-80 font-medium">Currently active status</p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* Project Info Section */}
        <section className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
          <h3 className="text-xs font-bold text-zinc-900 mb-2 flex items-center gap-2">
            <Info size={14} className="text-indigo-500" />
            Project Overview
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            This collaborative board is managed by Nexus Systems. Status updates are recorded in the system history for auditing and undo/redo purposes.
          </p>
        </section>
      </div>

      <div className="mt-auto p-4 border-t border-zinc-100 bg-zinc-50/50">
        <div className="flex items-center justify-between text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          <span>Last Sync</span>
          <span>Just Now</span>
        </div>
      </div>
    </div>
  )
}
