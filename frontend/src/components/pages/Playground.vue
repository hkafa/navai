<template>
  <div class="journey-planner">
    <Card class="journey-card">
      <template #content>
        <div class="journey-content">
          <div class="journey-header">
            <i class="pi pi-map text-2xl" style="color: var(--primary-color)"></i>
            <h2 class="text-2xl font-bold m-0" style="color: var(--primary-color)">Journey Planner</h2>
          </div>
          <div class="input-section">
            <label for="tripDescription" class="input-label">
              <i class="pi pi-map-marker text-primary"></i>
              Describe Your London Journey
            </label>
            <Textarea
              id="tripDescription"
              v-model="tripDescription"
              placeholder="Describe your trip in London, e.g., 'I want to go from Westminster Bridge to Tower Bridge, then to Borough Market and finally to London Eye...'"
              rows="8"
              class="trip-textarea"
              :class="{ 'p-invalid': hasError }"
            />
            <small class="help-text">
              Describe your journey in natural language. Include locations, landmarks, or areas you want to visit in London.
            </small>
            <Message v-if="hasError" severity="error" class="mt-2">
              {{ errorMessage }}
            </Message>
          </div>

          <div class="actions-section">
            <Button
              @click="planJourney"
              label="Plan Journey"
              icon="pi pi-play"
              :loading="store.ui.loading"
              :disabled="!tripDescription.trim()"
              class="plan-button"
            />
            <Button
              @click="clearInput"
              label="Clear"
              icon="pi pi-times"
              severity="secondary"
              text
              class="clear-button"
            />
          </div>

          <div v-if="store.journey.coordinates.length > 0" class="results-section">
            <Divider align="left">
              <span class="text-primary font-semibold">Journey Results</span>
            </Divider>
            <div class="coordinates-display">
              <p class="coordinates-count">
                <i class="pi pi-check-circle text-green-500"></i>
                {{ store.journey.coordinates.length }} coordinate sets loaded
              </p>
              <ScrollPanel style="width: 100%; height: 200px" class="coordinates-scroll">
                <div v-for="(coordSet, index) in store.journey.coordinates" :key="index" class="coord-item">
                  <Tag :value="`Set ${index + 1}`" severity="info" class="coord-tag"/>
                  <span class="coord-values">{{ formatCoordinates(coordSet) }}</span>
                </div>
              </ScrollPanel>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores'

const store = useAppStore()
const tripDescription = ref('')
const hasError = ref(false)
const errorMessage = ref('')

const planJourney = async (): Promise<void> => {
  try {
    hasError.value = false
    errorMessage.value = ''
    
    if (!tripDescription.value.trim()) {
      throw new Error('Please describe your journey')
    }

    await store.planJourney(tripDescription.value.trim())
  } catch (error) {
    hasError.value = true
    errorMessage.value = error instanceof Error ? error.message : 'Failed to plan journey'
  }
}

const formatCoordinates = (coords: number[]): string => {
  return `[${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}]`
}

const clearInput = (): void => {
  tripDescription.value = ''
  hasError.value = false
  errorMessage.value = ''
  store.clearJourney()
}
</script>

<style scoped>
.journey-planner {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.journey-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.journey-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--surface-200);
}

.journey-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.trip-textarea {
  font-size: 1rem;
  line-height: 1.5;
}

.help-text {
  color: var(--text-color-secondary);
  font-style: italic;
}

.actions-section {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.plan-button {
  flex: 1;
  max-width: 200px;
}

.results-section {
  margin-top: 1rem;
}

.coordinates-display {
  background: var(--surface-50);
  border-radius: 6px;
  padding: 1rem;
}

.coordinates-count {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.coordinates-scroll {
  border: 1px solid var(--surface-300);
  border-radius: 4px;
}

.coord-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-bottom: 1px solid var(--surface-200);
}

.coord-item:last-child {
  border-bottom: none;
}

.coord-tag {
  min-width: 60px;
}

.coord-values {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}
</style>