import Vue from 'vue'
import Vuex from 'vuex'
import moment from "moment";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
var alarm = new Audio();
export default new Vuex.Store({
  state: {
    modelState: 0,
    todatDate:moment().format("dddd, MMMM Do YYYY"),
    todoList: [
      //番茄鐘 列表
      {
        id: moment()
          .subtract(8, "days")
          .unix(),
        title: "the XX thing to do today3",
        isDone: false,
        tomatos: 1
      },
      {
        id: moment()
          .subtract(7, "days")
          .unix(),
        title: "the XX thing to do today2",
        isDone: false,
        tomatos: 4
      },
      {
        id: moment()
          .subtract(6, "days")
          .unix(),
        title: "the XX thing to do today1",
        isDone: false,
        tomatos: 3
      },
      {
        id: moment()
          .subtract(5, "days")
          .unix(),
        title: "reading",
        isDone: false,
        tomatos: 4
      },
      {
        id: moment()
          .subtract(4, "days")
          .unix(),
        title: "go out with friends",
        isDone: false,
        tomatos: 3
      },
      {
        id: moment()
          .subtract(2, "days")
          .unix(),
        title: "wash dishes",
        isDone: false,
        tomatos: 5
      },
      {
        id: moment()
          .subtract(1, "days")
          .unix(),
        title: "feed the cat",
        isDone: false,
        tomatos: 5
      },
      {
        id: moment().unix(),
        title: "do homework",
        isDone: false,
        tomatos: 3
      }
    ],
    workTime: 1500,
    breakTime: 180,
    timer: null, //計時器 Interval
    time: 1500, //計時 時間
    timerState: "pause", // 計時狀態 : 'play' 'pause'
    workState: "work", // 工作狀態 : 'work' 'break'
    alert: true,
    alertSate:false,
    selectAlert: "alarm",
    currentWork:''
  },
  mutations: {
    openModel(state, status) {
      state.modelState = status
    },
    changeDone(state, itemId) {
      if (state.workState === "work") {
        return
      }
      let todoNotDone = state.todoList.filter((e) => {
        return e.isDone === false
      })
      let chose = state.todoList.find((e) => {
        return e.id === itemId
      })

      // 勾選完成後，繼續向下移動。而最後則不移動
      for (let i = 0; i < todoNotDone.length; i++){
        if (state.currentWork == itemId && todoNotDone[i].id == itemId) {
          //若都已完成，則停止向下移動
          if (i === 0 && todoNotDone.length === 1 ) {
            chose.isDone = !chose.isDone
            return
          }
          // 當currentWork為未完成的最後選項時，且未完成長度大於1，完成後currentWork跳到未完成的第一個項目
          if (todoNotDone.length > 1 && i === todoNotDone.length - 1) {
            i = -1
          }
          state.currentWork = todoNotDone[i + 1].id
        }
      }
        chose.isDone = !chose.isDone
    },
    addTodo(state, item) {
      if (item == null || item == "" || item == undefined) {
        alert('不可為空值')
        return
      }
      let now = moment().format("X"); // ID = 現在時間
      state.todoList.unshift({
        id: now,
        title: item,
        isDone: false,
        tomatos: 0
      })
    },
    removeTodo(state, itemId) {
      for (let i = 0; i < state.todoList.length; i++){
        if (state.todoList[i].id === itemId) {
          state.todoList.splice(i, 1)
        }
      }
    },
    openAlert(state) {
      state.alert = !state.alert
    },
    handleWorkTime(state,num) {
      state.workTime = num;
      clearInterval(state.timer);
      state.time = state.workTime;
      state.timerState = "pause";
      state.workState = "work";
    },
    handleBreakTime(state,num) {
      state.breakTime = num;
    },
    handlesSelectAlert(state,choose) {
      state.selectAlert = choose
    },
    ChoseCurrentWork(state,id) {
      state.currentWork = id;
      clearInterval(state.timer);
      state.time = state.workTime;
      state.timerState = "pause";
      state.workState = "work";
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id &&state.todoList[i].isDone === true) {
          state.currentWork = ''
        }
      }
    },
    toChoseNextWork(state) {
      clearInterval(state.timer);
      state.time = state.workTime;
      state.timerState = "pause";
      state.workState = "work";
      let todoNotDone = state.todoList.filter((e) => {
        return e.isDone === false
      })
      for (let i = 0; i < todoNotDone.length; i++){
        if (todoNotDone[i].id === state.currentWork) {
          if (todoNotDone.length > 1 && i === todoNotDone.length - 1) {
            i = -1
          }
          state.currentWork = todoNotDone[i + 1].id
          return
        }
      }
    },
    // 計時
    tickTime(state) {
      if (state.workState === "work") {
        state.time = state.time - 1;
        if (state.time < 0) {
          clearInterval(state.timer);
          state.workState = "break";
          state.time = state.breakTime;
          let tomato = state.todoList.find(item => item.id === state.currentWork);
          tomato.tomatos = tomato.tomatos + 1;
          state.timerState = "pause";
          state.alertSate = true;
          alarm.src = require('@/assets/audio/' + state.selectAlert + '.mp3') ;
          alarm.loop = true;
          if (state.alert) {
            alarm.play();
          }
        }
      } //若工作狀態 : break
      else {
        state.time = state.time - 1;
        if (state.time < 0) {
          clearInterval(state.timer);
          state.workState = "work";
          state.time = state.workTime;
          state.timerState = "pause";
          state.alertSate = true;
          alarm.src = require('@/assets/audio/' + state.selectAlert +'.mp3');
          alarm.loop = true;
          if (state.alert) {
            alarm.play();
          }
        }
      }
    },
    closeAlarm(state) {
      state.alertSate = false;
      alarm.pause();
    }
  },
  actions: {
    startTime(context) {
      let todoNotDone = context.state.todoList.filter((e) => {
        return e.isDone === false
      })
      if (context.state.currentWork === '') {
        context.state.currentWork = todoNotDone[0].id
      }
      if (context.state.timerState === "pause") {
        context.state.timer = setInterval(() => {
          context.commit("tickTime",this);
        }, 1000);
        context.state.timerState = "play";
      } else {
        clearInterval(context.state.timer);
        context.state.timerState = "pause";
      }
    }
  },
  getters: {
    tomatosToday(state) {
      let tomatos = 0;
      const todayList = state.todoList.filter(item => {
        let now = moment();
        let date = moment.unix(item.id);
        let days = now.diff(date, "days");
        return days === 0;
      });
      todayList.forEach(item => {
        tomatos += item.tomatos;
      });
      return tomatos;
    },
    tomatosWeek(state) {
      let tomatos = 0;
      const todayList = state.todoList.filter(item => {
        let now = moment();
        let date = moment.unix(item.id);
        let days = now.diff(date, "days");
        return days <= 7;
      });
      todayList.forEach(item => {
        tomatos += item.tomatos;
      });
      return tomatos;
    },
    tomatosTotoally(state) {
      let tomatos = 0;
      state.todoList.forEach(item => {
        tomatos += item.tomatos;
      });
      return tomatos;
    },
    tomatosChart(state) {
      let tomatos = [
        {
          day: moment()
            .subtract(6, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(5, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(4, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(3, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(2, "days")
            .format("M/D"),
          tomatos: 0
        },
        {
          day: moment()
            .subtract(1, "days")
            .format("M/D"),
          tomatos: 0
        },
        { day: moment().format("M/D"), tomatos: 0 }
      ];
      for (let i = 0; i < 7; i++) {
        let list = state.todoList.filter(item => {
          let now = moment();
          let date = moment.unix(item.id);
          let days = now.diff(date, "days");
          return days === i;
        });
        list.forEach(item => {
          tomatos[6 - i].tomatos += item.tomatos;
        });
      }
      return tomatos;
    },
    showCurrentWork(state) {
      let show = ''
      for (let i = 0; i < state.todoList.length; i++){
        if (state.todoList[i].id == state.currentWork) {
          show = state.todoList[i].title
        }
      }
      return show
    },
    showNextWork(state) {
      let todoNotDone = state.todoList.filter((e) => {
        return e.isDone === false
      })
      let show = ''
      for (let i = 0; i < todoNotDone.length-1 ; i++){
        if (todoNotDone[i].id == state.currentWork && todoNotDone[i+1].isDone === false ) {
          show = todoNotDone[i+1].title
        }
      }
      return show
    },
    min(state) {
      return Math.floor(state.time / 60);
    },
    sec(state) {
      if (Math.ceil(state.time % 60).toString().length < 2) {
        return "0" + Math.ceil(state.time % 60);
      } else {
        return Math.ceil(state.time % 60);
      }
    },
    // 進度條
    progress(state) {
      if (state.workState === "work") {
        return state.time / state.workTime;
      } else {
        return state.time / state.breakTime;
      }
    },
  },
  plugins: [createPersistedState()]
})