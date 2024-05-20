<template>
  <div class="favor" ref="favRef">
    <h2>favor</h2>
    <template v-for="item in 100">
      <div>{{ item }}</div>
    </template>
  </div>
</template>

<script setup>
import userScroll from '@/hooks/useScroll';
import { ref } from 'vue';

const favRef = ref()
userScroll(favRef)
</script>

<style lang="less" scoped>
.favor {
  height: 300px;
  background: orange;
  overflow-y: auto;
}
</style>