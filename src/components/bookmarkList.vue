<template>
<div class="bookmarkList">
  <form @submit="addItem($event)" action="#">
    <input v-model="newItem.url" placeholder="URL">
    <input v-model="newItem.title" placeholder="사이트 이름">
    <button type="submit" class="btn">추가</button>
  </form>
  <div class="listbody">
    <bookmarkItem v-for="i in list" :item="i" :key="i.key"></bookmarkItem>
  </div>
</div>
</template>
<script>
import bookmarkItem from './bookmarkItem.vue'
  export default {
    data(){
      return {newItem:{url:'', title:'', hit:0}}
    },
    computed:{
      list(){
        return this.$store.state.bookmarks
      }
    },
    components:{bookmarkItem},
    methods:{
      addItem(e){
        e.preventDefault();
        let item = {title:this.newItem.title, url:this.newItem.url, hit:this.newItem.hit};
        this.newItem = {url:'', title:'', hit:0};
        this.$store.dispatch('ADD_ITEM', item);
      }
    }
  }
</script>
<style lang="stylus">
  .bookmarkList
    height 100%
    max-width 200px
    width 20%
    position relative
    display flex
    flex-direction column
    form
      flex-grow 1
      height 70px
      input,button
        background-color rgba(255,255,255,0.2)
        transition background-color .5s ease
        display block
        height 20px
        border solid 1px #eee
        margin 2px auto
        border none
        &:focus
          background-color rgba(255,255,255,0.8)
          border none
          outline none
    .listbody
      flex-grow 1
      padding-bottom 53px
      &::-webkit-scrollbar-track
        border-radius 5px
        background-color rgba(0, 0,0, 0.01)
      &::-webkit-scrollbar
        width 10px
        background-color rgba(0,0,0,0.01)
      &::-webkit-scrollbar-thumb
        border-radius 5px
        background-color rgba(255,255,255,0.01)
      overflow-y auto
</style>