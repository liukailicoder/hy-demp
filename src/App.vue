<template>
  <div class="app">
    <!-- <router-view></router-view> -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <!-- <tab-bar v-if="!route.meta.hideTabBar" /> -->
    <tab-bar />

    <Loading />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Loading from '@/components/loading/loading.vue'
import TabBar from '@/components/tab-bar/tab-bar.vue'

const route = useRoute()
</script>

<style scoped></style>
