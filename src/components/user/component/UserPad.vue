<!--<template>-->
<!--<div :visible.sync="drawer" style="margin:10% 8% auto" :rules="resetFormRules">-->
<!--  <div style="display: flex" class="OriginalCode">-->
<!--  <span style="width: 100px;height: auto">原密码</span>-->
<!--  <el-input style="width: 600px" maxlength="20" v-model="OriginPad" show-password></el-input>-->
<!--  </div>-->
<!--  <div style="display: flex" class="NewPassword">-->
<!--    <span style="width: 100px;height: auto">新密码</span>-->
<!--    <el-input style="width: 600px" maxlength="20" v-model="NewPad" show-password></el-input>-->
<!--  </div>-->
<!--  <div style="display: flex" class="RepeatPassword">-->
<!--    <span style="width: 100px;height: auto">重复密码</span>-->
<!--    <el-input style="width: 600px" maxlength="20" v-model="RepeatPad" show-password></el-input>-->
<!--  </div>-->
<!--  <div>-->
<!--    <el-button type="primary" style="width:15%" @click="submitPad">提交</el-button>-->
<!--  </div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'UserPad',-->
<!--  data () {-->
<!--    return {-->
<!--      OriginPad: '',-->
<!--      NewPad: '',-->
<!--      RepeatPad: '',-->
<!--      drawer: 'false'-->
<!--    }-->
<!--  },-->
<!--  created () { // 初始化界面-->
<!--    this.init()-->
<!--  },-->
<!--  methods: {-->
<!--    init () {-->
<!--      // let item = JSON.parse(window.localStorage.getItem('user')) // 定义一个变量，赋值为本地存储的user（了解就行）-->
<!--      // let username = item.username // 定义一个变量，赋值为本地存储的user的username（了解就行）-->
<!--      // // 前端调用接口，get代表的就是使用get方式的访问-->
<!--      // this.$axios.get('/userPad', { // url:调用地址，全部为http：//localhost:8848/api/userInfo-->
<!--      //   params: { // config里写一个参数parameter, parameter为键值对，key为username放vue.js里定义的username-->
<!--      //     'username': username // 前面的username 是一个key,后面的username是值，是前面data里定义的username变量-->
<!--      //   }-->
<!--      // }-->
<!--      // ).then(successResponse => { // then代表前面的axios调用后的执行内容-->
<!--      //   if (successResponse.data.code === 200) { // 如果返回内容successResponse (这个名字是自己取的)的code是200代表成功访问-->
<!--      //     // success里的data的code是200，这个是前后端的一个协议。后面在和你说，现在只要知道code为200的时候是成功调用接口-->
<!--      //     this.OriginPad = successResponse.data.result.OriginPad-->
<!--      //     this.NewPad = successResponse.data.result.NewPad-->
<!--      //     this.RepeatPad = successResponse.data.result.RepeatPad-->
<!--      //   }-->
<!--      // })-->
<!--    },-->
<!--    submitPad () {-->
<!--      let item = JSON.parse(window.localStorage.getItem('user')) // key是user-->
<!--      let username = item.username-->
<!--      console.log(username)-->
<!--      // userInfo是接口地址，？后面是参数名（username），=后面是参数的值，data是参数的请求体-->
<!--      // http://localhost:8443/api/userInfo?username=admin-->
<!--      this.$axios-->
<!--        .post('/modifyPassword', {-->
<!--          'username': username,-->
<!--          'password': this.NewPad-->
<!--        })-->
<!--        .then(resp => {-->
<!--          if (resp.data.code === 200) {-->
<!--            this.$alert(resp.data.result, '提示', {-->
<!--              confirmButtonText: '确定',-->
<!--              callback: action => {-->
<!--                this.drawer = false-->
<!--              }-->

<!--            })-->
<!--          } else {-->
<!--            this.$alert(resp.data.message, '提示', {-->
<!--              confirmButtonText: '确定'-->
<!--            })-->
<!--          }-->
<!--        })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.OriginalCode  {-->
<!--  margin-top: 18%;-->
<!--  margin-bottom: 45px;-->
<!--}-->
<!--.NewPassword {-->
<!--  margin-bottom: 45px;-->
<!--}-->
<!--.RepeatPassword{-->
<!--  margin-bottom: 45px;-->
<!--}-->
<!--</style>-->
<template>
  <div>
    <el-form
      :model="resetForm"
      :rules="resetFormRules"
      ref="resetForm"
      status-icon
      label-width="100px"
    >
      <el-form-item label="原密码：" prop="password" style="margin-bottom: 40px">
        <el-input type="password" v-model="resetForm.password" auto-complete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newpwd" style="margin-bottom: 40px">
        <el-input type="password" v-model="resetForm.newpwd" auto-complete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="newpassword1">
        <el-input type="password" v-model="resetForm.newpassword1" auto-complete="off" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('resetForm')" >确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'UserPad',
  data () {
    // 此处即表单发送之前验证
    var checkOld = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('旧密码不能为空'))
      } else if (value !== this.resetForm.password) {
        // this.$axios.post('',
        //   {'username': _this.username, 'password': _this.resetForm.password}).then(function (res) {
        //   if (res.data.code === 400) {
        //     return callback(new Error('原密码错误'))
        return callback(new Error('原密码错误'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
        // } else if (value.toString().length < 6 || value.toString().length > 18) {
        //   callback(new Error('密码长度为6-18位'))}
      } else if (value === this.resetForm.password) {
        callback(new Error('新密码不能与原密码相同'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.resetForm.newpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetForm: {
        // 传给后台所需要的参数
        newpassword1: '',
        password: '',
        username: '' // 此处只是后台需要的字段而已，如果前期有公用cookie里面有获取并且保存过，现在需要另外调用进来，具体的获取方法就看个人了
      },
      resetFormRules: {
        password: [
          // {required: true, message: '请输入旧密码', trigger: 'blur'},
          {required: true, validator: checkOld, trigger: 'blur'}
        ],
        newpwd: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        newpassword1: [
          {required: true, validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let item = JSON.parse(window.localStorage.getItem('user')) // key是user
          let username = item.username
          console.log(username)
          this.$axios
            .post('/modifyPassword', {
              'username': username,
              'password': this.resetForm.newpwd
            })
            .then(resp => {
              if (resp.data.code === 200) {
                this.$alert(resp.data.result, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }

                })
              } else {
                this.$alert(resp.data.result, '提示', {
                  confirmButtonText: '确定'

                })
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.el-form {
  width: 80%;
  margin: 16% 8% auto;
  /*text-align: center;*/
}
button {
  margin: 30px auto;

}
</style>
