<template>
  <div class="flex items-center gap-1">
    <div class="bg-primary flex items-center justify-center rounded-sm p-1">
      <img src="/assets/logo-white.svg" width="20px" alt="logo image" />
    </div>
    <p v-if="variant == 'normal'" class="text-primary text-lg font-bold">Sis<span class="text-gray-500">Audit</span></p>
  </div>
</template>

<script lang="ts" setup>
const { variant } = withDefaults(
  defineProps<{
    variant?: 'small' | 'normal'
  }>(),
  {
    variant: 'normal',
  },
)
</script>
