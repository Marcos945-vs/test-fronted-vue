// stores/auditEvents.ts
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export type AuditEvent = {
  id: string
  title: string
  author: string
  datetime: string   // fecha y hora en formato ISO
  importance: 'low' | 'medium' | 'high'
}

export const useAuditEventsStore = defineStore('auditEvents', {
  state: () => ({
    events: [] as AuditEvent[]
  }),
  actions: {
    addEvent(title: string, importance: 'low' | 'medium' | 'high' = 'medium') {
      const auth = useAuthStore()
       const now = new Date()
      const formattedDate = now.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      const newEvent: AuditEvent = {
        id: crypto.randomUUID(),
        title,
        author: auth.user?.name || 'Unknown',
        datetime: formattedDate,
        importance
      }
      this.events.push(newEvent)
    },
    clearEvents() {
      this.events = []
    }
  },
  getters: {
    importantEvents: (state) => state.events.filter(e => e.importance === 'high'),
    eventsByDay: (state) => {
      return state.events.reduce((acc, event) => {
        const day = event.datetime.split('T')[0]
        if (!acc[day]) acc[day] = []
        acc[day].push(event)
        return acc
      }, {} as Record<string, AuditEvent[]>)
    }
  }
})
