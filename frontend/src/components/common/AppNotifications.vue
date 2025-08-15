<template>
  <teleport to="body">
    <div class="notifications-container">
      <TransitionGroup name="notification" tag="div">
        <div
          v-for="notification in store.ui.notifications"
          :key="notification.id"
          :class="['notification', `notification-${notification.type}`]"
        >
          <div class="notification-content">
            <div class="notification-icon">
              <i :class="getIcon(notification.type)"></i>
            </div>
            <div class="notification-message">
              {{ notification.message }}
            </div>
            <Button 
              @click="store.removeNotification(notification.id)"
              icon="pi pi-times"
              text
              rounded
              size="small"
              severity="secondary"
              aria-label="Close notification"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores'
import type { Notification } from '@/types'

const store = useAppStore()
const timeouts = new Map<number, NodeJS.Timeout>()

const getIcon = (type: Notification['type']): string => {
  const icons = {
    success: 'pi pi-check',
    error: 'pi pi-exclamation-triangle',
    warning: 'pi pi-exclamation-triangle',
    info: 'pi pi-info-circle'
  }
  return icons[type] || icons.info
}

const setupAutoRemoval = (notification: Notification): void => {
  if (notification.timeout && notification.timeout > 0) {
    const timeoutId = setTimeout(() => {
      store.removeNotification(notification.id)
    }, notification.timeout)
    timeouts.set(notification.id, timeoutId)
  }
}

onMounted(() => {
  store.ui.notifications.forEach(setupAutoRemoval)
})

onUnmounted(() => {
  timeouts.forEach(clearTimeout)
  timeouts.clear()
})
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  pointer-events: none;
}

.notification {
  pointer-events: auto;
  min-width: 300px;
  max-width: 500px;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border-left: 4px solid;
  background: var(--surface-card);
}

.notification-success {
  border-left-color: var(--green-500);
}

.notification-error {
  border-left-color: var(--red-500);
}

.notification-warning {
  border-left-color: var(--yellow-500);
}

.notification-info {
  border-left-color: var(--blue-500);
}

.notification-content {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  gap: 0.75rem;
}

.notification-icon {
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.notification-message {
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--text-color);
}

.notification-enter-active {
  transition: all 0.3s ease;
}

.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 640px) {
  .notifications-container {
    top: 10px;
    right: 10px;
    left: 10px;
  }
  
  .notification {
    min-width: auto;
    max-width: none;
  }
}
</style>