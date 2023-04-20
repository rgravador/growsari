import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useDogApi = defineStore('useDogApi', () => {
  const breedList = ref([])

  return { breedList }
})
