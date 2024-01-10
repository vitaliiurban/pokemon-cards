<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import CardsListComponent from '../components/CardsListComponent.vue'
import { useCounterStore } from '../stores/cards'
import PaginationComponent from '@/components/PaginationComponent.vue'

const store = useCounterStore()
const limit = ref(30)
const offset = ref(15)
const calculatedOffset = ref(0)
const currentPage = ref(1)

const fetchCards = computed(() => store.fetchData)
const cards = computed(() => store.cards)

const onClickHandler = (page: number) => {
  currentPage.value = page
  console.log('currentPage', currentPage.value)
  calculatedOffset.value = (currentPage.value - 1) * offset.value
  console.log(calculatedOffset.value)
}

watchEffect(() => {
  fetchCards.value(limit.value, calculatedOffset.value)
})
console.log(cards.value.data)
</script>

<template>
  <main class="bg-sky-50">
    <CardsListComponent :cards="cards.data" />
    <PaginationComponent
      :currentPage="currentPage"
      :count="cards.count"
      :limit="limit"
      :onClickHandler="onClickHandler"
    />
  </main>
</template>
