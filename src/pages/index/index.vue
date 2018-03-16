<template>
  <scroll-view>
    <navigator :url="['/pages/detail/detail']">
      <div class="img-wrapper">
        <span class="like" @tap.stop="like"></span>
        <img mode="widthFix" src="https://images.unsplash.com/photo-1519316500492-7d95d2b8c462?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjIyNTM1fQ&s=630a9923eb46d1eab1dd3d3b1b623545" alt="">
      </div>
    </navigator>
    <navigator>
      <div class="img-wrapper">
        <img mode="widthFix" src="https://images.unsplash.com/photo-1520468278-da8f5773bc53?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjIyNTM1fQ&s=813a782b2e303d0f85ba87e3907d0964" alt="">
      </div>
    </navigator>
  </scroll-view>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },
  methods: {
    like () {
      console.log('test')
    },
    getUserInfo () {
      wx.login({
        success: r => {
          var code = r.code
          console.log(code)
          wx.getUserInfo({
            success: res => {
              // this.userInfo = res.userInfo
              console.log(res)
            }
          })
        }
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
  // onReachBottom () {
  //   console.log('触底')
  // }
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
