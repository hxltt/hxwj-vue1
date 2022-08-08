<template>
  <div>
    <el-dialog
      title="写笔记"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form ref="form" :model="form" style="height: 450px; ">
        <el-form-item  label="标题" :label-width="formLabelWidth" prop="title" >
          <el-input v-model="form.title" autocomplete="off" placeholder="不加《》"></el-input>
        </el-form-item>
        <el-form-item  label="内容简介" :label-width="formLabelWidth" prop="introduction">
          <el-input v-model="form.introduction" type="textarea" autocomplete="off" placeholder="不加《》"></el-input>
        </el-form-item>
        <el-form-item  label="正文" :label-width="formLabelWidth" prop="content">
          <el-input v-model="form.content" type="textarea" :maxlength="50" :autosize="{ minRows: 10, maxRows: 10}" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'JotterForm',
  data () {
    return {
      dialogFormVisible: false,
      form: [{
        title: '',
        introduction: '',
        content: ''
      }]
    }
  }

}
</script>

<style scoped>
el-form-item{
  margin: 100px;
}
el-form{
  margin: 100px;
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
/*.button:active{*/
/*  background-color: #d3dce6;*/
/*}*/
</style>
