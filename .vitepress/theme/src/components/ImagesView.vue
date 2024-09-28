<script setup>

import CommonHeader from './CommonHeader.vue'
import { NCard, NImageGroup ,NImage,} from 'naive-ui'
import { Content } from 'vitepress'
</script>

<template>
  <common-header title="画廊" bg-url="/zev_asu_31_06.jpg" height="300">
  </common-header>
  <n-card :bordered="false" class="images-view">
    <n-image-group show-toolbar-tooltip>
      <Content/>
    </n-image-group>
  </n-card>
</template>

<style lang="scss">
  .images-view{
    width: 100%;
    max-width: 720px;
    margin: 16px auto;
    .n-card__content{
      padding: 0;
    }
    p{
      display: flex;
      flex-wrap: wrap;
      .markdown-img{
        width: 328px !important;
        height: 328px;
        overflow: hidden;
        border: 4px solid var(--border-color);
        margin: 8px 8px !important;
        transition: border-color .3s var(--n-bezier);
        img{
          width: 328px !important;
          height: 328px;
          object-fit: contain  !important;
        }
      }
      .markdown-img:hover{
        border-color: var(--primary-color);
      }
    }
  }
</style>