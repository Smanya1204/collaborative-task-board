import { create } from 'zustand'

export type TaskStatus = 'todo' | 'progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
}

interface Command {
  id: string
  execute: () => void
  undo: () => void
  description: string
  timestamp: Date
}

export interface Employee {
  id: string
  name: string
  role: string
  isLoggedIn: boolean
}

export type ProjectStatus = 'under_process' | 'live' | 'completed'

export interface Project {
  id: string
  name: string
  status: ProjectStatus
  tasks: Task[]
  employees: Employee[]
}

const DUMMY_PROJECTS: Project[] = [
  {
    id: 'PRJ_001',
    name: 'Project Alpha (Mobile App)',
    status: 'under_process',
    tasks: [
      { id: 'A1', title: 'Design System', description: 'Create a cohesive design system for the app.', status: 'progress' },
      { id: 'A2', title: 'Auth Implementation', description: 'Setup JWT and social login.', status: 'todo' },
    ],
    employees: [
      { id: 'EMP_001', name: 'Aryan K.', role: 'Senior Developer', isLoggedIn: true },
      { id: 'EMP_005', name: 'Trae AI', role: 'AI Assistant', isLoggedIn: true },
    ]
  },
  {
    id: 'PRJ_002',
    name: 'Project Beta (E-Commerce)',
    status: 'live',
    tasks: [
      { id: 'B1', title: 'Payment Gateway', description: 'Stripe integration for checkout.', status: 'done' },
      { id: 'B2', title: 'Product Catalog', description: 'Inventory management system.', status: 'done' },
    ],
    employees: [
      { id: 'EMP_002', name: 'Sarah J.', role: 'Project Manager', isLoggedIn: true },
      { id: 'EMP_003', name: 'Mike R.', role: 'UI Designer', isLoggedIn: true },
    ]
  },
  {
    id: 'PRJ_003',
    name: 'Project Gamma (Analytics)',
    status: 'completed',
    tasks: [
      { id: 'C1', title: 'Data Pipeline', description: 'Initial ETL process setup.', status: 'done' },
      { id: 'C2', title: 'Dashboard v1', description: 'Release version 1.0.', status: 'done' },
    ],
    employees: [
      { id: 'EMP_004', name: 'Elena V.', role: 'QA Engineer', isLoggedIn: false },
    ]
  }
]

interface TaskStore {
  activeProjectId: string
  projects: Project[]
  // Derived state or active state
  tasks: Task[]
  employees: Employee[]
  projectStatus: ProjectStatus
  
  undoStack: Command[]
  redoStack: Command[]
  
  setActiveProject: (projectId: string) => void
  addTask: (task: Omit<Task, 'id'>) => void
  moveTask: (taskId: string, newStatus: TaskStatus) => void
  deleteTask: (taskId: string) => void
  setProjectStatus: (status: ProjectStatus) => void
  undo: () => void
  redo: () => void
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  activeProjectId: DUMMY_PROJECTS[0].id,
  projects: DUMMY_PROJECTS,
  tasks: DUMMY_PROJECTS[0].tasks,
  employees: DUMMY_PROJECTS[0].employees,
  projectStatus: DUMMY_PROJECTS[0].status,
  undoStack: [],
  redoStack: [],

  setActiveProject: (projectId) => {
    const project = get().projects.find(p => p.id === projectId)
    if (!project) return
    
    set({
      activeProjectId: projectId,
      tasks: project.tasks,
      employees: project.employees,
      projectStatus: project.status,
      undoStack: [], // Clear history when switching projects to avoid confusion
      redoStack: []
    })
  },

  setProjectStatus: (status) => {
    const oldStatus = get().projectStatus
    if (oldStatus === status) return
    const commandId = `step_${Math.random().toString(36).substring(2, 6)}`

    const command: Command = {
      id: commandId,
      execute: () => set({ projectStatus: status }),
      undo: () => set({ projectStatus: oldStatus }),
      description: `Project status changed to ${status.replace('_', ' ')}`,
      timestamp: new Date(),
    }

    command.execute()
    set((state) => ({
      undoStack: [...state.undoStack, command],
      redoStack: [],
    }))
  },

  addTask: (taskData) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newTask = { ...taskData, id }
    const commandId = `step_${Math.random().toString(36).substring(2, 6)}`

    const command: Command = {
      id: commandId,
      execute: () => set((state) => ({ tasks: [...state.tasks, newTask] })),
      undo: () => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
      description: `[ID: ${id}] Created task "${newTask.title}"`,
      timestamp: new Date(),
    }

    command.execute()
    set((state) => ({
      undoStack: [...state.undoStack, command],
      redoStack: [],
    }))
  },

  moveTask: (taskId, newStatus) => {
    const { tasks } = get()
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    const oldStatus = task.status
    if (oldStatus === newStatus) return
    const commandId = `step_${Math.random().toString(36).substring(2, 6)}`

    const command: Command = {
      id: commandId,
      execute: () =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
        })),
      undo: () =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status: oldStatus } : t)),
        })),
      description: `[ID: ${taskId}] Moved "${task.title}" to ${newStatus}`,
      timestamp: new Date(),
    }

    command.execute()
    set((state) => ({
      undoStack: [...state.undoStack, command],
      redoStack: [],
    }))
  },

  deleteTask: (taskId) => {
    const { tasks } = get()
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return

    const taskIndex = tasks.indexOf(task)
    const commandId = `step_${Math.random().toString(36).substring(2, 6)}`

    const command: Command = {
      id: commandId,
      execute: () => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),
      undo: () =>
        set((state) => {
          const newTasks = [...state.tasks]
          newTasks.splice(taskIndex, 0, task)
          return { tasks: newTasks }
        }),
      description: `[ID: ${taskId}] Deleted task "${task.title}"`,
      timestamp: new Date(),
    }

    command.execute()
    set((state) => ({
      undoStack: [...state.undoStack, command],
      redoStack: [],
    }))
  },

  undo: () => {
    const { undoStack } = get()
    if (undoStack.length === 0) return

    const command = undoStack[undoStack.length - 1]
    command.undo()

    set((state) => ({
      undoStack: state.undoStack.slice(0, -1),
      redoStack: [...state.redoStack, command],
    }))
  },

  redo: () => {
    const { redoStack } = get()
    if (redoStack.length === 0) return

    const command = redoStack[redoStack.length - 1]
    command.execute()

    set((state) => ({
      undoStack: [...state.undoStack, command],
      redoStack: state.redoStack.slice(0, -1),
    }))
  },
}))
