<template>
  <!-- 大div -->
  <div class="body">
    <!--  左侧操作模块  -->
    <div class="left" style="box-shadow: 0 0 20px #cac6c6;">
      <!--   头像图片   -->
      <img src="http://" alt="头像">

      <!--   上传头像   -->
<!--      <el-upload-->
<!--        class="avatar-uploader"-->
<!--        action="https://jsonplaceholder.typicode.com/posts/"-->
<!--        :show-file-list="false"-->
<!--        :on-success="handleAvatarSuccess"-->
<!--        :before-upload="beforeAvatarUpload">-->
<!--        <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--      </el-upload>-->
      <!--   用户名   -->
      <h4 >{{username}}</h4>
      <!--   个性签名   -->
      <span v-show="signature_tag" @click="editSig()" class="signature">{{signature}}</span>
      <!--   个性签名编辑  -->
      <el-input id='input' v-model="signature" @blur="editSig()" v-show="!signature_tag"  maxlength="20"></el-input>

      <!--   tab栏   -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo menu">
        <!--  点击修改index的值 -->
        <el-menu-item index="1" @click="show(1)">
          <!--    图标      -->
          <i class="el-icon-user" style="font-size:150%"></i>
          <!--    导航名字      -->
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="2" @click="show(2)">
          <i class="el-icon-edit-outline" style="font-size:140%"></i>
          <span slot="title">修改密码</span>
        </el-menu-item>
        <el-menu-item index="3" @click="show(3)">
          <i class="el-icon-star-off" style="font-size:160%"></i>
          <span slot="title">我的收藏</span>
        </el-menu-item>
        <el-menu-item index="4" @click="show(4)">
          <i class="el-icon-reading"></i>
          <span slot="title">我的文章</span>
        </el-menu-item>
      </el-menu>

    </div>

    <!--  右侧展示模块  -->
    <div class="right" style="box-shadow: 0 0 20px #cac6c6;">
      <!--   使用组件userinfo   -->
      <UserInfo v-if="index===1"></UserInfo>
      <UserPad v-if="index===2"></UserPad>
      <Collection v-if="index===3"></Collection>
     <Artical v-if="index===4"></Artical>

    </div>

  </div>
</template>

<script>
import UserInfo from './component/UserInfo'
import UserPad from './component/UserPad'
import Collection from './component/Collection'
import Artical from './component/Artical'
export default {
  name: 'User',
  components: {Artical, Collection, UserInfo, UserPad},
  // 返回所要用的数据
  data () {
    return {
      username: 'hx', // 用户名
      signature: '成功是失败之母', // 个性签名
      signature_tag: true, // 个性签名切换的标志
      imageUrl: 'http://localhost:8443/api/file/test.jpg',
      index: 1
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
      //  修改展示页面
      this.index = index
    }

  }
}
</script>

<style scoped>
/**/
.body{
  display: flex;     /*弹性布局，用于横向排列*/
  margin-top: 3%;    /*外边距顶部*/
  height:550px;
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
  width: 900px;           /*宽度设置*/
}
/*头像*/
img{
  width: 100px;      /*宽度*/
  height: 100px;     /*高度*/
  border-radius: 50%;/*圆角半径*/
  margin-top: 55px;
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
