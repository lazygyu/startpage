<template>
<div class="weatherDetail" :class="label=='오늘'?'today':''">
  <div class="label">{{label}}</div>
  <div class="icon" :class="item.sky.code | weather2Icon(hour)"></div>
  <div class="sky">{{item.sky.name}}</div>
  <div class="temperature">
    <span class="icon diw-thermometer-50"></span>
    {{parseInt(item.temperature.tmin)}} <span class="icon diw-degrees-celcius"></span> / 
    {{parseInt(item.temperature.tmax)}} <span class="icon diw-degrees-celcius"></span>
  </div>
</div>
</template>
<script>
  export default {
    props:['item', 'hour', 'label']
  }
</script>
<style lang="stylus">
  .weatherDetail
    &.today
      width 200px
      border-right solid 1px rgba(0,0,0,0.1)
      border-left solid 1px rgba(0,0,0,0.1)
      color rgba(255,255,255,0.7)
    color rgba(255, 255, 255,0.4)
    margin-top 10px
    margin-bottom 40px
    font-family '나눔 고딕', '맑은 고딕', sans-serif
    display inline-block
    font-size 16px
    line-height 20px
    width 140px
    letter-spacing 0
    >.label
      font-weight bold
    >.icon
      font-size 36px
    >.temperature
      margin-top 20px
      height 21px
      line-height 21px
      vertical-align middle
      .icon
        vertical-align middle
    
</style>