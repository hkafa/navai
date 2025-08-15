<template>
  <div class="login">
    <div class="login-container">
      <Card class="login-card">
        <template #title>Login to NavAI</template>
        <template #content>
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="field">
              <label for="email">Email</label>
              <InputText
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="Enter your email"
                required
                class="w-full"
              />
            </div>
            
            <div class="field">
              <label for="password">Password</label>
              <Password
                id="password"
                v-model="formData.password"
                placeholder="Enter your password"
                required
                :feedback="false"
                toggle-mask
                class="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              label="Sign In"
              :loading="store.ui.loading"
              class="w-full"
              size="large"
            />
          </form>
          
          <div class="login-footer">
            <p>Demo credentials: test@example.com / password</p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '@/stores'
import type { LoginCredentials } from '@/types'

const router = useRouter()
const route = useRoute()
const store = useAppStore()

const formData = ref<LoginCredentials>({
  email: '',
  password: ''
})

const handleLogin = async (): Promise<void> => {
  try {
    await store.login(formData.value)
    
    store.addNotification({
      message: 'Successfully logged in!',
      type: 'success'
    })
    
    const redirectPath = (route.query.redirect as string) || '/dashboard'
    router.push(redirectPath)
    
  } catch (error) {
    console.error('Login error:', error)
    store.addNotification({
      message: 'Login failed. Please try again.',
      type: 'error'
    })
  }
}
</script>

<style scoped>
.login {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--blue-600));
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.login-card :deep(.p-card-title) {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--primary-color);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field label {
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.875rem;
}

.login-footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--surface-border);
  text-align: center;
}

.login-footer p {
  color: var(--text-color-secondary);
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 480px) {
  .login-card :deep(.p-card-content) {
    padding: 1.5rem;
  }
  
  .login-card :deep(.p-card-title) {
    font-size: 1.5rem;
  }
}
</style>