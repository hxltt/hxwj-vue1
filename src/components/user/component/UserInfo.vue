<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash;    &ndash;&gt;-->
<!--    <div style="display: flex">-->
<!--      <span style="min-width: 100px;height: auto">个人介绍:</span>-->
<!--      <el-input v-model="description" maxlength="200" ></el-input>-->
<!--    </div>-->
<!--    <div style="display: flex">-->
<!--      <span style="min-width: 100px;height: auto">个人签名:</span>-->
<!--      <el-input v-model="signature" maxlength="20" ></el-input>-->
<!--    </div>-->
<!--    <div style="display: flex">-->
<!--      <span style="min-width: 100px;height: auto">性别:</span>-->
<!--      <el-select v-model="gender" placeholder="请选择">-->
<!--        <el-option-->
<!--          v-for="item in options"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value">-->
<!--        </el-option>-->
<!--      </el-select>-->
<!--    </div>-->
<!--    <div style="display: flex">-->
<!--      <span style="min-width: 100px;height: auto">出生日期:</span>-->
<!--      <el-input v-model="birthday" maxlength="20" ></el-input>-->
<!--    </div>-->
<!--    <div style="display: flex">-->
<!--      <span style="min-width: 100px;height: auto">地址:</span>-->
<!--      <el-input v-model="address" axlength="100"></el-input>-->
<!--    </div>-->
<!--    &lt;!&ndash;  按钮  &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'UserInfo',-->
<!--  data () {-->
<!--    return {-->
<!--      options: [{-->
<!--        value: '选项1',-->
<!--        label: '男'-->
<!--      }, {-->
<!--        value: '选项2',-->
<!--        label: '女'-->
<!--      }],-->
<!--      description: '',-->
<!--      signature: '',-->
<!--      gender: '',-->
<!--      birthday: '',-->
<!--      address: '',-->
<!--      profession: ''-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    this.init()-->
<!--  },-->
<!--  methods: {-->
<!--    init () {-->
<!--      let item = JSON.parse(window.localStorage.getItem('user'))-->
<!--      let username = item.username-->
<!--      this.$axios.get('/userInfo', {-->
<!--        params: {-->
<!--          'username': username-->
<!--        }}-->
<!--      ).then(successResponse => {-->
<!--        if (successResponse.data.code === 200) {-->
<!--          this.description = successResponse.data.result.description-->
<!--          this.signature = successResponse.data.result.signature-->
<!--          this.gender = successResponse.data.result.gender-->
<!--          this.birthday = successResponse.data.result.birthday-->
<!--          this.address = successResponse.data.result.address-->
<!--          this.profession = successResponse.data.result.profession-->
<!--        }-->
<!--      })-->
<!--    }-->

<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
  <div :visible.sync="drawer">
<!--    个人介绍-->
    <div style="display: flex" class="des">
    <span style="width:100px;height: auto;line-height:normal;line-height: 45px">个人介绍:</span>
      <el-input v-model="description" style="width: 600px" maxlength="400" @input="handlerChange"></el-input>
    </div>
<!--    个性签名-->
    <div style="display: flex" class="sig">
      <span style="width:100px;height: auto;line-height: 45px">个人签名:</span>
      <el-input v-model="signature" style="width: 600px" maxlength="30" @input="handlerChange"></el-input>
    </div>
<!--    性别-->
    <div  style="display: flex" class="gen">
      <span style="width:100px;height: auto;line-height: 45px">性别</span>
      <el-select v-model="gender" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
<!--出生日期-->
        <div style="display: flex" class="bir">
        <span style="width: 100px;height: auto;line-height: 45px">出生日期</span>
        <span class="demonstration"></span>
        <el-date-picker
          v-model="birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
<!--        地址-->
        <div style="display: flex" class="add">
          <span style="width: 100px;line-height: 45px">地址</span>
          <el-input v-model="address" style="width: 600px" maxlength="100" @input="handlerChange"></el-input>
        </div>
<!--        职业-->
        <div style="display: flex" class="pro">
          <span style="width: 100px;line-height: 45px">职业</span>
          <el-select v-model="profession" placeholder="请选择" class="select1" @select="handlerChange">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
    <div>
      <el-button class="buton" type="primary" style="width:15%;" @click="submitInfo">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '男'
      }, {
        value: '选项2',
        label: '女'
      }],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      options2: [{
        value: '选项1',
        label: '教育/培训'
      }, {
        value: '选项2',
        label: '公务员/行政/行政单位'
      }, {
        value: '选项3',
        label: '模特'
      }, {
        value: '选项4',
        label: '空姐'
      }, {
        value: '选项5',
        label: '学生'
      }, {
        value: '选项6',
        label: '其他'
      }],
      profession: '',
      gender: '',
      birthday: '',
      description: '',
      signature: '',
      address: '',
      drawer: false,
      isRewirteEditor: false
    }
  },
  // 初始化函数，页面加载时调用create里的东西
  created () {
    this.init()
  },
  // 方法区，方法函数全部放在里面
  methods: {
    // 名字叫init的函数
    init () {
      let item = JSON.parse(window.localStorage.getItem('user')) // 定义一个变量，赋值为本地存储的user（了解就行）
      let username = item.username // 定义一个变量，赋值为本地存储的user的username（了解就行）
      // 前端调用接口，get代表的就是使用get方式的访问
      this.$axios.get('/userInfo', { // url:调用地址，全部为http：//localhost:8848/api/userInfo
        params: { // config里写一个参数parameter, parameter为键值对，key为username放vue.js里定义的username
          'username': username // 前面的username 是一个key,后面的username是值，是前面data里定义的username变量
        }
      }
      ).then(successResponse => { // then代表前面的axios调用后的执行内容
        if (successResponse.data.code === 200) { // 如果返回内容successResponse (这个名字是自己取的)的code是200代表成功访问
        // success里的data的code是200，这个是前后端的一个协议。后面在和你说，现在只要知道code为200的时候是成功调用接口
          this.description = successResponse.data.result.description // 将访问后的数据的data的result的description赋值description(data里定义的description)
          this.signature = successResponse.data.result.signature
          this.gender = successResponse.data.result.gender
          this.birthday = successResponse.data.result.birthday
          this.address = successResponse.data.result.address
          this.profession = successResponse.data.result.profession
        }
      })
    },
    submitInfo () {
      let item = JSON.parse(window.localStorage.getItem('user')) // key是user
      let username = item.username
      console.log(username)
      // userInfo是接口地址，？后面是参数名（username），=后面是参数的值，data是参数的请求体
      // http://localhost:8443/api/userInfo?username=admin
      this.$axios
        .post('userInfo?username=' + username, {
          description: this.description,
          signature: this.signature,
          gender: this.gender,
          birthday: this.birthday,
          address: this.address,
          profession: this.profession
        })
        .then(resp => {
          if (resp.data.code === 200 && this.isRewirteEditor) {
            this.$alert('提交成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.drawer = false
              }

            })
          } else if (resp.data.code === 200 && !this.isRewirteEditor) {
            this.$alert('数据未修改，请先修改数据在提交', '提示', {
              confirmButtonText: '确定',
              callback: action => {
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
    handlerChange (e) {
      console.log(e)
      this.isRewirteEditor = true
    }
  },
  watch: {
    birthday () {
      this.isRewirteEditor = true
      console.log('发生了变化')
    },
    profession  () {
      this.isRewirteEditor = true
      console.log('发生了变化')
    },
    gender () {
      this.isRewirteEditor = true
      console.log('发生了变化')
    }
  }
}
</script>
<style>
.des {
  margin-bottom: 20px;
  margin-top: 55px;
}
.sig {
  margin-bottom: 20px;
}
.gen{
  margin-bottom: 20px;
}
.bir{
  margin-bottom: 20px;
}
.add{
  margin-bottom: 20px;
}
.pro{
  margin-bottom: 20px;
}
/*.buton:hover{*/
/*  color: #0366d6;*/
/*}*/
/*.buton{*/
/*  border: none;*/
/*  background-color: #99a9bf;*/
/*  font-size: 40px;*/
/*}*/
</style>
