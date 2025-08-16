<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p class="welcome-message">Welcome back, {{ store.userName }}!</p>
    </div>
    
    <div class="dashboard-grid">
      <Card class="dashboard-card">
        <template #title>Quick Stats</template>
        <template #content>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value">{{ store.data.items.length }}</div>
              <div class="stat-label">Total Items</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ store.data.pagination.total }}</div>
              <div class="stat-label">Total Records</div>
            </div>
          </div>
        </template>
      </Card>
      
      <Card class="dashboard-card">
        <template #title>Recent Activity</template>
        <template #content>
          <div v-if="store.ui.loading" class="loading">
            <ProgressSpinner size="small" />
            <span>Loading...</span>
          </div>
          <div v-else class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">
                <i class="pi pi-chart-bar"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">System initialized</div>
                <div class="activity-time">Just now</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="pi pi-user"></i>
              </div>
              <div class="activity-content">
                <div class="activity-title">User logged in</div>
                <div class="activity-time">A moment ago</div>
              </div>
            </div>
          </div>
        </template>
      </Card>
      
      <Card class="dashboard-card">
        <template #title>Actions</template>
        <template #content>
          <div class="action-buttons">
            <Button 
              label="Test Notification" 
              @click="testNotification"
              class="w-full"
            />
            <Button 
              :label="store.ui.loading ? 'Stop Loading' : 'Start Loading'"
              @click="toggleLoading"
              severity="secondary"
              class="w-full"
            />
          </div>
        </template>
      </Card>
      
      <Card class="dashboard-card">
        <template #title>API Testing</template>
        <template #content>
          <div class="api-section">
            <div class="api-description">
              <p>Test backend API endpoints and view responses</p>
            </div>
            <div class="api-actions">
              <InputText
                id="name"
                v-model="name"
                type="name"
                placeholder="Enter your name"
                required
                class="w-full"
              />
              <Button 
                label="Call Hello Endpoint"
                icon="pi pi-server"
                @click="callHelloApiEndpoint"
                class="w-full"
                severity="info"
                :disabled="name == ''"
              />
            </div>
          </div>
        </template>
      </Card>
      
      <Card class="dashboard-card">
        <template #title>Data Overview</template>
        <template #content>
          <div class="data-overview">
            <div class="data-item">
              <strong>Current Page:</strong> {{ store.data.pagination.page }}
            </div>
            <div class="data-item">
              <strong>Per Page:</strong> {{ store.data.pagination.perPage }}
            </div>
            <div class="data-item">
              <strong>Selected Item:</strong> {{ store.data.selectedItem || 'None' }}
            </div>
            <div class="data-item">
              <strong>Dark Mode:</strong> 
              <Tag :value="store.ui.darkMode ? 'On' : 'Off'" :severity="store.ui.darkMode ? 'success' : 'secondary'" />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'
import type { Notification } from '@/types'
import {ref} from 'vue'

const store = useAppStore()


const testNotification = (): void => {
  const notifications: Omit<Notification, 'id'>[] = [
    { message: 'This is a success message!', type: 'success', timeout: 5000 },
    { message: 'This is an info message!', type: 'info', timeout: 5000 },
    { message: 'This is a warning message!', type: 'warning', timeout: 5000 },
    { message: 'This is an error message!', type: 'error', timeout: 5000 }
  ]
  
  const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
  store.addNotification(randomNotification)
}

const toggleLoading = (): void => {
  store.ui.loading = !store.ui.loading
}

const name = ref('')

const callHelloApiEndpoint = async (): Promise<void> => {
  if (name.value == '') return;
  await store.callHelloApi(name.value)
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.welcome-message {
  font-size: 1.1rem;
  color: var(--text-color-secondary);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.dashboard-card {
  height: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: var(--primary-color);
  color: black;
  border-radius: var(--border-radius);
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.loading {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: var(--surface-100);
  border-radius: var(--border-radius);
}

.activity-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 500;
  color: var(--text-color);
}

.activity-time {
  font-size: 0.875rem;
  color: var(--text-color-secondary);
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.data-overview {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-color);
  font-size: 0.9rem;
}

.api-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.api-description p {
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.api-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.api-response, .api-error {
  padding: 1rem;
  border-radius: var(--border-radius);
  border-left: 4px solid;
}

.api-response {
  background: var(--green-50);
  border-left-color: var(--green-500);
}

.api-error {
  background: var(--red-50);
  border-left-color: var(--red-500);
}

.api-response h4, .api-error h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.response-content, .error-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 0.5rem;
  }

  .dashboard-header h1 {
    font-size: 2rem;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>