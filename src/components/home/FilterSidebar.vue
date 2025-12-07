<template>
  <aside
    class="w-full lg:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 h-fit lg:sticky lg:top-4 flex-shrink-0"
  >
    <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
      <p class="text-sm dark-text">در حال بارگذاری...</p>
    </div>
    <div v-else class="w-full">
      <h2 class="text-base sm:text-lg font-bold dark-text mb-3 sm:mb-4">فیلترها</h2>

      <div class="space-y-3 sm:space-y-4">
        <div>
          <h3 class="text-sm sm:text-base font-semibold dark-text mb-2">دسته بندی ها</h3>
          <div class="space-y-2">
            <div
              v-for="category in categoryTree"
              :key="category.id"
              class="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0"
            >
              <button
                @click="toggleCategory(category.id)"
                class="w-full flex items-center justify-between text-sm dark-text hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
              >
                <span>{{ category.name }}</span>
                <span class="text-xs" v-if="category.children && category.children.length > 0">
                  {{ expanded === category.id ? '▲' : '▼' }}
                </span>
              </button>
              <div
                v-if="expanded === category.id && category.children && category.children.length > 0"
                class="mt-2 space-y-1 pr-4"
              >
                <button
                  v-for="child in category.children"
                  :key="child.id"
                  @click="selectCategory(child.id)"
                  :class="[
                    'w-full text-right text-xs dark-text hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1',
                    isSelected(child.id) ? 'text-blue-600 dark:text-blue-400 font-semibold' : '',
                  ]"
                >
                  {{ child.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">
          <h3 class="text-sm sm:text-base font-semibold dark-text mb-2">فروشگاه ها</h3>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getCategories } from '@/apis/category.apis'
import type { Category, CategoryWithChildren } from '@/models/categories/categories.models'

const categoryTree = ref<CategoryWithChildren[]>([])
const loading = ref(false)

const emit = defineEmits<{
  categoryChange: [categoryId: number | undefined]
}>()

const expanded = ref<number | undefined>(undefined)
const selectedCategoryId = ref<number | undefined>(undefined)

const fetchCategories = async () => {
  loading.value = true
  try {
    const categoriesList = await getCategories()
    categoryTree.value = buildCategoryTree(categoriesList.data)
  } finally {
    loading.value = false
  }
}

const toggleCategory = (id: number) => {
  if (expanded.value === id) {
    expanded.value = undefined
  } else {
    expanded.value = id
  }
}

const selectCategory = (id: number) => {
  if (selectedCategoryId.value === id) {
    selectedCategoryId.value = undefined
  } else {
    selectedCategoryId.value = id
  }
  emit('categoryChange', selectedCategoryId.value)
}

const isSelected = (id: number) => selectedCategoryId.value === id

function buildCategoryTree(categories: Category[]): CategoryWithChildren[] {
  const enabledCategories = categories.filter((c) => c.enabled)

  const map = new Map<number, CategoryWithChildren>(
    enabledCategories.map((c) => [c.id, { ...c, children: [] }]),
  )

  const roots: CategoryWithChildren[] = []

  for (const cat of map.values()) {
    if (cat.parent === null) {
      roots.push(cat)
    } else {
      const parent = map.get(cat.parent)
      parent?.children?.push(cat)
    }
  }

  const sortTree = (nodes: CategoryWithChildren[]) => {
    nodes.sort((a, b) => b.priority - a.priority)
    nodes.forEach((n) => n.children && sortTree(n.children))
  }

  sortTree(roots)
  return roots
}

onBeforeMount(fetchCategories)
</script>
