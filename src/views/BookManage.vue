<template>
  <div><div><el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column
        prop="id"
        label="序号"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="书名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="author"
        label="作者">
    </el-table-column>
  </el-table></div>
    <div class="block">
      <el-pagination
          layout="prev, pager, next"
          page-size=6
          :total="total"
          @current-change="page">
      </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  methods:{
    handleClick(row){
      console.log(row);
    },
    page(currentPage){
      const _this = this;
      axios.get("http://localhost:8181/book/page/"+(currentPage-1)+"/6").then(function (resp){
        //console.log(resp.data)
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      })
      }
  },
  created() {
  const _this = this;
  axios.get("http://localhost:8181/book/page/0/6").then(function (resp){
        //console.log(resp.data)
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
    })
  },
  data(){
    return{
      //初始值设为null
      total: null,
      tableData: null
    }
  }
}
</script>