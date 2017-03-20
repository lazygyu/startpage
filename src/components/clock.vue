<template>
  <div class="clock">
    <small>{{date.getFullYear()}}년 {{date.getMonth()+1 | digitPad(2)}}월 {{date.getDate() | digitPad(2)}}일 ({{date.getDay() | dayString}})</small><br />
    {{date.getHours() > 12?'PM':'AM'}} {{(date.getHours()===12?12:date.getHours()%12) | digitPad(2)}}:{{date.getMinutes()|digitPad(2)}}<em>:{{date.getSeconds()|digitPad(2)}}</em>
    <Weather :hour="date.getHours()"></Weather>
  </div>
</template>
<script>
import Weather from './weather.vue'
  export default {
    components:{Weather},
    data(){
      return {date:new Date(), handle:null};
    },
    mounted(){
      this.date = new Date(); this.$store.dispatch('TIME_CHANGED', this.date); 
      this.handle = setInterval(()=>{ this.date = new Date(); this.$store.dispatch('TIME_CHANGED', this.date); }, 1000);
    },
    methods:{

    },
    beforeDestroy(){
      clearInterval(this.handle);
    }
  }
</script>
<style lang="stylus">
  .clock
    font-size 128px
    height auto
    color rgba(255,255,255,0.8)
    font-weight thin
    letter-spacing -.1em
    line-height 60%
    width 40%
    text-align center
    margin-top -200px
    em
      font-size 64px
      font-style normal
      color rgba(255,255,255,0.5)
    small
      font-size 48px
      letter-spacing 0
</style>