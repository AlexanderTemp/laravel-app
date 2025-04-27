import '../css/app.css'

import { createInertiaApp } from '@inertiajs/vue3'
import MainLayout from './layouts/MainLayout.vue'
import type { DefineComponent } from 'vue'
import { createApp, h } from 'vue'
import { ZiggyVue } from 'ziggy-js'
import { initializeTheme } from './composables/useAppearance'

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_APP_NAME: string
    [key: string]: string | boolean | undefined
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
    readonly glob: <T>(pattern: string) => Record<string, () => Promise<T>>
  }
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob<DefineComponent>('./pages/**/*.vue', { eager: true })
    const page = pages[`./pages/${name}.vue`]
    page.default.layout = page.default.layout || MainLayout
    return page
    // NOTICE: Se usaba esta versión cuando no se tenía un global layout
    // resolvePageComponent(`./pages/${name}.vue`, import.meta.glob<DefineComponent>('./pages/**/*.vue'));
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue)
      .mount(el)
  },
  progress: {
    color: '#4B5563',
  },
})

// This will set light / dark mode on page load...
initializeTheme()
