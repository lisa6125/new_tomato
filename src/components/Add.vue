<template>
  <div id="add">
    <div class="add-box">
      <input type="text" v-model="todoName" @keydown.enter="addTodo(todoName);todoName = null" placeholder="Add a new mission...">
    </div>
  </div>
</template>

<script>
import { mapMutations} from "vuex";
export default {
  data(){
    return {
      todoName:null
    }
  },
  methods:{
    ...mapMutations(["addTodo"]),
  }
}
</script>

<style lang="scss">
#add{
  width: 500px;
  height: 200px;
  position: absolute;
  top: 55%;
  left: 5%;
  display: inline-block;
  transition: 0.5s all ease;
  .add-box{
    width: 310px;
    height: 32px;
    position: relative;
    input{
      width: 310px;
      height: 32px;
      padding: 2px;
      background: none;
      border-top:none;
      border-right:none;
      border-left:none;
      border-bottom: 1px solid #F2F0C9;
      color: #F2F0C9;
      outline: none;
      font-family: 'Nunito', sans-serif;
      font-size: 28px;
      &:focus{
        outline: none;
      }
      &::placeholder {
        font-size: 24px;
        color: #f2f0c96c;
        font-family: 'Nunito', sans-serif;
        font-weight: 300;
      }
      &::before{
        content: '123';
        position: absolute;
        width: 50px;
        height: 50px;
        top: 10px;
        right: 0;
        background: #000;
      }
    }
    &::before{
      content:'+';
      position: absolute;
      width: 20px;
      height: 20px;
      top:0px;
      right: 0px;
      font-size: 36px;
      color: #F2F0C9;
      font-weight: 100;
    }
  }
}
</style>