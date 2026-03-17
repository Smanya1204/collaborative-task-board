import React from 'react'
import { Users, UserCheck, UserMinus, X, BadgeCheck } from 'lucide-react'
import { useTaskStore } from '../store/useTaskStore'

interface EmployeePanelProps {
  onClose: () => void
}

export const EmployeePanel: React.FC<EmployeePanelProps> = ({ onClose }) => {
  const employees = useTaskStore((state) => state.employees)
  const loggedInCount = employees.filter(e => e.isLoggedIn).length

  return (
    <div className="w-80 border-l border-zinc-200 bg-white flex flex-col h-full absolute right-0 top-0 shadow-2xl animate-in slide-in-from-right duration-300 z-30">
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-zinc-600" />
          <h2 className="font-bold text-zinc-900">Employees</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-zinc-200 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors"
          title="Close"
        >
          <X size={18} />
        </button>
      </div>

      <div className="p-4 border-b border-zinc-200 bg-white grid grid-cols-2 gap-3">
        <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Total</p>
          <p className="text-2xl font-black text-zinc-900">{employees.length}</p>
        </div>
        <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Active</p>
          <p className="text-2xl font-black text-indigo-600">{loggedInCount}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <UserCheck size={14} className="text-green-500" />
            Logged In ({loggedInCount})
          </h3>
          <div className="space-y-2">
            {employees.filter(e => e.isLoggedIn).map(emp => (
              <div key={emp.id} className="flex items-center gap-3 p-3 bg-white border border-zinc-100 rounded-xl shadow-sm hover:border-indigo-200 transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs relative">
                  {emp.name.split(' ').map(n => n[0]).join('')}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-bold text-zinc-900 truncate">{emp.name}</p>
                    <BadgeCheck size={14} className="text-indigo-500 shrink-0" />
                  </div>
                  <p className="text-[10px] font-medium text-zinc-500 truncate">{emp.role}</p>
                  <p className="text-[9px] font-mono text-indigo-400 mt-0.5">{emp.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <UserMinus size={14} className="text-zinc-400" />
            Offline ({employees.length - loggedInCount})
          </h3>
          <div className="space-y-2">
            {employees.filter(e => !e.isLoggedIn).map(emp => (
              <div key={emp.id} className="flex items-center gap-3 p-3 bg-zinc-50/50 border border-zinc-100 rounded-xl grayscale opacity-60">
                <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-xs">
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-zinc-900 truncate">{emp.name}</p>
                  <p className="text-[10px] font-medium text-zinc-500 truncate">{emp.role}</p>
                  <p className="text-[9px] font-mono text-zinc-400 mt-0.5">{emp.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
