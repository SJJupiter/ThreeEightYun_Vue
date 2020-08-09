<template>
  <div class="ThreeEight">
      <el-container>
        <el-header>
             <!-- 当前房间的信息 -->
            <div id="roomInfo">
              <div>{{roomInfo}}</div>
            </div>
        </el-header>

        <el-container id="aside">
            <el-aside width="300px">
                    <!-- 聊天界面 -->
                    <div class="sendInfo">
                        <div>
                          <el-input
                              placeholder="请输入消息"
                              v-model="chatMsg" style="margin: 20px 0px 30px 0px">
                          </el-input>
                        </div>
                        
                        <div>
                          <el-select style="margin: 0px 0px 0px 0px" clearable v-model="toUserId" placeholder="请选择私聊对象">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                         </el-select>
                        </div>
                                                

                        <div>
                         <el-button icon="el-icon-chat-dot-round" @click="sendMessage">发送消息</el-button> 
                        </div>
                        
                        <div> 聊天记录：</div>
                        <!-- <div >{{rsvMsg}}</div> -->
                        <div>
                            <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="聊天记录"
                            v-bind:value="rsvMsg"
                            autosize: true>
                          </el-input>
                        </div>         
                    </div>

                    <el-divider ></el-divider>

                    <!-- 回合结果 -->
                    <div>本回合结果为：</div>
                    <div>
                      <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="回合结果"
                      v-bind:value="gameResult"
                      autosize: true>
                    </el-input>
                    </div>     

            </el-aside>


            <el-main id="main">
                <!-- 玩家信息 -->
                    <div class="playerInfo">
                        <!-- <el-form  :label-position="labelPosition" label-width="80px" :model="NewAllUserInfo"> -->
                          <el-form  :inline="isInline" :label-position="labelPosition" label-width="85px" v-for="(item,index) in NewAllUserInfo" :key="index">
                          <div class="row">
                            <el-form-item label="是否存活" :style="item.userInfoStyle">
                                  <el-input
                                    :key="item.userinfo"
                                    :value="item.userinfo" 
                                    :readonly="true"
                                    style="width: 500px;"
                                    >
                                  </el-input>
                              </el-form-item>
                              <!-- <el-form-item label="玩家名">
                                  <el-input
                                    :key="item.userId"
                                    :value="item.userId"
                                    :disabled="true">
                                  </el-input>
                              </el-form-item>

                              <el-form-item label="血量">
                                  <el-input
                                    :key="item.blood"
                                    :value="item.blood"
                                    :disabled="true">
                                  </el-input>
                              </el-form-item>

                              <el-form-item label="气">
                                  <el-input
                                    :key="item.qi"
                                    :value="item.qi"
                                    :disabled="true">
                                  </el-input>
                              </el-form-item> -->

                              <!-- <el-form-item label="玩家名">
                                  <el-input
                                    v-for="item in allUserInfo"
                                    :key="item.value"
                                    :value="item.value"
                                    :disabled="true">
                                  </el-input>
                              </el-form-item>

                              <el-form-item label="血量">
                                  <el-input
                                    v-for="item in allUserBlood"
                                    :key="item.value"
                                    :value="item.value"
                                    :disabled="true">
                                  </el-input>
                              </el-form-item>

                              <el-form-item label="气">
                                  <el-input
                                    v-for="item in allUserQi"
                                    :key="item.value"
                                    :value="item.value"
                                    :disabled="true">
                                  </el-input>
                              </el-form-item> -->
                          </div>                     
                        </el-form>
                    </div>

                    

                    <!-- 攻击操作栏 -->
                    <div>                                
                            <el-row >
                              已选招式：
                                <el-input style="width: 80px"
                                    placeholder=""
                                    v-model="choosedAttack"
                                    :disabled="true">
                                </el-input>
                                <el-button icon="el-icon-plus" type="primary" @click="chooseYun">运</el-button>
                                <el-button icon="el-icon-download" type="info" @click="chooseDang0">挡</el-button>
                                <el-button icon="el-icon-download" type="info" @click="chooseDang1">一气挡</el-button>
                                <el-button icon="el-icon-thumb" type="warning" @click="chooseBiao">小标</el-button>
                                <el-button icon="el-icon-thumb" type="warning" @click="chooseAdugen">阿杜跟</el-button>
                            </el-row>  

                    </div>
                    
                    <div>
                        <el-select style="margin: 0px 0px 0px 0px" clearable v-model="choosedUser" placeholder="请选择攻击目标">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </div>
                            
                    <div>
                        <el-button icon="el-icon-check" type="danger" @click="sendAttackMsg" :disabled="attackBtnDis">攻击</el-button>
                    </div>

                <!-- 退出或重新开始 -->
                    <div>
                        <el-row >
                        <el-button  icon="el-icon-close" @click="quit">退出</el-button>
                        <el-button  icon="el-icon-refresh-right" :disabled="nextBtnDis" @click="sendReadyNextInfo">继续下一局</el-button>
                    </el-row>  
                    </div>

            </el-main>
        </el-container>
    </el-container>


  </div>
