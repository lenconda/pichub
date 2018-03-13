<template>
  <view>
    <img mode="widthFix" src="https://images.unsplash.com/photo-1518658605361-756f5de4a582?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjIyNTM1fQ&s=e8354115a3f71a1aa296012725edd683" @click="previewImg">
    <div class="controls">
      <div class="item" @click="saveToAlbum">
        <div class="download"></div>
      </div>
      <div class="item">
        <div class="like"></div>
      </div>
    </div>
  </view>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  mounted () {
    console.log(this.$root.$mp.query.id)
  },
  methods: {
    previewImg () {
      wx.previewImage({
        current: 'https://images.unsplash.com/photo-1518658605361-756f5de4a582?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjIyNTM1fQ&s=e8354115a3f71a1aa296012725edd683', // 当前显示图片的链接，不填则默认为 urls 的第一张
        urls: ['https://images.unsplash.com/photo-1518658605361-756f5de4a582?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjIyNTM1fQ&s=e8354115a3f71a1aa296012725edd683'],
        success: function(res){
          // success
          console.log(res)
        },
        fail: function() {
          // fail
          console.log(res)
        },
        complete: function() {
          // complete
        }
      })
    },
    saveToAlbum () {
      wx.downloadFile({
        url: 'https://images.unsplash.com/photo-1518658605361-756f5de4a582?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjIyNTM1fQ&s=e8354115a3f71a1aa296012725edd683',
        success: res => {
          console.log('succeed')
          console.log(res)
          wx.saveImageToPhotosAlbum({  
            filePath: res.tempFilePath,  
            success: res => {  
              console.log('succeed')
              console.log(res)  
            },  
            fail: res => {  
              console.log(res)  
              console.log('fail')  
            }  
          })
        },
        fail: res => {
          console.log('fail')
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
view {
  position: relative;
  img {
    width: 100%;
  }
  .controls {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    background-color: rgba(0, 0, 0, .81);
    display: flex;
    .item {
      height: 100%;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .download {
        width: 26px;
        height: 26px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD7ElEQVR4Xu2az6tVVRTHP6syLBNKLCKRcFDSyARBbBIR9EPUQg0xTUVp4kj/AvUv0FmDiHz1er3BS4UnT2jwCKEQQ9GZNFEhVDR0IKJotWTJeno63XvOPufuc+69ujc4uuesvb6fs9baa+2n8IQvecL1kwCkCGiZgKpq0ZYi0mpUtrqZCU8AUgSkFEg1IBXBAgLpFEjHYOoDWu1NWt0sNUKpE0ytcJoF0jD0uA1DqroX2NPytcLMdvtExPavvaIcg32C0LN4oxYFgJ/vbUZCFPFRAbQIIZr46ABagBBVfCMAGoQQXXxjABqA0Ij4RgFEhNCY+MYBRIDQqPgoAFR1EbBURA5160Zq9gmF4lV1HXBaRM7X7oLq9gGqOhfYCGwF3nEHdovIgUgQysTvAvb7Xr8BI8CPInKzKozgRkhVnwI+cNGfArM7bBYDQhXxWRfuAEccxs8i8m8IjFIAqvomsAPYDLwWYLQXCHXF5926BIwC34jIH0U+dwSgqi8BnwPbgGUBovOP7BSRryqmQyzx+W1/96gYE5Eb+R8fAlDVZ4CPPcRXA8/WEP6nk/+2jHyuMJZWe4/E7R6JC2r4dheYdBhTIvLPg1NAVd8CvgQ2Aa/UMHwLOOyGp0NzL3NEUmWk9Vr0PrAFWAs8X8Pnq8APwNcGoPBvdV2M2zu/uOgJETEIrS9VnQN85lH7bp1TrSoAKyjfARbiVmgGZqnqQgdhkfFGqGMhAKxwjJtwETkRarifz6nqCoexAXix8BTokgL3gGP+tSdFxArI0C1VtUL+ideLjwAr9P9Z3SLgbwdgHdawA7ATzTpWO+GCAWQpXfcUGBGRk8MQBqq6PJMC8+qkQLd3znnlPygiVwYJhqpal2pf2v4tDvUtpAh2smV99rTD+ElEboduGPM5VX0OWO+i3wNsXqm06gLIbmIT2ITDOC4idfqKYKdV1bpXO/PtS5v4F4Jf7vBgDABZsxeA730IudiLY/l3/d7BWuEvgNdj2Y4NIOvXrx4V43XmdDPU5d4hlvYHdpoEMONopTldVZ8GPvQQX9Pl3iEahDYAZJ29/HAIyc3pPpTZvYMNZa9GU1hiqG0AWXdOeYrM8hF3aVuis/v0E0A/9P5vzwRAVd/2qy+7Ant5ID5L805cA8aAg/krsVUOYyVgufk4LZtwp0w0cFREbODr/P8DVHW+Fya7FF0y5BTOuuhREfkrryXkWnwYU+RRiIucKfqApQBmXvZb40FOkY4hXha9wQCyhgYsRQpDvBEAORj9SJHgEG8cQIspUivEWwPQYIr0FOJ9ARAhRaKFeN8BVEiRRkJ8YAAUpIj9ZN1Zx0alTECvv98HkX7fY0VOy20AAAAASUVORK5CYII=') 100% e('/') 100% no-repeat;
      }
      .like {
        width: 26px;
        height: 26px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEtklEQVR4Xu1ai1EcMQyVKkioIFBBoIJABQkVBCoIVJBQQaCCQAVABQkVBCoIqSBQgTJvR3vj88n22uv13XFo5gZmdv15z0+yLC/ThhtvOH56JeBVAQUMiMguEb3Rpvgfdk9Ez8yMv5OZM7Y7LsYrGnuQC4jINhF9JKJ9/b2NIHwiol9EdMnMtzWYEBGMfZQxNsa/ZebH1PhRAhT4Vx081Zf1HBP4xsxXJY1F5DPaExEWoMQuiegsRkSQABH5TkQnJaMabbAip0PdQ2X+g4h6mY+dxjkzn1qdLBAgIpD3tcpt7MB+e6jhLNapiEBxWPXahkU4ZGa46MzmCFDwPyPMP6t/I9ChQ98+ERF+7yKzNycykPi/RHSjP38IxCcoBn/7AO2/g3kfuCT4BGDlAcA3AIc73PgMWkBFBJPAKn4IEIHYgNXodgyVPMYO+fqdxhKL9LkhlEhgOA8QAQyHfaMZASKCCUN+viGAnQwB7jcUEUwEgchaEUjxQNtAddbOAuKPmBmrnmVKBEhAIPUNgbFzs44AffmPMYnZi1mjOy9r3yABW5lvvT9a4LGFAvycz+bOQ0RAwhevHfrcQd89AdbqYx+13CF3Dt37EYVZ/Y0m3u1URKAgfwG6MXoC/hmrD4aSiUQOGyKCZAbbW8yOmRmKqWaaz0Dhrj0x8xZrAPrtPbxiZky2uiVIqA6+ByAiINWPB3sgANEdSY9r2CqSEbeUnQAJk4FXF8TOhGDr2ikIWPAPZh50RiglQCeE+NJnmsjUsiN97vgiIl6bWxCAlXb36ztmBlsvzkysIoLg4CYgm0TAPRTgy2KyALhsSVmB0CLggplrnQKXjXlufCspAgHIitxUdZNc4MEKgo/MvLNSS1dpMma8CyQIW2Nz8EpzrtaNnkmQ8bp2AQVY6SmqNzhEvBgLJHzHIAAnMZ+ZF+cGhvxx1N7uD0PWaWnSdLiltLRA46fB3XbfE2DlyTgJ7q17LFCF47DnV5u6BXYrQn5KjEVa+5wgUBCZbfUuAZYKQMLaukJA+sAEZXf1SL8oap2Zu9rd0Jp+S9+OjaV1DqvWOFdtssriYMYvay+Uk1cFqDWPiN+jrL4bLIvrOR21db9ChEdrQULkbgPb3r6vZLPwESlbrTQJiYsds+IUuxu04sHKKqEE/EIQ9P0pcE5YORIS4KP1jWTtb9VJGAM+qYBeEatKwljwgwnQ3SEWE3DRWfUSJbXNJr4hGFzWS7qAO5GIEpomS5EkB9MdDD5LAY47WBcpeNyEhAT47LNLlgIcEkJ3fJOSkABfdLNURIDGhKYkTAG+yAW8mNCEhKnAjyaghRKmBF+FgAEkwDeLLj5bXKUXxwAjbY59/JAdoFqAr6YAZ3dAVQmrbX0UNZiECPjij6ZCiVU1BTgkoJ6A+mIRCQnwC+f5VMaYel6dAKeokk1Ca/DVXcDbIrOUsAzwkxKQowQRwXd81lWcWcZKyTrn+SQukKGE/nM464u0ycFProCBgdFasCbgmxGg7oBLWATG9wmJPmj1dtQnskPdYHIX8NwhRUJT8E0V4LhDiITm4JdCQMAdlgJ+aQQ4aui+Ri89LA3189h7TWNAjQnX7uOVgNqMrlt/G6+A/xSbcKiR+a1lAAAAAElFTkSuQmCC') 100% e('/') 100% no-repeat;
        &.liked {
          background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADS0lEQVR4Xu2bgVHcMBBF91eQpIIkFRAqCFSQUEGODnIVJFSQUEGgArgKAhUAFSSpIFDBZr5ndfEZ2T7LsmyfbmcYjgFptU9fK3llIJkbMo9f9gD2CgggoKrvROSFNeVn2r2IPAHg98Gs5Lvsl/6CfG+1BFT1jYh8EJEj+3rZEOGjiNyIyAWAVQwSqkrfiw6+6X8F4Heb/0YAFvgXc97Wl+/3HMBXAJchjVX1E9uLCCcgxC5E5KwJRC0AVf0mIp9DvHracEaW2y4Pk/kPEXEy7zuM7wCWvk6eAVBVyvvK5NbXcbU91XDW1KmqUnGc9djGSTgBwCW6tg0AFvzPiOR9QXgHMjB4Nw4m6OMyhCoAzvzH2Og9/TE3cDaKHcMkT9+ha73LkK8BnLgGawCqStlRfqmMUjw2Z1Rd084Se0xMjMUyKwCY/H4lHgRdu/WYMnjn9y2XggOQevZjz2hIf4UKHIC/I8x+yKBjtnkE8AqWgO5i9jyjvg4JgIcdHnpytCUBXNs5P0cAKwLgweR9jtGLyC0BcPtLcQCZIuN7AtApjizVmPYAVJWnMVfdSQV+Kn4e9klQVVk1YeUlRzunAlhrY/UlRzslAD6J8VkgN3vi9u8ehnI8DV4CWDgALHezKJGTsTR2U64I5XQkvgXASf9/N6iqOang0NUjq0XRHLbEdT1wQwH8wXYEVmpf72gy+MOSf21Z3CDwNmYXK0Tc9o6qt1Peq7EdPRydAuAS37Cmu8Fdygfe4J/lgCqdHXlOKA48dTmt9f2AmUNoDL5VAY7aTCG0Br81ANsd5pQTtgq+E4AZQdg6+M4ADMKUL1LOAXR6q6U1Cfqy50TPCbVbXdOpNgiAKWFKlaSg4IOWQJnmRJQQHHxvABNQQq/gowAYEULv4KMBGAFClOCjAjAIrCqxwDrUTRMfaRcA6COKBe8Cdd7tjRPWF2ND8D7P96UQHYApgUWVmBAGCT76EqhskbEgDBb8oAAiKWHQ4AcH0BPC4MEnARAIIUnwyQAYBF7CMjEetGTuB6vebrzW3jfb17UfZBdo2CLbICQNPqkCHBS7fPEpIXnwowCoWQ6jBD8agJIain/OiHm07ZorkuaAroNL8fd7ACkoT9lH9gr4B8OHU5mdeRbOAAAAAElFTkSuQmCC') 100% e('/') 100% no-repeat;
        }
      }
    }
  }
}
</style>
