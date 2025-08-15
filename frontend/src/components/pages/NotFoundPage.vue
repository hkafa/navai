<template>
  <div class="not-found">
    <Card class="not-found-card">
      <template #content>
        <div class="not-found-content">
          <div class="error-code">404</div>
          <h1 class="error-title">Page Not Found</h1>
          <p class="error-description">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div class="error-actions">
            <RouterLink to="/">
              <Button label="Go Home" />
            </RouterLink>
            <Button 
              label="Go Back" 
              @click="goBack"
              severity="secondary"
              outlined
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = (): void => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.not-found-card {
  max-width: 500px;
  width: 100%;
}

.not-found-content {
  text-align: center;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.error-description {
  font-size: 1.125rem;
  color: var(--text-color-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .error-code {
    font-size: 5rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>