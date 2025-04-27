<template>
  <div class="bg-foreground text-background h-full overflow-hidden rounded-md" ref="emblaRef">
    <div class="flex">
      <div class="w-full min-w-0 flex-none" v-for="slide in slides" :key="slide.key">
        <div class="flex h-full w-full flex-col justify-between rounded-sm p-4">
          <div class="flex items-center justify-center">
            <img
              :src="'/assets/' + slide.image"
              :alt="slide.title"
              :style="{
                width: '90%',
                height: '85%',
              }"
            />
          </div>
          <div class="flex flex-col gap-1">
            <p class="text-xl font-semibold">{{ slide.title }}</p>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex gap-1"></div>
      <div class="flex"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ILoginSlides } from '@/types/login'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import emblaCarouselVue from 'embla-carousel-vue'

const { options } = defineProps<{
  options?: EmblaOptionsType
  slides: ILoginSlides[]
}>()

const [emblaRef] = emblaCarouselVue(options, [Autoplay()])
</script>
