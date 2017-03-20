<template>
  <div id="app" :style="{backgroundImage: backgroundImageString }">
    <header :style="{backgroundColor:$store.state.colour}">
      <template v-if="user">
        <h1>{{user.displayName}}</h1>
        <a @click="signOut">로그아웃</a>
      </template>
    </header>
  <section v-if="user" id="main">
    <BookmarkList></BookmarkList>
    <Clock></Clock>
    <MemoList></MemoList>
  </section>
  <section v-if="!user" id="login">
    <button @click="signIn" class="btn btn-large">로그인</button>
  </section>
  </div>
</template>
<script>
import BookmarkList from './components/bookmarkList.vue'
import Clock from './components/clock.vue'
import MemoList from './components/memoList.vue'

  export default {
    components:{ BookmarkList, Clock, MemoList  },
    computed:{
      user(){
        return this.$store.state.user;
      },
      backgroundImageString(){
        return `linear-gradient(to bottom, #ffffff, ${this.$store.state.colour})`;
      }
    },
    methods:{
      signIn(){
        this.$store.dispatch('SIGN_IN');
      },
      signOut(){
        this.$store.dispatch('SIGN_OUT');
      }
    }
  }
</script>
<style lang="stylus">

*
  margin 0
  padding 0
  box-sizing border-box
html, body
  width 100%
  height 100%
  font-family 'Roboto Mono', '나눔 고딕', '맑은 고딕', sans-serif;
  font-weight 100
#app
  transition background .6s linear
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  header
    margin 0
    margin-bottom 20px
    position relative
    display block
    background rgba(0,0,0,0.05)
    height 30px
    color #999
    h1
      font-size 16px
      height 30px
      line-height 30px
      color white
    a
      position absolute
      bottom 0
      right 1em
      cursor pointer
      color #eee
      line-height 30px
      &:hover
        color white
  #login
    display flex
    position absolute
    padding-top 30px
    top 0
    left 0
    right 0
    bottom 0
    button
      margin auto
      font-size 30px
      font-weight 500
      color white
      background-color #369
      padding 2em 3em
      border none
      cursor pointer
      &:hover
        background #69c
  #main
    display flex
    height 100%
    align-items center
    >*
      flex-grow 1


</style>