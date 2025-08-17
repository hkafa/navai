// endpoints.ts
import { api } from './api'

type Hello = { message: string }
type Health = { status: string }
type JourneyResponse = {
  success: boolean
  message: string
  journey_id?: string
  coordinates?: number[][]
}


export async function getHello(name: String): Promise<Hello> {
  const res = await api.get<Hello>('/hello', {
      params: {
          name: name
      }
  })
  return res.data
}

export async function getHealth(): Promise<Health> {
  const res = await api.get<Health>('/health')
  return res.data
}

export async function planJourney(description: string): Promise<JourneyResponse> {
  const res = await api.post<JourneyResponse>('/journey-planner/', {
    description: description
  })
  return res.data
}
