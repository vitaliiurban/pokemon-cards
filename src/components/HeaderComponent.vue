<script setup lang="ts"></script>

<template>
  <div class="h-16">
    <div class="pl-20 flex items-center gap-10 max-sm:pl-1 max-sm:gap-2">
      <img
        class="h-16"
        :src="`https://static.vecteezy.com/system/resources/previews/027/127/591/non_2x/pokemon-logo-pokemon-icon-transparent-free-png.png`"
      />
      <div class="flex justify-center font-medium text-lg hover:text-sky-700 cursor-pointer">
        <router-link :to="'/'">Home</router-link>
      </div>
    </div>
  </div>
</template>
