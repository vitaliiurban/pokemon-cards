<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import CardsListComponent from '../components/CardsListComponent.vue'
import { usePokemonStore } from '../stores/cards'
import PaginationComponent from '@/components/PaginationComponent.vue'
import LoaderIcon from '@/components/icons/LoaderIcon.vue'

const cards = usePokemonStore()
const limit = ref(30)
const offset = ref(30)
const calculatedOffset = ref(0)
const currentPage = ref(1)
const isLoading = ref(false)
const fetchCards = computed(() => cards.fetchCards)

const onClickHandler = (page: number) => {
  currentPage.value = page
  calculatedOffset.value = (currentPage.value - 1) * offset.value
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
const _fetchCards = async () => {
  try {
    isLoading.value = true
    await fetchCards.value(limit.value, calculatedOffset.value)
  } catch (error) {
    console.error('Error fetching cards:', error)
  } finally {
    isLoading.value = false
  }
}

// watchEffect(() => {
//   fetchCards.value(limit.value, calculatedOffset.value)
// })

watchEffect(() => {
  _fetchCards()
})
</script>

<template>
  <main class="bg-sky-50">
    <div
      v-if="isLoading"
      class="animate-pulse absolute inset-0 bg-sky-50 flex justify-center items-center text-2xl"
    >
      <LoaderIcon />
    </div>
    <div v-else>
      <CardsListComponent :cards="cards.list" />
      <PaginationComponent
        :currentPage="currentPage"
        :count="cards.count"
        :limit="limit"
        :onClickHandler="onClickHandler"
      />
    </div>
  </main>
</template>
