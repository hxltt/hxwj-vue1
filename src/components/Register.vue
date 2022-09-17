<template>
  <body id="paper">
  <el-form class="login-container" label-position="left" label-width="0px" v-loading="loading">
    <h2 class="login_title">欢迎注册个人图书馆</h2>
    <el-form-item>
      <el-input type="text" v-model="username" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="display: flex">
      <div style="display: flex;width: 350px;">
        <el-input type="text" v-model="phone" placeholder="电话号码"></el-input>
        <el-button size='mini' @click="send" v-if="isSend" >发送验证码</el-button>
        <el-button size='mini' v-if="!isSend" disabled>{{sendmsg}}</el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-input type="text" v-model="verificationCode" placeholder="短信验证码" v-show="showcode"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>
export default{
  data () {
    return {
      checked: true,
      username: '',
      password: '',
      loading: false,
      phone: '',
      sendmsg: '发送验证码',
      isSend: true,
      verificationCode: '',
      showcode: false
    }
  },
  methods: {
    register () {
      if (this.username === '' || this.username === null) {
        this.$message.error('用户名不能为空！')
      } else if (this.password.length < 8 || this.password.length > 20) {
        this.$message.error('密码长度必须大于八位且小于20位')
      } else if (this.verificationCode === '' || this.verificationCode === null) {
        this.$message.error('验证码错误')
      } else {
        this.$axios.post('verificationCode?phone=' + this.phone + '&verificationCode=' + this.verificationCode).then(reponse => {
          if (reponse.data.code === 200) {
            this.$axios
              .post('/register', {
                username: this.username,
                password: this.password,
                phone: this.phone
              })
              .then(resp => {
                if (resp.data.code === 200) {
                  this.$alert('注册成功', '提示', {
                    confirmButtonText: '确定'
                  })
                  this.$router.replace('/login')
                } else {
                  console.log(resp.data.message)
                  this.$alert(resp.data.message, '提示', {
                    confirmButtonText: '确定'
                  })
                }
              })
              .catch(failResponse => {})
          } else if (reponse.data.code === 400) {
            this.$message.error(reponse.data.message)
          }
        })
      }
    },
    // 获取验证码
    send () {
      if (!this.phone) {
        this.$message('请填写手机号后获取验证码！')
      } else if (/^1(3|4|5|6|7|8)\d{9}$/.test(this.phone) === false) {
        this.$message('请填写正确的手机号后获取验证码！')
      } else {
        this.$axios.get('verificationCode', {
          params: {
            'phone': this.phone
          }
        }).then(reponse => {
          if (reponse.data.code === 200) {
            this.$message('验证码：' + reponse.data.result)
            this.isSend = false
            this.code = true
            this.showcode = true
            // 倒计时
            let timer = 60
            this.sendmsg = timer + 's'
            this.timeFun = setInterval(() => {
              --timer
              this.sendmsg = timer + 's'
              if (timer === 0) {
                this.isSend = true
                this.sendmsg = '重新发送'
                this.showcode = false
                clearInterval(this.timeFun)
              }
            }, 1000)
          } else if (reponse.data.code === 400) {
            this.$message({
              showClose: true,
              message: reponse.data.message,
              type: 'error'
            })
          }
        })
      }
    }

  }
}
</script>
<style>
#paper {
  background:url("../assets/loginBack.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body{
  margin: 0px 0px 0px 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 60px 15px 60px;
  background: rgba(255,255,255,0.7);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
/deep/.el-input__inner {
  background-color: transparent !important;
  border: 1px solid #1296db;
}

</style>
