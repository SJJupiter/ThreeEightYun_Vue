<template>
  <div class="ThreeEightRoom">
    <div><h1 class="animate__animated animate__bounce" id="welcome">Welcome To 38Yun</h1></div>
    

<!-- 创建房间的信息 -->
    <div id="form">
      <div>
        <div style="margin: 20px;"></div>
        <el-form  :label-position="labelPosition" label-width="80px">

        <el-form-item label="昵称">
            <el-input v-model="userId"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
            <el-input v-model="roomId"></el-input>
        </el-form-item>
        </el-form>
      </div>

      <div>
        <label>请选择几人场，不选默认为3:</label>
        <el-select style="margin: 0px 0px 20px 30px;" v-model="playerNum" placeholder="请选择几人场，不选默认为3">
            <el-option
              v-for="item in playerNumOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
            </el-option>
          </el-select>
      </div>

      <div>
        <!-- <router-link to="{name: 'ThreeEight', params: {userId: '1', roomId: '2', playerNum: '3' } }">   -->
            <el-button icon="el-icon-circle-plus-outline" type="primary" @click="toNextPage">进入房间</el-button>
        <!-- </router-link> -->
      </div>    

          
    </div>

    <div id="roomInfo">
        在线房间信息
    </div>

  </div>
</template>



<script>
  export default {
    name: "ThreeEightRoom",
    data() {
      return {
        isFull: '',
        //表单框
        labelPosition: 'right',
        userId: '',
        roomId: '',

        //几人场
        playerNum: '3',
        playerNumOptions: [{
            value: 2,
            label: '2'
          }, {
            value: 3,
            label: '3',
            
          }, {
            value: 4,
            label: '4'
          }, {
            value: 5,
            label: '5',
          }],    

      };
    },
    mounted() {
      // this.isFullMethod();
    },
    methods: {
      // isFullMethod(){
      //   this.isFull = this.$route.query.fullMsg;
      //   if(this.isFull==='isFull'){
      //     alert("房间已满，请去其他房间！");
      //   }
      // },
      toNextPage(){
          if(this.userId==='' || this.roomId===''){
            alert("用户名或房间号不能为空！！！");
            return;
          };
          this.$router.push({
            path:'/ThreeEight',
            query:{
              userId: this.userId,
              roomId: this.roomId,
              playerNum: this.playerNum
            }
          });
      }
    },
  }
</script>

<style scoped>
  #form{
      width: 30%;
      margin:10px auto;
  }
  #welcome{
    margin: 10vmax;
    font-style:oblique;
    font-size: 100px;
  }
</style>

<style>
  .ThreeEightRoom{
      height: auto;
      scroll-behavior: auto;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }
</style>