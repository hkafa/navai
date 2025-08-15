<template>
  <div class="welcome">
    <Card class="welcome-card">
      <template #header>
        <div class="welcome-hero">
          <i class="pi pi-compass welcome-icon"></i>
        </div>
      </template>
      <template #title>Welcome to NavAI Platform</template>
      <template #subtitle>
        Discover the power of intelligent navigation with our comprehensive suite of tools
      </template>
      <template #content>
        <div class="welcome-actions">
          <Button 
            label="Get Started" 
            icon="pi pi-arrow-right" 
            size="large"
            @click="navigateToDemo"
          />
          <Button 
            label="View Documentation" 
            icon="pi pi-book" 
            severity="secondary" 
            size="large"
            outlined
            @click="showDocumentation"
          />
        </div>
      </template>
    </Card>

    <Divider align="center">
      <Tag value="Features" icon="pi pi-star" />
    </Divider>

    <div class="features-grid">
      <Panel header="Smart Analytics" class="feature-panel">
        <template #icons>
          <i class="pi pi-chart-line"></i>
        </template>
        <p class="feature-description">
          Advanced analytics and insights powered by machine learning algorithms 
          to optimize your navigation experience.
        </p>
        <div class="feature-stats">
          <Tag value="99% Accuracy" severity="success" />
          <Tag value="24/7 Monitoring" severity="info" />
        </div>
      </Panel>

      <Panel header="Real-time Updates" class="feature-panel">
        <template #icons>
          <i class="pi pi-refresh"></i>
        </template>
        <p class="feature-description">
          Live data synchronization ensures you always have the most current 
          information at your fingertips.
        </p>
        <div class="feature-stats">
          <Tag value="<1s Latency" severity="warning" />
          <Tag value="∞ Scalability" severity="secondary" />
        </div>
      </Panel>

      <Panel header="Enterprise Security" class="feature-panel">
        <template #icons>
          <i class="pi pi-shield"></i>
        </template>
        <p class="feature-description">
          Bank-level security with end-to-end encryption and compliance 
          with industry standards.
        </p>
        <div class="feature-stats">
          <Tag value="256-bit Encryption" severity="danger" />
          <Tag value="SOC2 Compliant" severity="success" />
        </div>
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores'

const router = useRouter()
const store = useAppStore()

const navigateToDemo = (): void => {
  if (store.isLoggedIn) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
}

const showDocumentation = (): void => {
  store.addNotification({
    message: 'Documentation coming soon!',
    type: 'info'
  })
}
</script>

<style scoped>
.welcome {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.welcome-card {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-hero {
  padding: 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--blue-600));
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome-icon {
  font-size: 4rem;
  color: white;
}

.welcome-card :deep(.p-card-title) {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.welcome-card :deep(.p-card-subtitle) {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-color-secondary);
  margin-bottom: 2rem;
}

.welcome-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.feature-panel {
  height: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-panel:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.feature-description {
  line-height: 1.6;
  color: var(--text-color-secondary);
  margin-bottom: 1rem;
}

.feature-stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .welcome {
    padding: 1rem;
  }
  
  .welcome-card :deep(.p-card-title) {
    font-size: 2rem;
  }
  
  .welcome-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-stats {
    justify-content: center;
  }
}
</style>