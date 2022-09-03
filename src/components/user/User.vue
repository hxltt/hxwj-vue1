<template>
  <!-- 大div -->
  <div class="body">
    <!--  左侧操作模块  -->
    <div class="left">
      <!--   头像图片   -->
      <img src="http://localhost:8443/api/file/test.jpg" alt="头像">
      <!--   用户名   -->
      <h4 >{{username}}</h4>
      <!--   个性签名   -->v-if
      <span v-show="signature_tag" @click="editSig()" class="signature">{{signature}}</span>
      <!--   个性签名编辑  -->
      <el-input id='input' v-model="signature" @blur="editSig()" v-show="!signature_tag"  maxlength="20"></el-input>

      <!--   导航栏   -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo menu">
        <el-menu-item index="1" @click="show(index)">
          <!--    图标      -->
          <i class="el-icon-plus"></i>
          <!--    导航名字      -->
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="show(index)">
          <i class="el-icon-document"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="3" @click="show(index)">
          <i class="el-icon-menu"></i>
          <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item index="4" @click="show(index)">
          <i class="el-icon-setting"></i>
          <span slot="title">我的文章</span>
        </el-menu-item>
      </el-menu>

    </div>

    <!--  右侧展示模块  -->
    <div class="right">
      <!--   使用组件userinfo   -->
      <UserInfo ></UserInfo>
    </div>
  </div>
</template>

<script>
import UserInfo from './component/UserInfo'
export default {
  name: 'User',
  components: {UserInfo},
  // 返回所要用的数据
  data () {
    return {
      username: 'hx', // 用户名
      signature: '成功是失败之母', // 个性签名
      signature_tag: true // 个性签名切换的标志
    }
  },
  // 方法区
  methods: {
    // 点击个性签名事件
    editSig () {
      // if (this.signature_tag) {
      //   document.getElementById('input').click()
      //   console.log('document.getElementById(\'input\').focus()')// 控制台输出
      // }
      this.signature_tag = !this.signature_tag // 改变切换标志的值
      console.log(this.signature_tag) // 控制台输出
    },
    show (index) {
      //  xsa
    }
  }
}
</script>

<style scoped>
/**/
.body{
  display: flex;     /*弹性布局，用于横向排列*/
  margin-top: 3%;    /*外边距顶部*/
  width: 80%;        /*宽度*/
  margin-left: auto; /*配合width使用,使div居中*/
  margin-right: auto;/*配合width使用,使div居中*/
}
/*左侧操作模块*/
.left{
  background-color: white;  /*背景颜色*/
  text-align:center ;       /*文字居中展示*/
  margin-right: 20px;       /*右外边距设置*/
  min-width: 300px;         /*最小宽度设置*/
  padding: 30px 10px 20px 10px;/*内边距*/
}
/*右侧展示模块 */
.right{
  background-color: white;/*背景颜色*/
  text-align:center ;     /*文字居中展示*/
  width: 800px;           /*宽度设置*/
}
/*头像*/
img{
  width: 100px;      /*宽度*/
  height: 100px;     /*高度*/
  border-radius: 50%;/*圆角半径*/
}
/*菜单*/
.menu{
  margin-top: 20px; /*顶部外边距*/
  border: none;     /*取消边框*/
}
/*个性签名*/
.signature{
  cursor: pointer; /*鼠标样式*/
}

</style>
id
class
