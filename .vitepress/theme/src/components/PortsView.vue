<script setup lang="ts">
import { data as posts } from '../plugin/posts.data.js'
import {
  NCard,
  NFlex,
  NTime,
  NButton,
} from 'naive-ui'
import { useRouter } from 'vitepress'
import { ref } from 'vue'

const maxIndex = ref(5)
const router = useRouter();

</script>

<template>
  <div class="ports-content">
    <n-flex vertical align="center">
      <template v-for="(post,index) in posts.slice(0,maxIndex)">
        <div v-if="post.frontmatter.layout && post.frontmatter.layout==='doc'" :class="['post-item', (index%2===0)?'post-item-r':'post-item-l']" @click="router.go(post.url)">
          <img class="post-item-img" :src="post.frontmatter.cover?post.frontmatter.cover:'/blhx-background_and_shouhou.jpg'" alt="">
          </img>
          <n-card class="ports-content-card" :key="post.url"  size="huge">
            <template #header>
              <div style="font-size: 12px;color: var(--text-color-3)">
                发布于 &nbsp;<n-time :time="post.frontmatter.lastupdated?post.frontmatter.lastupdated.lastUpdated:0" format="yyyy-MM-dd" />
              </div>
              <h2 class="ports-card-title">{{post.frontmatter.title}}</h2>
            </template>
            <div class="ports-content-excerpt" v-html="post.excerpt"></div>
          </n-card>
        </div>
      </template>
      <n-button v-if="maxIndex<=posts.length" size="large" @click="maxIndex+=5">继续加载</n-button>
    </n-flex>
  </div>
</template>

<style lang="scss">
.ports-content {
  width: 100%;
  margin-bottom: 16px;

  .post-item {
    overflow: hidden;
    width: 100%;
    max-width: 720px;
    display: flex;
    flex-direction: row;
    font-family: "LXGW WenKai", monospace;

    .ports-card-title {
      font-family: Inter, monospace;
    }

    .post-item-img {
      width: 52.5%;
      object-fit: cover;
      transition: transform .5s var(--n-bezier);
    }

    .n-card {
      width: 47.5%;

      .n-card-header {
        padding: 16px 16px 0;
      }

      .n-card__content {
        padding-left: 16px;
        padding-right: 16px;
      }
    }

    &:hover {
      .n-card {
        border-color: var(--primary-color);
      }

      .post-item-img {
        transform: scale(1.1, 1.1);
      }
    }

    a {
      color: var(--primary-color);
      transition: color .3s var(--n-bezier), border .3s var(--n-bezier), opacity .3s var(--n-bezier);
      position: relative;
      text-decoration: none;

      &::after {
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

      &:hover {
        color: var(--primary-color);

        &::after {
          transform: scaleX(1);
          transform-origin: bottom left;
          background-color: var(--primary-color-hover);
        }
      }
    }

    p {
      font-size: 1rem;
    }
  }

  .post-item-r {
    flex-direction: row-reverse !important;

    .n-card {
      border-right: 0;
    }
  }

  .post-item-l {
    .n-card {
      border-left: 0;
    }
  }

  .ports-content-card {
    height: 20rem;
    overflow: auto;

    h2 {
      margin: 0;
    }

    &::-webkit-scrollbar-track {
      border-radius: 0;
      background-color: rgba(255, 255, 255, 0);
    }
  }

  .ports-content-excerpt {
    h1 {
      display: none;
    }

    .code {
      display: none !important;
    }
  }
}

</style>