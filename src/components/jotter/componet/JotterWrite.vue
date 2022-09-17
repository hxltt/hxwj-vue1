<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" circle class="button"  @click="drawer = true"></el-button>

<!--    滚动条-->
<!--    :visible指的是属性绑定，表示弹框的显示隐藏，当:visible的值为ture的时候，弹框显示，当为false的时候，弹框隐藏 后面的.sync是什么意思呢，指的就是同步动态双向的来表示visible的值，当我们关闭窗口的时候，这个弹框隐藏了，visible的值发生了变化，但是关闭窗口这个动作，我们没法用确定的动作去判断这个值，所以用到了vue中的双向绑定的原则，在vue中统一加上了.sync来表示同步的修改了visible的值。-->
<!--    before-close：关闭前的回调，会暂停 Dialog 的关闭，function(done)，done 用于关闭 Dialog。 location.reload：刷新整个页面-->

    <el-drawer
      title="wsdgak"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      ref="navDrawer"
      :with-header="false"
       size="100%">
      <h3>{{this.message}}</h3>
      <i class="el-icon-circle-close" @click="closeDrawer()"></i>
      <el-container class="inputDeep" style="width: 60%; margin: auto;padding-top: 0;">
        <el-main>
          <el-input
            placeholder="请输入标题（5~100个字）"
            v-model="item.title"
            clearable
            style="font: 20px bold ">
          </el-input>
          <el-divider></el-divider>

          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入文章简介"
            v-model="item.introduction">
            {{this.item.introduction}}
          </el-input>
          <el-divider></el-divider>

          <el-input
            type="textarea"
            :rows="20"
            placeholder="请输入正文"
            v-model="item.content">
            {{this.content}}
          </el-input>
          <el-divider></el-divider>
        </el-main>

        <!--权限单选框-->
        <el-radio-group v-model="item.permissions" >
          <el-radio label="true" >公开笔记</el-radio>
          <el-radio label="false">仅自己可见</el-radio>
        </el-radio-group>

        <!--保存提交按钮-->
        <el-footer style="padding-top: 40px;padding-bottom: 30px;margin-bottom: 30px">
          <el-button type="primary" @click="submitJotter" class="saveButton">发布笔记</el-button>
          <el-button @click="save=true" class="saveButton">保存文档</el-button>
        </el-footer>
      </el-container>
      <br>
      <br>

    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'JotterWrite',
  data () {
    return {
      drawer: false,
      direction: 'ttb',
      message: '发布博客',
      save: false,
      item: {
        // user_id: '',
        author: '',
        title: '',
        date: '',
        introduction: '',
        permissions: 'true',
        content: ''
      }
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    clear () {
      this.item.title = ''
      this.item.introduction = ''
      this.item.content = ''
      this.item.date = ''
      this.permissions = 'true'
      this.save = true
    },
    closeDrawer () {
      if (this.save === false) {
        this.$confirm('文档未保存，是否确认关闭？')
          .then(_ => {
            this.clear()
            this.drawer = false
          })
          .catch(_ => {})
      } else {
        this.save = false
        this.drawer = false
      }
    },
    submitJotter () {
      this.item.date = this.getNowDate()
      // this.item.permissions = this.type
      let username = this.$store.state.user.username
      console.log(username)
      this.item.author = username
      console.log(this.author)
      this.$axios
        .post('/list', {
          author: this.item.author,
          title: this.item.title,
          introduction: this.item.introduction,
          content: this.item.content,
          permissions: this.item.permissions,
          date: this.item.date
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('发布成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.clear()
                this.drawer = false
              }

            })
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    getNowDate () {
      const timeOne = new Date()
      const year = timeOne.getFullYear()
      let month = timeOne.getMonth() + 1
      let day = timeOne.getDate()
      month = month < 10 ? '0' + month : month
      day = day < 10 ? '0' + day : day
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style scoped>
.title{
  border: none;
}
.back{
  background-color: #eaecef;
}
.inputDeep{
  background-color: rgba(203,201,105,0.08);
  box-shadow: 0 0 3px 3px #eaecef;
  margin-bottom: 20px;
}
.inputDeep>>>.el-input__inner {
  background: transparent;
  border: 0;
}
/* 如果你的 el-input type 设置成textarea ，就要用这个了 */
.inputDeep>>>.el-textarea__inner {
  background: transparent;
  border: 0;
  resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}
el-input{
  background-color: rgba(203,201,105,0.08);
}
.saveButton{
  float: right;
  margin-right: 20px;
  border: 1px #0366d6 solid;
  border-radius: 10px;
}
.saveButton:hover{
  color: #959da5;
}
.el-radio{
  float: left;
  padding-left: 30px;
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
.el-icon-circle-close{
  border: none;
  font-size: 40px;
  position: fixed;
  float:right;
  right: 50px;
  top: 30px
}
.el-icon-circle-close:active{
  color: #d3dce6;
}

</style>
