<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col"
  >
    <div
      class="aspect-square bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden"
    >
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full h-full object-contain p-2 sm:p-4"
      />
    </div>
    <div class="p-2 sm:p-4 flex-1 flex flex-col">
      <h3
        class="text-xs sm:text-sm font-medium dark-text mb-1 sm:mb-2 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] flex-1"
      >
        {{ product.name }}
      </h3>
      <p class="text-sm sm:text-md text-blue-600 dark:text-blue-400 mt-auto">
        <span> شروع قیمت از </span>
        <span class="font-bold">
          {{ formatPrice(product.minPrice) }}
        </span>

        <span class="text-xs sm:text-sm font-medium dark-text">تومان</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/models/products/product.models'

defineProps<{
  product: Product
}>()

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fa-IR').format(price)
}
</script>
