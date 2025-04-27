<template>
  <div :v-show="CONSTANT.env == 'development'" class="absolute right-2 bottom-2 z-50">
    <Badge class="xl:block">
      <p class="block sm:hidden">xs</p>
      <p class="hidden sm:block md:hidden">sm</p>
      <p class="hidden md:block lg:hidden">md</p>
      <p class="hidden lg:block xl:hidden">lg</p>
      <p class="hidden xl:block 2xl:hidden">xl</p>
      <p class="hidden 2xl:block">2xl</p>
    </Badge>
  </div>
</template>

<script setup lang="ts">
import { CONSTANT } from '@/lib/config'
import { Badge } from '../ui/badge'
</script>
