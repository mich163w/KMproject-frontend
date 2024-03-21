<script setup lang="ts">

</script>

<template>


  <div>
    <nav>
      <router-link to="/">Home</router-link> 
      <router-link to="/todo">Todo</router-link>
    </nav>
    <router-view />
  </div>

</template>

<style scoped>

nav {
  display: flex;
  justify-content: space-around;
 color: white;
}
.logo {
  height: 6em; 
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #e1e1e9aa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
