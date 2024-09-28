<script setup lang="ts">
import { Content, useData } from 'vitepress'
import {
  NCard,
  NAnchor,
  NAnchorLink
} from 'naive-ui'
import PageView from './PageView.vue'
import DocView from './DocView.vue'
import Index from './PageIndex.vue'
import PortsView from './PortsView.vue'
import About from './About.vue'
import Friends from './Friends.vue'
import Author from './Author.vue'
import ImagesView from './ImagesView.vue'

const { page , frontmatter } = useData()
</script>

<template>
  <div class="content-page" v-if="frontmatter.layout==='page'">
    <PageView></PageView>
  </div>
  <div class="content-index" v-else-if="frontmatter.layout==='index'">
    <Index></Index>
  </div>
  <div class="content-ports" v-else-if="frontmatter.layout==='ports'">
    <PortsView></PortsView>
  </div>
  <div class="content-about" v-else-if="frontmatter.layout==='about'">
    <About></About>
  </div>
  <div class="content-friends" v-else-if="frontmatter.layout==='friends'">
    <Friends></Friends>
  </div>
  <div class="content-author" v-else-if="frontmatter.layout==='author'">
    <Author></Author>
  </div>
  <div class="content-images" v-else-if="frontmatter.layout==='images'">
    <ImagesView></ImagesView>
  </div>
  <div class="content-doc" v-else>
    <DocView></DocView>
  </div>
</template>

<style scoped lang="scss">
$min-height : calc(100vh - 4rem - 8rem);

.content-doc {
  width: 100%;
  margin: 12px auto;
  min-height: $min-height;

  @media (min-width: 720px) {
    width: 720px;
  }

}
.content-page{
  width: 100%;
  min-height: $min-height
}
.content-ports{
  margin-top: 16px;
}

</style>