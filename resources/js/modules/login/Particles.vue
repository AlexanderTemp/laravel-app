<template>
  <canvas ref="canvasRef" class="absolute inset-0 z-0" :style="{ backgroundColor }" />
</template>

<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance'
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  opacity: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
const animationFrameId = ref<number>(0)
const mousePosition = ref({ x: 0, y: 0 })
const dimensions = ref({ width: 0, height: 0 })
const { appearance } = useAppearance()

const backgroundColor = computed(() => 'rgba(255, 255, 255, 0.0)')

function initParticles() {
  const canvas = canvasRef.value
  if (!canvas) return
  const { width, height } = canvas

  particles.value = []
  for (let i = 0; i < 100; i++) {
    particles.value.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 10 + 1,
      color: appearance.value === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.2)',
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.2,
    })
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas || !canvas.parentElement) return

  const { width, height } = canvas.parentElement.getBoundingClientRect()
  canvas.width = width
  canvas.height = height
  dimensions.value = { width, height }
  initParticles()
}

function animateParticles() {
  const canvas = canvasRef.value
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) return

  ctx.clearRect(0, 0, dimensions.value.width, dimensions.value.height)

  particles.value.forEach((particle, i) => {
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.globalAlpha = particle.opacity
    ctx.fill()

    particle.x += particle.speedX
    particle.y += particle.speedY

    if (particle.x < 0 || particle.x > dimensions.value.width) particle.speedX *= -1
    if (particle.y < 0 || particle.y > dimensions.value.height) particle.speedY *= -1

    for (let j = i + 1; j < particles.value.length; j++) {
      const dx = particles.value[j].x - particle.x
      const dy = particles.value[j].y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(particles.value[j].x, particles.value[j].y)
        ctx.strokeStyle =
          appearance.value === 'dark' ? `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})` : `rgba(37, 99, 235, ${0.05 * (1 - distance / 100)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    // mouse interaction
    const dx = mousePosition.value.x - particle.x
    const dy = mousePosition.value.y - particle.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 150

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance
      const angle = Math.atan2(dy, dx)
      const targetX = particle.x - Math.cos(angle) * force * 2
      const targetY = particle.y - Math.sin(angle) * force * 2
      particle.x += (targetX - particle.x) * 0.05
      particle.y += (targetY - particle.y) * 0.05
    }
  })

  animationFrameId.value = requestAnimationFrame(animateParticles)
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', (e: MouseEvent) => {
    const canvas = canvasRef.value
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mousePosition.value = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  })
  animateParticles()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)
})
</script>