</template>



<script>
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';

  export default {
    name: "ThreeEightRoom",
    data() {
      return {
        //stomp
        stompClient: null,
        //聊天消息
        chatMsg: '',
        rsvMsg: '',
        userId: '',
        toUserId: '',

        //回合结果
        gameResult: '',
        //顶部当前房间信息
        roomInfo: '',
        realPlayerNum: '',
        onlineNum: '',

        //攻击
        choosedAttack: '',
        choosedUser: '',

        //当前玩家信息
        selfBlood: '1',
        selfQi: '0',


        //表单
        labelPosition: 'right',
        isInline: true,

        //玩家名字选择器
        options: [],

        //玩家信息
        // allUserInfo: [],
        // allUserBlood: [],
        // allUserQi: [],
        NewAllUserInfo: [],

        //攻击、下一局按钮是否锁定
        attackBtnDis: false,
        nextBtnDis: true
      };
    },
    mounted() {        

    },
    created(){
      this.initInfo();
      this.connection();
      window.onbeforeunload = function () {
            this.disconnect();
        };
    },
    destroyed() {

    },
    methods: {
      //监听页面刷新关闭

      //获得注册信息
      initInfo(){
        this.userId = this.$route.query.userId;
        this.roomId = this.$route.query.roomId;
        this.playerNum = this.$route.query.playerNum;
      },
      connection() {
        const socket = new SockJS('http://120.26.179.112:8072/websocket')
        this.stompClient = Stomp.over(socket)
        //建立连接，订阅主题
        this.stompClient.connect({}, 
        (frame) => {
          console.log(frame)
          //房间模块信息界面刷新**************
          this.stompClient.subscribe('/topic/roomFlash_'+this.roomId, (response) => {
            console.log('-------++++++++++++++++++++++++++++++------------')
            console.log(response.body)
            let flashRoomInfo = JSON.parse(response.body)
            this.realPlayerNum = flashRoomInfo.realPlayerNum
            this.onlineNum = flashRoomInfo.onlineNum
            // this.allUserInfo = [];
            // this.allUserBlood = [];
            // this.allUserQi = [];

            this.NewAllUserInfo = [];

            this.options = [];
            for(let i=0;i<this.realPlayerNum;i++){
              let user = flashRoomInfo['user'+i]
              let blood = flashRoomInfo['blood'+i]
              let qi = flashRoomInfo['qi'+i]
              let lifeColor = flashRoomInfo['lifeColor'+i]
              this.attackBtnDis  = flashRoomInfo['attackbtnDisabled'+i]
              this.options.push({value: user,label: user}) 
              // this.allUserInfo.push({value: user}) 
              // this.allUserBlood.push({value: blood}) 
              // this.allUserQi.push({value: qi}) 

              // 如果是本人则更新自己的血量信息
              if(user===this.userId){
                this.selfBlood = blood;
                this.selfQi = qi;
              }

              this.NewAllUserInfo.push(
                // {userId: user, blood: blood , qi: qi}
                 {
                   userinfo: '玩家名： '+user+'          血量：'+blood+'          气：'+qi,
                  userInfoStyle: lifeColor}
              )
            }
            this.roomInfo = "当前房间号：" + this.roomId + "--------------当前用户：" + this.userId + "--------------几人场：" + this.realPlayerNum + "--------------在线人数：" + this.onlineNum 
            
            this.userInfoStyle="background-color: #0bbcd6;  border-radius: 5px;";//初始蓝色
          });
          //房间已满
          this.stompClient.subscribe('/queue/ifFull_'+this.userId, (response) => {
            console.log('-------++++++++++++++++++++++++++++++------------')
            console.log(response.body)
            if(response.body==="isFull"){
              this.disconnect();
              alert("当前房间已满！！！");
              this.$router.push({
                  path:'/ThreeEightRoom',
               }); 
            }
          });
          //群发
          this.stompClient.subscribe('/topic/room_'+this.roomId, (response) => {
            console.log('-------++++++++++++++++++++++++++++++------------')
            console.log(response.body)
            this.rsvMsg = this.rsvMsg+'\n'+response.body
          });
          this.stompClient.subscribe('/queue/user_' + this.userId, (response) => {
            console.log('-------++++++++++++++++++++++++++++++------------')
            console.log(response.body)
            this.rsvMsg = this.rsvMsg+'\n'+response.body
          });
          //订阅攻击结果
          this.stompClient.subscribe('/queue/attackResult_' + this.userId, (response) => {
            console.log('-------++++++++++++++++++++++++++++++------------')
            console.log(response.body)
            this.gameResult = this.gameResult+'\n'+response.body
          });
          this.stompClient.subscribe('/topic/attackResult_' + this.roomId, (response) => {
            console.log('-------++++++++++++++++++++++++++++++------------');
            console.log(response.body);
            this.attackBtnDis = false;

            // this.allUserInfo = [];
            // this.allUserBlood = [];
            // this.allUserQi = [];
            this.NewAllUserInfo = [];

            let attackedUserFlash = JSON.parse(response.body);
            let result = attackedUserFlash.result;
            let leftNum = attackedUserFlash.leftNum;
            for(let i=0;i<leftNum;i++){
              let user = attackedUserFlash['user'+i];
              let blood = attackedUserFlash['blood'+i];
              let qi = attackedUserFlash['qi'+i];
              let lifeColor = attackedUserFlash['lifeColor'+i]
              let attackbtnDisabled = attackedUserFlash['attackbtnDisabled'+i]
              let nextbtnDisabled = attackedUserFlash['nextbtnDisabled'+i]
              // 如果是本人则更新自己的血量信息
              if(user===this.userId){
                this.selfBlood = blood;
                this.selfQi = qi;
                this.attackBtnDis = attackbtnDisabled;
                this.nextBtnDis = nextbtnDisabled;
              }
                 
              // this.allUserInfo.push({value: user});
              // this.allUserBlood.push({value: blood});
              // this.allUserQi.push({value: qi});
              this.NewAllUserInfo.push(
                // {userId: user, blood: blood , qi: qi}
                {userinfo: '玩家名： '+user+'          血量：'+blood+'          气：'+qi,
                userInfoStyle: lifeColor}
                );
            }
            this.gameResult = this.gameResult+'\n'+result;
          });

          //向服务端发送房间用户信息   
          this.sendUserInfo();
        },
        (error) => {     
          alert(error.headers.message);
        }
      )  
      },
      disconnect() {
        if (this.stompClient !== null) {
            // this.stompClient.disconnect(()=>{
              this.sendDisconnectInfo();
              this.stompClient.disconnect();
              console.log("Disconnected");
            // });
          }   
      },
      // sendTest(){
      //     let data = {"fromUserId": this.userId, "roomId": this.roomId, "msg": "test"};
      //     this.stompClient.send("/app/sendToRoom", {}, JSON.stringify(data));
      // },
      //退出房间
      quit(){
          this.disconnect();
          this.$router.push({
                  path:'/ThreeEightRoom',
               });
      },
      sendUserInfo(){
          let data = {"userId": this.userId, "roomId": this.roomId, "playerNum": this.playerNum};
          this.stompClient.send("/app/sendUserInfo", {}, JSON.stringify(data));
      },
      sendReadyNextInfo(){
          let data = {"userId": this.userId, "roomId": this.roomId};
          this.stompClient.send("/app/sendReadyNextInfo", {}, JSON.stringify(data));
          this.nextBtnDis = true
      },
      sendDisconnectInfo(){
          let data = {"userId": this.userId, "roomId": this.roomId};
          this.stompClient.send("/app/sendDisconnectInfo", {}, JSON.stringify(data));
      },
      sendToUser(){
          let data = {"fromUserId": this.userId, "toUserId": this.toUserId, "msg": this.chatMsg};
          this.stompClient.send("/app/sendToUser", {}, JSON.stringify(data));
      },
      sendToRoom(){
          let data = {"fromUserId": this.userId, "roomId": this.roomId, "msg": this.chatMsg};
          this.stompClient.send("/app/sendToRoom", {}, JSON.stringify(data));
      },
      sendMessage() {
          if(this.toUserId!==''){
            this.sendToUser();
          }else{
            this.sendToRoom();
          }
      },
      sendAttackMsg() {
          if(this.choosedAttack===''){
            alert("必须选择一个攻击招式！！！");
            return;
          }
          if((this.choosedAttack==='yun' && this.choosedUser!=='')||( this.choosedAttack==='dang0' && this.choosedUser!=='' ) ||( this.choosedAttack==='dang1' && this.choosedUser!=='' )){
            alert("运和挡不能选择攻击目标！！！");
            return;
          }
          if(this.choosedUser===this.userId){
            alert("攻击目标不能选择自己！！！");
            return;
          }
          if((this.choosedAttack==='biao' && this.choosedUser==='')||( this.choosedAttack==='adugen' && this.choosedUser==='' )){
            alert("镖和阿杜跟必须选择攻击目标！！！");
            return;
          }
          let data = {"fromUserId": this.userId, "roomId": this.roomId,"choosedAttack": this.choosedAttack, "choosedUser": this.choosedUser, "blood": this.selfBlood, "qi": this.selfQi};
          console.log("blood:"+this.selfBlood + "qi:"+this.selfQi);
          this.stompClient.send("/app/sendAttack", {}, JSON.stringify(data));
          this.attackBtnDis = true;
      },


      chooseYun(){
        this.choosedAttack = 'yun'
      },
      chooseDang0(){
        this.choosedAttack = 'dang0'
      },
      chooseDang1(){
        this.choosedAttack = 'dang1'
      },
      chooseBiao(){
        this.choosedAttack = 'biao'
      },
      chooseAdugen(){
        this.choosedAttack = 'adugen'
      },
    },
  }

 


</script>


<style>
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

<style scoped>
    #form{
        width: 30%;
        margin: 200px auto;
    }
    #roomInfo{
        position: relative;
        /* right: 400px; */
        margin: 30px;
    }
    .playerInfo{
        display:inline-block;
        width: 100%;
        margin: 10px 10px 10px 10px;
    }
    .row {
        display:inline-block;
        /* margin: 25px 25px 25px 25px;
        padding: 100px 25px 25px 25px; */
        width: auto;
        height: auto;
    }
    .el-button{
        margin: 30px 40px 40px 30px;
    }
    .ThreeEight{
        height: auto;
        scroll-behavior: auto;
    }
    .sendInfo{
        width: 100%;
        margin: auto;
    }
    .aside{
      scroll-behavior: auto;
    }
    .main{
      scroll-behavior: auto;
    }
</style>