import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, NavigationState, UIState, DataState, LoginCredentials, Notification } from '@/types'

export const useAppStore = defineStore('app', () => {
  // State
  const user = ref<User>({
    id: null,
    name: '',
    email: '',
    isAuthenticated: false
  })

  const navigation = ref<NavigationState>({
    currentRoute: 'home',
    sidebarOpen: false,
    breadcrumbs: []
  })

  const ui = ref<UIState>({
    loading: false,
    darkMode: false,
    notifications: []
  })

  const data = ref<DataState>({
    items: [],
    selectedItem: null,
    filters: {},
    pagination: {
      page: 1,
      perPage: 10,
      total: 0
    }
  })

  // Getters
  const isLoggedIn = computed(() => user.value.isAuthenticated)
  const userName = computed(() => user.value.name || 'Guest')
  const hasNotifications = computed(() => ui.value.notifications.length > 0)
  const totalPages = computed(() => Math.ceil(data.value.pagination.total / data.value.pagination.perPage))

  // Actions
  const login = async (credentials: LoginCredentials): Promise<User> => {
    ui.value.loading = true
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const response = { 
        user: { 
          id: 1, 
          name: 'Test User', 
          email: credentials.email,
          isAuthenticated: true
        } 
      }
      user.value = response.user
      return response.user
    } catch (error) {
      throw error
    } finally {
      ui.value.loading = false
    }
  }

  const logout = async (): Promise<void> => {
    user.value = {
      id: null,
      name: '',
      email: '',
      isAuthenticated: false
    }
  }

  const addNotification = (notification: Omit<Notification, 'id'>): void => {
    const newNotification: Notification = {
      id: Date.now(),
      timeout: 5000,
      ...notification
    }
    ui.value.notifications.push(newNotification)
  }

  const removeNotification = (notificationId: number): void => {
    const index = ui.value.notifications.findIndex(n => n.id === notificationId)
    if (index > -1) {
      ui.value.notifications.splice(index, 1)
    }
  }

  const setCurrentRoute = (routeName: string): void => {
    navigation.value.currentRoute = routeName
  }

  const toggleDarkMode = (): void => {
    ui.value.darkMode = !ui.value.darkMode
  }

  const setLoading = (loading: boolean): void => {
    ui.value.loading = loading
  }

  const toggleSidebar = (): void => {
    navigation.value.sidebarOpen = !navigation.value.sidebarOpen
  }

  return {
    // State
    user,
    navigation,
    ui,
    data,
    // Getters
    isLoggedIn,
    userName,
    hasNotifications,
    totalPages,
    // Actions
    login,
    logout,
    addNotification,
    removeNotification,
    setCurrentRoute,
    toggleDarkMode,
    setLoading,
    toggleSidebar
  }
})