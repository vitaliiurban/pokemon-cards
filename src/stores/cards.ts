import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Cards {
  cards: Array<{ name: string; url: string }>
  count: number
}

export const useCounterStore = defineStore('cards', () => {
  const list = ref([])
  const count = ref(0)

  const fetchCards = async (limit: number, offset: number) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
      const response = await fetch(url)
      const data = await response.json()
      list.value = data.results
      count.value = data.count
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { list, count, fetchCards }
})
