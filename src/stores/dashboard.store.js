import { defineStore } from 'pinia'
import api from '@/plugins/api'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    data: null,
    loading: false
  }),

  actions: {
    async fetchCounts() {
      this.loading = true
      try {
        const { data } = await api.get('/allcounts/')
        this.data = data
      } catch (error) {
        console.error('Erro ao buscar contagens:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
