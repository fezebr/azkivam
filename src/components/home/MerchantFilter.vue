<template>
  <div class="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">
    <h3 class="text-sm sm:text-base font-semibold dark-text mb-2">فروشگاه ها</h3>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="جستجوی فروشگاه..."
      class="w-full px-3 py-2 mb-4 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 dark-text focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div class="space-y-2 merchant-container">
      <label
        v-for="merchant in filteredMerchants"
        :key="merchant.id"
        class="flex items-center gap-2 cursor-pointer py-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        :class="isMerchantSelected(merchant.id) ? 'text-blue-600 dark:text-blue-400' : 'dark-text'"
      >
        <input
          type="checkbox"
          :checked="isMerchantSelected(merchant.id)"
          @change="selectMerchant(merchant.id)"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
        />
        <span class="text-sm flex-1">{{ merchant.name }}</span>
      </label>
      <p
        v-if="filteredMerchants.length === 0"
        class="text-sm text-gray-500 dark:text-gray-400 text-center py-2"
      >
        فروشگاهی یافت نشد
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import { getMerchants } from '@/apis/merchant.apis'
import type { Merchant } from '@/models/merchants/merchants.models'

const props = defineProps<{
  merchantIds?: number[]
}>()

const emit = defineEmits<{
  'update:merchantIds': [merchantIds: number[]]
}>()

const merchants = ref<Merchant[]>([])
const searchQuery = ref('')
const selectedMerchantIds = computed({
  get: () => props.merchantIds || [],
  set: (value) => emit('update:merchantIds', value),
})

const fetchMerchants = async () => {
  try {
    const merchantsList = await getMerchants()
    merchants.value = merchantsList.data || []
  } catch (error) {
    console.error('Error fetching merchants:', error)
    merchants.value = []
  }
}

const selectMerchant = (id: number) => {
  const currentIds = [...selectedMerchantIds.value]
  const index = currentIds.indexOf(id)
  if (index > -1) {
    currentIds.splice(index, 1)
  } else {
    currentIds.push(id)
  }
  selectedMerchantIds.value = currentIds
}

const isMerchantSelected = (id: number) => selectedMerchantIds.value.includes(id)

const filteredMerchants = computed(() => {
  if (!searchQuery.value.trim()) {
    return merchants.value
  }
  const query = searchQuery.value.toLowerCase().trim()
  return merchants.value.filter((merchant) => merchant.name.toLowerCase().includes(query))
})

onBeforeMount(fetchMerchants)
</script>

<style scoped>
.merchant-container {
  height: 250px;
  overflow: scroll;
}
</style>
