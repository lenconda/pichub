<template>
  <scroll-view>
    <div class="head">
      <img :src="userInfo.avatarUrl" class="avatar">
      <span class="motto">{{ userInfo.nickName }}</span>
    </div>
  </scroll-view>  
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      wx.login({
        success: res => {
          wx.getUserInfo({
            success: res => {
              // success
              this.userInfo = res.userInfo
            },
            fail: () => {
              // fail
              wx.showToast({
                title: '遇到错误',
                icon: 'none',
                duration: 2000
              })
            }
          })
        },
        fail: () => {
          // fail
          wx.showToast({
            title: '遇到错误',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .motto {
    color: #fff;
  }
  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 2px solid rgba(236, 236, 236, .8);
  }
}
</style>
