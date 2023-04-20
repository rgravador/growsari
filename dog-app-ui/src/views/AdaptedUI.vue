<script setup>
import { onBeforeMount, ref } from 'vue';
import _axios from '../plugins/axios';
import ExpandUI from '../components/expandUI.vue';
const adapted = ref([])
onBeforeMount(async () => {
    const res = await _axios.get('/dogs/adapted')
    console.log("🚀 ~ file: AdaptedUI.vue:8 ~ onBeforeMount ~ res:", res)
    adapted.value = res.data.data
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


</script>
<template>
    <div class="fav-main">
        <ExpandUI v-if="expanded" :img="expandImg" @close="handleClose" />
        <div class="no-favorite text-center" v-if="adapted.length < 1">
            <h1 class="fav-label pa-10">No Adapted dog</h1>
        </div>
        <div v-else>
            <h1 class="fav-label pa-10">Adapted Dogs</h1>
            <div class="my-flex">
                <v-hover v-for="(dog, i) in adapted" :key="i" v-slot="{ isHovering, props }">
                    <v-card class="dog-card" v-bind="props">
                        <img :src="dog.url" class="dog-img">
                        <v-expand-transition>
                            <div v-if="isHovering"
                                class="d-flex transition-fast-in-fast-out bg-transparent v-card--reveal text-h2"
                                style="height: 30%;">
                                <div class="card-actions">
                                    <v-tooltip location="top">
                                        <template v-slot:activator="{ props }">
                                            <v-icon @click="handleExpand(dog.url)" icon="mdi-arrow-expand-all"
                                            class="expand-icon"
                                                v-bind="props" />
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
    </div>
</template>
<style scoped>
.expand-icon {
    height: 10px !important;
    width: 10px !important;
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