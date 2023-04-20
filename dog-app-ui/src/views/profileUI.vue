<script setup>
import { useUser } from '../stores/user';
import AdaptedUI from './AdaptedUI.vue';
import FavoritesUI from './favoritesUI.vue';
const { user } = useUser();
console.log("🚀 ~ file: profileUI.vue:5 ~ user:", user)
</script>

<template>
    <div>
        <div class="me">
            <v-icon class="profile-icon">mdi-account-circle</v-icon>
            <h1>{{ user.name }}</h1>
        </div>
        <FavoritesUI />
        <AdaptedUI />
    </div>
</template>
<style scoped>
.profile-icon {
    font-size: 100px;
}
.me {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
}
</style>