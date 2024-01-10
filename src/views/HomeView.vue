<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import CardsListComponent from '../components/CardsListComponent.vue'
import { useCounterStore } from '../stores/cards'

const store = useCounterStore()
const limit = ref(15)
const offset = ref(0)

const fetchCards = computed(() => store.fetchData)
const cards = computed(() => store.cards)
onMounted(() => {
  fetchCards.value(limit.value, offset.value)
})
</script>

<template>
  <main>
    <CardsListComponent :cards="cards" />
  </main>
</template>
