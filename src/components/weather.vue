<template>
<div class="weather" @click="gotoWeather">
  <div class="weatherLocation" v-if="location">
    {{location.city}} {{location.county}} {{location.village}}
    <template v-if="current">
    <span class="currentWeather">
      {{current.sky.name}} 
      {{parseInt(current.temperature.tc)}} <span class="icon diw-degrees-celcius"></span>
      {{current.wind.wspd}} m/s
    </span>
    </template>
  </div>
  <weatherDetail v-if="yesterday" label="어제" :item="yesterday" :hour="hour"></weatherDetail>
  <weatherDetail v-if="today" label="오늘" :item="today" :hour="hour"></weatherDetail>
  <weatherDetail v-if="tomorrow" label="내일" :item="tomorrow" :hour="hour"></weatherDetail>
  <weatherDetail v-if="afterTomorrow" label="모레" :item="afterTomorrow" :hour="hour"></weatherDetail>
</div>
</template>
<script>
import weatherDetail from './weatherDetail.vue'
export default {
  components:{weatherDetail},
  props:['hour'],
  computed:{
    location(){
      return this.$store.state.weather && this.$store.state.weather.weather.summary[0].grid;
    },
    today(){
      return this.$store.state.weather && this.$store.state.weather.weather.summary[0].today;
    },
    yesterday(){
      return this.$store.state.weather && this.$store.state.weather.weather.summary[0].yesterday;
    },
    tomorrow(){
      return this.$store.state.weather && this.$store.state.weather.weather.summary[0].tomorrow;
    },
    afterTomorrow(){
      return this.$store.state.weather && this.$store.state.weather.weather.summary[0].dayAfterTomorrow;
    },
    current(){
      return this.$store.state.currentWeather;
    }
  },
  methods:{
    gotoWeather(){
      window.open(`https://search.naver.com/search.naver?where=nexearch&query=${this.location.city}+${this.location.county}+${this.location.village}+날씨`);
    }
  }
}
</script>
<style lang="stylus">
  .weatherLocation
    cursor pointer
    font-family '나눔 고딕', '맑은 고딕', sans-serif
    font-size 16px
    line-height 20px
    letter-spacing 0
    margin-top 40px
    margin-bottom 20px
    color rgba(0,0,0,0.3)
    .currentWeather
      display block
      height 21px
      line-height 21px
      .icon
        vertical-align middle
</style>