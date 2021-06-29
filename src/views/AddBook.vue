<template>
<!--通过model绑定数据，将表单接收的数据和变量绑定 input标签定义v-model-->
<!--通过rules绑定校验规则 item标签定义prop-->
<!--ref必须有，相当于表单的名字-->
<el-form ref="form" :model="form" :rules="rules" label-width="80px">
<el-form-item label="书名" prop="name">
  <el-input v-model="form.name"></el-input>
</el-form-item>
  <el-form-item label="作者" prop="author">
    <el-input v-model="form.author"></el-input>
  </el-form-item>
<el-form-item>
  <el-button type="primary" @click="onSubmit('form')">添加</el-button>
  <el-button @click="onReset('form')">重置</el-button>
</el-form-item>
</el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        author: ''
      },
      rules:{
        name:{required:true,message:'请输入书名',trigger:'blur'},
        author: {required:true,message:'请输入作者',trigger:'blur'}
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) =>{
        if(valid){
          alert('submitted!');
          axios.post("http://localhost:8181/book/save",this.form).then(function (resp){
            if(resp.data==="success")
              alert("添加成功！")
          })
        }else{
          console.log('error!');
          return false;
        }
      })
    },
    onReset(formName){
      this.$refs[formName].resetFields();
    }
  }
}
</script>