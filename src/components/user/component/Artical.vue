<!--<template xmlns:v-for="http://www.w3.org/1999/html">-->
<!--  <div style="height: 550px;overflow: scroll;text-align: left" >-->
<!--    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">-->
<!--      <div v-for="item in list" :key="item" >-->
<!--        <h3 >{{item.title}}</h3>-->
<!--        <p>{{item.introduction}}</p>-->
<!--        <div style="display: flex;background-color: #d1d5da">-->
<!--          <i class="el-icon-share"></i>-->
<!--          <span style="margin-right: 20px">{{item.times}}</span>-->
<!--          <i class="el-icon-share"></i>-->
<!--          <span>{{item.likes}}</span>-->
<!--          <span style="text-align: right; position:relative; right:-450px;">{{item.date}}</span>-->
<!--        </div>-->
<!--        <hr>-->
<!--      </div>-->
<!--    </ul>-->
<!--  </div>-->

<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Collection',-->
<!--  data () {-->
<!--    return {-->
<!--      list: []-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    this.init()-->
<!--  },-->
<!--  methods: {-->
<!--    init () {-->
<!--      this.$axios.get('/list', {-->
<!--        params: {-->
<!--          'username': 'admin'-->
<!--        }-->
<!--      }).then(successResponse => {-->
<!--        if (successResponse.data.code === 200) {-->
<!--          this.list = successResponse.data.result-->
<!--        }-->
<!--      })-->
<!--    //  调用后端接口获得数据-->
<!--    //   this.article =-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <div style="text-align: left;height: 550px;overflow: auto;margin-left: 10px;margin-right: 10px" class="infinite-list" v-infinite-scroll="load">
    <div v-for="item in list" :key="item">
    <h4>{{item.title}}</h4>
    <p style="font-family:微软雅黑 ">{{item.introduction}}</p>
    <div>
      <i class="el-icon-view" style="float:left;margin-bottom: auto"></i>
      <span style="margin-left: 6px">{{item.times}}</span>
      <i class="el-icon-s-check" style="margin-bottom: auto;margin-left: 24px;"></i>
      <span>{{item.likes}}</span>
      <span style="position: relative; left:630px;">{{item.date}}</span>
    </div>
      <hr style="margin-right: 10px">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Artical',
  data () {
    return {
      list: []
    }
  },
  //
  created () {
    this.init()
  },
  methods: {
    init () {
      let item = JSON.parse(window.localStorage.getItem('user'))
      this.username = item.username
      this.$axios.get('/list', {
        params: {
          'username': this.username
        }
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          this.list = successResponse.data.result
        }
      })
    }
  }
}
</script>
<style>
.el-icon-s-check {
  margin-right: 0;
  background: url("../../../assets/like-off.png") center center no-repeat;
  background-size: 17px;
}
.el-icon-s-check:before {
  content: "11";
  visibility: hidden;
}
</style>
