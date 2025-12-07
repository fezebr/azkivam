import type { Theme } from '@/models/ui.models';
import { ref, watchEffect } from 'vue';

export function useTheme() {
  const theme = ref<Theme>((localStorage.getItem('theme') as Theme) || 'dark');

  const applyTheme = (value: Theme) => {
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(value);
    localStorage.setItem('theme', value);
  };

  watchEffect(() => {
    applyTheme(theme.value);
  });

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  return { theme, toggleTheme };
}
