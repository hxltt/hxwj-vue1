<template xmlns:v-for="http://www.w3.org/1999/html">
  <div style="height: 550px;overflow: scroll;text-align: left" >
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <div v-for="item in list" :key="item" >
        <h3 >{{item.title}}</h3>
        <p>{{item.introduction}}</p>
        <div style="display: flex;background-color: #d1d5da">
          <i class="el-icon-share"></i>
          <span style="margin-right: 20px">{{item.times}}</span>
          <i class="el-icon-share"></i>
          <span>{{item.likes}}</span>
          <span style="text-align: right; position:relative; right:-450px;">{{item.date}}</span>
        </div>
        <hr>
      </div>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'Collection',
  data () {
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$axios.get('/list', {
        params: {
          'username': 'admin'
        }
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          this.list = successResponse.data.result
        }
      })
    //  调用后端接口获得数据
    //   this.article =

    }
  }
}
</script>

<style scoped>

</style>
