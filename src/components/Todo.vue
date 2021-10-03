<template>
  <div id="todo">
    <div class="add">
      <input type="text" v-model="todoName" @keydown.enter="addTodo(todoName);todoName = null" placeholder="Add a new mission...">
      <div class="add_icon" @click="addTodo(todoName);todoName = null">+</div>
    </div>
    <div class="todo_list">
      <div class="date_title">
        <img src="@/assets/imgs/calendar.png" alt="">
        <div class="date_time">{{todatDate}}</div>
      </div>
      <div class="todo_list_box">
        <div class="each_todo" :class="{active:item.id === currentWork}" v-for="item in todoList" :key="item.id">
          <img v-show="item.isDone" @click="changeDone(item.id)" src="@/assets/imgs/check.png" alt="" style="height:30px;width:28px;margin-right: 17px;">
          <img v-show="!item.isDone" @click="changeDone(item.id)" src="@/assets/imgs/uncheck.png" alt="">
          <span class="delet_icon" @click="removeTodo(item.id)">X</span>
          <span class="each_todo_title" @click="ChoseCurrentWork(item.id)">{{item.title}}</span>
          <span class="todo_num" v-for="item,idx in item.tomatos" :key="idx">●</span>
        </div>
        <!-- <div class="each_todo">
          <img src="@/assets/imgs/uncheck.png" alt="">
          <span>Clean up the desk2</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations} from "vuex";
export default {
  name:'todo',
  data(){
    return {
      todoName:null
    }
  },
  computed:{
    ...mapState(["todoList","todatDate","currentWork"]),
  },
  methods:{
    ...mapMutations(["changeDone","addTodo","removeTodo","ChoseCurrentWork"]),
  }
}
</script>

<style lang="scss">
#todo{
  width: 500px;
  height: 70%;
  position: absolute;
  top: 180px;
  left: 55%;
  overflow: hidden;
  transition:all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  .add{
    position: relative;
    input{
      width: 500px;
      height: 40px;
      font-size: 24px;
      border: none;
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
      background: rgb(243, 237, 201);
      color: #c75647;
      &::placeholder {
        color: #d3a6a0;
      }
      &:focus{
        outline: none;
      }
    }
    .add_icon{
      font-size: 40px;
      color:rgb(230, 42, 42) ;
      position: absolute;
      right: 15px;
      top: -2px;
      cursor: pointer;
    }
  }

  .todo_list{
    width: 100%;
    margin-top: 20px;
    .date_title{
      width: 100%;
      height: 60px;
      background: #E9414C;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      .date_time{
        width: 90%;
        display: inline-block;
        text-align: center;
        font-size: 24px;
        color: #F2F0C9;
        line-height: 60px;
      }
      img{
        margin-top: 15px;
        margin-left: 20px;
        width: 30px;
        height:30px;
        object-fit: contain;
        
      }
    }
    .todo_list_box{
      padding: 20px 15px;
      border-end-start-radius: 8px;
      border-end-end-radius: 8px;
      background: linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.01) 100%);
      overflow-y: scroll;
      height: 300px;
      .each_todo{
        margin-top: 10px;
        padding: 5px 15px;
        height: 40px;
        color: #F2F0C9;
        font-size: 20px;
        display: flex;
        align-items: center;
        &.active{
          background: rgba(0, 0, 0, 0.116);
          border-radius: 25px;
        }
        img{
          margin-right: 20px;
          width: 25px;
          height: 25px;
          object-fit: contain;
          cursor: pointer;
        }
        .delet_icon{
          margin-right:15px;
          font-weight:900;
          cursor: pointer;
        }
        .each_todo_title{
          width: 70%;
          border-bottom: 1px dashed #F2F0C9;
          padding-bottom: 6px;
          cursor: pointer;
        }
        .todo_num{
          margin-right: 5px;
        }
      }
      &::-webkit-scrollbar{
        width: 8px;
        background-color: #4d4d4d1a;
      }
      &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: #F2F0C9;
      }
    }
  }
}
</style>