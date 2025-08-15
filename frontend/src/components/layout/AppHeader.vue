<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <RouterLink to="/" class="logo-link">
          NavAI
        </RouterLink>
      </div>
      
      <nav class="navigation">
        <RouterLink 
          to="/" 
          class="nav-link" 
          :class="{ active: store.navigation.currentRoute === 'Home' }"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/welcome" 
          class="nav-link" 
          :class="{ active: store.navigation.currentRoute === 'Welcome' }"
        >
          Welcome
        </RouterLink>
        <RouterLink 
          v-if="store.isLoggedIn" 
          to="/dashboard" 
          class="nav-link" 
          :class="{ active: store.navigation.currentRoute === 'Dashboard' }"
        >
          Dashboard
        </RouterLink>
      </nav>
      
      <div class="header-actions">
        <Button 
          icon="pi pi-moon" 
          :icon-class="store.ui.darkMode ? 'pi pi-sun' : 'pi pi-moon'"
          @click="store.toggleDarkMode"
          text
          rounded
          severity="secondary"
        />
        
        <div v-if="store.isLoggedIn" class="user-menu">
          <span class="user-name">{{ store.userName }}</span>
          <Button 
            label="Logout" 
            @click="handleLogout"
            severity="danger"
            outlined
          />
        </div>
        
        <RouterLink v-else to="/login">
          <Button label="Login" />
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

const store = useAppStore()

const handleLogout = async (): Promise<void> => {
  await store.logout()
}
</script>

<style scoped>
.app-header {
  background-color: var(--surface-card);
  border-bottom: 1px solid var(--surface-border);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.navigation {
  display: flex;
  gap: 1rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  margin: 20px;
  color: var(--text-color);
  text-decoration: none;
  border-radius: var(--border-radius);
  transition: background-color 0.2s;
}

.nav-link:hover, .nav-link.active {
  background-color: var(--primary-color);
  color: white;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-name {
  font-weight: 500;
  color: var(--text-color);
}

@media (max-width: 768px) {
  .header-content {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .navigation {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}
</style>