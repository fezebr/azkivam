<template>
  <main class="min-h-screen dark-text max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
    <div class="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:flex-row-reverse">
      <ProductList
        :selected-category-id="categoryIdNumber"
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
import { ref, computed, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductList from '@/components/home/ProductList.vue'
import FilterSidebar from '@/components/home/FilterSidebar.vue'

interface Props {
  categoryId: string
  slug: string
}

const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const categoryIdNumber = computed(() => Number(props.categoryId))
const selectedCategoryId = ref<number | undefined>(undefined)
const selectedMerchantIds = ref<number[]>([])

const parseQueryParams = () => {
  const merchantIdsParam = route.query.merchantIds

  // Set categoryId from route param
  selectedCategoryId.value = categoryIdNumber.value

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

const handleCategorySelect = (categoryId: number, slug: string) => {
  router.push({
    name: 'category-products',
    params: {
      categoryId: String(categoryId),
      slug: slug,
    },
    query: route.query,
  })
}

onBeforeMount(() => {
  parseQueryParams()
})

watch(
  () => [route.params, route.query],
  () => {
    parseQueryParams()
  },
  { deep: true },
)

watch(
  [selectedMerchantIds],
  ([merchantIds]) => {
    const query: Record<string, string | undefined> = {}

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
