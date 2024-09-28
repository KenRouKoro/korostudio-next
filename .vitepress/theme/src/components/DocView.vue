<script setup lang="ts">
import { Content, useData, useRouter } from 'vitepress'
import { NCard, NImageGroup, NAnchor, NAnchorLink, NAvatar , NTime } from 'naive-ui'
import { onMounted, onUnmounted, ref } from 'vue'

import '../styles/doc.scss'

// 获取页面数据和前端配置数据
const { page, frontmatter } = useData()
const router = useRouter();
// 定义 ref 变量
const contentComponent = ref(null)
const h2Elements = ref([])
const firstH1 = ref(null)
const backgroundUrl = ref(`url(${frontmatter.value.cover?frontmatter.value.cover:"/blhx-background_and_shouhou.jpg"}) center center`)
const scrollY = ref(0)
const toc_y = ref("400px")
const headerBlur = ref(false)


// 滚动事件处理函数
const onScrollBeyondThreshold = () => {
  toc_y.value = "16px"
}
const onScrollBeyondThresholdElse = () => {
  toc_y.value = `${400 - scrollY.value}px`
}

const handleScroll = () => {
  scrollY.value = window.scrollY
  if (scrollY.value > 400) {
    onScrollBeyondThreshold()
  } else {
    onScrollBeyondThresholdElse()
  }
}

// 组件挂载和卸载时的操作
onMounted(() => {
  h2Elements.value = contentComponent.value.$el.querySelectorAll('h2')
  firstH1.value = contentComponent.value.$el.querySelector('h1')
  firstH1.value.classList.add('doc-view-first-h1')
  window.addEventListener('scroll', handleScroll)
  setTimeout(()=>{headerBlur.value = true;},0)

})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 移除字符串前缀
const removePrefix = (str:string, prefix:string) => {
  return str.startsWith(prefix) ? str.slice(prefix.length) : str
}
//截取路由
function getPath(url:string) {
  const regex = /\/([^?#]*)/;
  const match = url.match(regex);
  return match ? match[1] : '';
}
</script>

<template>
  <div :class="['doc-header',headerBlur&&'doc-header-blur']">
    <div class="doc-header-title">
      <h1 style="margin-bottom: 0; font-size: 36px">
        {{ page.title }}
      </h1>
      <p class="doc-header-subtitle" @click="router.go('/about')">
        <n-avatar :size="35" src="/icon2.svg" color="rgba(0,0,0,0)">
        </n-avatar>
        &nbsp;<a style=" color: rgba(255, 255, 255, 0.9); ">科洛</a>&nbsp; · 发布于 &nbsp;<n-time :time="frontmatter.lastupdated?frontmatter.lastupdated.lastUpdated:0" format="yyyy-MM-dd" />
      </p>
    </div>
  </div>

  <div class="n-toc-div">
    <n-anchor :ignore-gap="true" class="n-toc" :bound="150">
      <n-anchor-link :title="page.title" :href="'#' + (firstH1 ? firstH1.id : null)">
        <div v-for="h2Element in h2Elements" :key="h2Element.id">
          <n-anchor-link :title="removePrefix(h2Element.textContent.toString(), '# ')" :href="'#' + h2Element.id" />
        </div>
      </n-anchor-link>
    </n-anchor>
  </div>

  <n-card class="doc-view">
    <n-image-group show-toolbar-tooltip>
      <Content ref="contentComponent" />
    </n-image-group>
  </n-card>
</template>

<style lang="scss">
$min-height: calc(100vh - 4rem - 8rem);

.doc-header {
  position: absolute;
  top: 4rem;
  left: 0;
  height: 392px;
  width: 100%;
  background: v-bind(backgroundUrl);
  background-size: cover;

  .doc-header-title {
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 2px 2px 10px #000;
    position: absolute;
    bottom: 48px;
    left: 16px;

    @media (min-width: 736px) {
      left: calc((100% - 720px) / 2 + 8px);
    }

    .doc-header-subtitle {
      margin-top: 0;
      display: flex;
      align-items: flex-end;
      cursor: pointer;
    }
  }
}

html:not(.dark) {
  .doc-header::before {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.doc-header::before {
  background-color: rgba(0, 0, 0, 0.2);
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transition: background-color .3s var(--n-bezier), backdrop-filter .3s var(--n-bezier);
}
.doc-header-blur::before{
  backdrop-filter: blur(2px);
}

.n-toc-div {
  position: fixed;
  height: 0;
  top: calc(4rem + v-bind('toc_y'));

  .n-toc {
    z-index: 1000;
    margin-top: 8px;
    margin-left: calc(720px + 16px);
  }
}

.doc-view {
  min-height: $min-height;
  font-family: "LXGW WenKai", monospace;
  padding: 0;
  margin-top: 400px;
  border: 1px solid var(--border-color);
  transition: background-color .3s var(--n-bezier), opacity .3s var(--n-bezier), border-bottom-color .3s var(--n-bezier);

  a {
    color: var(--primary-color);
    transition: color .3s var(--n-bezier), border .3s var(--n-bezier), opacity .3s var(--n-bezier);
    position: relative;
    text-decoration: none;
  }

  a::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: var(--primary-color);
    transform-origin: bottom right;
    transition: transform .3s var(--n-bezier), background-color .3s var(--n-bezier);
  }

  a:hover{
    color: var(--primary-color);
  }

  a:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
    background-color: var(--primary-color-hover);
  }

  p {
    font-size: 1rem;
  }
  .doc-view-first-h1 {
    height: 0;
    margin: 0;
    overflow: hidden;
  }
}
</style>
