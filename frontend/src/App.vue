<template>
  <div id="app" :class="{ 'dark-mode': store.ui.darkMode }">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <AppNotifications />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppNotifications from '@/components/common/AppNotifications.vue'

const store = useAppStore()

onMounted(() => {
  console.log('NavAI Frontend mounted')
})

onUnmounted(() => {
  console.log('NavAI Frontend unmounted')
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.main-content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>