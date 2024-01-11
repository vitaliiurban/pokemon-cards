<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['count', 'limit', 'onClickHandler', 'currentPage'])
const page = ref(props.currentPage)
</script>

<template>
  <div class="w-full flex justify-center py-12">
    <vue-awesome-paginate
      class="flex gap-10"
      :total-items="count"
      :items-per-page="limit"
      :max-pages-shown="3"
      v-model="page"
      :on-click="onClickHandler"
    />
  </div>
</template>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 15px;
  cursor: pointer;
  background-color: rgb(224 242 254);
  color: black;
}
.paginate-buttons:hover {
  background-color: rgb(186 230 253);
}
.active-page {
  background-color: rgb(125 211 252);
  color: black;
}
.active-page:hover {
  background-color: rgb(125 211 252);
}
</style>
