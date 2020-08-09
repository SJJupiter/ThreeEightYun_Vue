<template>
  <div class="games">
    <h1 :class="beatClass" id="welcome">Welcome</h1>

    <div class="row">
      <router-link to="/ThreeEightRoom">   
        <div id="ThreeEightYun" class="gameBtn" @mouseenter="handShake()" @mouseleave="noHandShake()">
          <h1 id="ThreeEightYunWord" :class="shakeClass">38</h1>
          <h1 class="jupiter" >©JUPITER</h1>
          <h1 id="ThreeEightYunName">38</h1>
        </div>
      </router-link>
      <div id="BALL" class="gameBtn">
        <h1 id="BallFightWord" >BALL</h1>
        <h1 id="BallFightName">BALL</h1>
      </div>
      <div id="PDF" class="gameBtn">
        <h1 id="PDFWord">PDF</h1>
        <h1 id="PDFName">PDF</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Games",
  data() {
    return {
      shakeClass: "",
      beatClass: "",
    }
  },
  methods: {
      handShake: function(){
        // this.shakeClass = "animate__animated animate__wobble";
      },
      noHandShake: function(){
        this.shakeClass = "";
      },
      showIcon() {
      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop > 400
       ) {            
            this.beatClass = "animate__animated animate__heartBeat";
        } else {
             this.beatClass = "";
        }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.showIcon);
},

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #welcome{
    margin: 10px;
    font-style:oblique;
    font-size: 100px;
    padding: 80px;
  }
  .active{
    color: thistle;
  }
  .row {
    display:inline-block;
    margin: 25px 25px 25px 25px;
    padding: 100px 25px 25px 25px;
    width: auto;
    height: auto;
  }
  .gameBtn {
    display:inline-block;width:400px;height:400px;
    vertical-align: top;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    margin: 15px;
  }
  #ThreeEightYun {
    background-color: #c0c2ce;
  }
  #ThreeEightYun:hover {
    background-color: #f3c9dd;
  }
  #BALL {
    background-color: #61bfad;
  }
  #BALL:hover {
    background-color: #f9f7e8;
  }
  #PDF {
    background-color: #0bbcd6;
  }
  #PDF:hover {
    background-color: #e57066;
  }
  #ThreeEightYunWord {
    margin: 0 auto;
    color: #fe667b;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    font-size: 150px;
    font-weight:bold;
  }
  #ThreeEightYunWord:hover {
    margin: 0 auto;
    color: #ceecf7;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    font-size: 150px;
    font-weight:bold;
  }
  #BallFightWord {
    margin: 0 auto;
    color: gray;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    font-size: 100px;
    font-weight:bold;
  }
  #BallFightWord:hover {
    margin: 0 auto;
    color: #61bfad;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    font-size: 100px;
    font-weight:bold;
  }
  #PDFWord {
    margin: 0 auto;
    color: #e6625e;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    font-size: 120px;
    font-weight:bold;
  }
  #PDFWord:hover {
    margin: 0 auto;
    color: #28292b;
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    font-size: 120px;
    font-weight:bold;
  }
  .jupiter{
    color: #012f63;
    font-size: 20px;
    color: white;
    font-weight:bold;
    position: relative;
    right: 141px;
    top: 188px;
  }
  #ThreeEightYunName{
    font-size: 20px;
    color: #ffffff;
    font-weight:bold;
    position: relative;
    left: 164px;
    top: 164px;
  }
  #BallFightName{
    font-size: 20px;
    color: #ffffff;
    font-weight:bold;
    position: relative;
    left: 157px;
    top: 243px;
  }
  #PDFName{
    font-size: 20px;
    color: #ffffff;
    font-weight:bold;
    position: relative;
    left: 160px;
    top: 223px;
  }
</style>
