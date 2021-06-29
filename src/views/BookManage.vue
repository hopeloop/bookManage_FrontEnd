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
    <el-table-column
        fixed="right"
        label="操作"
        width="100">
      <template slot-scope="scope">
        <el-button @click="onUpdate(scope.row)" type="text" size="small">修改</el-button>
        <el-button @click="onDelete(scope.row)" type="text" size="small">删除</el-button>
      </template>
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
    <el-dialog title="更新书本信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="true" readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="true"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.author" autocomplete="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  methods:{
    onUpdate(row){
      const _this = this
      axios.get("http://localhost:8181/book/findById/"+row.id).then(function (resp){
        console.log(resp.data)
        _this.form.id = resp.data.id;
        _this.form.name = resp.data.name;
        _this.form.author = resp.data.author;
      })
      this.dialogFormVisible = true;
    },
    doSubmit(){
      axios.post("http://localhost:8181/book/update",this.form).then(function (resp){
        if(resp.data==="success")
          alert("修改成功！")
        this.dialogFormVisible = false;
      })
    },
    onDelete(row){
      axios.delete("http://localhost:8181/book/deleteById/"+row.id).then(function (resp){
        alert("删除成功!")
      })
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
      tableData: null,

      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        id:'',
        name: '',
        author: '',
      },
      formLabelWidth: '120px'
    };
  }
}
</script>