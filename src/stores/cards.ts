import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Cards {
  data: Array<{ name: string; url: string }>
  count: number
}

export const useCounterStore = defineStore('store', () => {
  const cards = ref<Cards>({ data: [], count: 0 })

  const fetchData = async (limit: number, offset: number) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      const response = await fetch(url)
      const data = await response.json()
      cards.value = { data: data.results, count: data.count }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { cards, fetchData }
})
