<template>
  <main class="min-h-screen dark-text max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:flex-row-reverse">
      <ProductList
        :selected-category-id="selectedCategoryId"
        :selected-merchant-ids="selectedMerchantIds"
      />
      <FilterSidebar
        v-model:category-id="selectedCategoryId"
        v-model:merchant-ids="selectedMerchantIds"
        @select-category="handleCategorySelect"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductList from '@/components/home/ProductList.vue'
import FilterSidebar from '@/components/home/FilterSidebar.vue'
import {
  parseMerchantIdsFromQuery,
  buildMerchantQuery,
  navigateToCategoryProducts,
  navigateToProducts,
} from '@/services/products.service'

const route = useRoute()
const router = useRouter()

const selectedCategoryId = ref<number | undefined>(undefined)
const selectedMerchantIds = ref<number[]>([])

const parseQueryParams = () => {
  selectedMerchantIds.value = parseMerchantIdsFromQuery(route.query)
}

const handleCategorySelect = (categoryId: number, slug: string) => {
  navigateToCategoryProducts(router, route, categoryId, slug)
}

onBeforeMount(() => {
  parseQueryParams()
})

watch(
  () => route.query,
  () => {
    parseQueryParams()
  },
  { deep: true },
)

watch(selectedCategoryId, (categoryId) => {
  if (categoryId === undefined) {
    navigateToProducts(router, route)
  }
})

watch(selectedMerchantIds, (merchantIds) => {
  const query = buildMerchantQuery(merchantIds)
  router.replace({
    query,
  })
})
</script>
