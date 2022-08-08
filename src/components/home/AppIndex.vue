<template>
  <div class="block">
    <el-carousel
      :interval="4000"
      type="card"
      height="350px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
        <p>sadfrgth</p>
        <p>sadfrgth</p>
        <p>sadfrgth</p>
      </el-carousel-item>
    </el-carousel>

    <!--  热门推荐  -->
    <div class="list">
      <div style="  width: 98%; margin: auto;">
        <i class="el-icon-s-check"></i>
        <h1 style=" text-align: left;padding: 3px 0px 20px 0; color: #d81e06;">热门推荐</h1>
      </div>
      <div  v-for="item in list" :key=item class="list-item">
        <h2 @click="detailJotter(item)">{{item.title}}</h2>
        <h4 style="margin-bottom: 0;margin-top: 0;padding: 0 0 0 0">{{item.introduction}}</h4>
        <el-divider content-position="left"></el-divider>
      </div>
<!--      <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->
    </div>

    <div class="list">
      <div style="  width: 98%; margin: auto;">
        <i class="el-icon-star-off"></i>
        <h1 style=" text-align: left;padding: 30px 0px 30px 0; color: #E6BD1A;">HX-个人图书馆</h1>
        <p>x</p><p>x</p>
        <p>x</p><p>x</p>
        <p>x</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'AppIndex',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getList()
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
          for (var i = 0; i < 5; i++) {
            this.list.push(successResponse.data.result[i])
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.block{
  width: 95%;
  margin: auto;
}
.list {
  /*height: 100px;*/
  width: 98%;
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
  width: 95%;
  margin: auto;
  text-align: left;
}
.el-icon-star-off{
  padding: 30px 30px 30px 0;
  /*margin-right: 0;*/
  float: left;
  width: 35px;
  height: 35px;
  background: url("../../assets/library.png") center center no-repeat;
  background-size: 35px;
  font-size:40px;
}
.el-icon-star-off:before {
  content: "30";
  visibility: hidden;
}
.el-icon-s-check{
  padding: 0px 30px 10px 0;
  /*margin-right: 0;*/
  float: left;
  width: 40px;
  height: 40px;
  background: url("../../assets/hot.png") center center no-repeat;
  background-size: 40px;
  font-size:40px;
}
.el-icon-s-check:before {
  content: "30";
  visibility: hidden;
}

</style>
