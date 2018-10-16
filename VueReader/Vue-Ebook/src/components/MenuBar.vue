<template>

        <div class="menu-bar">
             <transition name="slide-up">
                <div class="menu-wrapper" :class="{'hide-box-shadow':ifSettingShow||!ifTitleAndMenuShow}"
                v-show="ifTitleAndMenuShow">
                    <div class="icon-wrapper">
                        <span class="icon-menu icon " @click="showSetting(3)"></span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-progress icon" @click="showSetting(2)"></span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-bright icon" @click="showSetting(1)"></span>
                    </div>
                    <div class="icon-wrapper">
                        <span class="icon-a icon" @click="showSetting(0)">A</span>
                    </div>
                </div>
            </transition>
             <transition name="slide-up">

                    <div class="setting-wrapper" v-show="ifSettingShow">
                        <div class="setting-font-size" v-if="showTag ==0">
                            <div class="preview" :style="{
                                fontSize:fontSizeList[0].fontSize+'px'
                                }"

                            >A
                            </div>

                        <div class="select">
                            <div class="select-wrapper" v-for="(item ,index) in fontSizeList"
                            :key="index" @click="setFontSize(item.fontSize)">
                                <div class="line"></div>
                                <div class="point-wrapper">
                                    <div class="point"
                                    v-show="defaultFontSize === item.fontSize"
                                    >
                                        <div class="small-point">

                                        </div>
                                    </div>
                                    <div class="line"></div>
                                </div>
                            </div>
                        </div>
                            <div class="preview"  :style="{
                                        fontSize:fontSizeList[fontSizeList.length-1].fontSize+'px'
                                    }">A</div>
                    </div>
                            <div class="setting-theme" v-else-if="showTag==1">
                                <div class="setting-theme-item" v-for="(item,index) in themeList" :key="index" @click="setTheme(index)">
                                    <div class="perview" :style="{background:item.style.body.background,height:preheight+'%'}"
                                    :class="{'no-border':item.style.body.background!=='#fff' }"
                                    ></div>
                                    <div class="text" :class="{'selected':index ==
                                     defaultTheme}">{{item.name}}</div>
                                </div>

                            </div>
                               <div class="setting-progress" v-else-if="showTag==2">
                                   <div class="progress-wrapper">
                                        <input class="progress"
                                        type="range"
                                        max="100"
                                        min="0"
                                        step="1"
                                        @change="onProgressChange($event.target.value)"
                                        @input="onProgressInput($event.target.value)"
                                        :value="progress"
                                        :disabled="!boolAvailable"
                                        ref="progress"
                                   >
                                    <div class="text-wrapper">
                                    <span>{{boolAvailable?progress+'%':'加載中...'}}</span>
                                    </div>

                                   </div>

                                </div>

                 </div>
            </transition>
            <content-view :ifShowContent="ifShowContent"
            v-show="ifShowContent"
            :navigation="navigation"
            :boolAvailable="boolAvailable"
            @jumpTo="jumpTo"
            ></content-view>
            <transition name="fade">
                <div class="content-mask"
                v-show="ifShowContent"
                @click="hideContent"></div>
            </transition>
        </div>

</template>

