<template>
  <aside
    class="w-full lg:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 h-fit lg:sticky lg:top-4 flex-shrink-0"
  >
    <h2 class="text-base sm:text-lg font-bold dark-text mb-3 sm:mb-4">فیلترها</h2>

    <div class="space-y-3 sm:space-y-4">
      <CategoryFilter @category-change="handleCategoryChange" />
      <MerchantFilter @merchant-change="handleMerchantChange" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import CategoryFilter from './CategoryFilter.vue'
import MerchantFilter from './MerchantFilter.vue'

const emit = defineEmits<{
  categoryChange: [categoryId: number | undefined]
  merchantChange: [merchantIds: number[]]
}>()

const handleCategoryChange = (categoryId: number | undefined) => {
  emit('categoryChange', categoryId)
}

const handleMerchantChange = (merchantIds: number[]) => {
  emit('merchantChange', merchantIds)
}
</script>
