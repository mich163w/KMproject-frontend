<script setup lang="ts">

</script>

<template>


  <div style="
    display: flex;
">
    <nav>
      <router-link to="/">Home</router-link> 
      <router-link to="/todo">Todo</router-link>
      <router-link to="/profile"></router-link>
    </nav>
    <router-view />
  </div>

</template>

<style scoped>

nav {
  display: none;
  justify-content: space-around;
 color: white;
}

</style>
