<script setup lang="ts">
import CommonHeader from './CommonHeader.vue'
import { Content } from 'vitepress'
</script>

<template>
  <common-header title="关于">
  </common-header>
  <div class="about-content">
    <Content />
  </div>

</template>

<style scoped lang="scss">
.about-content{
  width: 100%;
  min-height: calc(100vh - 4rem - 8rem - 32px - 200px);
  max-width: 720px;
  margin: 16px auto;
  border: 1px solid var(--border-color);
  padding: 16px;
}
</style>