<template>
  <div style="padding-top: 30px">
    <div class="jotter" v-show="!edit">
      <h1 style="padding-top: 30px;padding-left: 30px">{{item.title}}</h1>
      <i class="el-icon-s-order" @click="editJotter" style="position: relative;float:right;left: -90px;top: -60px;font-size: 30px"></i>
      <span style="position: relative;float:right;left: -60px;top: -40px;size: 30px">编辑</span>

      <div style="background-color: #d1d5da; display: flex;justify-content: flex-start;width: 100%">
        <i class="el-icon-user" ></i>
        <span class="author">{{item.author}}</span>

        <i class="el-icon-time"></i>
        <span class="date">于{{item.date}}发布</span>

        <i class="el-icon-view" ></i>
        <span>{{item.times}}</span>

        <i class="el-icon-s-check" ></i>
        <span>{{item.times}}</span>
      </div>

      <div style="padding: 0 30px 20px 30px;">
        <h3 style="padding-top: 10px">{{item.introduction}}</h3>
        <hr>
        <span style="whiteSpace: pre-line;">
          <p>{{item.content}}</p>
          <!--          <p>{{this.username}}</p>-->
      </span>
      </div>
    </div>
    <div class="jotter" v-show="edit" style="margin-top: 30px">
      <el-input
        placeholder="请输入标题（5~100个字）"
        v-model="item.title"
        clearable
        style="font: 30px bolder;padding-top: 30px;padding-left: 20px;width: 95%;">
        {{item.title}}
      </el-input>
      <h1 style=""></h1>

      <div style="padding: 0 30px 0px 20px;">
        <el-input
          type="textarea"
          autosize
          v-model="item.introduction"
          clearable
          style="font: 18px bolder;padding-top: 10px; padding-bottom: 0px">
          {{item.introduction}}
        </el-input>
        <hr>
        <span>
          <el-input
            type="textarea"
            autosize
            v-model="item.content"
            clearable
            style="font: 18px bolder;padding-top: 10px; padding-bottom: 0px">
        </el-input>
          <!--          <p>{{this.username}}</p>-->
      </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Detail',
  data () {
    return {
      edit: false,
      item: [{
        id: '',
        author: '',
        title: '',
        date: '',
        introduction: '',
        permissions: '',
        times: '',
        likes: '',
        content: ''
      }],
      user: ''
    }
  },
  created () {
    this.item = this.$route.query
    console.log(this.item)
    this.getContent()
  },
  methods: {
    getContent () {
      this.$axios.get('/content', {
        params: {
          'noteId': this.item.id
        }
      }).then(successResponse => {
        if (successResponse.data.code === 200) {
          this.item.content = successResponse.data.result
        }
      })
    },
    editJotter () {
      this.edit = true
    }
  }
}
</script>

<style scoped>
.jotter{
  /*background-color: ;*/
  background-color: #eeeeee;
  width: 95%;
  margin: auto;
  position: center;
  text-align: left;
  box-shadow: 0 0 3px 3px #eaecef;
}
.el-icon-user{
  padding-left: 30px;
  margin-top: 10px;
}
.author{
  padding-left: 5px;
  margin-top: 10px;
}
.date{
  padding-left: 5px;
  margin-top: 6px;
}
.el-icon-time{
  padding-left: 30px;
  margin-top: 10px;
}
.el-icon-view{
  padding-left: 30px;
  margin-top: 8px;
}
span{
  padding-left: 10px;
  margin-top: 8px;

}
.el-icon-s-check{
  margin-left: 30px;
  background: url("../../assets/like.png") center center no-repeat;
  background-size: 18px;
}
.el-icon-s-check:before {

  content: "11";
  visibility: hidden;
}
.jotter>>>.el-input__inner {
  background: transparent;
  border: 0;
}
/* 如果你的 el-input type 设置成textarea ，就要用这个了 */
.jotter>>>.el-textarea__inner {
  background: transparent;
  border: 0;
  resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}
el-input{
  background-color: black;
}
.el-icon-s-order:hover{
  background-color: #eeeeee!important;
}
</style>
