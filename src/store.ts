import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

//  既存のユーザー状態管理
type UserState = {
  user: User | null
}
type UserAction = {
  setUser: (user: UserState['user']) => void
}
export const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))

//  受託課題②：案件・エントリーの状態管理（永続化対応）

export interface Project {
  id: string
  title: string
  detail: string
  skills: string[]
  unit_price: number
  deadline: string
  created_at: string
}

interface AppState {
  projects: Project[]
  userEntries: string[] // エントリー済み案件のIDリスト
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
  addEntry: (projectId: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      projects: [],
      userEntries: [],

      // 案件の追加（新しい順に表示するため先頭に追加）
      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),

      // 案件の更新
      updateProject: (updatedProject) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === updatedProject.id ? updatedProject : p
          )
        })),

      // 案件の削除
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id)
        })),

      // エントリーの追加（重複防止のため Set を活用）
      addEntry: (projectId) =>
        set((state) => ({
          userEntries: Array.from(new Set([...state.userEntries, projectId]))
        }))
    }),
    {
      name: 'jutaku-assignment-storage' // LocalStorageに保存されるキー名
    }
  )
)
