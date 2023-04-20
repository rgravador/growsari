<script setup>
import { RouterView, useRouter } from 'vue-router';
import { useUser } from './stores/user'
const { hasToken, logout } = useUser()
const router = useRouter();
const LoggingOut = () => {
  logout();
  router.push('/');
}
</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" v-if="hasToken()">
      <template v-slot:prepend>
        <h1 @click="router.push('/collections')" class="pl-10 cursor">Dog Lovers Hub</h1>
      </template>
      <template v-slot:append>

        <v-btn icon="mdi-account" @click="router.push('/account')"></v-btn>

        <v-btn icon="mdi-logout" @click="LoggingOut"></v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
