<template>
  <div id="setting">
    <div class="timeSetting">
      <div class="settingTitle">Time Setting</div>
      <div class="workingTime settingItem">
        <span>Working time</span>
        <el-select v-model="WorkTimeStatus">
          <el-option label="50分鐘" value=3000>50分鐘</el-option>
          <el-option label="40分鐘" value=2400>40分鐘</el-option>
          <el-option label="35分鐘" value=2100>35分鐘</el-option>
          <el-option label="25分鐘" value=1500>25分鐘</el-option>
        </el-select>
      </div>
      <div class="breakTime settingItem">
        <span>Resting time</span>
        <el-select v-model="BreakTimeStatus">
          <el-option label="15分鐘" value=900>15分鐘</el-option>
          <el-option label="10分鐘" value=600>10分鐘</el-option>
          <el-option label="5分鐘" value=300>5分鐘</el-option>
          <el-option label="3分鐘" value=180>3分鐘</el-option>
        </el-select>
      </div>
    </div>
    <div class="alarmSetting">
      <div class="settingTitle">Alarm</div>
      <div class="volume settingItem">
        <span>Volume</span>
        <el-switch
          v-model="AlertStatus"
          active-color="#ff4949"
          inactive-color="#838383"
          active-text="ON"
          inactive-text="OFF"
          >
        </el-switch>
      </div>
      <div class="audio settingItem">
        <span>Audio</span>
        <el-select v-model="SelectAlertStatus">
          <el-option label="beep" value=beep>beep</el-option>
          <el-option label="warning" value=warning>warning</el-option>
          <el-option label="alarm" value=alarm>alarm</el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    WorkTimeStatus: {
      get () {
        return this.$store.state.workTime/60 + "分鐘"
      },
      set (value) {
        this.$store.commit('handleWorkTime',value)
      }
    },
    BreakTimeStatus: {
      get () {
        return this.$store.state.breakTime/60 + "分鐘"
      },
      set (value) {
        this.$store.commit('handleBreakTime',value)
      }
    },
    AlertStatus: {
      get () {
        return this.$store.state.alert
      },
      set () {
        this.$store.commit('openAlert')
      }
    },
    SelectAlertStatus: {
      get () {
        return this.$store.state.selectAlert
      },
      set (value) {
        this.$store.commit('handlesSelectAlert',value)
      }
    },
  }
}
</script>

<style lang="scss">
#setting{
  width: 400px;
  height: 500px;
  position: absolute;
  top: 100px;
  left: 130%;
  opacity: 0;
  transition:all .8s cubic-bezier(0.075, 0.82, 0.165, 1);
  color: #F2F0C9;
  .settingTitle{
    font-size: 28px;
    margin-top: 130px;
    margin-bottom: 30px;
  }
  .settingItem{
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-content: flex-end;
    padding: 3px 10px;
    border-bottom: 1px dashed #F2F0C9;
    margin-bottom: 20px;
    span{
      line-height: 40px;
    }
  }
  .el-switch__label{
    color: #440f0f;
    &.is-active{
      color: #F2F0C9;
      font-size: 24px;
    }
  }

  .el-switch__core:after{
    background: #F2F0C9;
  }
  .el-input__inner{
    background: rgba(0, 0, 0, 0);
    color: #F2F0C9;
    width: 100px;
    border: none;
    outline: none;
  }
  .el-select .el-input .el-select__caret{
    color: #F2F0C9;
  }
}
.el-select-dropdown__item{
  font-family: 'Nunito', sans-serif !important;
  color: #F2F0C9 !important;
  &.hover{
    color: #e00000 !important;
    background: #F2F0C9 !important;
  }
  &.selected{
    color: #e00000 !important;
  }
}
.el-select-dropdown{
  background: rgba(58, 58, 58, 0.424) !important;
  backdrop-filter: blur(3px) !important;

}
</style>