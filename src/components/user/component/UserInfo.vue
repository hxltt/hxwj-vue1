<template>
  <div>
    <!--    -->
    <div style="display: flex">
      <span style="min-width: 100px;height: auto">个人介绍:</span>
      <el-input v-model="description" maxlength="200" ></el-input>
    </div>
    <div style="display: flex">
      <span style="min-width: 100px;height: auto">个人签名:</span>
      <el-input v-model="signature" maxlength="20" ></el-input>
    </div>
    <div style="display: flex">
      <span style="min-width: 100px;height: auto">性别:</span>
      <el-select v-model="gender" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="display: flex">
      <span style="min-width: 100px;height: auto">出生日期:</span>
      <el-input v-model="birthday" maxlength="20" ></el-input>
    </div>
    <div style="display: flex">
      <span style="min-width: 100px;height: auto">地址:</span>
      <el-input v-model="address" axlength="100"></el-input>
    </div>
    <!--  按钮  -->
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '男'
      }, {
        value: '选项2',
        label: '女'
      }],
      description: '',
      signature: '',
      gender: '',
      birthday: '',
      address: '',
      profession: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let item = JSON.parse(window.localStorage.getItem('user'))
      let username = item.username
      this.$axios.get('/userInfo', {
        params: {
          'username': username
        }}
      ).then(successResponse => {
        if (successResponse.data.code === 200) {
          this.description = successResponse.data.result.description
          this.signature = successResponse.data.result.signature
          this.gender = successResponse.data.result.gender
          this.birthday = successResponse.data.result.birthday
          this.address = successResponse.data.result.address
          this.profession = successResponse.data.result.profession
        }
      })
    }

  }
}
</script>

<style scoped>

</style>
