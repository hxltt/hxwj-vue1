<template>
  <body id="poster">
  <div class="login-container" label-position="left" label-width="0px">
    <h2 class="login_title" style="margin: 0 0 20px 0">个人图书馆</h2>
    <el-tabs>
      <el-tab-pane label="密码登录">
        <el-form>
          <el-form-item>
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 40%; background: #505458; border: none" v-on:click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="验证码登录">
        <el-form>
          <el-form-item style="display: flex">
            <div style="display: flex;width: 350px;">
              <el-input type="text" v-model="phone" placeholder="手机号"></el-input>
              <el-button size='mini' @click="send" v-if="isSend" >发送验证码</el-button>
              <el-button size='mini' v-if="!isSend" disabled>{{sendmsg}}</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-input type="text" v-model="verificationCode" placeholder="短信验证码"></el-input>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 40%; background: #505458; border: none" v-on:click="phoneLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-form>
      <el-form-item style="width: 100%">
        <router-link to="register">
          <!--        <el-button type="primary" style="width: 20%;background:#505458;border: none" >注册</el-button>-->
          <el-row>注册</el-row>
        </router-link>
      </el-form-item>
    </el-form>

  </div>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'huang',
        password: '123456789'
      },
      phone: '',
      sendmsg: '发送验证码',
      isSend: true,
      verificationCode: '',
      showcode: false,
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$router.replace({path: '/index'})
            // var data = this.loginForm
            console.log('success')
            this.$store.commit('login', {username: this.loginForm.username})
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
          } else if (successResponse.data.code === 400) {
            this.$message({
              message: successResponse.data.message,
              type: 'error'
            })
          }
        })
        .catch(failResponse => {
          this.$message({
            message: '无法登录',
            type: 'warning'
          })
        })
    },
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
            // 倒计时
            let timer = 60
            this.sendmsg = timer + 's'
            this.timeFun = setInterval(() => {
              --timer
              this.sendmsg = timer + 's'
              if (timer === 0) {
                this.isSend = true
                this.sendmsg = '重新发送'
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
    },
    phoneLogin () {
      this.$axios
        .post('/phoneLogin', {
          phone: this.phone,
          verificationCode: this.verificationCode
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$router.replace({path: '/index'})
            // var data = this.loginForm
            console.log('success')
            this.$store.commit('login', {username: successResponse.data.result})
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
          } else if (successResponse.data.code === 400) {
            this.$message({
              message: successResponse.data.message,
              type: 'error'
            })
          }
        })
        .catch(failResponse => {
          this.$message({
            message: '无法登录',
            type: 'warning'
          })
        })
    }
  }
}
</script>

<style>
#poster {
  background:url("../assets/loginBack.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body{
  margin: 0px;
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
/*去掉tabs底部的下划线*/
.el-tabs__nav-wrap::after {
  position: static !important;
}
</style>
