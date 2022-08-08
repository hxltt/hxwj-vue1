<template>
  <div>
    <!--  搜索框  -->
    <search-bar style="width: 80%; margin: auto;padding-top: 20px;height: 50px"></search-bar>

    <!-- 笔记本列表 -->
    <div class="list" >
<!--      <p v-if="list==null">您还没做过笔记，快写一篇专属笔记吧！</p>-->
      <el-tabs v-model="activeName" @tab-click="handleClick" style=" width: 95%;margin: auto;">
        <el-tab-pane label="综合" id="0" >
          <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            infinite-scroll-distance="10">
            <div v-for="i in count" :key=i class="list-item">
              <h2 @click="detailJotter(list[i-1])">{{list[i-1].title}}</h2>
              <h4>{{list[i-1].introduction}}</h4>
              <div style=" display: flex;justify-content: flex-start; ">
                <i class="el-icon-view" style="  float:left;margin-bottom: auto"></i>
                <span style="font-size: 14px;padding-left: 5px;padding-right: 35px;">{{list[i-1].times}}</span>
                <i class="el-icon-s-check" style="  float:left;margin-bottom: auto"></i>
                <span style="font-size: 14px;padding-left: 5px;padding-right: 15px;">{{list[i-1].times}}</span>
                <!--          <i class="el-icon-s-custom"></i>-->
                <span class="author">{{list[i-1].author}}</span>
                <span class="date"> {{list[i-1].date}}</span>
              </div>
              <el-divider content-position="left"></el-divider>
            </div>
          </ul>
          <h3 v-if="loading" style="text-align:center; color: green;">加载中...</h3>
          <h3 v-if="noMore" style="text-align:center; color: green;">没有更多了</h3>
        </div>
        </el-tab-pane>
        <el-tab-pane label="我的博客" id="1">配置管理</el-tab-pane>
      </el-tabs>
    </div>

    <!--  回到顶部  -->
    <el-backtop :bottom="120" :right="55"></el-backtop>

    <!--  增加笔记按钮  -->
    <el-button type="primary" icon="el-icon-edit" circle class="button"  @click="dialogFormVisible = true"></el-button>

    <!--  新增博客  -->
    <jotter-write></jotter-write>

  </div>
</template>

<script>
import SearchBar from './componet/SearchBar'
import JotterWrite from './componet/JotterWrite'
export default {
  name: 'Jotter',
  components: {JotterWrite, SearchBar},
  data () {
    return {
      activeId: '0',
      list: [],
      key: true,
      seen: false,
      count: 6,
      loading: false
    }
  },
  created () {
    this.getList()
  },
  computed: {
    noMore () {
      return this.count >= this.list.length
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    getList () {
      let item = JSON.parse(window.localStorage.getItem('user'))
      let username = item.username
      this.$axios.get('/list', {
        params: {
          'username': username
        }
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          this.list = successResponse.data.result
          // for (var i = this.count; i < this.count + 8; i++) {
          //   this.list.push(this.totleList[i])
          // }
          // this.count += 8
        }
      })
    },
    detailJotter (item) {
      // eslint-disable-next-line standard/object-curly-even-spacing
      console.log(item)
      this.$router.push({ path: '/jotter/detail', query: item })
    },
    addJotter () {
      this.seen = true
    },
    deleteJotter () {
      this.$alert('是否确定删除', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // callback: action => {
        //   this.$message({
        //     type: 'success',
        //     message: `删除成功`
        //   })
        // }
      })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 5
        if (this.count > this.list.length) {
          this.count = this.list.length
        }
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
.list {
  /*height: 100px;*/
  width: 95%;
  background-color: white;
  margin: auto;
  margin-top: 30px;
  padding-top: 20px;
  padding-bottom: 30px;
  /* 5px 0px 5px 0px;*/
  box-shadow: 0 0 3px 3px #eaecef;
  /*display:table-cell;*/
  border-radius: 1%;
}
.list-item{
  border: none;

  text-align: left;
}
/deep/.el-tabs__item {
  /* 修改为您想要的文字大小 */
  font-size: 50px!important;
}
.infinite-list-wrapper{
  border: none;
  /*width: 95%;*/
  /*margin: auto;*/
  text-align: left;
}
.el-icon-delete{
  cursor: pointer;
  outline:0;
  font-size: 25px;
  color: #222;
  position:relative;
  float:right;
  right: 40px;
  top: -40px
}
.el-icon-delete:active{
  color: #959da5;
}
.button{
  border: none;
  background-color: #99a9bf;
  font-size: 40px;
  position: fixed;
  float:right;
  right: 40px;
  bottom: 40px
}
.button:active{
  background-color: #d3dce6;
}
h2:hover{
  color: #959da5;
}
.author{
  /*background-color: #959da5;*/
  /*position: relative;*/
  position: absolute;
  float: right;
  right: 200px;
}
.date{
  /*background-color: #959da5;*/
  /*position: relative;*/
  position: absolute;
  float: right;
  right: 100px;
}
.el-icon-s-check{
  margin-right: 0;
  background: url("../../assets/like.png") center center no-repeat;
  background-size: 18px;
}
.el-icon-s-check:before {
  content: "11";
  visibility: hidden;
}
</style>
