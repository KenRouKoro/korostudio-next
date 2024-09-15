<script setup>

import {
  NAvatar,
  NA,

}from 'naive-ui'

</script>

<template>
  <div class="footer-view">
    <n-avatar :size="45" class="rotate" src="/icon2.svg" color="rgba(0,0,0,0)">
    </n-avatar>
    <p>
      Powered by <a href="https://vitepress.dev">VitePress</a> | Theme By <a href="/author">Koro</a> | Crafted with by <a href="https://korostudio.cn">KoroStudio</a>
    </p>
    <p>
      © 2024 Koro | <a href="https://beian.miit.gov.cn/">桂ICP备20000593号-1</a> | <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45030502000306">桂公网安备45030502000306</a>
    </p>
  </div>
</template>

<style scoped lang="scss">
.footer-view{
  text-align: center;
  padding-top: 0.5rem;
  min-height: 8rem;
  border-top: 1px solid var(--border-color);
  background-color: var(--card-color);
  p{
    margin: 0;
    color: var(--text-color-3);
  }
  a{
    color: var(--text-color-3);
    position: sticky;
  }
  a:hover{
    color: var(--primary-color);
  }
  a:after{
    display: block;
    position: absolute;
    content: "";
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--primary-color);
    transform-origin: bottom right;
    transition: transform .3s var(--n-bezier), background-color .3s var(--n-bezier);
  }
  a:hover:after{
    transform: scaleX(1);
    transform-origin: bottom left;
    background-color: var(--primary-color);
  }
}

@keyframes rotate{
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.rotate {
  animation-name: rotate;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

</style>