<template>
  <div class="flex flex-col p-2">
    <div class="flex items-center justify-end">
      <div class="flex items-center gap-1">
        <p>¿Sin cuenta?</p>
        <Button variant="ghost" class="px-1 text-base">Contáctanos</Button>
      </div>
    </div>
    <div class="w-full flex-1">
      <form @submit="onSubmit" class="flex h-full w-full items-center justify-center">
        <div class="flex w-full flex-col gap-5">
          <div class="flex flex-col items-center">
            <h3 class="text-2xl font-semibold">Bienvenido</h3>
            <p>LLena tus datos para ingresar</p>
          </div>
          <div class="mx-12 flex flex-col gap-1">
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel> Usuario</FormLabel>
                <FormControl>
                  <Input type="text" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="username">
              <FormItem>
                <FormLabel> Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="flex justify-end">
              <Button variant="ghost">¿Olvidó su contraseña?</Button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="mx-12 mb-8">
      <motion.div :while-hover="{ scale: 1.05 }" :while-press="{ scale: 1 }">
        <Button class="w-full">Iniciar sesión</Button>
      </motion.div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import Input from '@/components/ui/input/Input.vue'
import { toTypedSchema } from '@vee-validate/zod'
import { motion } from 'motion-v'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  }),
)

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted', values)
})
</script>
