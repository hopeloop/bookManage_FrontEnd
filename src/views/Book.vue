<!--将后端传来的数据以表格的形式渲染-->
<template>
  <div>
    <table>
      <tr>
        <td>编号</td>
        <td>图书名称</td>
        <td>作者</td>
      </tr>
      <tr v-for="item in books">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.author}}</td>
      </tr>
    </table>>
  </div>
</template>

<script>
export default {
  data(){
    return{
      books:[]
    }
  },
  name: "Book",
  created() {
    const _this = this //在下面一行写this表示回调函数的this，但要指代的实际是book.vue所以新建一个变量
    axios.get('http://localhost:8181/book/findAll').then(function (resp){
      //将后端返回的数据赋给books
      _this.books = resp.data;
    })
  }
}
</script>

<style scoped>

</style>