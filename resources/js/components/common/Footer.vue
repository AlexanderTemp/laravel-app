<template>
  <div class="flex flex-col items-center justify-between gap-1 border-t px-3 py-4 xl:flex-row xl:gap-0 xl:px-12">
    <Logo />
    <div class="flex flex-col items-center gap-2 xl:flex-row xl:gap-4">
      <Button variant="link">Términos</Button>
      <Button variant="link">Privacidad</Button>
      <Button variant="link">Soporte</Button>
      <Button variant="link">Contacto</Button>
    </div>
    <p class="text-primary">©{{ ActualYear }} {{ CONSTANT.name }} v.{{ CONSTANT.version }}</p>
  </div>
</template>

<script setup lang="ts">
import { CONSTANT } from '@/lib/config'
import Logo from './Logo.vue'
import Button from '../ui/button/Button.vue'

const ActualYear = new Date().getFullYear()
</script>
