import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, NavigationState, UIState, DataState, LoginCredentials, Notification } from '@/types'
import { getHello, planJourney } from '@/services/comms'

export const useAppStore = defineStore('app', () => {
  // State
  const user = ref<User>({
    id: null,
    name: 'Houmam',
    email: 'hgkafa@yahoo.com',
    isAuthenticated: true
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

  const journey = ref({
    coordinates: [] as number[][],
    description: '',
    journeyId: null as string | null,
    isLoading: false
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

  const callHelloApi = async (name: String): Promise<void> => {
  const { message } = await getHello(name)
  addNotification({ message, type: "info" }) // set your own type
}

  const planJourneyAction = async (description: string): Promise<void> => {
    journey.value.isLoading = true
    ui.value.loading = true
    try {
      journey.value.description = description
      const response = await planJourney(description)
      
      if (response.success && response.coordinates) {
        journey.value.coordinates = response.coordinates
        journey.value.journeyId = response.journey_id || null
        addNotification({
          message: response.message || 'Journey planned successfully',
          type: 'success'
        })
      } else {
        throw new Error(response.message || 'Failed to plan journey')
      }
    } catch (error) {
      journey.value.coordinates = []
      journey.value.journeyId = null
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      addNotification({
        message: errorMessage,
        type: 'error'
      })
      throw error
    } finally {
      journey.value.isLoading = false
      ui.value.loading = false
    }
  }

  const clearJourney = (): void => {
    journey.value.coordinates = []
    journey.value.description = ''
    journey.value.journeyId = null
    journey.value.isLoading = false
  }


  return {
    // State
    user,
    navigation,
    ui,
    data,
    journey,
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
    toggleSidebar,
    // API Actions
    callHelloApi,
    planJourney: planJourneyAction,
    clearJourney,
  }
})