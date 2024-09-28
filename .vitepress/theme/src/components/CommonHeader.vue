<script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      default: '默认标题',
    },
    bgUrl:{
      type:String,
      default: '/66017078_p1.jpg',
    },
    height:{
      type:Number,
      default:200,
    }
  })
  const title = ref<string>('')
  title.value = props.title;
  const bgUrl = `url(${props.bgUrl}) center center`;
  const headerHeight = `${props.height}px`

</script>

<template>
  <div class="common-header">
    <div class="common-header-title">
      <h1>
        {{title}}
      </h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .common-header {
    width: 100%;
    height: v-bind(headerHeight);
    background: v-bind(bgUrl);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    h1{
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 2px 2px 10px #000;
      font-size: 36px;
    }
  }
</style>