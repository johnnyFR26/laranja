import type { RoleDto } from '@org/types'
import { create } from 'zustand'

export type Theme = 'light' | 'dark' | 'system'

export interface AppState {
  theme: Theme
  sidebarOpen: boolean
  roles: RoleDto[]
  rolesLoading: boolean
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setRoles: (roles: RoleDto[]) => void
  setRolesLoading: (loading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'system',
  sidebarOpen: true,
  roles: [],
  rolesLoading: false,
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setRoles: (roles) => set({ roles }),
  setRolesLoading: (rolesLoading) => set({ rolesLoading }),
}))
