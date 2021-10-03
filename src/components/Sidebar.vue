<template>
<div id="side_bar" class="side_bar" :class="{side_bar_open:modelState}">
  <div class="right_cir">
    <img src="@/assets/imgs/right_cir.png" alt="">
  </div>
  <div id="hamber">
    <div class="hamber hamber_close" v-if="modelState" @click="openModel(0)">
      <img src="@/assets/imgs/close.png" alt="">
    </div>
    <div class="hamber hamber_open" v-else @click="openModel(1)">
      <img src="@/assets/imgs/list.png" alt="">
    </div>
  </div>
  <div id="list_buttons">
    <div id="todo_btn" class="btn " :class="{btn_active:modelState===1}" @click="openModel(1)">
      <img src="@/assets/imgs/icon1.png" alt="">
    </div>
    <div id="analyze_btn" class="btn" :class="{btn_active:modelState===2}" @click="openModel(2)">
      <img src="@/assets/imgs/icon2.png" alt="">
    </div>
    <div id="set_btn" class="btn" :class="{btn_active:modelState===3}" @click="openModel(3)">
      <img src="@/assets/imgs/icon3.png" alt="">
    </div>
  </div>
  <transition name="fade">
    <Todo v-show="modelState === 1"/>
  </transition>
  <transition name="fade">
    <Analytic v-if="modelState === 2" />
  </transition>
  <transition name="fade">
    <Setting v-if="modelState === 3"/>
  </transition>
</div>
</template>

<script>
import { mapState, mapMutations,mapGetters} from "vuex";
import Todo from "../components/Todo.vue"
import Analytic from '../components/Analytic.vue'
import Setting from '../components/Setting.vue'

export default {
  name:'sidebar',
  components:{Todo,Analytic,Setting},
  data() {
    return {
    }
  },
  computed:{
    ...mapState(["modelState"]),...mapGetters(["tomatosChart"])
  },
  methods:{
    ...mapMutations(["openModel"]),
  }
}
</script>

<style lang="scss">
.side_bar{
  width: 20%;
  height: 100%;
  position: relative;
  transition: 0.5s all ease;
  .right_cir{
    position: absolute;
    width: 358px;
    height: 716px;
    top: 130px;
    right: 0;
    transition: 0.5s all ease;
  }
  .hamber{
    position: absolute;
    top: 50px;
    right: 51px;
    width: 49px;
    height: 30px;
    cursor: pointer;
  }
  #list_buttons{
    position: absolute;
    top: 55%;
    transform: translate(-50%,-50%);
    left: 60%;
    width: 80px;
    height: 500px;
    transition: 0.5s all ease;
    .btn{
      margin: 40px 0;
      width: 70px;
      height: 70px;
      border: 1px solid #F2F0C9;
      border-radius: 50%;
      background: rgba(112, 39, 39, 0.137);
      cursor: pointer;
      transition: 0.2s all ease-in;
      &:hover{
        background: rgba(207, 52, 52, 0.904);
      }
      img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  &.side_bar_open{
    width: 80%;
    transition: 0.5s all ease;
    .right_cir{
      height: 200%;
      width: 80%;
      top: -50%;
      transition: 0.5s all ease;
      img{
        object-fit: fill;
      }
    }
    #list_buttons{
      left: 20%;
      transition: 0.5s all ease;
      .btn_active{
        background: rgba(224, 52, 52, 0.883);
      }
    }
    #todo{
      width: 500px;
      height: 70%;
      top: 180px;
      left: 35%;
      overflow: hidden;
      opacity: 1;
      transition:all .8s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    #analytic{
      left: 45%;
      opacity: 1;
      transition:all .8s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    #setting{
      left: 45%;
      opacity: 1;
      transition:all .8s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: all .8s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(130%);
  opacity: 0;
}
</style>