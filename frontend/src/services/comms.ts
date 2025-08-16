// endpoints.ts
import { api } from './api'

type Hello = { message: string }
type Health = { status: string }


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
