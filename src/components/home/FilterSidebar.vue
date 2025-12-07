<template>
  <aside
    class="w-full lg:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 h-fit lg:sticky lg:top-4 flex-shrink-0"
  >
    filters
  </aside>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getCategories } from '@/apis/category.apis'
import type { Category } from '@/models/categories/categories.models'

const categories = ref<Category[]>([])
const loading = ref(false)
// const error = ref<string | null>(null)

const fetchCategory = async () => {
  loading.value = true

  try {
    const { data } = await getCategories()

    categories.value = data
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await fetchCategory()
})
</script>
