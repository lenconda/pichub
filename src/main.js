import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/index/index'], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#000',
      navigationBarTitleText: 'Tupia精选壁纸',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#dddddd',
      selectedColor: '#fff',
      borderStyle: 'black',
      backgroundColor: '#000',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'static/icons/home-o.png',
          selectedIconPath: 'static/icons/home.png'
        }, 
        {
          pagePath: 'pages/counter/counter',
          text: '趋势',
          iconPath: 'static/icons/mark-o.png',
          selectedIconPath: 'static/icons/mark.png'
        }, 
        
        {
          pagePath: 'pages/logs/logs',
          text: '我的',
          iconPath: 'static/icons/mine-o.png',
          selectedIconPath: 'static/icons/mine.png'
        }
      ]
    }
  }
}