<script>
import ContentView from '../components/ContentView'
export default{
  components: {
    ContentView

  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: true

    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    boolAvailable: {
      type: Boolean,
      default: false
    },
    navigation: Object

  },
  data () {
    return {
      ifSettingShow: false,
      showTag: 0,
      preheight: 50,
      progress: 0,
      ifShowContent: false
    }
  },
  methods: {
    hideContent () {
      this.ifShowContent = false
    },
    jumpTo (target) {
      this.$emit('jumpTo', target)
    },
    showSetting (tag) {
      this.showTag = tag
      if (this.showTag === 3) {
        this.ifSettingShow = false
        this.ifShowContent = true
      } else {
        this.ifSettingShow = true
      }
    //   if (this.ifSettingShow == false) {
    //     this.ifSettingShow = true
    //   } else if (this.ifSettingShow == true) {
    //     this.ifSettingShow = false
    //   }
    },
    hideSetting () {
      this.ifSettingShow = false
    },
    setFontSize (fontSize) {
      this.$emit('setFontSize', fontSize)
    },
    setTheme (index) {
      this.$emit('setTheme', index)
    },
    // 拖動進度條是觸發事件
    onProgressInput (progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}%100%`
    },
    // 進度條鬆開后觸發事件，根據進度條數值跳轉指定位置
    onProgressChange (progress) {
      this.$emit('onProgressChange', progress)
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/styles/global';
    .menu-bar{
        .menu-wrapper {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 101;
            display: flex;
            justify-content: space-around;
            width: 100%;
            height: px2rem(130);
            background: white;
            box-shadow: 0 px2rem(-8) px2rem(2) rgba(0, 0, 0, 0.15);
            &.hide-box-shadow{
                box-shadow: none;
            }
            .icon-wrapper {
            flex: 1;
            @include center;
            .icon-progress {
                font-size: px2rem(225);
            }
            .icon-bright {
                font-size: px2rem(225);
            }
            .icon-a {
                padding-bottom: px2rem(10);
            }
            }
        }
        .setting-wrapper{
            position: absolute;
            bottom: px2rem(130);
            left: 0;
            z-index: 101;
            width: 100%;
            height: px2rem(95);
            background: white;
            box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
                .setting-font-size{
                    display: flex;
                    height: 100%;
                    .preview{
                        flex: 0 0 px2rem(200);
                        @include center;
                    }
                    .select{
                        display: flex;
                        flex: 1;
                        .select-wrapper{
                            flex: 1;
                            display: flex;
                            @include center;
                            // &:first-child{
                            //     .line{
                            //         &:first-child{
                            //               border: none;
                            //         }
                            //     }
                            // }
                            &:last-child{
                                // .line{
                                //     border: none;
                                // }
                                   .point-wrapper{
                                       border: 0;
                                }

                            }

                            .line{
                                flex: 1;
                                height: 0;
                                border-top: px2rem(5) solid #ccc;
                            }
                            .point-wrapper{
                                position: relative;
                                flex:  0 0 0;
                                width:  px2rem(15);
                                height: px2rem(15);
                                border-left: px2rem(10) solid #ccc;
                                .point{
                                    position: absolute;
                                    top: px2rem(-16);
                                    left: px2rem(-18);
                                    width: px2rem(50);
                                    height: px2rem(50);
                                    border-radius: 50%;
                                    background: white;
                                    border: px2rem(3) solid #ccc;
                                    box-shadow: 0 px2rem(4)  rgba(0, 0, 0, 0.15);
                                    @include center;
                                    .small-point{
                                        width: px2rem(20);
                                        height: px2rem(20);
                                        background: black;
                                        border-radius: 50%;
                                    }
                                }
                            }
                        }
                    }
                }
                .setting-theme{
                    height: 100%;
                    display: flex;
                    .setting-theme-item{
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        padding: px2rem(5);
                        box-sizing: border-box;
                        .preview{
                            flex:1;
                            border: px2rem(1) solid #ccc;
                            box-sizing: border-box;
                            &.no-border{
                                border: none;
                            }
                        }
                        .text{
                            flex: 0 0 px2rem(20);
                            font-size: px2rem(14);
                            padding-top: px2rem(10);
                            color: #ccc;
                            @include center;
                            &.selected{
                                color: #333;
                            }
                        }
                    }
                }
                .setting-progress{
                    position: relative;
                    width: 100%;
                    height: 100%;
                    .progress-wrapper{
                        width: 100%;
                        height: 100%;
                        @include center;
                        padding: 0 px2rem(30);
                        box-sizing: border-box;
                        display: flex;

                        .progress{

                         width: 100%;
                            -webkit-appearance: none;
                            height: px2rem(2);
                            background: -webkit-linear-gradient(#999,#999) no-repeat ,#ddd;
                            background-size: 0 100%;
                            &:focus{
                                outline: none;
                            }
                            &::-webkit-slider-thumb{
                                -webkit-appearance: none;
                                height: px2rem(50);
                                width: px2rem(50);
                                border-radius:50%;
                                background-color: white;
                                box-shadow: 0 4px 4px 0 rgba(0,0,0,.15);
                                border: px2rem(3) solid #ddd;
                            }
                        }
                        .text-wrapper{
                            font-size: px2rem(12);
                        }
                    }

                }
        }
        .content-mask{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 101;
            display: flex;
            width: 100%;
            height: 100%;
            background: rgba(51,51,51, .8)
        }
    }

</style>
