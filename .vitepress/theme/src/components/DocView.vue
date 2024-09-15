<script setup lang="ts">
import { Content, useData } from 'vitepress'
import { NCard, NImageGroup, NAnchor, NAnchorLink, NAvatar , NTime } from 'naive-ui'
import { onMounted, onUnmounted, ref } from 'vue'

import '../styles/doc.scss'

// 获取页面数据和前端配置数据
const { page, frontmatter } = useData()

// 定义 ref 变量
const contentComponent = ref(null)
const h2Elements = ref([])
const firstH1 = ref(null)
const bgUrl = ref("url(/blhx-background_and_shouhou.jpg)")

// 设置背景图片
if (frontmatter.background) {
  bgUrl.value = `url(${frontmatter.background})`
}

const scrollY = ref(0)
const toc_y = ref("400px")

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
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 移除字符串前缀
const removePrefix = (str, prefix) => {
  return str.startsWith(prefix) ? str.slice(prefix.length) : str
}
</script>

<template>
  <div class="doc-header">
    <div class="doc-header-title">
      <h1 style="margin-bottom: 0; font-size: 36px">
        {{ page.title }}
      </h1>
      <p class="doc-header-subtitle">
        <n-avatar :size="30" src="/icon2.svg" color="rgba(0,0,0,0)">
        </n-avatar>
        &nbsp;科洛 · 发布于 <n-time :time="0" format="yyyy-MM-dd" />
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
  background: center center;
  background: v-bind('bgUrl');
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
  backdrop-filter: blur(3px);
  transition: background-color .3s var(--n-bezier), backdrop-filter .3s var(--n-bezier);
}

.n-toc-div {
  position: fixed;
  height: 0;
  transition: top .3s var(--n-bezier);
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
    color: var(--text-color-base);
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
