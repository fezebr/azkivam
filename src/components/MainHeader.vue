<template>
  <header
    class="py-3 sm:py-6 flex justify-between items-center shadow-md px-3 sm:px-4 md:px-16 light-background"
  >
    <h1 class="text-base sm:text-lg font-bold">ازکی وام</h1>
    <button
      class="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold cursor-pointer dark-text"
      @click="toggleTheme"
    >
      <span class="text-base sm:text-lg">{{ theme === 'light' ? '☀️' : '🌙' }}</span>
      <span class="hidden sm:inline">{{ theme === 'light' ? 'تم تیره' : 'تم روشن' }}</span>
    </button>
  </header>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme.composable'
const { theme, toggleTheme } = useTheme()
</script>
