<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import CardsListComponent from '../components/CardsListComponent.vue'
import { useCounterStore } from '../stores/cards'
import PaginationComponent from '@/components/PaginationComponent.vue'

const cards = useCounterStore()
const limit = ref(30)
const offset = ref(15)
const calculatedOffset = ref(0)
const currentPage = ref(1)

const fetchCards = computed(() => cards.fetchCards)

const onClickHandler = (page: number) => {
  currentPage.value = page
  calculatedOffset.value = (currentPage.value - 1) * offset.value
}

watchEffect(() => {
  fetchCards.value(limit.value, calculatedOffset.value)
})
</script>

<template>
  <main class="bg-sky-50">
    <CardsListComponent :cards="cards.list" />
    <PaginationComponent
      :currentPage="currentPage"
      :count="cards.count"
      :limit="limit"
      :onClickHandler="onClickHandler"
    />
  </main>
</template>
