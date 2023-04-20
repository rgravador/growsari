<script setup>
import { onBeforeMount, ref } from 'vue';
import _axios from '../plugins/axios';
import ExpandUI from '../components/expandUI.vue';
const favorites = ref([])
onBeforeMount(async () => {
    const res = await _axios.get('/dogs/favorites')
    console.log("🚀 ~ file: favoritesUI.vue:7 ~ onBeforeMount ~ res:", res)
    favorites.value = res.data.data
})

const expanded = ref(false)
const expandImg = ref(null)
const handleExpand = (img) => {
    expandImg.value = img
    expanded.value = true
}
const handleClose = () => {
    expanded.value = false
}

const removeFromFav = async (dog) => {
    try {
        const res = await _axios.delete(`/dogs/remove-from-favorite/${dog._id}`)
        console.log("🚀 ~ file: favoritesUI.vue:26 ~ removeFromFav ~ res:", res)
        if (res.data.error) {
            snackbarText.value = 'Something went wrong, Please try again later'
            snackbar.value = true
        } else {
            favorites.value.splice(favorites.value.indexOf(dog), 1)
        }
    } catch (error) {
        console.log("🚀 ~ file: favoritesUI.vue:26 ~ removeFromFav ~ error:", error)
    }
}

const adaptAdog = async (image) => {
    try {
        const res = await _axios.post(`/dogs/adapt`, { image: image })
        console.log("🚀 ~ file: favoritesUI.vue:26 ~ removeFromFav ~ res:", res)
        if (res.data.error) {
            snackbarText.value = 'Something went wrong, Please try again later'
            snackbar.value = true
        } else {
            favorites.value.splice(favorites.value.indexOf(image), 1)
        }
    } catch (error) {
        console.log("🚀 ~ file: favoritesUI.vue:26 ~ removeFromFav ~ error:", error)
    }
}

const snackbar = ref(false)
const snackbarText = ref('')
</script>
<template>
    <div class="fav-main">
        <v-snackbar v-model="snackbar" timeout="2000" centered class="bar-on-top">
            {{ snackbarText }}

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
        <ExpandUI v-if="expanded" :img="expandImg" @close="handleClose" />
        <div class="no-favorite text-center" v-if="favorites.length < 1">
            <h1 class="fav-label pa-10">No Favorites</h1>
        </div>
        <div v-else>
            <h1 class="fav-label pa-10">Favorites Dogs</h1>
            <div class="my-flex">
                <v-hover v-for="(dog, i) in favorites" :key="i" v-slot="{ isHovering, props }">
                    <v-card class="dog-card" v-bind="props">
                        <img :src="dog.url" class="dog-img">
                        <v-expand-transition>
                            <div v-if="isHovering"
                                class="d-flex transition-fast-in-fast-out bg-transparent v-card--reveal text-h2"
                                style="height: 30%;">
                                <div class="card-actions">
                                    <div class="left">
                                        <v-tooltip location="top">
                                            <template v-slot:activator="{ props }">
                                                <v-btn @click="removeFromFav(dog)" icon="mdi-delete" v-bind="props" />
                                            </template>
                                            <span>Remove from Favorite</span>
                                        </v-tooltip>
                                    </div>
                                    <div class="right">
                                        <v-tooltip location="bottom">
                                            <template v-slot:activator="{ props }">
                                                <v-btn @click="adaptAdog(dog.url)" icon="mdi-cart-plus" v-bind="props" />
                                            </template>
                                            <span>Adapt Dog</span>
                                        </v-tooltip>

                                        <v-tooltip location="top">
                                            <template v-slot:activator="{ props }">
                                                <v-btn @click="handleExpand(dog.url)" icon="mdi-arrow-expand-all"
                                                    v-bind="props" />
                                            </template>
                                            <span>Expand</span>
                                        </v-tooltip>
                                    </div>
                                </div>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-hover>
            </div>
        </div>
    </div>
</template>
<style scoped>
.fav-main {
    width: 90% !important;
}

.my-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.card-actions {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 10px;
}

.card-actions .right {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.card-actions .left {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
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
</style>