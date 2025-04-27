<template>
  <Head title="Login" />
  <Particles />
  <div class="relative flex min-h-[100dvh] flex-col justify-between">
    <div class="flex items-center justify-end px-3 pt-4 xl:px-12">
      <ThemeToggler />
    </div>
    <div class="grid flex-1 place-items-center">
      <div class="xl:w-[850px]">
        <motion.div :initial="{ scale: 1.2 }" :while-in-view="{ scale: 1 }" :transition="{ type: 'spring', durtion: 1 }">
          <Card class="!bg-transparent p-0 !backdrop-blur-sm xl:h-[550px]">
            <div class="grid h-full grid-cols-1 xl:grid-cols-2">
              <div class="pt-2 pb-2 pl-2">
                <LoginCarrousel :slides="SLIDES" />
              </div>
              <LoginForm />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/modules/login/LoginForm.vue'
import LoginCarrousel from '@/modules/login/LoginCarrousel.vue'
import Particles from '@/modules/login/Particles.vue'
import { Head } from '@inertiajs/vue3'
import ThemeToggler from '@/components/utils/ThemeToggler.vue'
import Footer from '@/components/common/Footer.vue'
import Card from '@/components/ui/card/Card.vue'
import { motion } from 'motion-v'
import { ILoginSlides } from '@/types/login'

const SLIDES: ILoginSlides[] = [
  {
    key: 'slide-data-1',
    image: 'carrusel-1.svg',
    title: 'Control total sobre tus auditorías',
    description: 'Centraliza toda la información de tus auditorías en un solo lugar.',
  },
  {
    key: 'slide-data-2',
    image: 'carrusel-2.svg',
    title: 'Gestión eficiente de usuarios y equipos',
    description: 'Asigna roles, define permisos y organiza equipos de trabajo para optimizar cada etapa del proceso de auditoría.',
  },
  {
    key: 'slide-data-3',
    image: 'carrusel-3.svg',
    title: 'Reportes claros y automatizados',
    description: 'Comparte resultados, detecta patrones y mejora continuamente tus procesos.',
  },
]
</script>
