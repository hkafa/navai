<template>
  <div class="home">
    <Card class="hero-card">
      <template #title>Welcome to NavAI</template>
      <template #subtitle>Your intelligent navigation assistant</template>
      <template #content>
        <div class="hero-actions">
          <RouterLink v-if="!store.isLoggedIn" to="/login">
            <Button label="Get Started" size="large" />
          </RouterLink>
          <RouterLink v-else to="/dashboard">
            <Button label="Go to Dashboard" size="large" />
          </RouterLink>
          <RouterLink to="/welcome">
            <Button label="Learn More" severity="secondary" outlined size="large" />
          </RouterLink>
        </div>
      </template>
    </Card>
    
    <div class="features">
      <h2>Features</h2>
      <div class="features-grid">
        <Card class="feature-card">
          <template #title>
            <div class="feature-header">
              <i class="pi pi-compass feature-icon"></i>
              Smart Navigation
            </div>
          </template>
          <template #content>
            <p>AI-powered route optimization and intelligent suggestions</p>
          </template>
        </Card>

        <Card class="feature-card">
          <template #title>
            <div class="feature-header">
              <i class="pi pi-bolt feature-icon"></i>
              Real-time Updates
            </div>
          </template>
          <template #content>
            <p>Live traffic data and dynamic route adjustments</p>
          </template>
        </Card>

        <Card class="feature-card">
          <template #title>
            <div class="feature-header">
              <i class="pi pi-mobile feature-icon"></i>
              Modern Interface
            </div>
          </template>
          <template #content>
            <p>Clean, responsive design that works on all devices</p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

const store = useAppStore()
</script>

<style scoped>
.home {
  max-width: 1000px;
  margin: 0 auto;
}

.hero-card {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-card :deep(.p-card-title) {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.hero-card :deep(.p-card-subtitle) {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--text-color-secondary);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.features {
  padding: 2rem 0;
}

.features h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: var(--text-color);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  height: 100%;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.feature-icon {
  font-size: 2rem;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .hero-card :deep(.p-card-title) {
    font-size: 2rem;
  }
  
  .hero-card :deep(.p-card-subtitle) {
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>