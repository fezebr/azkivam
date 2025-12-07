<template>
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
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { getCategories } from '@/apis/category.apis'
import type { Category, CategoryWithChildren } from '@/models/categories/categories.models'

const categoryTree = ref<CategoryWithChildren[]>([])
const expanded = ref<number | undefined>(undefined)
const selectedCategoryId = ref<number | undefined>(undefined)

const emit = defineEmits<{
  categoryChange: [categoryId: number | undefined]
}>()

const fetchCategories = async () => {
  try {
    const categoriesList = await getCategories()
    categoryTree.value = buildCategoryTree(categoriesList.data)
  } catch (error) {
    console.error('Error fetching categories:', error)
    categoryTree.value = []
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

