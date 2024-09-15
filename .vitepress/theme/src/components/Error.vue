<script setup lang="ts">
import { useData, useRouter } from 'vitepress'
import {
  NCard,
  NEmpty,
  NIcon,
  NFlex,
  NButton,
}from 'naive-ui'

import {
  CalendarError20Regular,
  ErrorCircle12Regular,
} from '@vicons/fluent'

const { page , frontmatter } = useData();
const router = useRouter();
</script>

<template>
  <n-card size="huge"  class="error-page">
    <template #header>
      <n-flex align="center">
        <n-icon size="35">
          <ErrorCircle12Regular/>
        </n-icon>
        <h2 style="margin: 0;">你跑丢了！</h2>
      </n-flex>
    </template>
    <template #cover>
      <img src="https://http.cat/404" alt="Ops!"/>
    </template>
    <p style="margin-top: 0">
      {{router.route.path}} 不存在！
    </p>
    <n-button @click="router.go('/')"> 返回 </n-button>
  </n-card>
</template>

<style scoped lang="scss">
.error-page {
  font-family: "LXGW WenKai", monospace;
  margin: 8px auto;
  border: 1px solid var(--border-color);
  overflow: hidden;

  @media (min-width: 720px) {
    width: 600px;
  }

}
</style>