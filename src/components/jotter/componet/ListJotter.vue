<template>
  <div class="infinite-list-wrapper" style="overflow: auto;height:100%;">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <div v-for="i in count" :key=i class="list-item">
              <span @click="detailJotter(list[i-1])" class="title">{{list[i-1].title}}</span>
              <p class="introduction">{{list[i-1].introduction}}</p>
              <div style=" display: flex;justify-content: flex-start; ">
                <i class="el-icon-view" style="  float:left;margin-bottom: auto"></i>
                <span style="font-size: 14px;padding-left: 5px;padding-right: 35px;">{{list[i-1].times}}</span>
                <i class="el-icon-s-check" style="float:left;margin-bottom: auto"></i>
                <span style="font-size: 14px;padding-left: 5px;padding-right: 15px;">{{list[i-1].likes}}</span>
                <span class="author">{{list[i-1].author}}</span>
                <span class="date"> {{list[i-1].date}}</span>
              </div>
              <hr>
      </div>
    </ul>
    <h3 v-if="loading" class="text">加载中...</h3>

    <h3 v-if="noMore" class="text">没有更多了</h3>
<!--    <span @click="detailJotter(list[0])" class="title">{{list[0].title}}</span>-->
<!--    <span @click="detailJotter(list[0])" class="title">{{list[1].title}}</span>-->
<!--    <span @click="detailJotter(list[0])" class="title">{{list[2].title}}</span>-->
  </div>

</template>

<script>
export default {
  name: 'ListJotter',
  data () {
    return {
      count: 10,
      loading: false,
      list: [],
      username: '',
      loadTag: false
    }
  },
  props: {
    params: {}
  },
  watch: {
    params: {
      handler (value) {
        this.change(value.tag, value.keyword)
      },
      deep: true, // 深度监听
      immediate: true // 初次监听即执行
    }
  },
  computed: {
    noMore () {
      return this.count >= this.list.length
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    let item = JSON.parse(window.localStorage.getItem('user'))
    this.username = item.username
    this.getList()
  },
  methods: {
    change (tag, keyword) {
      if (tag === '0') {
        this.getList()
      } else if (tag === '1') {
        this.count = 0
        this.getOwnList()
      } else {
        this.count = 0
        this.searchByKeyword(keyword)
      }
    },
    getList () {
      this.$axios.get('/list', {
        params: {
          'username': this.username
        }
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          this.list = successResponse.data.result
        }
      })
    },
    getOwnList () {
      this.$axios.get('/ownList', {
        params: {
          'username': this.username
        }
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          this.list = []
          this.list = successResponse.data.result
        }
      })
    },
    searchByKeyword (keyword) {
      this.$axios.get('/listBykeyword', {
        params: {
          'keyword': keyword
        }
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          this.list = successResponse.data.result
          if (this.list.length > this.count) {
            this.count = this.list.length
          }
        }
      })
    },
    load () {
      this.loading = true
      setTimeout(() => {
        if (document.documentElement.scrollHeight <= document.documentElement.scrollTop + document.documentElement.clientHeight + 10) {
          this.count += 5
          if (this.count > this.list.length) {
            this.count = this.list.length
          }
        }
        this.loading = false
      }, 1000)
    },
    detailJotter (item) {
      this.$router.push({ path: '/jotter/detail', query: item })
    }
  }
}
</script>

<style scoped>
.infinite-list-wrapper{
  border: none;
  width: 95%;
  margin: auto;
  text-align: left;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 25px;
}
.list-item{
  padding-top: 20px;
  border: none;
  width: 95%;
  margin: auto;
  text-align: left;
}
.title{
  margin-top: 300px;
  font-size: 20px;
  font-weight: bolder;
  cursor:pointer
}
.title:hover{

  color: #959da5;
}
.introduction{
  font-size: 17px;
}
.el-icon-s-check{
  margin-right: 0;
  background: url("../../../assets/like-off.png") center center no-repeat;
  background-size: 18px;
}
.el-icon-s-check:before {
  content: "11";
  visibility: hidden;
}
.author{
  position: absolute;
  float: right;
  right: 20%;
}
.date{
  position: absolute;
  float: right;
  right: 13%;
}
hr{
  height: 1px;
  border: none;
  background: linear-gradient(0deg, #ccc 80%, transparent 20%);
}
.text{
  font-size: 15px;
  text-align: center;
  color: #42b983;
}
</style>
