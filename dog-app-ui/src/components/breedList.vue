<script setup>
import { onBeforeMount } from 'vue';
import _axios from '../plugins/axios'
import LoaderUI from './LoaderUI.vue';
import { ref } from 'vue';
import ExpandUI from './expandUI.vue';
const props = defineProps({
    breed: String
})
const breeds = ref([])
const loading = ref(true)
const snackbar = ref(false)
const snackbarText = ref('')
onBeforeMount(async () => {
    loading.value = true
    const list = await _axios.get(`/dogs/breeds/${props.breed}`)
    console.log("🚀 ~ file: breedList.vue:11 ~ onMounted ~ list:", list)
    breeds.value = list.data.data
    loading.value = false
})

const addToFavorite = (img) => {
    let url = '/dogs/add-to-favorite'
    const res = _axios.post(url, { image: img, isFav: true })
    console.log("🚀 ~ file: breedList.vue:22 ~ addToFavorite ~ res:", res)
    if (res.data.error) {
        snackbarText.value = 'Something went wrong, please try again'
        snackbar.value = true
    }
}
const expanded = ref(false)
const expandImg = ref(null)
const handleExpand = (img) => {
    expandImg.value = img
    expanded.value = true
}
const handleClose = () => {
    expanded.value = false
}



</script>
<template>
    <LoaderUI v-if="loading" />
    <div v-else>
        <ExpandUI v-if="expanded" :img="expandImg" @close="handleClose" />
        <v-snackbar v-model="snackbar" timeout="2000" centered class="bar-on-top">
            {{ snackbarText }}

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <h1 class="pt-3 pl-8 text-uppercase">{{ props.breed }}</h1>
        <div class="collection-container mt-5">
            <v-hover v-for="(breed, i) in breeds" :key="i" v-slot="{ isHovering, props }">
                <v-card class="dog-card" v-bind="props">
                    <img :src="breed" class="dog-img">
                    <v-expand-transition>
                        <div v-if="isHovering" class="d-flex transition-fast-in-fast-out bg-transparent v-card--reveal text-h2"
                            style="height: 30%;">
                            <div class="card-actions">
                                <v-tooltip location="top">
                                    <template v-slot:activator="{ props }">
                                        <v-btn @click="addToFavorite(breed)" icon="mdi-heart" v-bind="props" />
                                    </template>
                                    <span>Add to Favorite</span>
                                </v-tooltip>

                                <v-tooltip location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-btn icon="mdi-cart-plus" v-bind="props" />
                                    </template>
                                    <span>Adapt Dog</span>
                                </v-tooltip>

                                <v-tooltip location="top">
                                    <template v-slot:activator="{ props }">
                                        <v-btn @click="handleExpand(breed)" icon="mdi-arrow-expand-all" v-bind="props" />
                                    </template>
                                    <span>Expand</span>
                                </v-tooltip>
                            </div>
                        </div>
                    </v-expand-transition>
                </v-card>

            </v-hover>
        </div>
    </div>
</template>
<style scoped>
.card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: flex-end;
    opacity: .9;
    position: absolute;
    width: 100%;
    padding-right: 20px;
}

.dog-card {
    width: 300px;
    height: 200px;
}

.dog-img {
    width: 300px;
    height: 200px;
    object-fit: contain;
}

.collection-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 10px;
}
</style>