<script setup>
import { onBeforeMount } from 'vue';
import _axios from '../plugins/axios';
import { ref } from 'vue';
import BreedList from '../components/breedList.vue'
const breedList = ref([])
const fetchBreedList = async () => {
  try {
    const { data } = await _axios.get('/dogs/breeds')
    console.log("🚀 ~ file: HomeView.vue:8 ~ fetchBreedList ~ data:", data.data)
    breedList.value = breedList.value.concat(data.data);
  } catch (error) {
    console.log("🚀 ~ file: dogs.js:11 ~ fetchBreedList ~ error:", error)
  }
}
onBeforeMount(async () => {
  console.log('mounted')
  await fetchBreedList()
})

const selectedBreed = ref(0)
</script>

<template>
  <div>
    <v-sheet class="mx-auto" max-width="900">
      <v-slide-group show-arrows v-model="selectedBreed">
        <v-slide-group-item v-for="(breed, i) in breedList" :key="i" v-slot="{ isSelected, toggle }">
          <v-btn class="ma-2" rounded :color="isSelected ? 'primary' : undefined" @click="toggle">
            {{ breed }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
    <div v-if="breedList.length > 0">
      <BreedList :breed="breedList[selectedBreed]" :key="selectedBreed" />
    </div>
  </div>
</template>
