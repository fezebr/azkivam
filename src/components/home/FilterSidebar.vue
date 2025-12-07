<template>
  <aside
    class="w-full lg:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 h-fit lg:sticky lg:top-4 flex-shrink-0"
  >
    <h2 class="text-base sm:text-lg font-bold dark-text mb-3 sm:mb-4">فیلترها</h2>

    <div class="space-y-3 sm:space-y-4">
      <CategoryFilter v-model:category-id="categoryId" />
      <MerchantFilter v-model:merchant-ids="merchantIds" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CategoryFilter from './CategoryFilter.vue'
import MerchantFilter from './MerchantFilter.vue'

const props = defineProps<{
  categoryId?: number
  merchantIds?: number[]
}>()

const emit = defineEmits<{
  'update:categoryId': [categoryId: number | undefined]
  'update:merchantIds': [merchantIds: number[]]
}>()

const categoryId = computed({
  get: () => props.categoryId,
  set: (value) => emit('update:categoryId', value),
})

const merchantIds = computed({
  get: () => props.merchantIds || [],
  set: (value) => emit('update:merchantIds', value),
})
</script>
