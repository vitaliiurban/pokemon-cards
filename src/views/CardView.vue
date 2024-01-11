<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useCounterStore } from '../stores/card'
const card = useCounterStore()
const fetchCard = computed(() => card.fetchCard)
const fetchEvolution = computed(() => card.fetchEvolution)
const refreshPage = () => {
  setTimeout(() => {
    location.reload()
  }, 100)
}

onMounted(() => {
  const pathParts = window.location.pathname.split('/')
  const cardId = parseInt(pathParts[pathParts.length - 2], 10)
  const cardName = pathParts[pathParts.length - 1]
  fetchCard.value(cardId)
  fetchEvolution.value(cardName)
})
</script>
<template>
  <div class="pt-20 bg-sky-50">
    <div class="flex justify-center">
      <div class="-ms-40 w-50">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${card.info.id}.png`"
        />
      </div>

      <div class="flex flex-col gap-4">
        <div class="font-bold text-6xl my-5">
          {{ card!.info.name.charAt(0).toUpperCase() + card!.info.name.slice(1) }}
        </div>
        <div class="flex gap-20 bg-sky-100 p-5 rounded-lg">
          <div class="flex flex-col gap-5">
            <div>
              <div class="font-medium text-lg">Height:</div>
              <div class="text-xl">{{ card.info.height }}</div>
            </div>
            <div>
              <div class="font-medium text-lg">Weight:</div>
              <div class="text-xl">{{ card.info.weight }}</div>
            </div>
          </div>

          <div>
            <div class="font-medium text-lg">Abilities:</div>
            <div>
              <div class="text-xl" v-for="(ability, index) in card.info.abilities" :key="index">
                {{ ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1) }}
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-5 bg-sky-100 p-5 rounded-lg">
          <div v-for="(stat, index) in card.info.stats" :key="index">
            <div class="font-medium text-lg">
              {{ stat!.stat.name.charAt(0).toUpperCase() + stat!.stat.name.slice(1) }}:
            </div>

            <div class="text-xl">{{ stat.base_stat }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center flex-col py-20">
      <div class="text-4xl font-bold">Evolution</div>
      <div class="flex"></div>
      <div class="flex gap-5 pt-10">
        <div
          class="bg-sky-100 rounded-lg w-96 h-96 cursor-pointer hover:drop-shadow-md"
          v-for="(stage, index) in card.evolution"
          :key="index"
        >
          <router-link :to="'/card/' + stage.id + '/' + stage.name" @click="refreshPage">
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${stage.id}.png`"
            />
          </router-link>
          <div class="font-semibold text-lg py-2">
            {{
              stage.name.charAt(0).toUpperCase() + stage.name.slice(1) + '  ' + (index + 1) + ' lvl'
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
