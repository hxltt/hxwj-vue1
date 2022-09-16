<!--<template>-->
<!--&lt;!&ndash;  <div style="height: 550px;overflow: auto;margin-left: 10px;margin-right: 10px" class="infinite-list" v-infinite-scroll="load">&ndash;&gt;-->
<!--  <div>-->
<!--    <div v-for="item in books" :key="item">-->
<!--      <el-card style="" class="book" bodyStyle="padding:10px" shadow="hover">-->
<!--        <div class="cover" @click="editBook(item)">-->
<!--          <img :src="item.cover" alt="封面">-->
<!--        </div>-->
<!--        <div class="info">-->
<!--          <div class="title">-->
<!--            <a href="">{{item.title}}</a>-->
<!--          </div>-->
<!--          <i class="el-icon-delete" @click="deleteBook(item.id)"></i>-->
<!--        </div>-->
<!--        <div class="author">{{item.author}}</div>-->
<!--      </el-card>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  name: 'Collection',-->
<!--  data () {-->
<!--    return {-->
<!--      books: []-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    this.init()-->
<!--  },-->
<!--  methods: {-->
<!--    init () {-->
<!--      this.$axios.get('/books').then(resp => {-->
<!--        if (resp && resp.status === 200) {-->
<!--          this.books = resp.data-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->

<!--</script>-->
<!--<style>-->
<!--.cover {-->
<!--  width: 125px;-->
<!--  height: 172px;-->
<!--  margin-bottom: 7px;-->
<!--  overflow: hidden;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.title {-->
<!--  font-size: 14px;-->
<!--  text-align: left;-->
<!--}-->

<!--.author {-->
<!--  color: #333;-->
<!--  width: 102px;-->
<!--  font-size: 13px;-->
<!--  margin-bottom: 6px;-->
<!--  text-align: left;-->
<!--}-->
<!--.el-icon-delete {-->
<!--  cursor: pointer;-->
<!--  float: right;-->
<!--}-->
<!--.book{-->
<!--  width: 150px;-->
<!--  margin-bottom: 20px;-->
<!--  height: 250px;-->
<!--  float: left;-->
<!--  margin-right: 15px-->
<!--}-->
<!--img {-->
<!--  width: 115px;-->
<!--  height: 172px;-->
<!--  /*margin: 0 auto;*/-->
<!--}-->

<!--</style>-->
<template>
  <div style="margin-left: 28px ">
    <el-row >
      <!--   图书   -->
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item.id">

        <!--   弹窗     -->
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">
          {{item.title}}
        </p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">
          {{item.abs}}
        </p>

        <!--   图书信息   -->
        <el-card style="" class="book" bodyStyle="padding:10px" shadow="hover">
          <div class="cover" @click="editBook(item)">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
            <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
          </div>
          <div class="author">{{item.author}}</div>
        </el-card>

      </el-tooltip>
      <!--   新增图书   -->
      <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
    </el-row>

    <!--  页面数量 -->
    <el-row >
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import EditForm from '../../library/EditForm'
import SearchBar from '../../library/SearchBar'
export default {
  name: 'Collection',
  components: {EditForm, SearchBar},
  data () {
    return {
      books: [],
      currentPage: 1,
      pagesize: 9
    }
  },
  mounted: function () {
    this.loadBooks()
  },
  methods: {
    loadBooks () {
      var _this = this
      this.$axios.get('/books').then(resp => {
        if (resp && resp.status === 200) {
          _this.books = resp.data
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    deleteBook (id) {
      this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = '/books/' + id
        this.$axios
          .delete(url).then(resp => {
            if (resp && resp.status === 200) {
              this.loadBooks()
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // alert(id)
    },
    editBook (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        }
      }
    }
  }
}
</script>
<style scoped>

.cover {
  width: 125px;
  height: 172px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 115px;
  height: 172px;
  /*margin: 0 auto;*/
}

.title {
  font-size: 14px;
  text-align: left;
}

.author {
  color: #333;
  width: 102px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display: block;
  line-height: 17px;
}

.el-icon-delete {
  cursor: pointer;
  float: right;
}

.switch {
  display: flex;
  position: absolute;
  left: 780px;
  top: 25px;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}
.book{
  width: 150px;
  margin-bottom: 5px;
  height: 250px;
  float: left;
  margin-right: 15px
}

</style>
