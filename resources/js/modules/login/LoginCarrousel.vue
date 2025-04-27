<template>
  <div class="bg-foreground text-background flex h-full flex-col overflow-hidden rounded-md" ref="emblaRef">
    <div class="flex-1">
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
    </div>

    <div class="flex items-center justify-between p-2">
      <div class="flex gap-1">
        <Button variant="ghost" size="icon" :onclick="onPrevButtonClick" :disabled="prevBtnDisabled">
          <ChevronLeft />
        </Button>
        <Button variant="ghost" size="icon" :onclick="onNextButtonClick" :disabled="nextBtnDisabled">
          <ChevronRight />
        </Button>
      </div>
      <div class="flex gap-1"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { ILoginSlides } from '@/types/login'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import emblaCarouselVue from 'embla-carousel-vue'
import { usePrevNextButtons } from './usePrevNextButton'

const { options } = defineProps<{
  options?: EmblaOptionsType
  slides: ILoginSlides[]
}>()

const [emblaRef, emblaApi] = emblaCarouselVue(options, [Autoplay()])

const onNavButtonClick = (emblaApi: EmblaCarouselType) => {
  const autoplay = emblaApi?.plugins()?.autoplay
  if (!autoplay) return

  const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop

  resetOrStop()
}

const { nextBtnDisabled, onNextButtonClick, onPrevButtonClick, prevBtnDisabled } = usePrevNextButtons(emblaApi.value, onNavButtonClick)
</script>
