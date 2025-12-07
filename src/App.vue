<template>
  <MainHeader />
  <div class="dark-background">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import MainHeader from './components/MainHeader.vue'
</script>
