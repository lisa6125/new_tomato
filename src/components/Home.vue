<template>
  <div id="home">
    <div class="logo">
      <img src="@/assets/imgs/logo.png" alt="">
    </div>
    <div class="left_cir">
        <img src="@/assets/imgs/left_cir.png" alt="">
      </div>
    <div class="top_cir">
        <img src="@/assets/imgs/top_cir.png" alt="">
      </div>
    <div class="bottom_cir">
        <img src="@/assets/imgs/bottom_cir.png" alt="">
      </div>
    <div id="main">
      <div id="add_clock" :class="{add_clock_open:modelState}">
        <Add/>
        <Clock/>
      </div>
      <Sidebar/>
    </div>
    <transition name="fadeIn" >
      <div id="stopMask" v-if="alertSate">
        <div class="tomatoPic">
        <img src="@/assets/imgs/tomato.png" alt="">
        </div>
        <div class="stopAlert" @click="changeDone(currentWork);closeAlarm()">stop</div>
      </div>
    </transition>
  </div>
</template>

<script>
import Add from "@/components/Add";
import Clock from "@/components/Clock";
import Sidebar from "@/components/Sidebar";

import { mapState,mapMutations} from "vuex";
export default {
  name: "home",
  components:{Clock,Add,Sidebar},
    computed:{
    ...mapState(["modelState","alertSate","currentWork"]),
  },
  methods:{
    ...mapMutations(["closeAlarm","changeDone"])
  }
}
</script>

<style lang='scss' scope>
#home{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .logo{
    width: 400px;
    height: 51px;
    position: absolute;
    top: 44px;
    left: 51px;
  }
  .left_cir{
    width: 358px;
    height: 716px;
    position: absolute;
    top: 182px;
    left:0px;
  }
  .top_cir{
    width: 305px;
    height: 130px;
    position: absolute;
    top: 0px;
    left:511px;
  }
  .bottom_cir{
    width: 464px;
    height: 191px;
    position: absolute;
    bottom:-40px;
    left: 1212px;
  }
  #main{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    #add_clock{
      width: 80%;
      height: 100%;
      z-index: 10;
      transition: 0.5s all ease;
    }
    .add_clock_open{
      transform: translateX(-10%);
      transition: 0.5s all ease;
      #add{
        left: -50%;
        transition: 0.5s all ease;
      }
    }
  }
  #stopMask{
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.513);
    backdrop-filter: blur(5px);
    .tomatoPic{
      width:500px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%) rotate(-8deg);
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .stopAlert{
      position: absolute;
      top: 62%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 120px;
      height: 60px;
      border-radius: 3px;
      border: 5px solid rgb(251, 238, 200);
      background: rgb(240, 207, 117);
      color: rgb(240, 160, 33);
      font-size: 42px;
      text-align: center;
      line-height: 60px;
      font-weight: 900;
      text-shadow: -2px 0 rgb(251, 238, 200), 0 2px rgb(251, 238, 200),
      2px 0 rgb(251, 238, 200), 0 -2px rgb(251, 238, 200);
      cursor: pointer;
      transition: 0.1s all ease-in;
      &:active{
        width: 130px;
        height: 70px;
        font-size: 52px;
      }
    }
  }
}
img{
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.fadeIn-enter-active, .fadeIn-leave-active {
  transition: all .8s ease;
}
.fadeIn-enter, .fadeIn-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-130%);
  opacity: 0;
}
</style>