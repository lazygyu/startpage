<template>
<div class="memo">
  <div class="toolbar"><a href="#" @click="remove($event)">&times;</a></div>
  <div class="memocontent" v-html="$options.filters.autoLink(memo.text)"></div>
</div>
</template>
<script>
  export default {
    props:["memo", "type"],
    methods:{
      remove(e){
        e.preventDefault();
        this.$store.dispatch('REMOVE_MEMO', {type:this.type, key:this.memo.key});
      }
    }
  }
</script>
<style lang="stylus">
  .memo
    border-radius 10px
    padding 10px
    width 90%
    margin 5px auto
    background rgba(255, 255, 255, 0.3)
    textarea
      border none
      background transparent
      resize none
      width 100%
      outline none
      color #999
    div.toolbar
      text-align right
      height 20px
      a
        color red
        width 20px
        height 20px
        display inline-block
        text-align center
        line-height 20px
        cursor pointer
        text-decoration none
        &:hover
          background red
          color white
    .memocontent
      font-size 12px
      white-space wrap
      font-family '나눔 고딕', '맑은 고딕', sans-serif
      a
        text-decoration none
        color #333
        &:hover
          color black
          text-decoration underline
</style>