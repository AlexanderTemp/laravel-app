<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="outline" size="icon">
        <Sun v-show="appearance === 'light'" class="text-yellow-600" :size="15" />
        <Moon v-show="appearance === 'dark'" class="text-sky-600" :size="15" />
        <Monitor v-show="appearance === 'system'" :size="15" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuCheckboxItem
        v-for="mode in modes"
        :key="mode.value"
        v-model:model-value="mode.check"
        @update:model-value="() => updateAppearance(mode.value)"
      >
        {{ mode.label }}
      </DropdownMenuCheckboxItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem } from '../ui/dropdown-menu'
import { useAppearance, type Appearance } from '@/composables/useAppearance'
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-vue-next'
import { type DropdownMenuCheckboxItemProps } from 'reka-ui'
import { ref, watch } from 'vue'
import { Button } from '../ui/button'

type Checked = DropdownMenuCheckboxItemProps['modelValue']
const { appearance, updateAppearance } = useAppearance()

interface ThemeCheck {
  value: Appearance
  icon: LucideIcon
  label: string
  check: Checked
}

const modes = ref<ThemeCheck[]>([
  { value: 'light', icon: Sun, label: 'Claro', check: false },
  { value: 'dark', icon: Moon, label: 'Oscuro', check: false },
  { value: 'system', icon: Monitor, label: 'Sistema', check: false },
])

watch(
  appearance,
  () => {
    modes.value.forEach((mode) => {
      mode.check = mode.value === appearance.value
    })
  },
  { immediate: true },
)
</script>
