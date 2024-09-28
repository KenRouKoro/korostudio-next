// .vitepress/theme/index.js

import { defineComponent, h, inject } from 'vue'
import {
  NConfigProvider ,
  NGlobalStyle ,
  lightTheme,
  darkTheme,
  NImage
} from 'naive-ui'
import { setup } from '@css-render/vue3-ssr'
import { useRoute  } from 'vitepress'
import themeOverrides from "./src/overwrite"
import KoroStudioLayout from './src/KoroStudioLayout.vue'
import './src/styles/index.scss'
import './src/styles/fonts.scss'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
//import DefaultTheme from 'vitepress/theme'
//const { Layout } = DefaultTheme

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject('css-render-collect')
    return {
      style: collect()
    }
  },
  render() {
    return h('css-render-style', {
      innerHTML: this.style
    })
  }
})

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return h('vitepress-path', null, [route.path])
    }
  }
})

const NaiveUIProvider = defineComponent({
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true ,themeOverrides:themeOverrides},
      {
        default: () => [
          h(KoroStudioLayout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null
        ]
      }
    )
  }
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default {
  Layout: NaiveUIProvider,
  enhanceApp: ({ app }) => {
    app.component('n-image', NImage);
    app.use(pinia)
    if (import.meta.env.SSR) {
      const { collect } = setup(app)
      app.provide('css-render-collect', collect)
    }
  }
}
