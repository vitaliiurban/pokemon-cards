<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCounterStore } from '../stores/card'
const card = useCounterStore()
const fetchCard = computed(() => card.fetchCard)
const fetchEvolution = computed(() => card.fetchEvolution)
const refreshPage = () => {
  setTimeout(() => {
    location.reload()
  }, 100)
}
const isLoadingCard = ref(false)
const isLoadingEvolution = ref(false)

const onMountedHandler = async () => {
  isLoadingCard.value = true
  isLoadingEvolution.value = true

  const pathParts = window.location.pathname.split('/')
  const cardId = parseInt(pathParts[pathParts.length - 2], 10)
  const cardName = pathParts[pathParts.length - 1]

  await fetchCard
    .value(cardId)
    .then(() => (isLoadingCard.value = false))
    .catch((error) => {
      console.error('Error fetching card:', error)
      isLoadingCard.value = false
    })

  await fetchEvolution
    .value(cardName)
    .then(() => (isLoadingEvolution.value = false))
    .catch((error) => {
      console.error('Error fetching evolution:', error)
      isLoadingEvolution.value = false
    })
}

onMounted(onMountedHandler)
</script>
<template>
  <div
    v-if="isLoadingCard || isLoadingEvolution"
    class="animate-pulse absolute inset-0 bg-sky-50 flex justify-center items-center text-2xl"
  >
    <svg
      aria-hidden="true"
      class="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  </div>
  <div v-else class="pt-20 bg-sky-50 max-sm:pt-0 max-lg:px-5">
    <div class="flex justify-center max-sm:flex-col">
      <div class="-ms-40 w-50 max-lg:-ms-0">
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
      <div class="flex gap-5 pt-10 max-lg:flex-col max-lg:gap-20">
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
