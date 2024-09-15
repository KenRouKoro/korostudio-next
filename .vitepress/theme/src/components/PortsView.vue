<script setup lang="ts">
import { data as posts } from '../plugin/posts.data.js'
const router = useRouter();

import {
  NCard,
  NFlex,
} from 'naive-ui'
import { useRouter } from 'vitepress'
</script>

<template>
  <div class="ports-content">
    <n-flex vertical align="center">
      <n-card v-for="post in posts" :key="post.url" :title="post.frontmatter.title" @click="router.go(post.url)">
        <div class="ports-content-excerpt" v-html="post.excerpt"></div>
      </n-card>
    </n-flex>
  </div>
</template>

<style lang="scss">
.ports-content{
  width: 100%;
  margin-bottom: 16px;
  .n-card{
    max-width: 720px;
  }
  .ports-content-excerpt{
    h1{
      display: none;
    }
  }
}
</style>