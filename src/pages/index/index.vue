<template>
  <scroll-view>
    <navigator v-for="(item, index) in pictures" :url="'/pages/detail/detail?id=' + item.id">
      <div class="img-wrapper">
        <span class="like" :class="{liked: item.liked == 1}" @tap.stop="like(item.liked == 1 ? 1 : 0, item.id, index)"></span>
        <img mode="widthFix" :src="'https://pichub.oss-cn-shanghai.aliyuncs.com/' + item.regular">
      </div>
    </navigator>
  </scroll-view>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      pictures: [],
      page: 1,
      infinited: false
    }
  },
  methods: {
    like (action, likeid, index) {
      wx.request({
        url: `${this.GLOBAL.api_host}/pichub/like?action=${action}&likeid=${likeid}&openid=${wx.getStorageSync('openid')}`,
        data: {},
        method: 'GET',
        // header: {}, // 设置请求的 header
        success: result => {
          // success
          if (result.data.status == 1) {
            wx.showToast({
              title: result.data.message,
              icon: 'success'
            })
            // action = 0 收藏
            if (result.data.aciton == 0) {
              this.pictures[index].liked = 1
            } else {
              this.pictures[index].liked = 0
            }
          } else {
            wx.showToast({
              title: result.data.message,
              icon: 'none'
            })
          }
        },
        fail: () => {
          wx.showToast({
            title: result.data.message,
            icon: 'none'
          })
        }
      })
    },
    getUserInfo () {
      wx.login({
        success: r => {
          wx.request({
            url: `${this.GLOBAL.api_host}/pichub/getid?code=${r.code}`,
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
        }
      })
    },
    getPictures (action, page) {
      if (!this.infinited) {
        wx.request({
          url: `${this.GLOBAL.api_host}/pichub/lists?action=${action}&page=${page}&openid=${wx.getStorageSync('openid')}`,
          method: 'GET',
          // header: {}, // 设置请求的 header
          success: result => {
            this.infinited = result.data.infinited
            if (action == 1) {
              this.page++
              for (var i = 0; i < result.data.lists.length; i++) {
                this.pictures.push(result.data.lists[i])
              }
            } else {
              this.pictures = result.data.lists
              this.page = 2
            }
          },
          fail: () => {
            // fail
            console.log('failed')
          }
        })
      }
    }
  },
  mounted () {
    this.getUserInfo()
    this.getPictures(0, 1)
  },
  onReachBottom () {
    this.getPictures(1, this.page)
  },
  onPullDownRefresh () {
    wx.request({
      url: `${this.GLOBAL.api_host}/pichub/lists?action=0&page=1&openid=${wx.getStorageSync('openid')}`,
      data: {},
      method: 'GET',
      // header: {}, // 设置请求的 header
      success: result => {
        // success
        this.infinited = result.data.infinited
        this.pictures = result.data.lists
        this.page = 2
        wx.stopPullDownRefresh()
      },
      fail: () => {
        // fail
        console.log('failed')
      }
    })
  }
}
</script>

<style lang="less" scoped>
scroll-view {
  navigator {
    &.navigator-hover {
      opacity: 1;
    }
    .img-wrapper {
      width: 100%;
      position: relative;
      img {
        flex-shrink: 0;
        width: 100%;
        background: url('data:image/gif;base64,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') center center no-repeat;
      }
      .like {
        width: 21px;
        height: 21px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEtklEQVR4Xu1ai1EcMQyVKkioIFBBoIJABQkVBCoIVJBQQaCCQAVABQkVBCoIqSBQgTJvR3vj88n22uv13XFo5gZmdv15z0+yLC/ThhtvOH56JeBVAQUMiMguEb3Rpvgfdk9Ez8yMv5OZM7Y7LsYrGnuQC4jINhF9JKJ9/b2NIHwiol9EdMnMtzWYEBGMfZQxNsa/ZebH1PhRAhT4Vx081Zf1HBP4xsxXJY1F5DPaExEWoMQuiegsRkSQABH5TkQnJaMabbAip0PdQ2X+g4h6mY+dxjkzn1qdLBAgIpD3tcpt7MB+e6jhLNapiEBxWPXahkU4ZGa46MzmCFDwPyPMP6t/I9ChQ98+ERF+7yKzNycykPi/RHSjP38IxCcoBn/7AO2/g3kfuCT4BGDlAcA3AIc73PgMWkBFBJPAKn4IEIHYgNXodgyVPMYO+fqdxhKL9LkhlEhgOA8QAQyHfaMZASKCCUN+viGAnQwB7jcUEUwEgchaEUjxQNtAddbOAuKPmBmrnmVKBEhAIPUNgbFzs44AffmPMYnZi1mjOy9r3yABW5lvvT9a4LGFAvycz+bOQ0RAwhevHfrcQd89AdbqYx+13CF3Dt37EYVZ/Y0m3u1URKAgfwG6MXoC/hmrD4aSiUQOGyKCZAbbW8yOmRmKqWaaz0Dhrj0x8xZrAPrtPbxiZky2uiVIqA6+ByAiINWPB3sgANEdSY9r2CqSEbeUnQAJk4FXF8TOhGDr2ikIWPAPZh50RiglQCeE+NJnmsjUsiN97vgiIl6bWxCAlXb36ztmBlsvzkysIoLg4CYgm0TAPRTgy2KyALhsSVmB0CLggplrnQKXjXlufCspAgHIitxUdZNc4MEKgo/MvLNSS1dpMma8CyQIW2Nz8EpzrtaNnkmQ8bp2AQVY6SmqNzhEvBgLJHzHIAAnMZ+ZF+cGhvxx1N7uD0PWaWnSdLiltLRA46fB3XbfE2DlyTgJ7q17LFCF47DnV5u6BXYrQn5KjEVa+5wgUBCZbfUuAZYKQMLaukJA+sAEZXf1SL8oap2Zu9rd0Jp+S9+OjaV1DqvWOFdtssriYMYvay+Uk1cFqDWPiN+jrL4bLIvrOR21db9ChEdrQULkbgPb3r6vZLPwESlbrTQJiYsds+IUuxu04sHKKqEE/EIQ9P0pcE5YORIS4KP1jWTtb9VJGAM+qYBeEatKwljwgwnQ3SEWE3DRWfUSJbXNJr4hGFzWS7qAO5GIEpomS5EkB9MdDD5LAY47WBcpeNyEhAT47LNLlgIcEkJ3fJOSkABfdLNURIDGhKYkTAG+yAW8mNCEhKnAjyaghRKmBF+FgAEkwDeLLj5bXKUXxwAjbY59/JAdoFqAr6YAZ3dAVQmrbX0UNZiECPjij6ZCiVU1BTgkoJ6A+mIRCQnwC+f5VMaYel6dAKeokk1Ca/DVXcDbIrOUsAzwkxKQowQRwXd81lWcWcZKyTrn+SQukKGE/nM464u0ycFProCBgdFasCbgmxGg7oBLWATG9wmJPmj1dtQnskPdYHIX8NwhRUJT8E0V4LhDiITm4JdCQMAdlgJ+aQQ4aui+Ri89LA3189h7TWNAjQnX7uOVgNqMrlt/G6+A/xSbcKiR+a1lAAAAAElFTkSuQmCC') 100% e('/') 100% no-repeat;
        position: absolute;
        bottom: 12px;
        right: 12px;
        &.liked {
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADS0lEQVR4Xu2bgVHcMBBF91eQpIIkFRAqCFSQUEGODnIVJFSQUEGgArgKAhUAFSSpIFDBZr5ndfEZ2T7LsmyfbmcYjgFptU9fK3llIJkbMo9f9gD2CgggoKrvROSFNeVn2r2IPAHg98Gs5Lvsl/6CfG+1BFT1jYh8EJEj+3rZEOGjiNyIyAWAVQwSqkrfiw6+6X8F4Heb/0YAFvgXc97Wl+/3HMBXAJchjVX1E9uLCCcgxC5E5KwJRC0AVf0mIp9DvHracEaW2y4Pk/kPEXEy7zuM7wCWvk6eAVBVyvvK5NbXcbU91XDW1KmqUnGc9djGSTgBwCW6tg0AFvzPiOR9QXgHMjB4Nw4m6OMyhCoAzvzH2Og9/TE3cDaKHcMkT9+ha73LkK8BnLgGawCqStlRfqmMUjw2Z1Rd084Se0xMjMUyKwCY/H4lHgRdu/WYMnjn9y2XggOQevZjz2hIf4UKHIC/I8x+yKBjtnkE8AqWgO5i9jyjvg4JgIcdHnpytCUBXNs5P0cAKwLgweR9jtGLyC0BcPtLcQCZIuN7AtApjizVmPYAVJWnMVfdSQV+Kn4e9klQVVk1YeUlRzunAlhrY/UlRzslAD6J8VkgN3vi9u8ehnI8DV4CWDgALHezKJGTsTR2U64I5XQkvgXASf9/N6iqOang0NUjq0XRHLbEdT1wQwH8wXYEVmpf72gy+MOSf21Z3CDwNmYXK0Tc9o6qt1Peq7EdPRydAuAS37Cmu8Fdygfe4J/lgCqdHXlOKA48dTmt9f2AmUNoDL5VAY7aTCG0Br81ANsd5pQTtgq+E4AZQdg6+M4ADMKUL1LOAXR6q6U1Cfqy50TPCbVbXdOpNgiAKWFKlaSg4IOWQJnmRJQQHHxvABNQQq/gowAYEULv4KMBGAFClOCjAjAIrCqxwDrUTRMfaRcA6COKBe8Cdd7tjRPWF2ND8D7P96UQHYApgUWVmBAGCT76EqhskbEgDBb8oAAiKWHQ4AcH0BPC4MEnARAIIUnwyQAYBF7CMjEetGTuB6vebrzW3jfb17UfZBdo2CLbICQNPqkCHBS7fPEpIXnwowCoWQ6jBD8agJIain/OiHm07ZorkuaAroNL8fd7ACkoT9lH9gr4B8OHU5mdeRbOAAAAAElFTkSuQmCC') 100% e('/') 100% no-repeat;
        }
      }
    }
  }
}
</style>
