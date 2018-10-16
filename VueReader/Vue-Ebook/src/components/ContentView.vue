<!--  -->
<template>
  <transition name="fade">
    <div class="content">
      <div class="content-wrapper" v-if="boolAvailable">
        <div class="content-item" v-for="(item, index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
          <span class="text">{{item.label}}</span>
        </div>
      </div>
      <div class="empty" v-else>加载中....</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Content',
  props: {
    ifShowContent: Boolean,
    navigation: Object,
    boolAvailable: Boolean
  },
  methods: {
    jumpTo (target) {
      this.$emit('jumpTo', target)
    }
  }
}

</script>
<style lang='scss' scoped>
@import '../assets/styles/global.scss';
.content {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
  font-size:px2rem(20);
  padding: px2rem(20) px2rem(20);
  .content-wrapper {
    line-height: px2rem(60);
    .text {
      color: brown;
      &:hover {
        opacity: .5;
        cursor: pointer;
      }
    }
  }
}
</style>
