<script setup lang="ts">
interface Card {
  name: string
  url: string
}

defineProps({
  cards: Array as () => Card[]
})
</script>

<template>
  <div v-for="(card, index) in cards" :key="card.name" class="rounded-xl">
    <div class="">
      <router-link
        class="flex justify-center bg-sky-100 rounded-xl cursor-pointer hover:drop-shadow-md h-60 py-10"
        :to="'/card/' + parseInt(card.url.split('/').reverse()[1], 10) + '/' + card.name"
      >
        <img
          class="h-25 w-40"
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${parseInt(
            card.url.split('/').reverse()[1],
            10
          )}.png`"
        />
      </router-link>
      <div class="font-semibold h-10 pt-1 text-lg">
        {{ card!.name.charAt(0).toUpperCase() + card!.name.slice(1) }}
      </div>
    </div>
  </div>
</template>
