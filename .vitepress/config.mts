import { defineConfig } from 'vitepress'
import replaceImagePlugin from './theme/src/plugin/replaceImagePlugin';
import anchor from 'markdown-it-anchor'

const fileAndStyles: Record<string, string> = {}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '计算机编程技巧与心得',
  description: 'KoroStudio Blog Demo',
  outdir: './dist',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Button Demo 1', link: '/button-demo-1' },
          { text: 'Button Demo 2', link: '/button-demo-2' }
        ]
      }
    ]
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'date-fns', 'vueuc']
    }
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/
    const style = styleRegex.exec(context.content)?.[1]
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1]
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style
    }
    context.content = context.content.replace(styleRegex, '')
    context.content = context.content.replace(vitepressPathRegex, '')
  },
  transformHtml(code, id) {
    const html = id.split('/').pop()
    if (!html) return
    const style = fileAndStyles[`/${html}`]
    if (style) {
      return code.replace(/<\/head>/, style + '</head>')
    }
  },
  sitemap: {
    hostname: 'https://korostudio.com',
    lastmodDateOnly: true
  },
  markdown:{
    theme: { light: 'github-light', dark: 'github-dark' },
    image:{
      lazyLoading: true
    },
    math: true,
    config: (md)=>{
      md.use(replaceImagePlugin);
    },
    lineNumbers : true,
    anchor:{
      permalink:anchor.permalink.ariaHidden({
        placement: 'before'
      })
    },
  },
  metaChunk:true,
  lang:"zh-CN",
  head:[
    ['link',{rel:'icon',type:'image/svg+xml',href:'/icon.svg'}]
  ],
  lastUpdated:true
})
