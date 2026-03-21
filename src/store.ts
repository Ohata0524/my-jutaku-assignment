import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 1. 既存のユーザー状態管理
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

// 2. 受託課題②：案件・エントリーの状態管理

export interface Project {
  id: string
  title: string
  detail: string
  skills: string[]
  unit_price: number
  deadline: string
  created_at: string
}

export interface Entry {
  projectId: string
  enteredAt: string
}

interface AppState {
  projects: Project[]
  userEntries: Entry[]
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
  addEntry: (projectId: string) => void
}

// テスト用データ：ページ確認用
const mockProjects: Project[] = [
  {
    id: '1',
    title: '【急募】Next.js/TypeScriptを用いたマッチングアプリの開発支援',
    detail:
      '現在開発中の「受託案件マッチングシステム」のフロントエンド実装をサポートいただける方を募集しています。\n\n【主な作業内容】\n・Figmaに基づいたピクセルパーフェクトなUI実装\n・Zustandを用いた状態管理の構築\n・tRPCを用いたAPI連携\n\n実務に近い環境で開発経験を積みたい方に最適な案件です。',
    skills: ['Next.js', 'TypeScript', 'Mantine', 'Zustand'],
    unit_price: 150000,
    deadline: '2026-03-31',
    created_at: '2026-03-01'
  },
  {
    id: '2',
    title: '日本酒マッチングアプリ「SAKE STORY」管理画面の改修',
    detail:
      '日本酒の好みを分析し、ユーザーに最適な銘柄を提案するアプリの管理者用ダッシュボードの改修依頼です。データ視覚化（グラフ表示）の実装経験がある方を歓迎します。',
    skills: ['React', 'TypeScript', 'Prisma', 'Supabase'],
    unit_price: 80000,
    deadline: '2026-04-15',
    created_at: '2026-03-10'
  }
]

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 初期データ
      projects: mockProjects,
      userEntries: [],

      addProject: (project) =>
        set((state) => ({ projects: [project, ...state.projects] })),

      updateProject: (updatedProject) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === updatedProject.id ? updatedProject : p
          )
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id)
        })),

      addEntry: (projectId) =>
        set((state) => {
          const isAlreadyEntered = state.userEntries.some(
            (e) => e.projectId === projectId
          )
          if (isAlreadyEntered) return state

          const newEntry: Entry = {
            projectId,
            enteredAt: new Date().toISOString()
          }

          return {
            userEntries: [...state.userEntries, newEntry]
          }
        })
    }),
    {
      name: 'jutaku-assignment-storage-v2'
    }
  )
)
