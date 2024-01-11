import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Card {
  id: Number
  name: string
  height: Number
  weight: Number
  abilities: Array<{ ability: { name: string; url: string }; is_hidden: boolean; slot: number }>
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
}

export const usePokemonStore = defineStore('card', () => {
  const info = ref<Card>({
    id: 0,
    name: '',
    height: 0,
    weight: 0,
    abilities: [],
    stats: []
  })
  const evolution = ref<{ name: string; id: number }[]>([{ name: '', id: 0 }])

  const fetchCard = async (id: Number) => {
    try {
      info.value = { id: 0, name: '', height: 0, weight: 0, abilities: [], stats: [] }
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`

      const response = await fetch(url)
      const data = await response.json()
      info.value = data
      console.log(info.value)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchEvolution = async (name: string) => {
    try {
      const evolutionUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`
      const evolutionChainResponse = await fetch(evolutionUrl)
      const evolutionChainData = await evolutionChainResponse.json()
      const evolutionChain = evolutionChainData.evolution_chain.url
      const evolutionResponse = await fetch(evolutionChain)
      const evolutionData = await evolutionResponse.json()
      evolution.value = await extractEvolutionChain(evolutionData.chain)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const extractEvolutionChain = async (
    evolutionChain: any
  ): Promise<{ name: string; id: number }[]> => {
    const evolutionArray: string[] = []

    const addEvolution = (evolution: any) => {
      evolutionArray.push(evolution.species.name)
      if (evolution.evolves_to.length > 0) {
        addEvolution(evolution.evolves_to[0])
      }
    }

    addEvolution(evolutionChain)

    const evolutionWithIds = await Promise.all(
      evolutionArray.map(async (name) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await response.json()
        return { name, id: data.id }
      })
    )

    return evolutionWithIds
  }

  return { info, evolution, fetchCard, fetchEvolution }
})
