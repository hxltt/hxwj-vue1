<template>
<div :visible.sync="drawer">
  <div style="display: flex" class="OriginalCode">
  <span style="width: 100px;height: auto">原密码</span>
  <el-input style="width: 600px" maxlength="20" v-model="OriginPad" show-password></el-input>
  </div>
  <div style="display: flex" class="NewPassword">
    <span style="width: 100px;height: auto">新密码</span>
    <el-input style="width: 600px" maxlength="20" v-model="NewPad" show-password></el-input>
  </div>
  <div style="display: flex" class="RepeatPassword">
    <span style="width: 100px;height: auto">重复密码</span>
    <el-input style="width: 600px" maxlength="20" v-model="RepeatPad" show-password></el-input>
  </div>
  <div>
    <el-button type="primary" style="width:15%" @click="submitPad">提交</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserPad',
  data () {
    return {
      OriginPad: '',
      NewPad: '',
      RepeatPad: '',
      drawer: 'false'
    }
  },
  created () { // 初始化界面
    this.init()
  },
  methods: {
    init () {
      // let item = JSON.parse(window.localStorage.getItem('user')) // 定义一个变量，赋值为本地存储的user（了解就行）
      // let username = item.username // 定义一个变量，赋值为本地存储的user的username（了解就行）
      // // 前端调用接口，get代表的就是使用get方式的访问
      // this.$axios.get('/userPad', { // url:调用地址，全部为http：//localhost:8848/api/userInfo
      //   params: { // config里写一个参数parameter, parameter为键值对，key为username放vue.js里定义的username
      //     'username': username // 前面的username 是一个key,后面的username是值，是前面data里定义的username变量
      //   }
      // }
      // ).then(successResponse => { // then代表前面的axios调用后的执行内容
      //   if (successResponse.data.code === 200) { // 如果返回内容successResponse (这个名字是自己取的)的code是200代表成功访问
      //     // success里的data的code是200，这个是前后端的一个协议。后面在和你说，现在只要知道code为200的时候是成功调用接口
      //     this.OriginPad = successResponse.data.result.OriginPad
      //     this.NewPad = successResponse.data.result.NewPad
      //     this.RepeatPad = successResponse.data.result.RepeatPad
      //   }
      // })
    },
    submitPad () {
      let item = JSON.parse(window.localStorage.getItem('user')) // key是user
      let username = item.username
      console.log(username)
      // userInfo是接口地址，？后面是参数名（username），=后面是参数的值，data是参数的请求体
      // http://localhost:8443/api/userInfo?username=admin
      this.$axios
        .post('/modifyPassword', {
          'username': username,
          'password': this.NewPad
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert(resp.data.result, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.drawer = false
              }

            })
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.OriginalCode  {
  margin-top: 18%;
  margin-bottom: 45px;
}
.NewPassword {
  margin-bottom: 45px;
}
.RepeatPassword{
  margin-bottom: 45px;
}
</style>
