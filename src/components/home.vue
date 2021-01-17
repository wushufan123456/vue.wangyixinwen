<template>
  <div class="home">
   <el-container>
  <el-header>网易新闻查看</el-header>
  <el-main>
    <el-card>
      <div class="box" v-for="items in newslist" :key="items.id">
        <img :src="items.image" alt="">
        <div class="des">
      <el-link><p @click="see(items.path)" class="title">{{items.title}}</p></el-link>
         <p class="time">{{items.passtime}}</p>
        </div>
      </div>
      <div class="pagination">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryinfo.page"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="queryinfo.count"
      layout=" sizes, prev, pager, next, jumper">
      </el-pagination>
      </div>
    </el-card>
  </el-main>
</el-container>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
   data(){
     return{
       queryinfo:{
       page:1,
       count:30
       },
       newslist:[]
     }
   },
  created(){
  this.getlist()
  },
   methods:{
   async getlist(){
     var data = Qs.stringify(this.queryinfo);
  const {data:res} =await this.$http.post('',data, {headers:{'Content-Type':'application/x-www-form-urlencoded'}})
    if(res.code!==200){
      return this.$message.error('获取新闻列表失败！')
    }
    this.$message.success('获取新闻列表成功！')
      console.log(res.result)
      this.newslist=res.result
   },
    backTop() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
   handleSizeChange(newsize){
     this.queryinfo.count=newsize
     this.backTop()
     this.getlist()
   },
   handleCurrentChange(newpage){
       this.queryinfo.page=newpage
       this.getlist()
       this.backTop()
   },
   see(e){
      window.open(e,'_blank')
   },
   mouseOver(){
     this.style.color=red
   }
   },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
}
.home {
  height: 100%;
}
.el-container{
  min-height: 100%;
}
 .el-header {
    background-color: #B3C0D1;
    color: #fff;
    font-size: 30px;
    text-align: center;
    line-height: 60px;
  }
   .el-main {
    background-color: #E9EEF3;
    height: 100%;
    overflow-y:scroll;
  }
.box {
  background-color:#f5f7fa;
  height: 100px;
  width: 98%;
  margin: 5px auto;
  display:flex;
  flex-direction: row;
}
.box img {
  height: 100px;
  width: 150px;
}
.box .des {
  height: 100px;
  display: flex;
  margin-left: 30px;
  justify-content: space-between;
  flex-direction: column;
}
.box .des p {
  margin: 0;
}
.pagination{
  margin: 10px auto;
  width: 20%;
}
.time {
  font-size: 15px;
  color: gray;
}
.title {
  font-size: 20px;
}
</style>
