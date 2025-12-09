<template>
  <div ref="containerRef" class="flex-1 w-full overflow-auto">
    <div
      v-if="loading && products.length === 0"
      class="flex justify-center items-center min-h-[300px] sm:min-h-[400px]"
    >
      <p class="text-base sm:text-lg dark-text">در حال بارگذاری...</p>
    </div>

    <div
      v-else-if="error"
      class="flex justify-center items-center min-h-[300px] sm:min-h-[400px] px-4"
    >
      <p class="text-base sm:text-lg text-red-600 dark:text-red-400 text-center">{{ error }}</p>
    </div>

    <div
      v-else-if="products.length > 0"
      class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4"
    >
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <div v-else class="flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
      <p class="text-base sm:text-lg dark-text">محصولی یافت نشد</p>
    </div>

    <div v-if="loading && products.length > 0" class="flex justify-center items-center my-4">
      <p class="text-base sm:text-lg dark-text">در حال بارگذاری بیشتر...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import ProductCard from '@/components/home/ProductCard.vue'
import { getProducts } from '@/apis/product.apis'
import type { Product } from '@/models/products/product.models'

const props = defineProps<{
  selectedCategoryId?: number
  selectedMerchantIds?: number[]
}>()

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = ref(20)
const containerRef = ref<HTMLElement | null>(null)
const hasMore = ref(true)

const fetchProducts = async (append = false) => {
  if (!hasMore.value) return

  loading.value = true
  error.value = null

  try {
    const response = await getProducts({
      size: pageSize.value,
      page: currentPage.value,
      categoryId: props.selectedCategoryId,
      merchantIds: props.selectedMerchantIds || [],
    })

    const filtered = response.data.filter((p) => !p.hidden && p.available)

    if (append) {
      products.value.push(...filtered)
    } else {
      products.value = filtered
    }

    if (filtered.length < pageSize.value) {
      hasMore.value = false
    } else {
      currentPage.value++
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'خطا در دریافت محصولات'
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.selectedCategoryId, props.selectedMerchantIds],
  () => {
    currentPage.value = 1
    hasMore.value = true
    fetchProducts()
  },
  { deep: true },
)

// Initial fetch
onBeforeMount(async () => {
  await fetchProducts()
})

useInfiniteScroll(
  containerRef,
  async () => {
    await fetchProducts(true)
  },
  {
    distance: 200,
    disabled: loading,
  },
)
</script>
