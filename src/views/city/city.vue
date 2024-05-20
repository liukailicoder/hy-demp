import { useRouter } from 'vue-router';
<template>
  <div class="city top-page">
    <div class="top">
      <van-search v-model="searchValue" shape="round" show-action @search="onSearch" @cancel="onCancel" placeholder="城市/区域/位置" />

      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <!-- 正常做 -->
      <!-- <cityGroup :group-data="currentGroup" /> -->

      <!-- 提高效率 -->
      <template v-for="(value,key,index) in allCities">
        <cityGroup v-show="tabActive === key" :group-data="value" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useCityStore from '@/stores/storeModules/city'
import cityGroup from './cnps/city-group.vue'

const searchValue = ref('')
const tabActive = ref(0)

const onSearch = () => {}

const router = useRouter()
const onCancel = () => {
  router.back()
}

/**
 * 这个位置发送网络请求有两个缺点
 * 1.如果网络请求太多，那么页面组件中就包含大量的对于网络请求和数据的处理
 * 2. 如果页面封装了很多的子组件，子组件需要这些数据，我们必须一步步讲数据传递过去
 * 综上：我们可以讲请求放在store里面，用到的时候去拿，pinia也比较好用
 */
// 网络请求: 请求城市的数据
// const allCity = ref({})
//  getCityAll().then(res=> {
//   allCity.value = res.data
//  })
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// onMounted(()=> {
//   console.log(JSON.parse(JSON.stringify(allCities.value)))
// })

// 目的: 获取选中标签后的数据
// 1.获取正确的key: 将tabs中绑定的tabAction正确绑定
// 2.根据key从allCities获取数据, 默认直接获取的数据不是响应式的, 所以必须包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value])

</script>

<style lang="less" scoped>
.city {
  // --van-tabs-line-height: 30px;

  // top固定定位
  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }

  // .content {
  //   margin-top: 98px;
  // }

  .top {
    position: relative;
    z-index: 9;
  }

  // 布局滚动
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
