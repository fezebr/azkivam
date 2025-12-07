<template>
  <main class="min-h-screen dark-text max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:flex-row-reverse">
      <ProductList />
      <FilterSidebar />
    </div>
  </main>
</template>

<script setup lang="ts">
import ProductList from '@/components/home/ProductList.vue'
import FilterSidebar from '@/components/home/FilterSidebar.vue'
</script>
