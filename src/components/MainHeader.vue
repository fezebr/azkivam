<template>
  <header class="py-6 flex justify-between items-center shadow-md px-4 md:px-16 light-background">
    <h1 class="text-lg font-bold">ازکی وام</h1>
    <button
      class="flex items-center gap-2 text-sm font-semibold cursor-pointer dark-text"
      @click="toggleTheme"
    >
      <span class="text-lg">{{ theme === 'light' ? '☀️' : '🌙' }}</span>
      <span>{{ theme === 'light' ? 'تم تیره' : 'تم روشن' }}</span>
    </button>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme.composable'
const { theme, toggleTheme } = useTheme()
</script>
