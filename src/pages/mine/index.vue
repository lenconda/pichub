<template>
  <scroll-view>
    <div class="head">
      <img :src="userInfo.avatarUrl" class="avatar">
      <span class="motto">{{ userInfo.nickName }}</span>
    </div>
    <div class="favorites">
      <button @click="testonly">fuck</button>
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
        success: r => {
          wx.request({
            url: `${this.GLOBAL.api_host}/pichub/test?code=${r.code}`,
            method: 'GET',
            // header: {}, // 设置请求的 header
            success: result => {
              // success
              wx.setStorageSync('openid', result.data.openid)
            },
            fail: () => {
              // fail
              console.log('failed')
            }
          })
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo
            },
            fail: () => {
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
    },
    testonly () {
      wx.request({
        url: `${this.GLOBAL.api_host}/cuo?id=${wx.getStorageSync('openid')}`,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: res => {
          // success
          console.log('succeeded')
          console.log(res)
        },
        fail: res => {
          // fail
          console.log('failed')
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
.favorites {
  width: 100%;
}
</style>
