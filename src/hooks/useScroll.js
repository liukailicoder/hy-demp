import { onMounted, onActivated, onUnmounted, onDeactivated, ref } from 'vue'
import { throttle } from 'underscore'

// v2.0版本
export default function useScroll(elRef) {
  let el = window

  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 防抖/节流
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true
    }
  }, 100)
  
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })
  
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}

// v1.0版本
// export default function userScroll(reachBottomCB) {
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     if (clientHeight + scrollTop >= scrollHeight) {
//       // homeStore.fetchHouselistData()
//       if(reachBottomCB)reachBottomCB()
//     }
//   }
//   onMounted(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   })

//   onActivated(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   })

//   onDeactivated(()=> {
//     window.removeEventListener('scroll', scrollListenerHandler)
//   })

//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollListenerHandler)
//   })
// }
