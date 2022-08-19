<template>
  <div>
    <!--  搜索框  -->
    <div style="width: 60%; margin: auto;padding-top: 20px;margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
      <el-input
        @keyup.enter.native="searchClick"
        placeholder="搜索博客..."
        prefix-icon="el-icon-search"
        style="font-size: 15px;border-radius: 10px"
        v-model="keywords">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="changlist('2', keywords)" style="height: 40px;font-size: 15px">搜索</el-button>
    </div>

    <!-- 笔记本列表 -->
    <div class="topTab">
      <span @click="changlist('0', null)" class="tag" v-bind:class="{clicked: tag && !search}" style="padding-left: 4%">推荐</span>
      <span @click="changlist('1', null)" class="tag" v-bind:class="{clicked: !tag && !search}" >我的</span>
      <hr>
      <list-jotter :params="listParam"></list-jotter>
    </div>

    <!--  回到顶部  -->
    <el-backtop :bottom="120" :right="40" style="color:white;font-size: 40px;height: 65px;width:65px;  background-color: #99a9bf;"></el-backtop>
    <!--  增加笔记按钮  -->
    <el-button type="primary" icon="el-icon-edit" circle class="button"  @click="dialogFormVisible = true"></el-button>
    <!--  新增博客  -->
    <jotter-write></jotter-write>

  </div>
</template>

<script>
import SearchBar from './componet/SearchBar'
import JotterWrite from './componet/JotterWrite'
import ListJotter from './componet/ListJotter'
export default {
  name: 'Jotter',
  components: {JotterWrite, SearchBar, ListJotter},
  data () {
    return {
      search: false,
      keyword: false,
      seen: false,
      keywords: '',
      listParam: {},
      tag: true
    }
  },
  created () {
    this.changlist('0', null)
  },
  methods: {
    changlist (tag, keyword) {
      if (tag === '0') {
        this.search = false
        this.tag = true
      } else if (tag === '1') {
        this.search = false
        this.tag = false
      } else {
        this.search = true
      }
      console.log(this.tag)
      console.log(tag)
      this.listParam = {
        tag: tag,
        keyword: keyword}
    }
  }
}
</script>

<style scoped>
.list {
  /*height: 100px;*/
  width: 90%;
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
.topTab{
  background-color: white;
  width: 85%;
  margin: auto;
  text-align: left;
  padding-top: 20px;
  box-shadow: 0 0 3px 3px #eaecef;
  border-radius: 1%;
  padding-bottom: 0;
  margin-bottom: 0;
}
.tag{
  margin-left: 2%;
  cursor: pointer;
  font-size: 20px;

}
.tag:active{
  color: #959da5;
}
.clicked{
  color: dodgerblue;
  font-weight: bolder;
}
hr{
  background-color: #959da5;
  height: 5px;
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
</style>
