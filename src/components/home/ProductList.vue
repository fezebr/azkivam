<template>
  <div class="flex-1 w-full">
    <div v-if="loading" class="flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue'
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

const fetchProducts = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await getProducts({
      size: pageSize.value,
      page: currentPage.value,
      categoryId: props.selectedCategoryId,
      merchantIds: props.selectedMerchantIds || [],
    })

    products.value = response.data.filter((p) => !p.hidden && p.available)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'خطا در دریافت محصولات'
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.selectedCategoryId, props.selectedMerchantIds],
  () => {
    fetchProducts()
  },
  { deep: true },
)

onBeforeMount(async () => {
  await fetchProducts()
})
</script>
