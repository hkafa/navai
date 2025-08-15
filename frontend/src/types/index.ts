export interface User {
  id: number | null
  name: string
  email: string
  isAuthenticated: boolean
}

export interface NavigationState {
  currentRoute: string
  sidebarOpen: boolean
  breadcrumbs: string[]
}

export interface UIState {
  loading: boolean
  darkMode: boolean
  notifications: Notification[]
}

export interface Notification {
  id: number
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timeout?: number
}

export interface DataState {
  items: any[]
  selectedItem: any | null
  filters: Record<string, any>
  pagination: {
    page: number
    perPage: number
    total: number
  }
}

export interface LoginCredentials {
  email: string
  password: string
}