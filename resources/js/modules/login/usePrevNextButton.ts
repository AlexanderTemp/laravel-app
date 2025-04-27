// usePrevNextButtons.ts
import { ref, watchEffect } from 'vue'
import type { EmblaCarouselType } from 'embla-carousel'

export function usePrevNextButtons(emblaApi: EmblaCarouselType | undefined, onButtonClick?: (emblaApi: EmblaCarouselType) => void) {
  const prevBtnDisabled = ref(true)
  const nextBtnDisabled = ref(true)

  const onPrevButtonClick = () => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }

  const onNextButtonClick = () => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }

  const onSelect = (emblaApi: EmblaCarouselType) => {
    prevBtnDisabled.value = !emblaApi.canScrollPrev()
    nextBtnDisabled.value = !emblaApi.canScrollNext()
  }

  watchEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  })

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}
