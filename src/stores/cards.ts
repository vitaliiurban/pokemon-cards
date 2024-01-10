import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('store', () => {
  const cards = ref([])

  const fetchData = async (limit: number, offset: number) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      const response = await fetch(url)
      const data = await response.json()
      cards.value = data.results
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { cards, fetchData }
})
