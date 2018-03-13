<template>
  <scroll-view>
    <div class="img-wrapper">
      <img mode="widthFix" src="https://images.unsplash.com/photo-1509829208663-8d643bff6588?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb308905b6dcfa8695829e875a2221dd&auto=format&fit=crop&w=634&q=80" alt="">
    </div>
    <div class="img-wrapper">
      <img mode="widthFix" src="https://images.unsplash.com/photo-1518973599587-370cea74a58a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a8e3737d10daccfb1374244f3968b39e&auto=format&fit=crop&w=1350&q=80" alt="">
    </div>
  </scroll-view>
</template>

<script>
// Use Vuex
import store from './store'

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    }
  }
}

</script>
<style lang="less" scoped>
scroll-view {
  .img-wrapper {
    width: 100%;
    img {
      flex-shrink: 0;
      width: 100%;
    }
  }
}
</style>
