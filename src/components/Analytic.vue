<template>
  <div id="analytic">
    <div id="countTomato">
      <div class="shownum today">
        <span>Today</span>
        <span>{{tomatosToday}}</span>
      </div>
      <div class="shownum weekly">
        <span>Weekly</span>
        <span>{{tomatosWeek}}</span>
      </div>
      <div class="shownum totoally">
        <span>Totoally</span>
        <span>{{tomatosTotoally}}</span>
      </div>
    </div>
    <LineChart id="linechart" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import LineChart from '../components/LineChart.vue'
export default {
  name:'Analytic',
  components:{LineChart},
  computed:{
    ...mapGetters(["tomatosToday","tomatosWeek","tomatosTotoally"])
  }
}
</script>

<style lang="scss">
#analytic{
  position: absolute;
  top: 200px;
  left: 130%;
  opacity: 0;
  transition:all .8s cubic-bezier(0.075, 0.82, 0.165, 1);
  color: #F2F0C9;
  #countTomato{
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 24px;
    .shownum{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span:last-child{
        font-size: 42px;
        margin-top: 10px;
      }
    }
  }
  #linechart{
    margin-top: 80px;
  }
}
</style>