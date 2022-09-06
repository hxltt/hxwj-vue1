<template>
<div>
  <div style="display: flex">
  <span style="width: 100px;height: auto">原密码</span>
  <el-input style="width: 600px" maxlength="20"></el-input>
  </div>
  <div style="display: flex">
    <span style="width: 100px;height: auto">新密码</span>
    <el-input style="width: 600px" maxlength="20"></el-input>
  </div>
  <div style="display: flex">
    <span style="width: 100px;height: auto">重复密码</span>
    <el-input style="width: 600px" maxlength="20"></el-input>
  </div>
  <div>
    <el-button>提交</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserPad'
}
</script>

<style scoped>

</style>
