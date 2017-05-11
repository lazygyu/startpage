<template>
  <div class="memolist">
    <div class="tabContainer">
      <a class="tabHeader" @click="tabChange(0)" :class="{active:activeTab==0}">내 메모</a>
      <a class="tabHeader" @click="tabChange(1)" :class="{active:activeTab==1}">공유 메모</a>
    </div>
    <form @submit="addNew($event)">
      <textarea v-model="currentMemo" placeholder="메모를 입력하세요"></textarea>
      <button type="submit">저장</button>
    </form>
    <div v-show="activeTab==0">
      <Memo v-for="memo in myMemos" :memo="memo" :key="memo.key" type="0"></Memo>
    </div>
    <div v-show="activeTab==1">
      <Memo v-for="memo in commonMemos" :memo="memo" :key="memo.key" type="1"></Memo>
    </div>
  </div>
</template>
<script>
import Memo from './memo.vue'
  export default {
    components:{Memo},
    data(){
      return {activeTab:0, currentMemo:''};
    },
    computed:{
      myMemos(){
        return this.$store.state.memo_mine || [];
      },
      commonMemos(){
        return this.$store.state.memo_common || [];
      }
    },
    methods:{
      tabChange(n){
        this.activeTab = n;
      },
      addNew(e){
        e.preventDefault();
        let newMemo = { text:this.currentMemo };
        this.currentMemo = '';
        this.$store.dispatch('ADD_MEMO', {type:this.activeTab, memo:newMemo});
      }
    }
  }
</script>
<style lang="stylus">
  .memolist
    width 300px
    max-width 300px
    height 100%
    overflow-y auto
    padding-bottom 101px
    background-color rgba(255,255,255,0.2)
    .tabContainer
      .tabHeader
        display inline-block
        text-align center;
        width 50%
        border solid 1px rgba(0,0,0,0.05)
        background-color rgba(0, 0, 0, 0.05)
        border-radius 5px 5px 0 0
        cursor pointer
        &.active
          background-color transparent
          border-bottom none
    form
      button
        display block
        border none
        background transparent
        font-weight bold
        width 100%
        marign 0 auto
        padding 5px
        &:hover{
          background-color rgba(255,255,255,0.5)
        }
      textarea
        border none
        display block
        background-color rgba(255,255,255,0.5)
        transition background-color .5s ease
        color #666
        width 80%
        height 4em
        margin 5px auto
        resize none
        &:focus
          outline none
          background-color rgba(230,250,230,0.5)
</style>