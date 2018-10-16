<template>
<div class="ebook">
<title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"></title-bar>
    <div class="read-wrapper">
        <div id="read"></div>
        <div class="mask">
            <div class="left" @click="prePage"></div>
            <div class="center" @click="toggleTitleAndMenu"></div>
            <div class="right" @click="nextPage"></div>
        </div>
    </div>
<menu-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"
          :fontSizeList="fontSizeList"
          :defaultFontSize="defaultFontSize"
          @setFontSize="setFontSize"
          :themeList="themeList"
          :defaultTheme="defaultTheme"
          @setTheme="setTheme"
          @onProgressChange="onProgressChange"
          :boolAvailable="boolAvailable"
          :navigation="navigation"
          @jumpTo="jumpTo"
          ref="menuBar"
></menu-bar>
</div>
</template>

<script>
import TitleBar from './components/TitleBar'
import MenuBar from './components/MenuBar'
import Epub from 'epubjs'
const DOWNLOAD_URL = '/static/first.epub'
global.epub = Epub

export default {
  components: {
    TitleBar,
    MenuBar

  },
  data () {
    return {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        {fontSize: 14},
        {fontSize: 16},
        {fontSize: 18},
        {fontSize: 20},
        {fontSize: 22},
        {fontSize: 24}
      ],
      defaultFontSize: 16,

      themeList: [
        {
          name: 'default',
          style: {
            body: {
              'color': '#000', 'background': '#EDEDED'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              'color': '#000', 'background': '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              'color': '#fff', 'background': '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              'color': '#000', 'background': '#FFD700'
            }
          }
        }

      ],
      defaultTheme: 0,
      boolAvailable: false,
      navigation: null

    }
  },
  methods: {
    // 根据链接跳转到指定位置
    jumpTo (href) {
      this.renditon.display(href)
      this.heideTitleAndMenu()
    },
    heideTitleAndMenu () {
      // 隐藏标题栏和菜单栏
      this.ifTitleAndMenuShow = false
      // 隐藏菜单栏弹出的设置栏
      this.$refs.menuBar.hideSetting()
      // 隐藏目录
      this.$refs.menuBar.hideContent()
    },
    // progress進度條的數值 (0-100)
    onProgressChange (progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.renditon.display(location)
    },
    setTheme (index) {
      this.themes.select(this.themeList[index].name)
      this.defaultTheme = index
    },

    registerTheme () {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    setFontSize (fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    },
    toggleTitleAndMenu () {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
      if (!this.ifTitleAndMenuShow) {
        this.$refs.menuBar.hideSetting()
      }
    },
    prePage () {
      // Rendition.prev
      if (this.renditon) {
        this.renditon.prev()
      }
    },
    nextPage () {
      // Renditon.next
      if (this.renditon) {
        this.renditon.next()
      }
    },
    // 電子書的解析和渲染
    showEpub () {
      // 生成Book
      this.book = new Epub(DOWNLOAD_URL)
      // 生成Renditon,通過Book.renderTO
      this.renditon = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 通過Rendtion.dispaly渲染電子書
      this.renditon.display()
      // 获取Theme对象
      this.themes = this.renditon.themes
      // 设置默认字体
      // this.setFontSize(this.defaultFontSize)
      // this.themes.register(name, styles)
      // this.themes.select(name)
      this.registerTheme()
      this.setTheme(this.defaultTheme)
      // 獲取Locations對象
      // 通過epubjs的鈎子函數來實現
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        return this.book.locations.generate()
      }).then(result => {
        this.locations = this.book.locations
        this.boolAvailable = true
      }
      )
    }
  },
  mounted () {
    this.showEpub()
  }
}
</script>

<style lang='scss' scoped>
@import "./assets/styles/global";
.ebook {
  position: relative;

  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }

}
</style>
