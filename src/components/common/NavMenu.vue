<template>
  <el-menu
    :default-active="$route.path"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="dodgerblue"
    style="min-width: 1300px">

    <!--  各个页面跳转按钮  -->
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" background-color="white">
      {{ item.navItem }}
    </el-menu-item>

    <!--  标题文字  -->
    <span class="title">HX -- 个人图书馆</span>

    <!-- 登出的按钮 -->
    <i class="el-icon-switch-button" v-on:click="logout"></i>

  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/jotter', navItem: '笔记本'},
        {name: '/library', navItem: '图书馆'},
        {name: '/user', navItem: '个人中心'}
      ]
    }
  },
  methods: {
    logout () {
      var _this = this
      this.$axios.get('/logout').then(resp => {
        if (resp.data.code === 200) {
          // 前后端状态保持一致
          _this.$store.commit('logout')
          _this.$router.replace('/login')
          this.$message(resp.data.result)
        }
      })
    }

  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}

span {
  pointer-events: none;
  position: absolute;
  padding-top: 20px;
  right: 43%;
  font-size: 20px;
  font-weight: bold;
}

.el-icon-switch-button {
  cursor: pointer;
  outline:0;
  float:right;
  font-size: 25px;
  color: #222;
  padding: 10px;
  margin-top: 5px;
  margin-right: 20px;
}

</style>
