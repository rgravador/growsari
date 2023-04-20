<script setup>
import { ref, defineProps, defineEmits } from 'vue';
const props = defineProps({
    img: String
})
const emit = defineEmits(['close'])
const dialog = ref(true)
</script>
<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="auto" class="text-center">
            <v-card class="text-center">
                <v-icon @click="emit('close')" icon="mdi-close-circle" class="close-btn cursor"/>
                <img :src="props.img" class="expand-img">
            </v-card>
        </v-dialog>
    </div>
</template>
<style scoped>
.v-dialog>.v-overlay__content>.v-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.expand-img {
    width: 70%;
    height: 60%;
    object-fit: contain;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 200;
}
</style>