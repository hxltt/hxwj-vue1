<template>
  <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="red">

    <el-menu-item v-for="(item,i) in typeList" :key="i" :index="i" >
      <div class="type">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ item.name }}</span>
      </div>
    </el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      cid: '',
      typeList: [
        {name: '全部', index: '0'},
        {name: '小说', index: '1'},
        {name: '文学', index: '2'},
        {name: '青春文学', index: '3'},
        {name: '古籍', index: '4'},
        {name: '科普读物', index: 5},
        {name: '艺术', index: '6'}
      ]
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.cid = key
      this.$emit('indexSelect')
    }
  }
}
</script>

<style scoped>
.categories {
  position: fixed;
  margin-left: 50%;
  left: -650px;
  top: 70px;
  width: 150px;
}
.type{
  position: fixed;
}
</style>
