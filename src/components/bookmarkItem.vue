<template>
  <div class="bookmarkItem" key="item.key">
    <a :href="item.url" target="_blank" @click="hit">{{item.title}}</a>
    <a :href="item.url" target="_blank" @click="hit"><small>{{item.url}}</small></a>
    <button type="button" @click="remove">&times;</button>
  </div>
</template>
<script>
export default {
  props:['item'],
  methods:{
    hit(){
      this.$store.dispatch('HIT', this.item);
    },
    remove(){
      this.$store.dispatch('REMOVE_ITEM', this.item);
    }
  }
}
</script>
<style lang="stylus">
  .bookmarkItem
    padding 10px 20px 10px 10px
    border-bottom solid 1px rgba(0,0,0,0.1)
    background-color rgba(255,255,255,0)
    transition background-color .2s ease
    position relative
    a
      display block
      text-decoration none
      color #333
      font-size 14px
      font-weight 300
      
      small
        display block
        font-size .6em
        color #69c
        text-decoration none
    button
      position absolute
      right 10px
      top 10px
      width 20px
      height 20px
      border none
      color red
      background transparent
      display none
    &:hover
      background-color rgba(255,255,255,0.8)
      button
        display block
        &:hover
          background red
          color white

</style>