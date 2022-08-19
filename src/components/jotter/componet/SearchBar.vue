<template>
  <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
    <el-input
      @keyup.enter.native="searchClick"
      placeholder="搜索博客..."
      prefix-icon="el-icon-search"
      style="font-size: 15px;border-radius: 10px"
      v-model="keywords">
    </el-input>
    <el-button type="primary" icon="el-icon-search" @click="searchClick" style="height: 40px;font-size: 15px">搜索</el-button>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      keywords: '',
      books: [],
      cardLoading: []
    }
  },
  methods: {
    searchClick () {
      this.$emit('onSearch')
    }
  }
}
</script>

<style scoped>

</style>
