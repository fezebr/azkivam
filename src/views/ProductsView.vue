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
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductList from '@/components/home/ProductList.vue'
import FilterSidebar from '@/components/home/FilterSidebar.vue'

const route = useRoute()
const router = useRouter()

const selectedCategoryId = ref<number | undefined>(undefined)
const selectedMerchantIds = ref<number[]>([])

const parseQueryParams = () => {
  const categoryIdParam = route.query.categoryId
  const merchantIdsParam = route.query.merchantIds

  if (categoryIdParam) {
    const categoryId = Number(categoryIdParam)
    if (!isNaN(categoryId)) {
      selectedCategoryId.value = categoryId
    } else {
      selectedCategoryId.value = undefined
    }
  } else {
    selectedCategoryId.value = undefined
  }

  if (merchantIdsParam) {
    const merchantIds = Array.isArray(merchantIdsParam)
      ? merchantIdsParam.map((id) => Number(id)).filter((id) => !isNaN(id))
      : merchantIdsParam
          .split(',')
          .map((id) => Number(id.trim()))
          .filter((id) => !isNaN(id))
    selectedMerchantIds.value = merchantIds
  } else {
    selectedMerchantIds.value = []
  }
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

watch(
  [selectedCategoryId, selectedMerchantIds],
  ([categoryId, merchantIds]) => {
    const query: Record<string, string | undefined> = {}

    if (categoryId !== undefined) {
      query.categoryId = String(categoryId)
    }

    if (merchantIds && merchantIds.length > 0) {
      query.merchantIds = merchantIds.join(',')
    }

    router.replace({
      query,
    })
  },
  { deep: true },
)
</script>
