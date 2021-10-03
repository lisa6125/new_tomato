<template>
  <div id="clock" class="clock work">
    <svg id="clock-progress" width="550" height="550" viewBox="0 0 530 530">
      <circle
        cx="265"
        cy="265"
        r="260"
        fill="#f2f0c97c"
        stroke-dasharray="1632.8"
      />
      <circle
        id="progress-bar"
        cx="265"
        cy="265"
        r="250"
        fill="none"
        stroke-width="20"
        stroke-dasharray="1632.8"
        :style="{
          'stroke-dashoffset':1632.8*progress
        }"
      />
    </svg>
    <div class="clock-group">
      <div class="todo_title">
        <span v-if="workState === 'break' " >休息中</span>
        <span v-else>{{ showCurrentWork }}</span>
        </div>
      <div class="show_time">{{min}}&nbsp;:&nbsp;{{sec}}</div>
      <div id="btn_group">
        <div class="btn alert" >
          <img v-if="alert" @click="openAlert(false)" src="@/assets/imgs/alert.png" alt="">
          <img v-else @click="openAlert(true)" src="@/assets/imgs/noalert.png" alt="">
        </div>
        <div class="btn start" @click="startTime">
          <img v-if="timerState==='pause'" src="@/assets/imgs/start.png" alt="">
          <img v-else src="@/assets/imgs/stop.png" alt="">
        </div>
        <div class="btn next" @click="toChoseNextWork">
          <img src="@/assets/imgs/next.png" alt="">
        </div>
      </div>
      
    </div>
    <div class="todo_next">Next&nbsp;:&nbsp;{{showNextWork}}</div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations,mapGetters} from "vuex";
export default {
  name:'clock',
  computed:{
    ...mapState(["alert","timerState","workState"]),
    ...mapGetters(["showCurrentWork","showNextWork","min","sec","progress"])
  },
  methods:{
    ...mapMutations(["openAlert","toChoseNextWork"]),
    ...mapActions(["startTime"])
  }
}
</script>

<style lang='scss'>
@keyframes workprogress {
  0% {
    stroke-dashoffset: 1580;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
.clock {
  width: 540px;
  height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translateY(-50%);
  border-radius: 50%;
  border: 3px solid transparent;
  box-sizing: border-box;
  position: relative;
  .work {
    background: #ff9e43;
  }
  .clock-group{
    width: 530px;
    height: 530px;
    border-radius: 50%;
    background: #BC2B35;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    color: #F2F0C9;
    .todo_title{
      font-size: 32px;
      height: 32px;
      font-weight: 300;
      margin-top: 20px;
      margin-bottom: 60px;
    }
    .show_time{
      font-size: 58px;
      letter-spacing: 10px;
    }
    #btn_group{
      width: 100%;
      margin-top: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn{
        margin: 0 10px;
        cursor: pointer;
      }
    }
  }
  .todo_next{
    width: 500px;
    text-align: center;
    position: absolute;
    bottom: -70px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 32px;
    font-weight: 100;
    color: #f2f0c9b2;
  }
}
#progress-bar{
  stroke: #F2F0C9;
}
#clock-progress {
  position: absolute;
  transform: rotate(-90deg);
}
</style>